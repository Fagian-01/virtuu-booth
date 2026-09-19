'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { User, Settings, Bookmark, ArrowLeft, Camera, Film, Check } from 'lucide-react';
import { MOCK_TEMPLATES } from '@/lib/mockData';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'account' | 'templates' | 'settings'>('account');
  const [savedTemplates, setSavedTemplates] = useState(MOCK_TEMPLATES.slice(0, 2));

  return (
    <div className="min-h-screen bg-[#FFFDF5] py-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
      {/* Top back & indicator */}
      <div className="flex items-center justify-between">
        <Link
          href="/home"
          className="inline-flex items-center gap-2 text-sm font-bold text-[#24652A] hover:text-[#68B96B] transition-colors bg-[#EAF5EA] px-4 py-2 rounded-2xl border border-[#A8D3A8]/50 shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>back to booth menu</span>
        </Link>
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#FFD8C8] text-[#24652A] text-xs font-black uppercase tracking-wider shadow-xs">
          <User className="w-3.5 h-3.5 text-[#24652A]" />
          <span>profile & settings</span>
        </div>
      </div>

      {/* Profile Header Card */}
      <div className="bg-[#EAF5EA]/70 p-8 sm:p-10 rounded-[3rem] border-3 border-[#A8D3A8]/60 flex flex-col sm:flex-row items-center gap-8 shadow-xl">
        <div className="w-28 h-28 rounded-full overflow-hidden bg-emerald-200 border-4 border-[#68B96B] shadow-inner">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80"
            alt="Avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="space-y-3 text-center sm:text-left">
          <div className="inline-block bg-[#FFD8C8] text-[#24652A] font-extrabold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider">
            cozy member ✨
          </div>
          <h1 className="text-3xl font-black text-[#185522]">Cozy Creator</h1>
          <p className="text-xs text-[#24652A]/70 font-mono font-bold">@virtuu_user • Joined March 2026</p>
          <div className="flex items-center justify-center sm:justify-start gap-4 pt-1">
            <div className="bg-[#FFFDF5] px-5 py-2.5 rounded-2xl border-2 border-[#A8D3A8]/50 text-center shadow-xs">
              <span className="block font-black text-lg text-[#185522]">12</span>
              <span className="text-[10px] font-black text-[#24652A]/60 uppercase">Photos</span>
            </div>
            <div className="bg-[#FFFDF5] px-5 py-2.5 rounded-2xl border-2 border-[#A8D3A8]/50 text-center shadow-xs">
              <span className="block font-black text-lg text-[#185522]">5</span>
              <span className="text-[10px] font-black text-[#24652A]/60 uppercase">Strips</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b-2 border-[#A8D3A8]/30">
        {[
          { id: 'account', label: 'Account', icon: User },
          { id: 'templates', label: 'Saved Templates', icon: Bookmark },
          { id: 'settings', label: 'Settings', icon: Settings },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-3 rounded-2xl text-sm font-black whitespace-nowrap transition-all flex items-center gap-2 shadow-xs ${
                activeTab === tab.id
                  ? 'bg-[#68B96B] text-white shadow-md scale-105'
                  : 'bg-[#EAF5EA]/60 text-[#24652A] hover:bg-[#EAF5EA]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Contents */}
      {activeTab === 'account' && (
        <div className="bg-[#EAF5EA]/40 p-8 sm:p-10 rounded-[3rem] border-3 border-[#A8D3A8]/50 space-y-6 shadow-md">
          <h2 className="text-2xl font-black text-[#185522]">Account Details</h2>
          <div className="space-y-4 max-w-md">
            <div>
              <label className="block text-xs font-black text-[#24652A] uppercase mb-1.5">Display Name</label>
              <input
                type="text"
                defaultValue="Cozy Creator"
                className="w-full px-4 py-3.5 rounded-2xl bg-[#FFFDF5] border-2 border-[#A8D3A8]/60 text-[#24652A] text-sm font-bold focus:outline-none focus:border-[#68B96B] shadow-inner"
              />
            </div>
            <div>
              <label className="block text-xs font-black text-[#24652A] uppercase mb-1.5">Bio</label>
              <textarea
                defaultValue="Making moments, not just photos. 🌿✨"
                rows={3}
                className="w-full px-4 py-3.5 rounded-2xl bg-[#FFFDF5] border-2 border-[#A8D3A8]/60 text-[#24652A] text-sm font-medium focus:outline-none focus:border-[#68B96B] shadow-inner"
              />
            </div>
            <button
              onClick={() => alert('Profile updated successfully!')}
              className="px-8 py-3.5 rounded-2xl bg-[#68B96B] text-white font-black text-sm shadow-xl shadow-[#68B96B]/20 hover:bg-[#24652A] transition-all hover:scale-105"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}

      {activeTab === 'templates' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-black text-[#185522]">Saved Photobooth Templates</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {savedTemplates.map((tmpl) => (
              <div
                key={tmpl.id}
                className="bg-[#EAF5EA]/70 p-7 rounded-[2.5rem] border-3 border-[#A8D3A8]/50 space-y-4 flex flex-col justify-between shadow-md"
              >
                <div className="space-y-1.5">
                  <h3 className="font-black text-xl text-[#185522]">{tmpl.name}</h3>
                  <p className="text-xs text-[#24652A]/80 font-medium">{tmpl.description}</p>
                </div>
                <Link
                  href="/home/photobooth"
                  className="inline-flex items-center gap-1.5 text-xs font-black text-[#68B96B] hover:text-[#24652A]"
                >
                  <span>Use template →</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="bg-[#EAF5EA]/40 p-8 sm:p-10 rounded-[3rem] border-3 border-[#A8D3A8]/50 space-y-6 shadow-md">
          <h2 className="text-2xl font-black text-[#185522]">Booth Preferences</h2>
          <div className="space-y-4 font-bold text-sm text-[#24652A]">
            <label className="flex items-center gap-3 cursor-pointer bg-[#FFFDF5] p-4 rounded-2xl border-2 border-[#A8D3A8]/40 shadow-xs">
              <input type="checkbox" defaultChecked className="w-5 h-5 accent-[#68B96B] rounded-lg" />
              <span>Play shutter sound effect on capture</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer bg-[#FFFDF5] p-4 rounded-2xl border-2 border-[#A8D3A8]/40 shadow-xs">
              <input type="checkbox" defaultChecked className="w-5 h-5 accent-[#68B96B] rounded-lg" />
              <span>Auto-save new photos to Memories gallery</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer bg-[#FFFDF5] p-4 rounded-2xl border-2 border-[#A8D3A8]/40 shadow-xs">
              <input type="checkbox" className="w-5 h-5 accent-[#68B96B] rounded-lg" />
              <span>Dark mode aesthetic (coming soon)</span>
            </label>
          </div>
        </div>
      )}
    </div>
  );
}
