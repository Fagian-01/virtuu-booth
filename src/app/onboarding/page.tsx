'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Camera, Sparkles, Users, ArrowRight, ArrowLeft } from 'lucide-react';

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      router.push('/home');
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF5] flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8">
      {/* Top Bar */}
      <div className="max-w-md mx-auto w-full flex items-center justify-between">
        <span className="font-bold text-xl tracking-tight text-[#24652A]">
          virtuu <span className="text-[#68B96B]">booth</span>
        </span>
        <div className="flex items-center gap-1.5">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-2 rounded-full transition-all duration-300 ${
                s === step ? 'w-8 bg-[#68B96B]' : 'w-2 bg-[#A8D3A8]/40'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-md mx-auto w-full text-center space-y-8 my-auto py-8">
        {step === 1 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="w-24 h-24 rounded-3xl bg-[#EAF5EA] border-2 border-[#A8D3A8]/60 flex items-center justify-center mx-auto text-[#24652A] shadow-lg">
              <Camera className="w-12 h-12" />
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-extrabold text-[#185522]">
                welcome to virtuu booth
              </h1>
              <p className="text-base text-[#24652A]/70 px-4">
                your little virtual photo space for making spontaneous memories and timeless strips.
              </p>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="w-24 h-24 rounded-3xl bg-[#EAF5EA] border-2 border-[#A8D3A8]/60 flex items-center justify-center mx-auto text-[#24652A] shadow-lg">
              <Sparkles className="w-12 h-12 text-[#68B96B]" />
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-extrabold text-[#185522]">
                take it your way
              </h1>
              <p className="text-base text-[#24652A]/70 px-4">
                photos, cozy filters, cute frames, and classic photobooth strips right in your browser.
              </p>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="w-24 h-24 rounded-3xl bg-[#EAF5EA] border-2 border-[#A8D3A8]/60 flex items-center justify-center mx-auto text-[#24652A] shadow-lg">
              <Users className="w-12 h-12 text-[#68B96B]" />
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-extrabold text-[#185522]">
                make moments together
              </h1>
              <p className="text-base text-[#24652A]/70 px-4">
                connect with friends in virtual rooms to take synced photos even when you&apos;re apart.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="max-w-md mx-auto w-full space-y-3">
        <button
          onClick={handleNext}
          className="w-full py-4 rounded-2xl bg-[#68B96B] hover:bg-[#24652A] text-[#FFFDF5] font-semibold text-lg shadow-lg shadow-[#68B96B]/20 transition-all flex items-center justify-center gap-2"
        >
          <span>{step === 3 ? 'start creating' : 'continue'}</span>
          <ArrowRight className="w-5 h-5" />
        </button>

        {step > 1 ? (
          <button
            onClick={handlePrev}
            className="w-full py-3 rounded-2xl bg-transparent hover:bg-[#EAF5EA] text-[#24652A] font-medium text-sm transition-colors flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>back</span>
          </button>
        ) : (
          <button
            onClick={() => router.push('/home')}
            className="w-full py-3 rounded-2xl bg-transparent hover:bg-[#EAF5EA] text-[#24652A]/60 hover:text-[#24652A] font-medium text-sm transition-colors"
          >
            skip tour
          </button>
        )}
      </div>
    </div>
  );
}
