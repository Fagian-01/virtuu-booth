'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Camera, Sparkles, Users, Calendar, Image as ImageIcon, User, Menu, X, Heart, Star } from 'lucide-react';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#FFFDF5]/85 backdrop-blur-md border-b border-[#A8D3A8]/40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-2xl bg-[#68B96B] flex items-center justify-center text-[#FFFDF5] shadow-md group-hover:rotate-6 transition-transform">
            <Camera className="w-5 h-5" />
          </div>
          <span className="font-extrabold text-2xl tracking-tight text-[#24652A]">
            virtuu <span className="text-[#68B96B] font-light">booth</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2 bg-[#EAF5EA]/60 px-4 py-2 rounded-full border border-[#A8D3A8]/50 shadow-xs">
          <Link href="/" className="px-4 py-1.5 rounded-full text-sm font-semibold text-[#24652A] hover:bg-[#FFFDF5] transition-all">
            Home
          </Link>
          <Link href="/home" className="px-4 py-1.5 rounded-full text-sm font-semibold text-[#24652A]/80 hover:text-[#24652A] hover:bg-[#FFFDF5] transition-all">
            Booth
          </Link>
          <Link href="/memories" className="px-4 py-1.5 rounded-full text-sm font-semibold text-[#24652A]/80 hover:text-[#24652A] hover:bg-[#FFFDF5] transition-all">
            Memories
          </Link>
          <Link href="/daily-booth" className="px-4 py-1.5 rounded-full text-sm font-semibold text-[#24652A]/80 hover:text-[#24652A] hover:bg-[#FFFDF5] transition-all flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#68B96B]" />
            Daily
          </Link>
          <Link href="/about" className="px-4 py-1.5 rounded-full text-sm font-semibold text-[#24652A]/80 hover:text-[#24652A] hover:bg-[#FFFDF5] transition-all">
            About
          </Link>
        </nav>

        {/* Right Actions / Profile */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/profile"
            className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#FFD8C8]/70 text-[#24652A] border border-[#FFD8C8] hover:scale-105 transition-all text-sm font-bold shadow-xs"
          >
            <User className="w-4 h-4" />
            <span>Profile</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2.5 rounded-2xl bg-[#EAF5EA] text-[#24652A] hover:bg-[#A8D3A8]/30 transition-colors"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FFFDF5] border-b border-[#A8D3A8]/40 px-6 py-6 space-y-4 shadow-xl">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-3 rounded-2xl text-base font-bold text-[#24652A] bg-[#EAF5EA]/50 hover:bg-[#EAF5EA]"
          >
            Home
          </Link>
          <Link
            href="/home"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-3 rounded-2xl text-base font-bold text-[#24652A] bg-[#EAF5EA]/50 hover:bg-[#EAF5EA]"
          >
            Booth Menu
          </Link>
          <Link
            href="/memories"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-3 rounded-2xl text-base font-bold text-[#24652A] bg-[#EAF5EA]/50 hover:bg-[#EAF5EA]"
          >
            Memories
          </Link>
          <Link
            href="/daily-booth"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-3 rounded-2xl text-base font-bold text-[#24652A] bg-[#EAF5EA]/50 hover:bg-[#EAF5EA]"
          >
            Daily Booth
          </Link>
          <Link
            href="/profile"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-3 rounded-2xl text-base font-bold text-[#24652A] bg-[#FFD8C8]/60 hover:bg-[#FFD8C8]"
          >
            Profile
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-3 rounded-2xl text-base font-bold text-[#24652A] bg-[#EAF5EA]/50 hover:bg-[#EAF5EA]"
          >
            About
          </Link>
        </div>
      )}
    </header>
  );
}
