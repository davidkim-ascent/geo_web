"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "GEO Watcher", href: "/watcher" },
  { label: "GEO 診断", href: "/shindan" },
  { label: "GEO LAB", href: "/lab" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="ui-header-shell fixed top-0 left-0 right-0 z-50">
      <div className="max-w-[var(--ui-content-width)] mx-auto px-4 sm:px-6 lg:px-10 h-[70px] pt-[15px] pb-2.5 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/ascent-geo-logo.png"
            alt="ASCENT/GEO"
            width={3317}
            height={552}
            priority
            className="h-[22px] w-auto sm:h-[24px]"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7">
          {NAV_ITEMS.map((item, index) => {
            const isActive =
              pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href + "/"));

            return (
              <div key={item.label} className="flex items-center gap-7">
                {index > 0 ? (
                  <span aria-hidden="true" className="ui-header-nav-separator">
                    |
                  </span>
                ) : null}
                <Link
                  href={item.href}
                  className={`ui-header-nav-link ${isActive ? "ui-header-nav-link--active" : ""}`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </div>
            );
          })}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex">
          <Button asChild variant="header">
            <a href="/contact">
              相談する
              <span className="ui-header-cta-arrow">→</span>
            </a>
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
        <div className="md:hidden bg-[#FDFDFB] border-t border-black/[0.06] px-6 py-5 flex flex-col gap-4">
          {NAV_ITEMS.map((item) => (
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
            <a href="/contact" onClick={() => setMenuOpen(false)}>
              相談する
            </a>
          </Button>
        </div>
      )}
    </header>
  );
}
