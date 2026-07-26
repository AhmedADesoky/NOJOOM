'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { use_Auth_Context } from '@/contexts/Auth_Context';

export default function Signup_Page() {
  const [Name, set_Name]             = useState('');
  const [Email, set_Email]           = useState('');
  const [Phone, set_Phone]           = useState('');
  const [Password, set_Password]     = useState('');
  const [Show_Password, set_Show_Pw] = useState(false);
  const [Error, set_Error]           = useState('');
  const [Is_Loading, set_Is_Loading] = useState(false);
  const { Signup, User } = use_Auth_Context();
  const Router = useRouter();

  useEffect(() => {
    if (User) Router.replace('/profile');
  }, [User, Router]);

  const Handle_Submit = (e: React.FormEvent) => {
    e.preventDefault();
    set_Error('');
    set_Is_Loading(true);
    const Result = Signup(Name, Email, Password, Phone);
    if (Result.Success) {
      Router.push('/profile');
    } else {
      set_Error(Result.Error || 'Could not create account. Please try again.');
      set_Is_Loading(false);
    }
  };

  /* Shared input class */
  const Input_Class = `w-full px-4 py-3 rounded-xl bg-Surface
    border border-Border_Light text-Ink font-Body text-sm
    outline-none focus:border-Ink focus:bg-Primary_White
    transition-all placeholder:text-Muted/50`;

  return (
    <div className="min-h-screen flex flex-col"
      style={{ background: 'linear-gradient(160deg, #F2EBEE 0%, #FAF6F7 60%)' }}>

      {/* ── Logo only — no full navbar ──────────────────────────── */}
      <div className="flex items-center justify-center pt-10 pb-2">
        <Link href="/" className="text-center leading-none">
          <div className="font-Display text-3xl text-Ink">نجوم</div>
          <div className="font-Body text-[9px] tracking-[0.4em] text-Muted mt-0.5">
            NOJOOM
          </div>
        </Link>
      </div>

      {/* ── Form ─────────────────────────────────────────────────── */}
      <main className="flex-1 flex items-center justify-center px-6 py-8">
        <div className="w-full max-w-sm">

          {/* Heading */}
          <div className="text-center mb-8">
            <h1 className="font-Display text-4xl text-Ink mb-2">
              Create Account
            </h1>
            <p className="font-Body text-sm text-Muted">
              Join Nojoom — it only takes a minute
            </p>
          </div>

          {/* Card */}
          <div className="bg-Primary_White rounded-2xl shadow-sm
            border border-Border_Light p-8 space-y-5">

            {/* Error */}
            {Error && (
              <div className="flex items-start gap-3 bg-Blush_Light border
                border-Brand_Pink/20 rounded-xl px-4 py-3">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="1.5"
                  className="text-Rose_Dark flex-shrink-0 mt-0.5">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                <p className="font-Body text-xs text-Rose_Dark">{Error}</p>
              </div>
            )}

            {/* Full name */}
            <div className="space-y-1.5">
              <label className="block font-Body text-xs tracking-[0.1em]
                uppercase text-Ink">Full Name</label>
              <input type="text" value={Name} required
                onChange={(e) => set_Name(e.target.value)}
                placeholder="Your full name"
                className={Input_Class} />
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="block font-Body text-xs tracking-[0.1em]
                uppercase text-Ink">Email address</label>
              <input type="email" value={Email} required
                onChange={(e) => set_Email(e.target.value)}
                placeholder="Enter your email"
                className={Input_Class} />
              <p className="font-Body text-xs text-Muted pl-1">
                We'll send your order updates here
              </p>
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
              <label className="block font-Body text-xs tracking-[0.1em]
                uppercase text-Ink">Phone number</label>
              <input type="tel" value={Phone} required
                onChange={(e) => set_Phone(e.target.value)}
                placeholder="+20 1xx xxx xxxx"
                className={Input_Class} />
              <p className="font-Body text-xs text-Muted pl-1">
                For delivery coordination
              </p>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="block font-Body text-xs tracking-[0.1em]
                uppercase text-Ink">Password</label>
              <div className="relative">
                <input
                  type={Show_Password ? 'text' : 'password'}
                  value={Password} required minLength={6}
                  onChange={(e) => set_Password(e.target.value)}
                  placeholder="Create a password"
                  className={`${Input_Class} pr-11`} />
                <button type="button"
                  onClick={() => set_Show_Pw((p) => !p)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2
                    text-Muted hover:text-Ink transition-colors"
                  aria-label={Show_Password ? 'Hide password' : 'Show password'}>
                  {Show_Password ? (
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="1.5">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="1.5">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
              <p className="font-Body text-xs text-Muted pl-1">
                Minimum 6 characters
              </p>
            </div>

            {/* Submit */}
            <button type="submit"
              onClick={Handle_Submit}
              disabled={Is_Loading}
              className="w-full py-3.5 bg-Ink text-white rounded-full
                font-Body text-xs tracking-[0.2em] uppercase mt-2
                hover:opacity-80 active:scale-[0.98] transition-all
                disabled:opacity-50 disabled:cursor-not-allowed">
              {Is_Loading ? 'Creating account…' : 'Create Account'}
            </button>
          </div>

          {/* Switch to login */}
          <p className="font-Body text-sm text-Muted text-center mt-6">
            Already have an account?{' '}
            <Link href="/login"
              className="text-Ink font-semibold hover:text-Brand_Pink transition-colors">
              Sign in
            </Link>
          </p>

          {/* Back to shop */}
          <div className="text-center mt-4">
            <Link href="/"
              className="inline-flex items-center gap-1.5 font-Body text-xs
                text-Muted hover:text-Ink transition-colors">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="1.5">
                <line x1="19" y1="12" x2="5" y2="12"/>
                <polyline points="12 19 5 12 12 5"/>
              </svg>
              Back to shop
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}