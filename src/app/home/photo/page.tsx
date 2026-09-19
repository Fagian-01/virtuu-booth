'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Camera, Sparkles, RefreshCw, Check, ArrowLeft, Download, Share2 } from 'lucide-react';
import { savePhoto, StoredPhoto } from '@/lib/photoStorage';

const FILTERS = [
  { id: 'normal', name: 'Normal', style: '', badgeBg: 'bg-[#FFFDF5]' },
  { id: 'sage', name: 'Sage Soft', style: 'sepia-[0.2] hue-rotate-[15deg] brightness-105', badgeBg: 'bg-[#EAF5EA]' },
  { id: 'vintage', name: 'Vintage 90s', style: 'sepia-[0.5] contrast-125', badgeBg: 'bg-[#FFD8C8]' },
  { id: 'dreamy', name: 'Dreamy Y2K', style: 'brightness-110 saturate-125 hue-rotate-[-10deg]', badgeBg: 'bg-[#DDD5FF]' },
  { id: 'bw', name: 'Classic Mono', style: 'grayscale(100%) contrast-125', badgeBg: 'bg-slate-100' },
  { id: 'warm', name: 'Warm Cream', style: 'sepia-[0.3] brightness-105', badgeBg: 'bg-[#FFE99A]' },
];

export default function PhotoPage() {
  const [selectedFilter, setSelectedFilter] = useState('normal');
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [permissionError, setPermissionError] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [saving, setSaving] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [caption, setCaption] = useState('My virtuu moment ✨');

  useEffect(() => {
    let stream: MediaStream | null = null;
    async function initCamera() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { width: { ideal: 1280 }, height: { ideal: 720 } },
          audio: false,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setCameraActive(true);
        }
      } catch (err) {
        console.warn('Camera access denied or unavailable:', err);
        setPermissionError(true);
      }
    }
    initCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handleCapture = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth || 640;
      canvas.height = videoRef.current.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        setCapturedImage(canvas.toDataURL('image/png'));
      }
    } else {
      setCapturedImage(
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80'
      );
    }
    setSavedSuccess(false);
  };

  const handleRetake = () => {
    setCapturedImage(null);
    setSavedSuccess(false);
  };

  const handleSaveToMemories = async () => {
    if (!capturedImage) return;
    setSaving(true);
    try {
      // Convert dataURL to Blob
      const res = await fetch(capturedImage);
      const blob = await res.blob();

      const newPhoto: StoredPhoto = {
        id: 'photo_' + Date.now(),
        type: 'photo',
        image: blob,
        filter: selectedFilter,
        caption: caption,
        createdAt: new Date().toISOString(),
      };

      await savePhoto(newPhoto);
      setSaving(false);
      setSavedSuccess(true);
    } catch (err) {
      console.error('Failed to save photo to IndexedDB:', err);
      setSaving(false);
      alert('Failed to save photo. Please try again.');
    }
  };

  const activeFilterStyle = FILTERS.find((f) => f.id === selectedFilter)?.style || '';

  return (
    <div className="min-h-screen bg-[#FFFDF5] py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8">
      {/* Top navigation back */}
      <div className="flex items-center justify-between">
        <Link
          href="/home"
          className="inline-flex items-center gap-2 text-sm font-bold text-[#24652A] hover:text-[#68B96B] transition-colors bg-[#EAF5EA] px-4 py-2 rounded-2xl border border-[#A8D3A8]/50 shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>back to booth menu</span>
        </Link>
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#FFD8C8] text-[#24652A] text-xs font-black uppercase tracking-wider shadow-xs">
          <Camera className="w-3.5 h-3.5 text-[#24652A]" />
          <span>solo photo mode</span>
        </div>
      </div>

      {!capturedImage ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Camera Viewfinder */}
          <div className="lg:col-span-8 bg-[#24652A] rounded-[2.5rem] overflow-hidden shadow-2xl relative aspect-[4/3] flex items-center justify-center border-4 border-[#A8D3A8]">
            {!permissionError ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className={`w-full h-full object-cover ${activeFilterStyle}`}
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-[#FFFDF5] bg-[#185522]">
                <Camera className="w-12 h-12 mb-3 text-[#A8D3A8]" />
                <h3 className="text-lg font-black">Camera preview unavailable</h3>
                <p className="text-sm text-[#A8D3A8] max-w-sm mt-1 font-medium">
                  Please allow camera access in your browser or use the demo snapshot below.
                </p>
                <button
                  onClick={() =>
                    setCapturedImage(
                      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80'
                    )
                  }
                  className="mt-4 px-6 py-2.5 rounded-2xl bg-[#68B96B] text-white text-sm font-bold hover:bg-emerald-600 transition-colors shadow"
                >
                  Use Demo Snapshot
                </button>
              </div>
            )}

            {/* Shutter Button Overlay */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center gap-4">
              <button
                onClick={handleCapture}
                className="w-18 h-18 rounded-full bg-[#FFFDF5] border-4 border-[#68B96B] shadow-2xl flex items-center justify-center hover:scale-110 transition-transform active:scale-95"
                aria-label="Capture Photo"
              >
                <div className="w-12 h-12 rounded-full bg-[#68B96B] animate-pulse" />
              </button>
            </div>
          </div>

          {/* Filters Selector Panel */}
          <div className="lg:col-span-4 bg-[#EAF5EA]/70 p-7 rounded-[2.5rem] border-2 border-[#A8D3A8]/60 shadow-lg space-y-6">
            <div className="space-y-1">
              <span className="bg-[#FFE99A] text-[#24652A] font-black text-[10px] px-2.5 py-0.5 rounded-full uppercase">
                vibe selector
              </span>
              <h3 className="text-2xl font-black text-[#185522]">curated filters</h3>
              <p className="text-xs text-[#24652A]/75 font-medium">Tap a filter to apply instantly.</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {FILTERS.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setSelectedFilter(f.id)}
                  className={`p-3.5 rounded-2xl text-left border-2 transition-all font-bold text-sm ${
                    selectedFilter === f.id
                      ? 'bg-[#68B96B] text-white border-[#68B96B] shadow-md scale-105'
                      : `${f.badgeBg} text-[#24652A] border-[#A8D3A8]/50 hover:bg-white`
                  }`}
                >
                  <span>{f.name}</span>
                </button>
              ))}
            </div>

            <div className="pt-4 border-t-2 border-dashed border-[#A8D3A8]/50 space-y-2">
              <label className="block text-xs font-black text-[#24652A] uppercase tracking-wider">
                Photo Caption
              </label>
              <input
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-[#FFFDF5] border-2 border-[#A8D3A8]/60 text-[#24652A] text-sm font-medium focus:outline-none focus:border-[#68B96B] shadow-inner"
                placeholder="Add a cute caption..."
              />
            </div>
          </div>
        </div>
      ) : (
        /* Captured Result / Edit State */
        <div className="max-w-xl mx-auto bg-[#EAF5EA]/70 p-8 rounded-[2.5rem] border-2 border-[#A8D3A8]/60 shadow-xl space-y-6 text-center">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#68B96B] text-white text-xs font-black uppercase tracking-wide shadow-xs">
              <Check className="w-3.5 h-3.5" /> photo captured ✨
            </span>
            <h2 className="text-3xl font-black text-[#185522]">ready to save your moment</h2>
          </div>

          <div className="max-w-md mx-auto bg-[#FFFDF5] p-5 rounded-[2rem] shadow-xl border-3 border-[#A8D3A8]/60 space-y-4 rotate-1">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-emerald-100 relative shadow-inner">
              <img
                src={capturedImage}
                alt="Captured moment"
                className={`w-full h-full object-cover ${activeFilterStyle}`}
              />
            </div>
            <div className="text-center font-extrabold text-sm text-[#24652A]">
              {caption}
            </div>
          </div>

          {savedSuccess && (
            <div className="bg-[#68B96B]/20 border border-[#68B96B] text-[#185522] py-3 px-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 animate-bounce">
              <Check className="w-4 h-4 text-[#68B96B]" />
              <span>saved to memories ✨</span>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={handleRetake}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-[#FFFDF5] border-2 border-[#A8D3A8] text-[#24652A] font-bold text-sm hover:bg-[#A8D3A8]/20 transition-colors flex items-center justify-center gap-2 shadow-xs"
            >
              <RefreshCw className="w-4 h-4" />
              <span>retake photo</span>
            </button>
            <button
              onClick={handleSaveToMemories}
              disabled={saving || savedSuccess}
              className={`w-full sm:w-auto px-8 py-3.5 rounded-2xl font-extrabold text-sm shadow-xl transition-all flex items-center justify-center gap-2 hover:scale-105 ${
                savedSuccess
                  ? 'bg-emerald-600 text-white cursor-default'
                  : 'bg-[#68B96B] hover:bg-[#24652A] text-white shadow-[#68B96B]/20'
              }`}
            >
              <Download className="w-4 h-4" />
              <span>{saving ? 'Saving...' : savedSuccess ? 'Saved to Memories!' : 'Save to Memories'}</span>
            </button>
          </div>

          {savedSuccess && (
            <div className="pt-2">
              <Link
                href="/memories"
                className="text-sm font-extrabold text-[#68B96B] hover:text-[#24652A] underline"
              >
                View all memories →
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
