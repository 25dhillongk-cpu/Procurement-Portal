"use client";

import { useMemo, useState } from "react";
import { paymentRecords, formatINR } from "@/lib/mock-data";
import { PaymentStatus } from "@/lib/types";
import StatusBadge from "@/components/StatusBadge";

const filters: { label: string; value: PaymentStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Processing", value: "processing" },
  { label: "Paid", value: "paid" },
];

export default function PaymentHistoryPage() {
  const [filter, setFilter] = useState<PaymentStatus | "all">("all");

  const records = useMemo(
    () => (filter === "all" ? paymentRecords : paymentRecords.filter((r) => r.status === filter)),
    [filter]
  );

  const totalPaid = paymentRecords
    .filter((r) => r.status === "paid")
    .reduce((sum, r) => sum + r.amount, 0);
  const totalPending = paymentRecords
    .filter((r) => r.status !== "paid")
    .reduce((sum, r) => sum + r.amount, 0);

  return (
    <div className="px-6 md:px-12 py-12 md:py-16 max-w-4xl">
      <h1 className="font-display text-3xl md:text-4xl text-ink mb-2">Payment history</h1>
      <p className="text-ink/70 mb-8 max-w-[60ch]">
        Every consignment you've sold, from weighing to settlement in your bank account.
      </p>

      <div className="grid sm:grid-cols-2 gap-px bg-ink/10 border hairline rounded-token overflow-hidden mb-10">
        <div className="bg-paper p-6">
          <p className="text-sm text-ink/60">Settled so far</p>
          <p className="font-display text-3xl text-pasture-light mt-1">{formatINR(totalPaid)}</p>
        </div>
        <div className="bg-paper p-6">
          <p className="text-sm text-ink/60">Awaiting settlement</p>
          <p className="font-display text-3xl text-wheat-dark mt-1">{formatINR(totalPending)}</p>
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`text-sm px-3 py-1.5 rounded-full border transition-colors ${
              filter === f.value
                ? "bg-ink text-paper border-ink"
                : "hairline text-ink/70 hover:bg-ledger"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="border hairline rounded-token overflow-hidden">
        <div className="hidden sm:grid grid-cols-[1fr_1fr_1fr_1fr_auto] gap-4 px-5 py-3 text-xs uppercase tracking-wide text-mist bg-ledger/50">
          <span>Token</span>
          <span>Crop &amp; centre</span>
          <span>Procured on</span>
          <span>Amount</span>
          <span>Status</span>
        </div>
        <div className="divide-y hairline">
          {records.map((r) => (
            <div key={r.id} className="grid sm:grid-cols-[1fr_1fr_1fr_1fr_auto] gap-2 sm:gap-4 px-5 py-4 items-start sm:items-center">
              <div>
                <p className="font-medium text-ink">{r.tokenNumber}</p>
                {r.utr && <p className="text-xs text-mist mt-0.5">UTR {r.utr}</p>}
              </div>
              <div>
                <p className="text-ink">{r.crop} · {r.quantityQuintals} qtl</p>
                <p className="text-xs text-mist mt-0.5">{r.centreName}</p>
              </div>
              <div className="text-ink/80 text-sm">
                {new Date(r.procurementDate).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </div>
              <div>
                <p className="text-ink font-medium">{formatINR(r.amount)}</p>
                <p className="text-xs text-mist mt-0.5">MSP {formatINR(r.mspRate)}/qtl</p>
              </div>
              <div className="sm:justify-self-end">
                <StatusBadge status={r.status} />
              </div>
            </div>
          ))}
          {records.length === 0 && (
            <div className="px-5 py-10 text-center text-ink/50 text-sm">
              No payments in this category yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
