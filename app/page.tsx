import Link from "next/link";
import { bookings } from "@/lib/mock-data";
import TokenTicket from "@/components/TokenTicket";

export default function HomePage() {
  const activeBooking = bookings[0];

  return (
    <div className="px-6 md:px-12 py-12 md:py-16 max-w-5xl">
      <p className="text-xs uppercase tracking-wide text-mist mb-3"></p>
      <h1 className="font-display text-4xl md:text-5xl text-ink leading-tight max-w-[18ch]">
        Know your slot, your place in line, and your payment — before you leave home.
      </h1>
      <p className="mt-5 text-ink/70 max-w-[60ch] text-lg">
        Register once, book a procurement slot at your nearest centre, and follow your grain from
        weighing to payment without standing in line to find out where things stand.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/book-slot"
          className="bg-pasture text-paper px-5 py-3 rounded-token font-medium hover:bg-pasture-light transition-colors"
        >
          Book a procurement slot
        </Link>
        <Link
          href="/queue"
          className="border hairline px-5 py-3 rounded-token font-medium text-ink hover:bg-ledger transition-colors"
        >
          Check queue status
        </Link>
      </div>

      <div className="mt-16">
        <h2 className="font-display text-xl text-ink mb-4">Your current token</h2>
        <TokenTicket booking={activeBooking} />
      </div>

      <div className="mt-16 grid sm:grid-cols-3 gap-px bg-ink/10 border hairline rounded-token overflow-hidden">
        {[
          { label: "Register & pick a slot", detail: "Choose your centre, crop, and a two-hour window that suits you." },
          { label: "Get a queue token", detail: "An SMS confirms your token number the moment you book." },
          { label: "Track to payment", detail: "Watch weighing, then payment, move from pending to settled." },
        ].map((step, i) => (
          <div key={step.label} className="bg-paper p-6">
            <p className="text-xs text-mist mb-2">{String(i + 1).padStart(2, "0")}</p>
            <p className="font-medium text-ink">{step.label}</p>
            <p className="text-sm text-ink/60 mt-1">{step.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
