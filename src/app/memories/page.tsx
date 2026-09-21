'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Image as ImageIcon, Download, Share2, Trash2, ArrowLeft, Eye, Camera } from 'lucide-react';
import { getPhotos, deletePhoto, StoredPhoto } from '@/lib/photoStorage';

export default function MemoriesPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'photo' | 'photobooth' | 'daily' | 'virtual-booth'>('all');
  const [memories, setMemories] = useState<StoredPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMemory, setSelectedMemory] = useState<StoredPhoto | null>(null);

  // Prevent background body scroll when modal is open
  useEffect(() => {
    if (selectedMemory) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedMemory]);

  // Load photos from IndexedDB on mount
  useEffect(() => {
    async function loadStoredMemories() {
      try {
        const stored = await getPhotos();
        setMemories(stored || []);
      } catch (err) {
        console.error('Failed to load photos from IndexedDB:', err);
        setMemories([]);
      } finally {
        setLoading(false);
      }
    }
    loadStoredMemories();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deletePhoto(id);
      setMemories(memories.filter((m) => m.id !== id));
      if (selectedMemory?.id === id) {
        setSelectedMemory(null);
      }
    } catch (err) {
      console.error('Failed to delete photo:', err);
      alert('Failed to delete photo.');
    }
  };

  const filteredMemories = memories.filter((m) => {
    if (activeTab === 'all') return true;
    return m.type === activeTab;
  });

  // Helper to resolve image source (Blob or string/DataURL)
  const getImageSrc = (image: Blob | string): string => {
    if (typeof image === 'string') return image;
    return URL.createObjectURL(image);
  };

  const rotations = ['rotate-1', '-rotate-1', 'rotate-2', '-rotate-2', 'rotate-1'];

  return (
    <div className="min-h-screen bg-[#FFFDF5] py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Top Header & Back */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="bg-[#FFD8C8] text-[#24652A] font-extrabold text-xs px-4 py-1.5 rounded-full uppercase tracking-widest">
            scrapbook gallery
          </span>
          <h1 className="text-4xl font-black text-[#185522]">memories</h1>
          <p className="text-sm text-[#24652A]/80 font-medium">Your personal gallery of moments and photo strips.</p>
        </div>
        <Link
          href="/home"
          className="inline-flex items-center gap-2 text-sm font-bold text-[#24652A] hover:text-[#68B96B] transition-colors bg-[#EAF5EA] px-4 py-2.5 rounded-2xl border border-[#A8D3A8]/50 shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>back to booth menu</span>
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b-2 border-[#A8D3A8]/30">
        {[
          { id: 'all', label: 'All Memories' },
          { id: 'photo', label: 'Photos' },
          { id: 'photobooth', label: 'Photobooth Strips' },
          { id: 'daily', label: 'Daily Booth' },
          { id: 'virtual-booth', label: 'Virtual Booth' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-6 py-3 rounded-2xl text-sm font-black whitespace-nowrap transition-all shadow-xs ${
              activeTab === tab.id
                ? 'bg-[#68B96B] text-white shadow-md scale-105'
                : 'bg-[#EAF5EA]/60 text-[#24652A] hover:bg-[#EAF5EA]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Memories Gallery - True Masonry / Waterfall layout using CSS columns */}
      {loading ? (
        <div className="text-center py-20 text-[#24652A] font-bold">Loading memories from browser storage...</div>
      ) : filteredMemories.length > 0 ? (
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-8 [column-fill:_balance]">
          {filteredMemories.map((mem, idx) => {
            const rot = rotations[idx % rotations.length];
            const imgSrc = getImageSrc(mem.image);
            const dateStr = new Date(mem.createdAt).toLocaleDateString();

            return (
              <div
                key={mem.id}
                className={`mb-8 break-inside-avoid bg-[#FFFDF5] p-4 rounded-[2.5rem] border-2 border-[#A8D3A8]/60 shadow-lg hover:shadow-xl transform ${rot} hover:rotate-0 hover:scale-105 transition-all duration-300 space-y-3 flex flex-col justify-between group`}
              >
                <div
                  onClick={() => setSelectedMemory(mem)}
                  className={`rounded-[2rem] overflow-hidden bg-emerald-50 relative cursor-pointer shadow-inner border border-emerald-100 ${
                    mem.type === 'photobooth' || mem.type === 'daily' ? 'aspect-[1/2]' : 'aspect-[4/3]'
                  }`}
                >
                  <img
                    src={imgSrc}
                    alt={mem.caption || 'Memory'}
                    className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500`}
                  />
                  <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-xs">
                    <span className="bg-[#FFFDF5] text-[#24652A] px-4 py-2 rounded-2xl text-xs font-black shadow-lg flex items-center gap-1.5 transform hover:scale-105 transition-transform">
                      <Eye className="w-4 h-4 text-[#68B96B]" /> View Moment
                    </span>
                  </div>
                </div>

                <div className="space-y-1 px-1">
                  <p className="text-sm font-black text-[#185522] truncate">{mem.caption || 'Untitled Moment'}</p>
                  <p className="text-xs text-[#24652A]/60 font-semibold">{dateStr} • <span className="uppercase text-[10px] bg-[#EAF5EA] px-2 py-0.5 rounded-md">{mem.type}</span></p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t-2 border-dashed border-[#A8D3A8]/40">
                  <button
                    onClick={() => alert('Downloading memory...')}
                    className="p-2.5 rounded-2xl text-[#24652A] hover:bg-[#EAF5EA] transition-colors"
                    title="Download"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => alert('Link copied to share!')}
                    className="p-2.5 rounded-2xl text-[#24652A] hover:bg-[#EAF5EA] transition-colors"
                    title="Share"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(mem.id)}
                    className="p-2.5 rounded-2xl text-rose-500 hover:bg-rose-50 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20 bg-[#EAF5EA]/50 rounded-[3rem] border-3 border-dashed border-[#A8D3A8] space-y-4">
          <ImageIcon className="w-14 h-14 text-[#A8D3A8] mx-auto animate-bounce" />
          <h3 className="text-xl font-black text-[#185522]">no memories yet ✨</h3>
          <p className="text-sm text-[#24652A]/80 font-medium max-w-sm mx-auto">
            Your scrapbook is waiting for your first snapshot! Take a photo to save it here.
          </p>
          <div className="pt-2">
            <Link
              href="/home/photo"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-[#68B96B] hover:bg-[#24652A] text-white font-black text-sm shadow-lg transition-all hover:scale-105"
            >
              <Camera className="w-4 h-4" />
              <span>take a photo</span>
            </Link>
          </div>
        </div>
      )}

      {/* View Modal with natural vertical scrolling and unclipped image */}
      {selectedMemory && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FFFDF5] max-w-md w-full rounded-[2.5rem] sm:rounded-[3rem] shadow-2xl border-4 border-[#A8D3A8] animate-in fade-in zoom-in duration-200 max-h-[85vh] sm:max-h-[90vh] flex flex-col overflow-hidden">
            {/* Fixed Header */}
            <div className="flex items-center justify-between bg-[#FFFDF5] p-6 sm:px-8 sm:pt-8 sm:pb-4 border-b border-[#A8D3A8]/30 shrink-0">
              <h3 className="font-black text-xl text-[#185522] truncate pr-4">{selectedMemory.caption}</h3>
              <button
                onClick={() => setSelectedMemory(null)}
                className="w-10 h-10 rounded-2xl bg-[#EAF5EA] hover:bg-[#A8D3A8]/40 text-[#24652A] font-black flex items-center justify-center transition-colors shrink-0"
              >
                ✕
              </button>
            </div>
            
            {/* Scrollable Body - ONLY SCROLL AREA */}
            <div className="p-6 sm:px-8 sm:pb-8 overflow-y-auto space-y-6 flex-1">
              <div className="w-full rounded-[2rem] overflow-hidden bg-emerald-50 shadow-lg border-2 border-emerald-100 flex items-center justify-center p-2">
                <img
                  src={getImageSrc(selectedMemory.image)}
                  alt="Memory Detail"
                  className="w-full h-auto object-contain rounded-xl"
                />
              </div>

              <div className="flex items-center justify-between text-xs font-bold text-[#24652A]/70 pt-2 border-t border-[#A8D3A8]/30">
                <span>Saved on {new Date(selectedMemory.createdAt).toLocaleDateString()}</span>
                <span className="capitalize bg-[#EAF5EA] px-3 py-1 rounded-full text-[#24652A] font-black">{selectedMemory.type}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
