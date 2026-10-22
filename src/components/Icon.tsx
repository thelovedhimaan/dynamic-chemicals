type IconName = "phone" | "whatsapp" | "mail" | "download" | "track" | "products" | "solutions" | "cart";

const paths: Record<Exclude<IconName, "whatsapp">, React.ReactNode> = {
  phone: <path d="M7.2 3.5 9.5 8 7.8 9.7a15 15 0 0 0 6.5 6.5l1.7-1.7 4.5 2.3v2.1a2 2 0 0 1-2.2 2A17.3 17.3 0 0 1 3.1 5.7a2 2 0 0 1 2-2.2h2.1Z" />,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></>,
  download: <><path d="M12 3v12m0 0 4-4m-4 4-4-4" /><path d="M4 18v2h16v-2" /></>,
  track: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="2.5" /><path d="M12 2v3m0 14v3M2 12h3m14 0h3" /></>,
  products: <><path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" /><path d="m4.5 7.7 7.5 4.2 7.5-4.2M12 12v9" /></>,
  solutions: <><path d="M9 18h6m-5 3h4" /><path d="M8.4 14.6A7 7 0 1 1 15.6 14.6C14.5 15.4 14 16 14 17h-4c0-1-.5-1.6-1.6-2.4Z" /></>,
  cart: <><path d="M3 4h2l2.2 10h9.9l2-7H6" /><circle cx="9" cy="19" r="1.5" /><circle cx="17" cy="19" r="1.5" /></>,
};

export function Icon({ name, className = "" }: { name: IconName; className?: string }) {
  if (name === "whatsapp") return <svg className={`icon ${className}`} viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" stroke="none" d="M12 2a9.7 9.7 0 0 0-8.3 14.8L2.4 22l5.3-1.4A9.8 9.8 0 1 0 12 2Zm0 17.7a8 8 0 0 1-4.1-1.1l-.3-.2-3.1.8.8-3-.2-.3A8 8 0 1 1 12 19.7Zm4.4-6c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.7.9c-.1.2-.3.2-.5.1-1.4-.7-2.4-1.3-3.4-3-.3-.5.3-.5.8-1.5.1-.2 0-.4 0-.5l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.8.8-1.2 1.8-.6 3.1.7 1.6 2.1 3.7 5.2 5.1 1.2.5 2.1.8 2.8.6.9-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.1-1.3l-.7-.4Z" /></svg>;
  return <svg className={`icon ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

export function BrandLogo({ className = "" }: { className?: string }) {
  return <img className={className} src="/icon.svg" alt="" aria-hidden="true" />;
}
