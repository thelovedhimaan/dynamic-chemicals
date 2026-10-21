import type { Metadata } from "next";
import { OrderTracker } from "@/components/OrderTracker";

export const metadata: Metadata = { title: "Order status", robots: { index: false, follow: false } };
export default async function TrackingDetailPage({ params }: { params: Promise<{ id: string }> }) { return <OrderTracker initialId={(await params).id} />; }
