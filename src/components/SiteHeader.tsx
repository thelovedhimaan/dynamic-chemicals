"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function SiteHeader() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const update = () => setCount(JSON.parse(localStorage.getItem("dc-cart") || "[]").length);
    update(); window.addEventListener("dc-cart", update); return () => window.removeEventListener("dc-cart", update);
  }, []);
  return <header className="site-header"><Link className="brand" href="/"><span className="brand-mark">DC</span><span><strong>Dynamic Chemicals</strong><small>Industrial care, made clear.</small></span></Link><nav aria-label="Main navigation"><Link href="/#products">Products</Link><Link href="/#solutions">Solutions</Link><Link href="/track">Track order</Link><Link className="nav-order" href="/order">Order request <span>{count}</span></Link></nav></header>;
}
