'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-[#0b0f19] border-b border-slate-800 text-white sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="text-lg font-black tracking-tight flex items-center gap-1.5">
          <span className="text-[#FB4F14]">Havoc</span>
          <span className="text-white">Shift</span>
        </Link>

        {/* Right Navigation */}
        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-bold text-slate-200 hover:text-[#FB4F14] transition-colors"
          >
            Home
          </Link>

          {/* Policies Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-expanded={menuOpen}
              className="flex items-center gap-1.5 text-sm font-bold text-slate-200 hover:text-[#FB4F14] transition-colors cursor-pointer"
            >
              <span>Policies</span>
              <span className={`text-[10px] transition-transform duration-150 ${menuOpen ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-3 w-56 bg-[#111827] border border-slate-700/80 rounded-xl shadow-2xl py-2 z-50">
                <div className="px-3.5 py-1.5 border-b border-slate-800">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    Transparency & Legal
                  </span>
                </div>

                <Link
                  href="/affiliate-disclosure"
                  onClick={() => setMenuOpen(false)}
                  className="block px-3.5 py-2.5 text-xs font-bold text-slate-200 hover:bg-slate-800 hover:text-[#FB4F14] transition-colors"
                >
                  Affiliate Disclosure
                </Link>

                <Link
                  href="/privacy"
                  onClick={() => setMenuOpen(false)}
                  className="block px-3.5 py-2.5 text-xs font-bold text-slate-200 hover:bg-slate-800 hover:text-[#FB4F14] transition-colors"
                >
                  Privacy Policy
                </Link>

                <Link
                  href="/terms"
                  onClick={() => setMenuOpen(false)}
                  className="block px-3.5 py-2.5 text-xs font-bold text-slate-200 hover:bg-slate-800 hover:text-[#FB4F14] transition-colors"
                >
                  Terms of Service
                </Link>

                <div className="border-t border-slate-800 mt-1 pt-1">
                  <Link
                    href="/contact"
                    onClick={() => setMenuOpen(false)}
                    className="block px-3.5 py-2 text-xs font-bold text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}