'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

const CATEGORIES = [
  { name: 'Bengals Jungle', href: '/category/bengals-jungle', desc: 'Deep dives, previews & roster moves' },
  { name: 'AFC North', href: '/category/afc-north', desc: 'Rivalry coverage across the division' },
  { name: 'Around the NFL', href: '/category/around-the-nfl', desc: 'League-wide storylines & reactions' },
  { name: 'Fan Gear', href: '/category/fan-gear', desc: 'Buying guides & cold-weather stadium tips' },
  { name: 'The Fan Lounge', href: '/category/the-fan-lounge', desc: 'Unfiltered takes & tailgate debates' },
];

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState<'categories' | 'policies' | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (menu: 'categories' | 'policies') => {
    setOpenDropdown((prev) => (prev === menu ? null : menu));
  };

  return (
    <header ref={navRef} className="bg-[#0b0f19] border-b border-slate-800 text-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          onClick={() => {
            setOpenDropdown(null);
            setMobileOpen(false);
          }}
          className="text-xl font-black tracking-tight flex items-center gap-1.5"
        >
          <span className="text-[#FB4F14]">Havoc</span>
          <span className="text-white">Shift</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7">
          <Link
            href="/"
            className="text-sm font-bold text-slate-200 hover:text-[#FB4F14] transition-colors"
          >
            Home
          </Link>

          {/* Categories Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleDropdown('categories')}
              aria-expanded={openDropdown === 'categories'}
              className="flex items-center gap-1.5 text-sm font-bold text-slate-200 hover:text-[#FB4F14] transition-colors cursor-pointer"
            >
              <span>Articles &amp; Beats</span>
              <span
                className={`text-[10px] transition-transform duration-150 ${
                  openDropdown === 'categories' ? 'rotate-180 text-[#FB4F14]' : ''
                }`}
              >
                ▼
              </span>
            </button>

            {openDropdown === 'categories' && (
              <div className="absolute left-0 mt-3 w-72 bg-[#111827] border border-slate-700/80 rounded-xl shadow-2xl py-2 z-50">
                <div className="px-4 py-1.5 border-b border-slate-800">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    Coverage Sections
                  </span>
                </div>

                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.name}
                    href={cat.href}
                    onClick={() => setOpenDropdown(null)}
                    className="block px-4 py-2.5 hover:bg-slate-800/80 transition-colors group"
                  >
                    <p className="text-xs font-bold text-white group-hover:text-[#FB4F14] transition-colors">
                      {cat.name}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{cat.desc}</p>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/about"
            className="text-sm font-bold text-slate-200 hover:text-[#FB4F14] transition-colors"
          >
            About
          </Link>

          {/* Policies & Info Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleDropdown('policies')}
              aria-expanded={openDropdown === 'policies'}
              className="flex items-center gap-1.5 text-sm font-bold text-slate-200 hover:text-[#FB4F14] transition-colors cursor-pointer"
            >
              <span>Policies</span>
              <span
                className={`text-[10px] transition-transform duration-150 ${
                  openDropdown === 'policies' ? 'rotate-180 text-[#FB4F14]' : ''
                }`}
              >
                ▼
              </span>
            </button>

            {openDropdown === 'policies' && (
              <div className="absolute right-0 mt-3 w-56 bg-[#111827] border border-slate-700/80 rounded-xl shadow-2xl py-2 z-50">
                <div className="px-3.5 py-1.5 border-b border-slate-800">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    Transparency &amp; Legal
                  </span>
                </div>

                <Link
                  href="/affiliate-disclosure"
                  onClick={() => setOpenDropdown(null)}
                  className="block px-3.5 py-2.5 text-xs font-bold text-slate-200 hover:bg-slate-800 hover:text-[#FB4F14] transition-colors"
                >
                  Affiliate Disclosure
                </Link>

                <Link
                  href="/privacy"
                  onClick={() => setOpenDropdown(null)}
                  className="block px-3.5 py-2.5 text-xs font-bold text-slate-200 hover:bg-slate-800 hover:text-[#FB4F14] transition-colors"
                >
                  Privacy Policy
                </Link>

                <Link
                  href="/terms"
                  onClick={() => setOpenDropdown(null)}
                  className="block px-3.5 py-2.5 text-xs font-bold text-slate-200 hover:bg-slate-800 hover:text-[#FB4F14] transition-colors"
                >
                  Terms of Service
                </Link>

                <div className="border-t border-slate-800 mt-1 pt-1">
                  <Link
                    href="/contact"
                    onClick={() => setOpenDropdown(null)}
                    className="block px-3.5 py-2 text-xs font-bold text-slate-300 hover:bg-slate-800 hover:text-[#FB4F14] transition-colors"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Toggle Menu"
          className="md:hidden text-slate-200 hover:text-[#FB4F14] p-2 text-sm font-bold"
        >
          {mobileOpen ? '✕ Close' : '☰ Menu'}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-[#111827] border-t border-slate-800 px-4 py-4 space-y-4">
          <div className="space-y-2">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="block text-sm font-bold text-white hover:text-[#FB4F14]"
            >
              Home
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileOpen(false)}
              className="block text-sm font-bold text-white hover:text-[#FB4F14]"
            >
              About
            </Link>
          </div>

          <div className="border-t border-slate-800 pt-3">
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-2">
              Articles &amp; Beats
            </p>
            <div className="grid grid-cols-1 gap-2">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.name}
                  href={cat.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-xs font-bold text-slate-200 hover:text-[#FB4F14]"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-800 pt-3">
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-2">
              Transparency &amp; Legal
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-slate-300">
              <Link href="/affiliate-disclosure" onClick={() => setMobileOpen(false)}>
                Affiliate Disclosure
              </Link>
              <Link href="/privacy" onClick={() => setMobileOpen(false)}>
                Privacy Policy
              </Link>
              <Link href="/terms" onClick={() => setMobileOpen(false)}>
                Terms of Service
              </Link>
              <Link href="/contact" onClick={() => setMobileOpen(false)}>
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}