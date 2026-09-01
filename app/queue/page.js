"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import ThemeToggle from "../../components/ThemeToggle";

import {
  formatWaitingTime,
  getWaitingStatus,
} from "../../lib/waitingTime";

export default function QueuePage() {
  const router = useRouter();

  const [farmer, setFarmer] =
    useState(null);

  const [booking, setBooking] =
    useState(null);

  const [currentWait, setCurrentWait] =
    useState(0);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const loggedIn =
      localStorage.getItem(
        "kisanSetuLoggedIn"
      );

    const storedFarmer =
      localStorage.getItem(
        "kisanSetuFarmer"
      );

    if (
      loggedIn !== "true" ||
      !storedFarmer
    ) {
      router.push("/login");
      return;
    }

    try {
      const farmerData =
        JSON.parse(
          storedFarmer
        );

      setFarmer(
        farmerData
      );

      let storedBooking =
        null;

      if (
        farmerData.farmerId
      ) {
        storedBooking =
          localStorage.getItem(
            `kisanSetuBooking_${farmerData.farmerId}`
          );
      }

      if (!storedBooking) {
        storedBooking =
          localStorage.getItem(
            "kisanSetuBooking"
          );
      }

      if (storedBooking) {
        const bookingData =
          JSON.parse(
            storedBooking
          );

        setBooking(
          bookingData
        );

        setCurrentWait(
          Number(
            bookingData.estimatedWaitMinutes
          ) || 0
        );
      }

      setLoading(false);
    } catch (error) {
      console.error(
        "Queue page error:",
        error
      );

      router.push("/login");
    }
  }, [router]);

  /*
    Simulate queue movement.

    Every 30 seconds the displayed
    estimated waiting time decreases.

    This is only for the current prototype.

    Later, this should be replaced by
    actual queue updates from MongoDB.
  */
  useEffect(() => {
    if (
      !booking ||
      currentWait <= 0
    ) {
      return;
    }

    const interval =
      setInterval(() => {
        setCurrentWait(
          (previous) =>
            Math.max(
              0,
              previous - 1
            )
        );
      }, 30000);

    return () =>
      clearInterval(
        interval
      );
  }, [
    booking,
    currentWait,
  ]);

  function logout() {
    localStorage.removeItem(
      "kisanSetuLoggedIn"
    );

    router.push("/");
  }

  if (loading || !farmer) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f4f7f3] dark:bg-[#090d0b]">

        <div className="text-center">

          <div className="mx-auto flex h-14 w-14 animate-pulse items-center justify-center rounded-2xl bg-green-100 text-2xl dark:bg-green-950/50">
            🌾
          </div>

          <p className="mt-4 text-sm font-semibold text-gray-500 dark:text-gray-400">
            Loading your queue...
          </p>

        </div>

      </main>
    );
  }

  if (!booking) {
    return (
      <main className="min-h-screen bg-[#f5f7f4] dark:bg-[#090d0b]">

        <nav className="sticky top-0 z-50 border-b border-gray-200/80 bg-white/90 backdrop-blur-xl dark:border-[#263229] dark:bg-[#0d140f]/90">

          <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">

            <Link
              href="/"
              className="flex items-center gap-3"
            >
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

            <ThemeToggle />

          </div>

        </nav>

        <div className="mx-auto max-w-3xl px-5 py-16 text-center">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-2xl dark:bg-green-950/50">
            📋
          </div>

          <p className="mt-6 text-[9px] font-black uppercase tracking-[0.25em] text-green-700 dark:text-green-400">
            Queue
          </p>

          <h1 className="mt-2 text-3xl font-black text-gray-950 dark:text-white">
            No active booking
          </h1>

          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500 dark:text-gray-400">
            Book a procurement slot to receive a token and waiting-time prediction.
          </p>

          <Link
            href="/slotbook"
            className="mt-7 inline-flex rounded-xl bg-[#14532d] px-6 py-3.5 text-sm font-black text-white"
          >
            Book Slot →
          </Link>

        </div>
      </main>
    );
  }

  const waitStatus =
    getWaitingStatus(
      currentWait
    );

  const displayedWait =
    formatWaitingTime(
      currentWait
    );

  const queuePosition =
    Number(
      booking.queuePosition
    ) || 1;

  /*
    Approximate number of farmers
    before the current farmer.
  */
  const farmersAhead =
    Math.max(
      0,
      queuePosition - 1
    );

  return (
    <main className="min-h-screen bg-[#f5f7f4] text-[#172019] transition-colors duration-300 dark:bg-[#090d0b] dark:text-[#edf4ee]">

      {/* NAVBAR */}

      <nav className="sticky top-0 z-50 border-b border-gray-200/80 bg-white/90 backdrop-blur-xl dark:border-[#263229] dark:bg-[#0d140f]/90">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">

          <Link
            href="/"
            className="flex items-center gap-3"
          >

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#14532d] text-xs font-black text-white shadow-lg shadow-green-900/10">
              KS
            </div>

            <div>

              <p className="text-[17px] font-black tracking-tight text-green-800 dark:text-green-400">
                KisanSetu
              </p>

              <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-gray-400">
                Farmer Portal
              </p>

            </div>

          </Link>

          <div className="flex items-center gap-3">

            <ThemeToggle />

            <div className="hidden text-right sm:block">

              <p className="text-sm font-bold text-gray-800 dark:text-gray-200">
                {farmer.name}
              </p>

              <p className="text-[10px] text-gray-400">
                Farmer ID:{" "}
                {farmer.farmerId}
              </p>

            </div>

            <button
              onClick={
                logout
              }
              className="rounded-xl px-3 py-2 text-xs font-bold text-gray-500 hover:bg-red-50 hover:text-red-600 dark:text-gray-400 dark:hover:bg-red-950/30"
            >
              Logout
            </button>

          </div>

        </div>

      </nav>

      {/* MAIN */}

      <div className="relative overflow-hidden">

        <div className="pointer-events-none absolute left-[-15rem] top-[-10rem] h-[35rem] w-[35rem] rounded-full bg-green-200/30 blur-3xl dark:bg-green-950/20" />

        <div className="relative mx-auto max-w-5xl px-5 py-10 sm:px-8">

          {/* HEADER */}

          <div className="mb-8">

            <p className="text-[9px] font-black uppercase tracking-[0.25em] text-green-700 dark:text-green-400">
              Live Queue
            </p>

            <h1 className="mt-2 text-3xl font-black tracking-tight text-gray-950 dark:text-white sm:text-4xl">
              Your Procurement Queue
            </h1>

            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Track your position and estimated waiting time.
            </p>

          </div>

          {/* MAIN QUEUE CARD */}

          <div className="overflow-hidden rounded-[1.75rem] border border-gray-200 bg-white shadow-sm dark:border-[#29362e] dark:bg-[#111913]">

            {/* TOKEN */}

            <div className="relative overflow-hidden bg-[#14532d] p-8 text-white sm:p-10">

              <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full border-[40px] border-white/[0.04]" />

              <div className="relative flex flex-col justify-between gap-8 sm:flex-row sm:items-end">

                <div>

                  <p className="text-[9px] font-black uppercase tracking-[0.25em] text-green-200">
                    Digital Token
                  </p>

                  <p className="mt-2 text-5xl font-black tracking-tight sm:text-6xl">
                    {booking.token ||
                      booking.tokenNumber}
                  </p>

                </div>

                <div className="sm:text-right">

                  <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-green-200">
                    Status
                  </p>

                  <p className="mt-2 text-lg font-black">
                    {booking.status ||
                      "Booked"}
                  </p>

                </div>

              </div>

            </div>

            {/* QUEUE INFORMATION */}

            <div className="p-7 sm:p-9">

              <div className="grid gap-4 sm:grid-cols-3">

                <QueueCard
                  icon="01"
                  label="Your Position"
                  value={`#${queuePosition}`}
                />

                <QueueCard
                  icon="02"
                  label="Farmers Ahead"
                  value={`${farmersAhead}`}
                />

                <QueueCard
                  icon="03"
                  label="Estimated Wait"
                  value={
                    displayedWait
                  }
                />

              </div>

              {/* WAITING PREDICTION */}

              <div className="mt-6 rounded-2xl border border-green-200 bg-green-50 p-6 dark:border-green-900/40 dark:bg-green-950/20">

                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                  <div className="flex items-start gap-4">

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-600 text-xl text-white">
                      ⏱
                    </div>

                    <div>

                      <p className="text-[9px] font-black uppercase tracking-[0.2em] text-green-700 dark:text-green-400">
                        Waiting Time Prediction
                      </p>

                      <p className="mt-1 text-2xl font-black text-green-900 dark:text-green-200">
                        {displayedWait}
                      </p>

                      <p className="mt-1 text-xs leading-5 text-green-700 dark:text-green-400">
                        {waitStatus.icon}{" "}
                        {waitStatus.label}
                      </p>

                    </div>

                  </div>

                  <div className="rounded-xl border border-green-200 bg-white px-4 py-3 dark:border-green-900/40 dark:bg-[#111913]">

                    <p className="text-[9px] font-black uppercase tracking-wider text-gray-400">
                      Recommended arrival
                    </p>

                    <p className="mt-1 text-sm font-black text-gray-800 dark:text-gray-200">
                      {booking.recommendedArrivalTime ||
                        "—"}
                    </p>

                  </div>

                </div>

              </div>

              {/* DETAILS */}

              <div className="mt-6 grid gap-4 sm:grid-cols-2">

                <Detail
                  label="Crop"
                  value={
                    booking.crop
                  }
                />

                <Detail
                  label="Quantity"
                  value={`${booking.quantity} ${booking.unit}`}
                />

                <Detail
                  label="Procurement Centre"
                  value={
                    booking.centre ||
                    booking.centreName
                  }
                />

                <Detail
                  label="Selected Slot"
                  value={
                    booking.slot ||
                    booking.time
                  }
                />

                <Detail
                  label="Date"
                  value={formatDate(
                    booking.date
                  )}
                />

                <Detail
                  label="Prediction"
                  value="Based on queue, centre, crop & quantity"
                />

              </div>

              {/* EXPLANATION */}

              <div className="mt-6 rounded-2xl border border-gray-200 bg-gray-50 p-5 dark:border-[#29362e] dark:bg-[#172019]">

                <p className="text-sm font-black text-gray-800 dark:text-gray-200">
                  How your waiting time is estimated
                </p>

                <p className="mt-2 text-xs leading-6 text-gray-500 dark:text-gray-400">
                  KisanSetu considers your queue position together with the expected processing time at the selected centre, crop type and quantity to estimate how long you may need to wait.
                </p>

              </div>

            </div>

          </div>

          {/* NAVIGATION */}

          <div className="mt-6 flex flex-wrap gap-3">

            <Link
              href="/dashboard"
              className="rounded-xl bg-[#14532d] px-5 py-3 text-sm font-black text-white"
            >
              ← Dashboard
            </Link>

            <Link
              href="/slotbook"
              className="rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-bold text-gray-700 dark:border-[#29362e] dark:bg-[#111913] dark:text-gray-300"
            >
              New Booking
            </Link>

          </div>

        </div>

      </div>

    </main>
  );
}

/* =========================================================
   COMPONENTS
========================================================= */

function QueueCard({
  icon,
  label,
  value,
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5 dark:border-[#29362e] dark:bg-[#172019]">

      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-50 text-[10px] font-black text-green-700 dark:bg-green-950/40 dark:text-green-400">
        {icon}
      </div>

      <p className="mt-4 text-[9px] font-black uppercase tracking-wider text-gray-400">
        {label}
      </p>

      <p className="mt-1 text-xl font-black text-gray-900 dark:text-white">
        {value}
      </p>

    </div>
  );
}

function Detail({
  label,
  value,
}) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4 dark:border-[#29362e] dark:bg-[#172019]">

      <p className="text-[9px] font-black uppercase tracking-wider text-gray-400">
        {label}
      </p>

      <p className="mt-1.5 text-sm font-bold text-gray-800 dark:text-gray-200">
        {value}
      </p>

    </div>
  );
}

function formatDate(date) {
  if (!date) return "—";

  return new Date(
    `${date}T00:00:00`
  ).toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  );
}