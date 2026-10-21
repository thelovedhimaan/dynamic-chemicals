import type { Metadata } from "next";
import { OrderTracker } from "@/components/OrderTracker";

export const metadata: Metadata = { title: "Track your order", description: "Track a Dynamic Chemicals order with its private tracking ID." };
export default function TrackPage() { return <OrderTracker />; }
