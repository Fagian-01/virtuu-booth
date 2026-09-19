'use client';

import React from 'react';
import Link from 'next/link';
import { Camera, Sparkles, ArrowLeft } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FFFDF5] py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-12">
      {/* Top back */}
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-bold text-[#24652A] hover:text-[#68B96B] transition-colors bg-[#EAF5EA] px-4 py-2 rounded-2xl border border-[#A8D3A8]/50 shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>back to landing</span>
        </Link>
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#FFE99A] text-[#24652A] text-xs font-black uppercase tracking-wider shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#24652A]" />
          <span>about virtuu booth</span>
        </div>
      </div>

      {/* Hero Content */}
      <div className="space-y-6 text-center max-w-2xl mx-auto">
        <div className="w-24 h-24 rounded-[2rem] bg-[#FFD8C8] border-3 border-[#FFD8C8] flex items-center justify-center mx-auto text-[#24652A] shadow-xl rotate-3">
          <Camera className="w-12 h-12 text-[#24652A]" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-[#185522]">
          make moments, <span className="text-[#68B96B]">not just photos.</span>
        </h1>
        <p className="text-lg text-[#24652A]/85 leading-relaxed font-medium">
          <span className="font-black text-[#24652A]">virtuu booth</span> is a little virtual space designed for making and keeping photo moments. Built for cozy vibes, spontaneous laughs, and staying close with friends no matter the distance.
        </p>
      </div>

      {/* Philosophy Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-[#EAF5EA]/70 p-7 rounded-[2.5rem] border-3 border-[#A8D3A8]/50 space-y-3 shadow-md">
          <div className="w-10 h-10 rounded-2xl bg-[#68B96B] text-white flex items-center justify-center font-black text-sm">✨</div>
          <h3 className="font-black text-xl text-[#185522]">Cozy & Playful</h3>
          <p className="text-sm text-[#24652A]/80 font-medium leading-relaxed">
            No heavy corporate dashboards. Just soft mints, peaches, lavenders, and pure photo fun.
          </p>
        </div>

        <div className="bg-[#DDD5FF]/40 p-7 rounded-[2.5rem] border-3 border-[#DDD5FF] space-y-3 shadow-md">
          <div className="w-10 h-10 rounded-2xl bg-[#24652A] text-white flex items-center justify-center font-black text-sm">💖</div>
          <h3 className="font-black text-xl text-[#185522]">Together Apart</h3>
          <p className="text-sm text-[#24652A]/80 font-medium leading-relaxed">
            Our virtual rooms let you connect with loved ones to capture synchronized memories on the fly.
          </p>
        </div>

        <div className="bg-[#FFE99A]/40 p-7 rounded-[2.5rem] border-3 border-[#FFE99A] space-y-3 shadow-md">
          <div className="w-10 h-10 rounded-2xl bg-[#68B96B] text-white flex items-center justify-center font-black text-sm">🚀</div>
          <h3 className="font-black text-xl text-[#185522]">Browser Native</h3>
          <p className="text-sm text-[#24652A]/80 font-medium leading-relaxed">
            No downloads or complicated plugins required. Open your camera and start creating instantly.
          </p>
        </div>
      </div>

      {/* Footer Callout */}
      <div className="text-center py-12 bg-[#24652A] text-[#FFFDF5] rounded-[3rem] space-y-6 px-6 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#68B96B_1px,transparent_1px)] [background-size:16px_16px] opacity-15" />
        <h2 className="text-3xl font-black relative z-10">ready to jump in?</h2>
        <div className="relative z-10">
          <Link
            href="/home"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-3xl bg-[#68B96B] hover:bg-[#FFFDF5] hover:text-[#24652A] text-white font-black text-base transition-all shadow-xl hover:scale-105"
          >
            <span>Launch Booth Now</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
