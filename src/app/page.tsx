'use client';

import React from 'react';
import Link from 'next/link';
import { Camera, Film, Users, CalendarDays, ArrowRight, Heart, Smile, Sparkles } from 'lucide-react';
import { TODAY_DAILY_BOOTH } from '@/lib/mockData';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FFFDF5] text-[#24652A] overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-12 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text / CTAs */}
          <div className="lg:col-span-7 space-y-6 relative z-10">
            {/* Playful Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFD8C8] border-2 border-[#FFD8C8] text-[#24652A] text-sm font-bold shadow-xs animate-bounce">
              <Sparkles className="w-4 h-4 text-[#24652A]" />
              <span>your virtual photo booth ✨</span>
            </div>
            
            <h1 className="text-5xl sm:text-7xl font-black tracking-tight text-[#185522] leading-none">
              make moments, <br />
              <span className="text-[#68B96B] underline decoration-[#FFE99A] decoration-wavy decoration-4">not just photos.</span>
            </h1>

            <p className="text-lg sm:text-xl text-[#24652A]/85 max-w-xl font-medium leading-relaxed">
              Step into virtuu booth — your cozy digital scrapbook and virtual photobooth where spontaneous snapshots and shared moments come alive.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <Link
                href="/home"
                className="inline-flex items-center justify-center gap-2 px-9 py-4 rounded-3xl bg-[#68B96B] hover:bg-[#24652A] text-[#FFFDF5] font-extrabold text-lg shadow-xl shadow-[#68B96B]/25 transition-all transform hover:-translate-y-1 hover:scale-105"
              >
                <span>get started</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/onboarding"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-3xl bg-[#DDD5FF] hover:bg-[#DDD5FF]/80 text-[#24652A] font-bold text-base shadow-sm transition-all"
              >
                <span>take a quick tour</span>
              </Link>
            </div>

            <div className="flex items-center gap-6 pt-4 text-xs font-bold text-[#24652A]/70 uppercase tracking-wider">
              <div className="flex items-center gap-2 bg-[#EAF5EA] px-3.5 py-2 rounded-2xl border border-[#A8D3A8]/50">
                <Smile className="w-4 h-4 text-[#68B96B]" />
                <span>no account required</span>
              </div>
              <div className="flex items-center gap-2 bg-[#FFD8C8]/60 px-3.5 py-2 rounded-2xl border border-[#FFD8C8]">
                <Heart className="w-4 h-4 text-rose-500" />
                <span>100% cozy & free</span>
              </div>
            </div>
          </div>

          {/* Right Scrapbook / Polaroid Composition */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            {/* Decorative background blotches */}
            <div className="absolute w-72 h-72 rounded-full bg-[#FFE99A]/60 blur-2xl -top-10 -left-10 pointer-events-none" />
            <div className="absolute w-64 h-64 rounded-full bg-[#DDD5FF]/50 blur-2xl -bottom-10 -right-10 pointer-events-none" />

            <div className="relative w-full max-w-sm animate-float">
              {/* Floating Sticker 1 */}
              <div className="absolute -top-6 -left-6 bg-[#FFD8C8] text-[#24652A] font-black text-xs px-3.5 py-2 rounded-2xl shadow-md rotate-[-8deg] z-20 border border-white">
                📸 snap & vibe!
              </div>
              {/* Floating Sticker 2 */}
              <div className="absolute -bottom-4 -right-4 bg-[#FFE99A] text-[#24652A] font-black text-xs px-3.5 py-2 rounded-2xl shadow-md rotate-[10deg] z-20 border border-white">
                ✨ #softgreenday
              </div>

              {/* Main Photostrip / Scrapboard Frame */}
              <div className="bg-[#FFFDF5] p-5 rounded-[2.5rem] shadow-2xl border-4 border-[#A8D3A8]/50 rotate-2 space-y-4">
                <div className="text-center font-black tracking-widest text-xs text-[#24652A]/60 pb-2 border-b-2 border-dashed border-[#A8D3A8]">
                  VIRTUU BOOTH • 2026.03.21
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-md border-2 border-emerald-100 relative group">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80"
                      alt="Sample 1"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-md border-2 border-emerald-100 relative group">
                    <img
                      src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80"
                      alt="Sample 2"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>

                <div className="bg-[#EAF5EA] p-3 rounded-2xl text-center">
                  <span className="text-xs font-extrabold text-[#24652A] tracking-wide">
                    ✨ make moments, not just photos
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Main Experiences Section with Pastel Accent Colors */}
      <section className="py-24 bg-[#EAF5EA]/50 border-y-2 border-[#A8D3A8]/30 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="bg-[#FFE99A] text-[#24652A] font-extrabold text-xs px-4 py-1.5 rounded-full uppercase tracking-widest shadow-xs">
              curated experiences
            </span>
            <h2 className="text-4xl font-black text-[#185522]">choose your vibe</h2>
            <p className="text-[#24652A]/80 font-medium">
              Four distinct ways to capture memories, packed with playful stickers, frames, and pastel aesthetics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Card 1: PHOTO (Soft Green) */}
            <div className="bg-[#FFFDF5] p-8 rounded-[2.5rem] border-3 border-[#A8D3A8]/60 shadow-lg hover:shadow-xl hover:-translate-y-1.5 transition-all flex flex-col justify-between group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#EAF5EA] rounded-bl-[4rem] -z-0" />
              <div className="space-y-6 relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-[#EAF5EA] flex items-center justify-center text-[#24652A] shadow-inner group-hover:rotate-12 transition-transform">
                  <Camera className="w-7 h-7 text-[#68B96B]" />
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#68B96B] bg-[#EAF5EA] px-2.5 py-1 rounded-full">
                    solo & filters
                  </span>
                  <h3 className="text-2xl font-black text-[#185522]">Photo</h3>
                  <p className="text-sm text-[#24652A]/75 font-medium leading-relaxed">
                    take a photo your way with curated retro filters, frames, and instant lighting.
                  </p>
                </div>
              </div>
              <div className="pt-8 relative z-10">
                <Link
                  href="/home/photo"
                  className="inline-flex items-center gap-2 text-sm font-extrabold text-[#68B96B] hover:text-[#24652A] group-hover:translate-x-1 transition-all"
                >
                  <span>try photo mode</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Card 2: PHOTOBOOTH (Soft Peach) */}
            <div className="bg-[#FFFDF5] p-8 rounded-[2.5rem] border-3 border-[#FFD8C8] shadow-lg hover:shadow-xl hover:-translate-y-1.5 transition-all flex flex-col justify-between group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#FFD8C8]/40 rounded-bl-[4rem] -z-0" />
              <div className="space-y-6 relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-[#FFD8C8]/60 flex items-center justify-center text-[#24652A] shadow-inner group-hover:rotate-12 transition-transform">
                  <Film className="w-7 h-7 text-[#24652A]" />
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#24652A] bg-[#FFD8C8]/60 px-2.5 py-1 rounded-full">
                    strip templates
                  </span>
                  <h3 className="text-2xl font-black text-[#185522]">Photobooth</h3>
                  <p className="text-sm text-[#24652A]/75 font-medium leading-relaxed">
                    classic booth vibes right in your browser. Create multi-shot photo strips instantly.
                  </p>
                </div>
              </div>
              <div className="pt-8 relative z-10">
                <Link
                  href="/home/photobooth"
                  className="inline-flex items-center gap-2 text-sm font-extrabold text-[#24652A] group-hover:translate-x-1 transition-all"
                >
                  <span>open booth strip</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Card 3: VIRTUAL BOOTH (Lavender) */}
            <div className="bg-[#FFFDF5] p-8 rounded-[2.5rem] border-3 border-[#DDD5FF] shadow-lg hover:shadow-xl hover:-translate-y-1.5 transition-all flex flex-col justify-between group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#DDD5FF]/40 rounded-bl-[4rem] -z-0" />
              <div className="space-y-6 relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-[#DDD5FF]/60 flex items-center justify-center text-[#24652A] shadow-inner group-hover:rotate-12 transition-transform">
                  <Users className="w-7 h-7 text-[#24652A]" />
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#24652A] bg-[#DDD5FF]/60 px-2.5 py-1 rounded-full">
                    together apart
                  </span>
                  <h3 className="text-2xl font-black text-[#185522]">Virtual Booth</h3>
                  <p className="text-sm text-[#24652A]/75 font-medium leading-relaxed">
                    make moments together, even when you&apos;re apart. Take synchronized shots remotely.
                  </p>
                </div>
              </div>
              <div className="pt-8 relative z-10">
                <Link
                  href="/home/virtual-booth"
                  className="inline-flex items-center gap-2 text-sm font-extrabold text-[#24652A] group-hover:translate-x-1 transition-all"
                >
                  <span>join virtual room</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Card 4: DAILY BOOTH (Soft Yellow) */}
            <div className="bg-[#FFFDF5] p-8 rounded-[2.5rem] border-3 border-[#FFE99A] shadow-lg hover:shadow-xl hover:-translate-y-1.5 transition-all flex flex-col justify-between group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#FFE99A]/40 rounded-bl-[4rem] -z-0" />
              <div className="space-y-6 relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-[#FFE99A]/60 flex items-center justify-center text-[#24652A] shadow-inner group-hover:rotate-12 transition-transform">
                  <CalendarDays className="w-7 h-7 text-[#24652A]" />
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#24652A] bg-[#FFE99A]/60 px-2.5 py-1 rounded-full">
                    daily drop
                  </span>
                  <h3 className="text-2xl font-black text-[#185522]">Daily Booth</h3>
                  <p className="text-sm text-[#24652A]/75 font-medium leading-relaxed">
                    a new little photo moment every day with fresh daily templates and collectible themes.
                  </p>
                </div>
              </div>
              <div className="pt-8 relative z-10">
                <Link
                  href="/daily-booth"
                  className="inline-flex items-center gap-2 text-sm font-extrabold text-[#24652A] group-hover:translate-x-1 transition-all"
                >
                  <span>view today&apos;s drop</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 bg-[#24652A] text-[#FFFDF5] text-center px-4 rounded-t-[3.5rem] mx-4 sm:mx-8 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#68B96B_1px,transparent_1px)] [background-size:16px_16px] opacity-15" />
        
        <div className="max-w-3xl mx-auto space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#68B96B] text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider">
            ✨ ready for your close-up?
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight">ready to make some moments?</h2>
          <p className="text-[#A8D3A8] text-lg font-medium">
            No downloads required. Open your camera and start creating today.
          </p>
          <div>
            <Link
              href="/home"
              className="inline-flex items-center gap-2 px-10 py-5 rounded-3xl bg-[#68B96B] hover:bg-[#FFFDF5] hover:text-[#24652A] text-white font-extrabold text-lg transition-all transform hover:scale-105 shadow-xl"
            >
              <span>launch virtuu booth</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
