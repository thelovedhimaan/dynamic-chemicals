import type { Metadata } from "next";
import { OrderBuilder } from "@/components/OrderBuilder";

export const metadata: Metadata = { title: "Create an order request", description: "Request multiple Dynamic Chemicals products, add customization details, and receive a tracking ID." };
export default function OrderPage() { return <div className="order-page"><OrderBuilder /></div>; }
