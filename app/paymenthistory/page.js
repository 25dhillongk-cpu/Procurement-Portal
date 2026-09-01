"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ThemeToggle from "../../components/ThemeToggle";

const initialPayments = [
  {
    id: "PAY-001",
    tokenNumber: "MC-4821",
    crop: "Wheat",
    quantityQuintals: 30,
    centreName: "Main Procurement Centre",
    procurementDate: "2026-08-20",
    amount: 69000,
    mspRate: 2300,
    status: "paid",
    utr: "UTR123456789",
  },
  {
    id: "PAY-002",
    tokenNumber: "NC-3165",
    crop: "Rice",
    quantityQuintals: 25,
    centreName: "North Zone Procurement Centre",
    procurementDate: "2026-08-15",
    amount: 58750,
    mspRate: 2350,
    status: "processing",
    utr: null,
  },
  {
    id: "PAY-003",
    tokenNumber: "SC-7294",
    crop: "Soybean",
    quantityQuintals: 20,
    centreName: "South Zone Procurement Centre",
    procurementDate: "2026-08-10",
    amount: 94000,
    mspRate: 4700,
    status: "pending",
    utr: null,
  },
];

const filters = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Processing", value: "processing" },
  { label: "Paid", value: "paid" },
];

function formatINR(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function PaymentHistoryPage() {
  const router = useRouter();

  const [farmer, setFarmer] = useState(null);
  const [filter, setFilter] = useState("all");
  const [payments, setPayments] = useState(initialPayments);

  useEffect(() => {
    const loggedIn = localStorage.getItem("kisanSetuLoggedIn");
    const storedFarmer = localStorage.getItem("kisanSetuFarmer");

    if (loggedIn !== "true" || !storedFarmer) {
      router.push("/login");
      return;
    }

    try {
      setFarmer(JSON.parse(storedFarmer));

      const booking = JSON.parse(
        localStorage.getItem("kisanSetuBooking") || "null"
      );

      if (booking) {
        setPayments((prev) => [
          {
            id: booking.id,
            tokenNumber:
              booking.token || booking.tokenNumber,
            crop: booking.crop,
            quantityQuintals:
              Number(booking.quantity) || 0,
            centreName:
              booking.centre || booking.centreName,
            procurementDate:
              booking.date ||
              new Date().toISOString(),
            amount: 0,
            mspRate: 0,
            status: "pending",
            utr: null,
          },
          ...prev,
        ]);
      }
    } catch {
      router.push("/login");
    }
  }, [router]);

  const records = useMemo(() => {
    if (filter === "all") return payments;

    return payments.filter(
      (payment) => payment.status === filter
    );
  }, [payments, filter]);

  const totalPaid = payments
    .filter((p) => p.status === "paid")
    .reduce((sum, p) => sum + p.amount, 0);

  const totalPending = payments
    .filter((p) => p.status !== "paid")
    .reduce((sum, p) => sum + p.amount, 0);

  if (!farmer) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f5f7f4]">
        Loading...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f7f4] text-[#172019] dark:bg-[#090d0b] dark:text-[#edf4ee]">

      <nav className="sticky top-0 z-50 border-b border-gray-200/80 bg-white/90 backdrop-blur-xl dark:border-[#263229] dark:bg-[#0d140f]/90">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">

          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#14532d] text-xs font-black text-white">
              KS
            </div>

            <div>
              <p className="text-[17px] font-black text-green-800 dark:text-green-400">
                KisanSetu
              </p>

              <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-gray-400">
                Farmer Portal
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <ThemeToggle />

            <Link
              href="/dashboard"
              className="rounded-xl border border-gray-200 px-4 py-2 text-xs font-bold dark:border-[#29362e]"
            >
              Dashboard
            </Link>
          </div>

        </div>

      </nav>

      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">

        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-green-700 dark:text-green-400">
          Payments
        </p>

        <h1 className="mt-2 text-3xl font-black text-gray-950 dark:text-white sm:text-4xl">
          Payment History
        </h1>

        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Track your procurement payments and settlement status.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">

          <SummaryCard
            label="Settled So Far"
            value={formatINR(totalPaid)}
          />

          <SummaryCard
            label="Awaiting Settlement"
            value={formatINR(totalPending)}
          />

        </div>

        <div className="mt-8 flex flex-wrap gap-2">

          {filters.map((item) => (
            <button
              key={item.value}
              onClick={() => setFilter(item.value)}
              className={`rounded-full border px-4 py-2 text-xs font-bold transition ${
                filter === item.value
                  ? "border-[#14532d] bg-[#14532d] text-white"
                  : "border-gray-200 bg-white text-gray-600 hover:bg-gray-100 dark:border-[#29362e] dark:bg-[#111913] dark:text-gray-300"
              }`}
            >
              {item.label}
            </button>
          ))}

        </div>

        <div className="mt-6 overflow-hidden rounded-[1.5rem] border border-gray-200 bg-white dark:border-[#29362e] dark:bg-[#111913]">

          <div className="hidden grid-cols-5 gap-4 bg-gray-50 px-5 py-4 text-[10px] font-black uppercase tracking-wider text-gray-400 dark:bg-[#172019] md:grid">
            <span>Token</span>
            <span>Crop & Centre</span>
            <span>Procured On</span>
            <span>Amount</span>
            <span>Status</span>
          </div>

          <div className="divide-y divide-gray-100 dark:divide-[#29362e]">

            {records.map((record) => (
              <div
                key={record.id}
                className="grid gap-4 px-5 py-5 md:grid-cols-5 md:items-center"
              >

                <div>
                  <p className="font-black">
                    {record.tokenNumber}
                  </p>

                  {record.utr && (
                    <p className="mt-1 text-[10px] text-gray-400">
                      UTR {record.utr}
                    </p>
                  )}
                </div>

                <div>
                  <p className="text-sm font-bold">
                    {record.crop} · {record.quantityQuintals} qtl
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    {record.centreName}
                  </p>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {new Date(
                    record.procurementDate
                  ).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>

                <div>
                  <p className="font-black">
                    {record.amount
                      ? formatINR(record.amount)
                      : "—"}
                  </p>

                  {record.mspRate > 0 && (
                    <p className="mt-1 text-[10px] text-gray-400">
                      MSP {formatINR(record.mspRate)}/qtl
                    </p>
                  )}
                </div>

                <div>
                  <StatusBadge status={record.status} />
                </div>

              </div>
            ))}

            {records.length === 0 && (
              <div className="px-5 py-12 text-center text-sm text-gray-400">
                No payments in this category yet.
              </div>
            )}

          </div>

        </div>

      </div>

    </main>
  );
}

function SummaryCard({ label, value }) {
  return (
    <div className="rounded-[1.5rem] border border-gray-200 bg-white p-6 dark:border-[#29362e] dark:bg-[#111913]">
      <p className="text-xs font-bold text-gray-400">
        {label}
      </p>

      <p className="mt-2 text-3xl font-black text-green-700 dark:text-green-400">
        {value}
      </p>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    pending:
      "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300",
    processing:
      "bg-yellow-50 text-yellow-700 dark:bg-yellow-950/30 dark:text-yellow-300",
    paid:
      "bg-green-50 text-green-700 dark:bg-green-950/30 dark:text-green-300",
  };

  const labels = {
    pending: "Pending",
    processing: "Processing",
    paid: "Paid",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-current/10 px-3 py-1.5 text-xs font-bold ${
        styles[status] || styles.pending
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {labels[status] || status}
    </span>
  );
}