import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Mandi Token — Procurement Slot Booking",
  description:
    "Book your procurement slot, track your place in the queue, and follow your payment through to settlement.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-body antialiased">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <footer className="border-t hairline mt-24 py-8 px-6 md:px-12">
          <p className="text-sm text-mist max-w-[70ch]">
          </p>
        </footer>
      </body>
    </html>
  );
}
