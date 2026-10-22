"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BrandLogo, Icon } from "@/components/Icon";

export function SiteHeader() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const update = () => setCount(JSON.parse(localStorage.getItem("dc-cart") || "[]").length);
    update(); window.addEventListener("dc-cart", update); return () => window.removeEventListener("dc-cart", update);
  }, []);
  return <header className="site-header"><Link className="brand" href="/"><span className="brand-mark"><BrandLogo /></span><span><strong>Dynamic Chemicals</strong><small>Industrial care, made clear.</small></span></Link><nav aria-label="Main navigation"><Link href="/#products"><Icon name="products" />Products</Link><Link href="/#solutions"><Icon name="solutions" />Solutions</Link><Link href="/track"><Icon name="track" />Track order</Link><Link className="nav-order" href="/order"><Icon name="cart" />Order request <span>{count}</span></Link></nav></header>;
}
