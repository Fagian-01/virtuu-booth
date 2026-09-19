'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Users, ArrowLeft, Copy, Check, Mic, MicOff, Camera, Sparkles } from 'lucide-react';

export default function VirtualBoothPage() {
  const [mode, setMode] = useState<'choose' | 'create' | 'join' | 'waiting' | 'shooting'>('choose');
  const [roomCode, setRoomCode] = useState('');
  const [inputCode, setInputCode] = useState('');
  const [micOn, setMicOn] = useState(true);
  const [selectedVibe, setSelectedVibe] = useState('soft');
  const [copied, setCopied] = useState(false);

  const handleCreateRoom = () => {
    const randomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    setRoomCode(randomCode);
    setMode('waiting');
  };

  const handleJoinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCode.trim()) {
      setRoomCode(inputCode.trim().toUpperCase());
      setMode('waiting');
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(roomCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const vibes = [
    { id: 'soft', name: '✨ Soft & Cozy' },
    { id: 'cute', name: '🌸 Cute & Sweet' },
    { id: 'silly', name: '🤪 Silly & Fun' },
    { id: 'cool', name: '🕶️ Cool & Chill' },
  ];

  const poseSuggestions = [
    'Matching head tilt',
    'Funny face close-up',
    'Peace sign by cheek',
    'Look at each other and laugh',
  ];

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
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#DDD5FF] text-[#24652A] text-xs font-black uppercase tracking-wider shadow-xs">
          <Users className="w-3.5 h-3.5 text-[#24652A]" />
          <span>virtual booth (together apart)</span>
        </div>
      </div>

      {mode === 'choose' && (
        <div className="max-w-xl mx-auto text-center space-y-8 py-8">
          <div className="space-y-3">
            <span className="bg-[#DDD5FF] text-[#24652A] font-extrabold text-xs px-4 py-1.5 rounded-full uppercase tracking-widest">
              synchronized rooms
            </span>
            <h1 className="text-4xl font-black text-[#185522]">make moments together</h1>
            <p className="text-[#24652A]/80 text-base font-medium">
              Connect with a friend remotely. Create a room or join an existing session to take synchronized photos together.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <button
              onClick={handleCreateRoom}
              className="p-8 rounded-[2.5rem] bg-[#EAF5EA] hover:bg-[#68B96B] hover:text-white text-[#24652A] border-3 border-[#A8D3A8]/60 transition-all shadow-md space-y-4 text-center group hover:scale-105"
            >
              <Users className="w-10 h-10 mx-auto text-[#68B96B] group-hover:text-white" />
              <div className="font-black text-xl">Create Booth</div>
              <p className="text-xs opacity-85 font-medium">Generate a unique room code to invite a friend.</p>
            </button>

            <button
              onClick={() => setMode('join')}
              className="p-8 rounded-[2.5rem] bg-[#DDD5FF]/60 hover:bg-[#DDD5FF] text-[#24652A] border-3 border-[#DDD5FF] transition-all shadow-md space-y-4 text-center group hover:scale-105"
            >
              <Sparkles className="w-10 h-10 mx-auto text-[#24652A]" />
              <div className="font-black text-xl">Join Booth</div>
              <p className="text-xs opacity-85 font-medium">Enter a 6-character room code from your partner.</p>
            </button>
          </div>
        </div>
      )}

      {mode === 'join' && (
        <div className="max-w-md mx-auto bg-[#DDD5FF]/40 p-8 rounded-[2.5rem] border-2 border-[#DDD5FF] shadow-xl space-y-6">
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-black text-[#185522]">join virtual room</h2>
            <p className="text-sm text-[#24652A]/80 font-medium">Enter the room code shared by your friend.</p>
          </div>

          <form onSubmit={handleJoinRoom} className="space-y-4">
            <input
              type="text"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              placeholder="e.g. VIRTUU"
              maxLength={6}
              required
              className="w-full text-center tracking-widest uppercase text-2xl font-black px-4 py-4 rounded-2xl bg-[#FFFDF5] border-2 border-[#A8D3A8]/60 text-[#24652A] focus:outline-none focus:border-[#68B96B] shadow-inner"
            />
            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-[#68B96B] hover:bg-[#24652A] text-white font-black text-base shadow-lg transition-colors hover:scale-[1.02]"
            >
              Enter Waiting Room
            </button>
          </form>

          <button
            onClick={() => setMode('choose')}
            className="w-full text-center text-sm font-bold text-[#24652A]/70 hover:text-[#24652A]"
          >
            ← Back to choices
          </button>
        </div>
      )}

      {mode === 'waiting' && (
        <div className="max-w-2xl mx-auto bg-[#DDD5FF]/30 p-8 sm:p-10 rounded-[3rem] border-3 border-[#DDD5FF] shadow-2xl space-y-8">
          <div className="text-center space-y-3">
            <span className="text-xs font-black uppercase tracking-wider text-[#24652A] bg-[#FFFDF5] px-4 py-1.5 rounded-full border border-[#A8D3A8]/50 shadow-xs">
              Virtual Room Connected ✨
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#185522]">room code: {roomCode}</h2>
            <p className="text-sm text-[#24652A]/80 font-medium">
              Share this code with your partner so they can join you in the booth.
            </p>
          </div>

          {/* Code Sharing Action */}
          <div className="flex items-center justify-between bg-[#FFFDF5] p-5 rounded-2xl border-2 border-[#A8D3A8]/50 shadow-sm">
            <span className="font-mono font-black text-xl text-[#24652A] tracking-wider">{roomCode}</span>
            <button
              onClick={handleCopyCode}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#68B96B] text-white text-xs font-black uppercase tracking-wider hover:bg-emerald-600 transition-colors shadow"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied!' : 'Copy Code'}</span>
            </button>
          </div>

          {/* Participants preview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="bg-[#FFFDF5] p-6 rounded-[2rem] border-2 border-[#A8D3A8]/60 space-y-3 text-center shadow-md">
              <div className="w-20 h-20 rounded-full bg-emerald-100 mx-auto overflow-hidden border-3 border-[#68B96B] shadow-inner">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80"
                  alt="You"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-black text-lg text-[#185522]">You (Host)</h4>
                <p className="text-xs font-bold text-[#68B96B]">Connected & Ready</p>
              </div>
            </div>

            <div className="bg-[#FFFDF5] p-6 rounded-[2rem] border-2 border-[#A8D3A8]/60 space-y-3 text-center shadow-md relative">
              <div className="w-20 h-20 rounded-full bg-emerald-100 mx-auto overflow-hidden border-3 border-[#FFD8C8] shadow-inner">
                <img
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80"
                  alt="Partner"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-black text-lg text-[#185522]">Partner</h4>
                <p className="text-xs font-bold text-[#24652A]/70">Connected (Alex)</p>
              </div>
            </div>
          </div>

          {/* Vibe & Mic Settings */}
          <div className="space-y-4 pt-2">
            <h3 className="text-xs font-black text-[#185522] uppercase tracking-wider">Choose Booth Vibe</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {vibes.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setSelectedVibe(v.id)}
                  className={`p-3.5 rounded-2xl text-xs font-extrabold border-2 transition-all ${
                    selectedVibe === v.id
                      ? 'bg-[#68B96B] text-white border-[#68B96B] shadow-md scale-105'
                      : 'bg-[#FFFDF5] text-[#24652A] border-[#A8D3A8]/50 hover:bg-white'
                  }`}
                >
                  {v.name}
                </button>
              ))}
            </div>
          </div>

          {/* Controls Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t-2 border-dashed border-[#A8D3A8]/50">
            <button
              onClick={() => setMicOn(!micOn)}
              className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl border-2 text-xs font-black tracking-wide transition-colors ${
                micOn
                  ? 'bg-[#FFFDF5] text-[#24652A] border-[#A8D3A8]'
                  : 'bg-red-50 text-red-600 border-red-200'
              }`}
            >
              {micOn ? <Mic className="w-4 h-4 text-[#68B96B]" /> : <MicOff className="w-4 h-4 text-red-500" />}
              <span>{micOn ? 'Microphone On' : 'Microphone Muted'}</span>
            </button>

            <button
              onClick={() => setMode('shooting')}
              className="w-full sm:w-auto px-9 py-4 rounded-2xl bg-[#68B96B] hover:bg-[#24652A] text-white font-black text-base shadow-xl shadow-[#68B96B]/20 transition-all flex items-center justify-center gap-2 hover:scale-105"
            >
              <Camera className="w-5 h-5" />
              <span>Start Joint Photo</span>
            </button>
          </div>
        </div>
      )}

      {mode === 'shooting' && (
        <div className="max-w-2xl mx-auto bg-[#EAF5EA]/70 p-8 rounded-[2.5rem] border-2 border-[#A8D3A8]/60 shadow-xl space-y-6 text-center">
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-[#24652A] bg-[#FFE99A] px-4 py-1 rounded-full shadow-xs">
              Live Joint Session • Vibe: {selectedVibe}
            </span>
            <h2 className="text-3xl font-black text-[#185522]">synchronized photo shoot</h2>
            <p className="text-sm text-[#24652A]/80 font-medium">
              Suggested pose: <span className="font-black text-[#185522]">{poseSuggestions[0]}</span>
            </p>
          </div>

          {/* Dual Camera Grid Mock */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-emerald-900 relative shadow-md border-3 border-white">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80"
                alt="You"
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-2 left-2 bg-black/60 text-white text-xs font-black px-2.5 py-1 rounded-xl backdrop-blur-sm">
                You
              </span>
            </div>
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-emerald-900 relative shadow-md border-3 border-white">
              <img
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80"
                alt="Partner"
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-2 left-2 bg-black/60 text-white text-xs font-black px-2.5 py-1 rounded-xl backdrop-blur-sm">
                Partner (Alex)
              </span>
            </div>
          </div>

          <div>
            <Link
              href="/memories"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-3xl bg-[#68B96B] hover:bg-[#24652A] text-white font-black text-base shadow-xl shadow-[#68B96B]/25 transition-all hover:scale-105"
            >
              <Camera className="w-5 h-5" />
              <span>Capture Combined Moment & Save</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
