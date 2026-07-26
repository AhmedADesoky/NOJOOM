'use client';

import Link from 'next/link';
import { use_Auth_Context } from '@/contexts/Auth_Context';

export const Icon_Profile = () => {
  const { User } = use_Auth_Context();

  const Initials = User
    ? User.Name.split(' ')
        .map((Part) => Part[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : null;

  const Href = User ? '/profile' : '/login';

  return (
    <Link
      href={Href}
      className="p-1 hover:opacity-80 transition-opacity"
      aria-label={User ? 'Profile' : 'Login'}
    >
      {User && Initials ? (
        <div className="w-8 h-8 rounded-full bg-Ink text-Primary_White flex items-center justify-center font-Body text-xs font-semibold">
          {Initials}
        </div>
      ) : (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-Ink"
        >
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20c0-4 3.5-7 8-7s8 3 8 7" />
        </svg>
      )}
    </Link>
  );
};
