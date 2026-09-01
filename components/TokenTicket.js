"use client";

import StatusBadge from "./StatusBadge";

export default function TokenTicket({ booking }) {
  if (!booking) return null;

  return (
    <div className="relative overflow-hidden rounded-[1.75rem] bg-[#14532d] text-white shadow-xl">
      <div className="grid md:grid-cols-[1fr_auto]">

        {/* MAIN TOKEN INFORMATION */}
        <div className="p-6 sm:p-8">

          <p className="text-[9px] font-black uppercase tracking-[0.25em] text-green-200">
            Your Digital Token
          </p>

          <p className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">
            {booking.token}
          </p>

          <div className="mt-7 grid grid-cols-2 gap-x-6 gap-y-5">

            <div>
              <p className="text-[9px] font-black uppercase tracking-wider text-green-200">
                Farmer
              </p>

              <p className="mt-1 text-sm font-bold">
                {booking.farmerName || "Farmer"}
              </p>
            </div>

            <div>
              <p className="text-[9px] font-black uppercase tracking-wider text-green-200">
                Centre
              </p>

              <p className="mt-1 text-sm font-bold">
                {booking.centre}
              </p>
            </div>

            <div>
              <p className="text-[9px] font-black uppercase tracking-wider text-green-200">
                Crop & Quantity
              </p>

              <p className="mt-1 text-sm font-bold">
                {booking.crop} · {booking.quantity} {booking.unit}
              </p>
            </div>

            <div>
              <p className="text-[9px] font-black uppercase tracking-wider text-green-200">
                Slot
              </p>

              <p className="mt-1 text-sm font-bold">
                {formatDate(booking.date)}, {booking.slot}
              </p>
            </div>

          </div>
        </div>

        {/* QUEUE */}
        <div className="flex min-w-[180px] flex-col items-center justify-center border-t border-white/10 bg-white/[0.05] p-6 md:border-l md:border-t-0 sm:p-8">

          <StatusBadge status={booking.status} />

          <div className="mt-5 text-center">

            <p className="text-4xl font-black">
              {booking.queuePosition ?? 0}
            </p>

            <p className="mt-1 text-xs text-green-100/70">
              ahead of you
            </p>

          </div>

          <div className="mt-4 text-center">

            <p className="text-lg font-bold">
              ~{booking.estimatedWaitMinutes ?? calculateWait(booking.queuePosition)} min
            </p>

            <p className="text-xs text-green-100/70">
              estimated wait
            </p>

          </div>

        </div>

      </div>
    </div>
  );
}

function formatDate(date) {
  if (!date) return "";

  return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function calculateWait(position) {
  if (!position) return 0;

  return position * 8;
}