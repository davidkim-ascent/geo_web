"use client";

import { useState, useEffect } from "react";

export function TicketId() {
  const [id, setId] = useState("WP-XXXX-XXXX");
  useEffect(() => {
    const rand = () => Math.random().toString(36).slice(2, 6).toUpperCase();
    setId(`WP-${rand()}-${rand()}`);
  }, []);
  return <span className="text-white/85">{id}</span>;
}
