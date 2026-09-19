'use client';

import React from 'react';
import Link from 'next/link';
import { Camera, Film, Users, Sparkles, ArrowRight, Heart, Smile, CalendarDays } from 'lucide-react';
import { TODAY_DAILY_BOOTH, MOCK_MEMORIES } from '@/lib/mockData';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#FFFDF5] py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header Greeting */}
      <div className="text-center space-y-3">
        <span className="bg-[#FFD8C8] text-[#24652A] font-extrabold text-xs px-4 py-1.5 rounded-full uppercase tracking-widest shadow-xs">
          booth studio
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-[#185522] tracking-tight">
          what do you wanna make today?
        </h1>
        <p className="text-[#24652A]/80 font-medium text-base">
          choose a booth experience below and let the creativity flow ✨
        </p>
      </div>

      {/* Main Feature Cards Grid with Pastel Accents */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* PHOTO */}
        <Link
          href="/home/photo"
          className="group relative bg-[#EAF5EA]/70 hover:bg-[#EAF5EA] p-9 rounded-[3rem] border-3 border-[#A8D3A8]/60 hover:border-[#68B96B] transition-all shadow-md hover:shadow-xl flex flex-col justify-between overflow-hidden"
        >
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#68B96B]/10 rounded-full blur-xl group-hover:scale-150 transition-transform" />
          <div className="space-y-6 relative z-10">
            <div className="w-16 h-16 rounded-3xl bg-[#FFFDF5] border-2 border-[#A8D3A8] flex items-center justify-center text-[#24652A] shadow-md group-hover:rotate-12 transition-transform">
              <Camera className="w-8 h-8 text-[#68B96B]" />
            </div>
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#68B96B] bg-[#FFFDF5] px-3 py-1 rounded-full shadow-xs">
                filters & effects
              </span>
              <h2 className="text-3xl font-black text-[#185522]">PHOTO</h2>
              <p className="text-base text-[#24652A]/80 font-medium leading-relaxed">
                take a photo with filters & effects. Quick, cute, and ready to save to your scrapbook.
              </p>
            </div>
          </div>
          <div className="pt-8 flex items-center gap-2 text-base font-extrabold text-[#68B96B] group-hover:text-[#24652A] relative z-10">
            <span>launch camera</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
          </div>
        </Link>

        {/* PHOTOBOOTH */}
        <Link
          href="/home/photobooth"
          className="group relative bg-[#FFD8C8]/30 hover:bg-[#FFD8C8]/50 p-9 rounded-[3rem] border-3 border-[#FFD8C8] hover:border-[#24652A] transition-all shadow-md hover:shadow-xl flex flex-col justify-between overflow-hidden"
        >
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#FFD8C8]/30 rounded-full blur-xl group-hover:scale-150 transition-transform" />
          <div className="space-y-6 relative z-10">
            <div className="w-16 h-16 rounded-3xl bg-[#FFFDF5] border-2 border-[#FFD8C8] flex items-center justify-center text-[#24652A] shadow-md group-hover:rotate-12 transition-transform">
              <Film className="w-8 h-8 text-[#24652A]" />
            </div>
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#24652A] bg-[#FFFDF5] px-3 py-1 rounded-full shadow-xs">
                retro strips
              </span>
              <h2 className="text-3xl font-black text-[#185522]">PHOTOBOOTH</h2>
              <p className="text-base text-[#24652A]/80 font-medium leading-relaxed">
                make your own photobooth strip. Choose templates, snap 3-4 photos, and print style.
              </p>
            </div>
          </div>
          <div className="pt-8 flex items-center gap-2 text-base font-extrabold text-[#24652A] group-hover:translate-x-1.5 transition-transform relative z-10">
            <span>choose template</span>
            <ArrowRight className="w-5 h-5" />
          </div>
        </Link>

        {/* VIRTUAL BOOTH */}
        <Link
          href="/home/virtual-booth"
          className="group relative bg-[#DDD5FF]/30 hover:bg-[#DDD5FF]/50 p-9 rounded-[3rem] border-3 border-[#DDD5FF] hover:border-[#24652A] transition-all shadow-md hover:shadow-xl flex flex-col justify-between overflow-hidden"
        >
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#DDD5FF]/30 rounded-full blur-xl group-hover:scale-150 transition-transform" />
          <div className="space-y-6 relative z-10">
            <div className="w-16 h-16 rounded-3xl bg-[#FFFDF5] border-2 border-[#DDD5FF] flex items-center justify-center text-[#24652A] shadow-md group-hover:rotate-12 transition-transform">
              <Users className="w-8 h-8 text-[#24652A]" />
            </div>
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#24652A] bg-[#FFFDF5] px-3 py-1 rounded-full shadow-xs">
                together apart
              </span>
              <h2 className="text-3xl font-black text-[#185522]">VIRTUAL BOOTH</h2>
              <p className="text-base text-[#24652A]/80 font-medium leading-relaxed">
                create together, apart. Host a synchronized booth room with a friend in real time.
              </p>
            </div>
          </div>
          <div className="pt-8 flex items-center gap-2 text-base font-extrabold text-[#24652A] group-hover:translate-x-1.5 transition-transform relative z-10">
            <span>create or join room</span>
            <ArrowRight className="w-5 h-5" />
          </div>
        </Link>

        {/* DAILY BOOTH */}
        <Link
          href="/daily-booth"
          className="group relative bg-[#FFE99A]/30 hover:bg-[#FFE99A]/50 p-9 rounded-[3rem] border-3 border-[#FFE99A] hover:border-[#24652A] transition-all shadow-md hover:shadow-xl flex flex-col justify-between overflow-hidden"
        >
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#FFE99A]/30 rounded-full blur-xl group-hover:scale-150 transition-transform" />
          <div className="space-y-6 relative z-10">
            <div className="w-16 h-16 rounded-3xl bg-[#FFFDF5] border-2 border-[#FFE99A] flex items-center justify-center text-[#24652A] shadow-md group-hover:rotate-12 transition-transform">
              <Sparkles className="w-8 h-8 text-[#24652A]" />
            </div>
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#24652A] bg-[#FFFDF5] px-3 py-1 rounded-full shadow-xs">
                daily challenge
              </span>
              <h2 className="text-3xl font-black text-[#185522]">DAILY BOOTH</h2>
              <p className="text-base text-[#24652A]/80 font-medium leading-relaxed">
                today&apos;s little photo challenge. Theme: &ldquo;{TODAY_DAILY_BOOTH.theme}&rdquo;.
              </p>
            </div>
          </div>
          <div className="pt-8 flex items-center gap-2 text-base font-extrabold text-[#24652A] group-hover:translate-x-1.5 transition-transform relative z-10">
            <span>join daily challenge</span>
            <ArrowRight className="w-5 h-5" />
          </div>
        </Link>
      </div>

      {/* Featured Daily Booth Banner */}
      <div className="bg-[#24652A] text-[#FFFDF5] p-10 rounded-[3rem] shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="absolute inset-0 bg-[radial-gradient(#68B96B_1px,transparent_1px)] [background-size:16px_16px] opacity-15" />
        
        <div className="space-y-3 max-w-xl relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#68B96B] text-white text-xs font-black uppercase tracking-wider">
            featured daily drop
          </div>
          <h3 className="text-3xl sm:text-4xl font-black">{TODAY_DAILY_BOOTH.theme}</h3>
          <p className="text-[#A8D3A8] text-base leading-relaxed font-medium">
            {TODAY_DAILY_BOOTH.description}
          </p>
        </div>
        <div className="relative z-10">
          <Link
            href="/daily-booth"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-[#FFFDF5] text-[#24652A] font-extrabold hover:bg-[#EAF5EA] transition-all shadow-lg hover:scale-105"
          >
            <span>take today&apos;s photo</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Recent Memories Preview */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-3xl font-black text-[#185522]">recent memories</h3>
          <Link
            href="/memories"
            className="text-sm font-extrabold text-[#68B96B] hover:text-[#24652A] transition-colors flex items-center gap-1"
          >
            <span>view all</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {MOCK_MEMORIES.slice(0, 5).map((mem, idx) => {
            const rots = ['rotate-1', '-rotate-2', 'rotate-2', '-rotate-1', 'rotate-2'];
            return (
              <div
                key={mem.id}
                className={`bg-[#FFFDF5] p-3.5 rounded-3xl border-2 border-[#A8D3A8]/50 shadow-md transform ${rots[idx % rots.length]} hover:rotate-0 hover:scale-105 transition-all duration-300 space-y-2`}
              >
                <div className="aspect-square rounded-2xl overflow-hidden bg-emerald-50 relative shadow-inner">
                  <img
                    src={mem.url}
                    alt={mem.caption || 'Memory'}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-xs text-[#24652A] truncate font-bold text-center">
                  {mem.caption || 'Photo moment'}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
