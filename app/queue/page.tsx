"use client";

import { useEffect, useState } from "react";
import { bookings } from "@/lib/mock-data";
import { BookingStage } from "@/lib/types";
import TokenTicket from "@/components/TokenTicket";
import StatusBadge from "@/components/StatusBadge";

const stageOrder: BookingStage[] = ["booked", "checked-in", "weighed", "completed"];

export default function QueuePage() {
  const [booking, setBooking] = useState(bookings[0]);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Simulates a live queue feed: position and wait tick down over time.
  useEffect(() => {
    setLastUpdated(new Date());
    const interval = setInterval(() => {
      setBooking((prev) => {
        if (prev.queuePosition === null || prev.queuePosition <= 0) return prev;
        return {
          ...prev,
          queuePosition: Math.max(prev.queuePosition - 1, 0),
          estimatedWaitMinutes: prev.estimatedWaitMinutes
            ? Math.max(prev.estimatedWaitMinutes - 8, 0)
            : prev.estimatedWaitMinutes,
        };
      });
      setLastUpdated(new Date());
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const currentStageIndex = stageOrder.indexOf(booking.stage);

  return (
    <div className="px-6 md:px-12 py-12 md:py-16 max-w-3xl">
      <div className="flex items-center justify-between gap-4 mb-8">
        <h1 className="font-display text-3xl md:text-4xl text-ink">Queue status</h1>
        {lastUpdated && (
          <p className="text-xs text-mist shrink-0">
            Updated {lastUpdated.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
          </p>
        )}
      </div>

      <TokenTicket booking={booking} />

      <div className="mt-10">
        <p className="text-sm font-medium text-ink mb-4">Progress at the centre</p>
        <div className="flex items-center">
          {stageOrder.map((stage, i) => (
            <div key={stage} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    i <= currentStageIndex ? "bg-pasture" : "bg-ink/15"
                  }`}
                />
                <span
                  className={`text-xs capitalize ${
                    i <= currentStageIndex ? "text-ink" : "text-ink/40"
                  }`}
                >
                  {stage.replace("-", " ")}
                </span>
              </div>
              {i < stageOrder.length - 1 && (
                <div
                  className={`h-px flex-1 mx-2 mb-5 ${
                    i < currentStageIndex ? "bg-pasture" : "bg-ink/15"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 border hairline rounded-token divide-y hairline">
        <div className="p-5 flex items-center justify-between">
          <div>
            <p className="text-sm text-ink/60">Centre notifications</p>
            <p className="text-ink">SMS alerts to your registered mobile number</p>
          </div>
          <StatusBadge status="open" />
        </div>
        <div className="p-5">
          <p className="text-sm text-ink/60 mb-2">Recent updates</p>
          <ul className="space-y-2 text-sm text-ink/80">
            <li>· Your token {booking.tokenNumber} was checked in at the gate.</li>
            <li>· {booking.queuePosition} farmers are ahead of you in this slot.</li>
            <li>· Estimated wait is around {booking.estimatedWaitMinutes} minutes.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
