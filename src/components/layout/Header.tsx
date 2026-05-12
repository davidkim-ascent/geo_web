"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="ui-header-shell fixed top-0 left-0 right-0 z-50">
      <div className="max-w-[1280px] mx-auto px-10 h-[70px] pt-[15px] pb-2.5 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <span className="w-[22px] h-[22px] rounded-full border-[1.5px] border-[#0B0B0E] flex items-center justify-center relative flex-shrink-0">
            <span className="w-[9px] h-[9px] rounded-full bg-[#1452FF] absolute" />
          </span>
          <span className="ui-header-brand">
            ASCENT<span className="text-[#1452FF]">/</span>GEO
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7">
          {[
            { label: "Why Ascent", href: "#why" },
            { label: "Framework", href: "#framework" },
            { label: "Services", href: "#services" },
            { label: "GEO Lab", href: "#lab" },
            { label: "Contact", href: "/contact" },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="ui-header-nav-link"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex">
          <Button asChild variant="header">
            <Link href="/contact">
              相談する
              <span className="ui-header-cta-arrow">→</span>
            </Link>
          </Button>
        </div>

        {/* Mobile hamburger */}
        <Button
          type="button"
          variant="icon"
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="メニュー"
        >
          <div className="w-5 flex flex-col gap-[5px]">
            <span className={`block h-[1.5px] bg-[#0B0B0E] transition-all origin-center ${menuOpen ? "rotate-45 translate-y-[6.5px]" : ""}`} />
            <span className={`block h-[1.5px] bg-[#0B0B0E] transition-all ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-[1.5px] bg-[#0B0B0E] transition-all origin-center ${menuOpen ? "-rotate-45 -translate-y-[6.5px]" : ""}`} />
          </div>
        </Button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#FAFAF7] border-t border-black/[0.06] px-6 py-5 flex flex-col gap-4">
          {[
            { label: "Why Ascent", href: "#why" },
            { label: "Framework", href: "#framework" },
            { label: "Services", href: "#services" },
            { label: "GEO Lab", href: "#lab" },
            { label: "Contact", href: "/contact" },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="ui-header-nav-link"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Button asChild variant="header" className="text-center justify-center">
            <Link href="/contact" onClick={() => setMenuOpen(false)}>
              相談する
            </Link>
          </Button>
        </div>
      )}
    </header>
  );
}
