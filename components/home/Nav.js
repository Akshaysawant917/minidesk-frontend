'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-app/80 backdrop-blur-md border-b border-app">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center transition-transform group-hover:scale-105">
              <span className="text-secondary text-lg font-bold">M</span>
            </div>
            <span className="text-xl font-semibold text-primary">MiniDesk</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-app hover:text-primary transition-colors">
              Features
            </Link>
            <Link href="#philosophy" className="text-app hover:text-primary transition-colors">
              Philosophy
            </Link>
            <Link href="#pricing" className="text-app hover:text-primary transition-colors">
              Pricing
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link 
              href="/login" 
              className="text-app hover:text-primary transition-colors"
            >
              Sign In
            </Link>
            <Link 
              href="/signup" 
              className="px-6 py-2 bg-primary text-secondary rounded-lg hover:opacity-90 transition-opacity"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-app"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-app pt-4">
            <div className="flex flex-col gap-4">
              <Link 
                href="#features" 
                className="text-app hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </Link>
              <Link 
                href="#philosophy" 
                className="text-app hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Philosophy
              </Link>
              <Link 
                href="#pricing" 
                className="text-app hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
              <div className="flex flex-col gap-2 mt-2">
                <Link 
                  href="/login" 
                  className="px-6 py-2 text-center text-app hover:text-primary transition-colors"
                >
                  Sign In
                </Link>
                <Link 
                  href="/signup" 
                  className="px-6 py-2 bg-primary text-app rounded-lg hover:opacity-90 transition-opacity text-center"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}