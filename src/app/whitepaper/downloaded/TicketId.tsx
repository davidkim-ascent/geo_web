"use client";

import { useState } from "react";

export function TicketId() {
  const [id] = useState(() => {
    const rand = () => Math.random().toString(36).slice(2, 6).toUpperCase();
    return `WP-${rand()}-${rand()}`;
  });
  return <span className="text-white/85">{id}</span>;
}
