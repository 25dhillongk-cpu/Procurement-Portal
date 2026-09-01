"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import ThemeToggle from "../../components/ThemeToggle";

import {
  predictWaitingTime,
  formatWaitingTime,
  getRecommendedArrivalTime,
  getWaitingStatus,
} from "../../lib/waitingTime";

function predictExistingBooking(
  booking
) {
  return predictWaitingTime({
    queuePosition:
      booking.queuePosition || 1,

    centre:
      booking.centre ||
      booking.centreName ||
      "Main Procurement Centre",

    crop:
      booking.crop || "Other",

    quantity:
      booking.quantityQuintals ??
      booking.quantity ??
      0,
  });
}

export default function DashboardPage() {
  const router = useRouter();

  const [farmer, setFarmer] =
    useState(null);

  const [booking, setBooking] =
    useState(null);

  const [showBooking, setShowBooking] =
    useState(false);

  const [error, setError] =
    useState("");

  const [form, setForm] =
    useState({
      crop: "",
      otherCrop: "",
      quantity: "",
      unit: "Quintal",
      centre: "",
      date: "",
      slot: "",
    });

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

      setFarmer(farmerData);

      let storedBooking = null;

      /*
        New account-specific key.
      */
      if (farmerData.farmerId) {
        storedBooking =
          localStorage.getItem(
            `kisanSetuBooking_${farmerData.farmerId}`
          );
      }

      /*
        Backward compatibility with
        your existing booking key.
      */
      if (!storedBooking) {
        storedBooking =
          localStorage.getItem(
            "kisanSetuBooking"
          );
      }

      if (!storedBooking) {
        setBooking(null);
        return;
      }

      let bookingData =
        JSON.parse(
          storedBooking
        );

      /*
        Older bookings may not have the
        waiting-time fields.

        Calculate them automatically.
      */
      if (
        !bookingData.estimatedWaitMinutes
      ) {
        const estimated =
          predictExistingBooking(
            bookingData
          );

        const waitingStatus =
          getWaitingStatus(
            estimated
          );

        const recommendedArrival =
          getRecommendedArrivalTime({
            date: bookingData.date,
            slot:
              bookingData.slot ||
              bookingData.time,
            waitingMinutes:
              estimated,
          });

        bookingData = {
          ...bookingData,

          estimatedWaitMinutes:
            estimated,

          estimatedWaitTime:
            formatWaitingTime(
              estimated
            ),

          waitingStatus:
            waitingStatus.label,

          waitingStatusIcon:
            waitingStatus.icon,

          recommendedArrivalTime:
            recommendedArrival,
        };

        localStorage.setItem(
          "kisanSetuBooking",
          JSON.stringify(
            bookingData
          )
        );

        if (
          farmerData.farmerId
        ) {
          localStorage.setItem(
            `kisanSetuBooking_${farmerData.farmerId}`,
            JSON.stringify(
              bookingData
            )
          );
        }
      }

      setBooking(
        bookingData
      );
    } catch (err) {
      console.error(
        "Dashboard data error:",
        err
      );

      router.push("/login");
    }
  }, [router]);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });

    setError("");
  }

  function generateToken() {
    const letters =
      "ABCDEFGHJKLMNPQRSTUVWXYZ";

    const firstLetter =
      letters[
        Math.floor(
          Math.random() *
            letters.length
        )
      ];

    const number =
      Math.floor(
        100 +
          Math.random() * 900
      );

    return `${firstLetter}${number}`;
  }

  function handleBooking(e) {
    e.preventDefault();

    if (
      !form.crop ||
      !form.quantity ||
      !form.centre ||
      !form.date ||
      !form.slot
    ) {
      setError(
        "Please complete all booking details."
      );
      return;
    }

    if (
      form.crop === "Other" &&
      !form.otherCrop.trim()
    ) {
      setError(
        "Please enter the name of your crop."
      );
      return;
    }

    if (!farmer) {
      setError(
        "Farmer information is missing. Please login again."
      );
      return;
    }

    const actualCrop =
      form.crop === "Other"
        ? form.otherCrop.trim()
        : form.crop;

    const queuePosition =
      Math.floor(
        Math.random() * 8
      ) + 1;

    const estimatedWaitMinutes =
      predictWaitingTime({
        queuePosition,
        centre: form.centre,
        crop: actualCrop,
        quantity: form.quantity,
      });

    const waitingStatus =
      getWaitingStatus(
        estimatedWaitMinutes
      );

    const recommendedArrivalTime =
      getRecommendedArrivalTime({
        date: form.date,
        slot: form.slot,
        waitingMinutes:
          estimatedWaitMinutes,
      });

    const token =
      generateToken();

    const newBooking = {
      id: crypto.randomUUID(),

      farmerId:
        farmer.farmerId,

      farmerName:
        farmer.name,

      mobile:
        farmer.mobile,

      token,
      tokenNumber: token,

      crop: actualCrop,

      quantity:
        form.quantity,

      quantityQuintals:
        Number(form.quantity),

      unit:
        form.unit,

      centre:
        form.centre,

      centreName:
        form.centre,

      date:
        form.date,

      slot:
        form.slot,

      time:
        form.slot,

      status:
        "Booked",

      stage:
        "booked",

      queuePosition,

      estimatedWaitMinutes,

      estimatedWaitTime:
        formatWaitingTime(
          estimatedWaitMinutes
        ),

      recommendedArrivalTime,

      waitingStatus:
        waitingStatus.label,

      waitingStatusIcon:
        waitingStatus.icon,

      createdAt:
        new Date().toISOString(),
    };

    localStorage.setItem(
      "kisanSetuBooking",
      JSON.stringify(
        newBooking
      )
    );

    localStorage.setItem(
      `kisanSetuBooking_${farmer.farmerId}`,
      JSON.stringify(
        newBooking
      )
    );

    setBooking(
      newBooking
    );

    setShowBooking(false);
    setError("");

    setForm({
      crop: "",
      otherCrop: "",
      quantity: "",
      unit: "Quintal",
      centre: "",
      date: "",
      slot: "",
    });
  }

  function logout() {
    localStorage.removeItem(
      "kisanSetuLoggedIn"
    );

    router.push("/");
  }

  if (!farmer) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f4f6f2] text-[#172019] dark:bg-[#090d0b] dark:text-white">
        <div className="text-center">

          <div className="mx-auto flex h-14 w-14 animate-pulse items-center justify-center rounded-2xl bg-green-100 text-2xl dark:bg-green-950/50">
            🌾
          </div>

          <p className="mt-4 text-sm font-semibold text-gray-500 dark:text-gray-400">
            Loading your dashboard...
          </p>

        </div>
      </main>
    );
  }

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

          <div className="flex items-center gap-2">

            <ThemeToggle />

            <div className="hidden h-8 w-px bg-gray-200 dark:bg-[#29362e] sm:block" />

            <div className="hidden text-right sm:block">

              <p className="text-sm font-bold text-gray-800 dark:text-gray-200">
                {farmer.name}
              </p>

              <p className="text-[10px] text-gray-400">
                Farmer ID:{" "}
                {farmer.farmerId}
              </p>

            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-sm dark:bg-green-950/50">
              👨‍🌾
            </div>

            <button
              onClick={
                logout
              }
              className="rounded-xl px-3 py-2 text-xs font-bold text-gray-500 transition hover:bg-red-50 hover:text-red-600 dark:text-gray-400 dark:hover:bg-red-950/30 dark:hover:text-red-400"
            >
              Logout
            </button>

          </div>

        </div>
      </nav>

      {/* MAIN */}

      <div className="relative overflow-hidden">

        <div className="pointer-events-none absolute left-[-15rem] top-[-10rem] h-[35rem] w-[35rem] rounded-full bg-green-200/30 blur-3xl dark:bg-green-950/20" />

        <div className="pointer-events-none absolute right-[-15rem] top-[20rem] h-[35rem] w-[35rem] rounded-full bg-lime-200/20 blur-3xl dark:bg-lime-950/10" />

        <div className="relative mx-auto max-w-7xl px-5 py-9 sm:px-8">

          {/* HEADER */}

          <div className="mb-8">

            <p className="text-[9px] font-black uppercase tracking-[0.25em] text-green-700 dark:text-green-400">
              Farmer Dashboard
            </p>

            <div className="mt-2 flex flex-col justify-between gap-4 md:flex-row md:items-end">

              <div>

                <h1 className="text-3xl font-black tracking-tight text-gray-950 dark:text-white sm:text-4xl">
                  Welcome,{" "}
                  {farmer.name.split(
                    " "
                  )[0]}
                  .
                </h1>

                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Manage your procurement journey from one place.
                </p>

              </div>

              {booking && (
                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 text-xs font-bold text-green-700 dark:border-green-900/50 dark:bg-green-950/30 dark:text-green-300">

                  <span className="h-1.5 w-1.5 rounded-full bg-green-500" />

                  Procurement booking active

                </div>
              )}

            </div>
          </div>

          {/* PROFILE */}

          <section className="mb-6 rounded-[1.75rem] border border-gray-200 bg-white p-5 shadow-sm dark:border-[#29362e] dark:bg-[#111913] sm:p-6">

            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-green-100 text-2xl dark:bg-green-950/50">
                  👨‍🌾
                </div>

                <div>

                  <p className="text-lg font-black text-gray-900 dark:text-white">
                    {farmer.name}
                  </p>

                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    {farmer.village}{" "}
                    •{" "}
                    {farmer.mobile}
                  </p>

                  {farmer.state && (
                    <p className="mt-1 text-xs text-gray-400">
                      {farmer.state}
                    </p>
                  )}

                </div>

              </div>

              <div className="flex flex-wrap gap-3">

                <ProfileBadge
                  label="Farmer ID"
                  value={
                    farmer.farmerId
                  }
                />

                <ProfileBadge
                  label="Account"
                  value="Active"
                />

              </div>

            </div>

          </section>

          {/* STATS */}

          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <StatCard
              icon="01"
              title="Current Token"
              value={
                booking
                  ? booking.token
                  : "—"
              }
            />

            <StatCard
              icon="02"
              title="Procurement Centre"
              value={
                booking
                  ? booking.centre
                  : "Not booked"
              }
            />

            <StatCard
              icon="03"
              title="Crop"
              value={
                booking
                  ? booking.crop
                  : "Not added"
              }
            />

            <StatCard
              icon="04"
              title="Status"
              value={
                booking
                  ? booking.status
                  : "No booking"
              }
            />

          </section>

          {/* CONTENT */}

          <div className="mt-6 grid gap-6 lg:grid-cols-3">

            {/* BOOKING */}

            <div className="lg:col-span-2">

              {!booking ? (
                <div className="rounded-[1.75rem] border border-gray-200 bg-white p-7 shadow-sm dark:border-[#29362e] dark:bg-[#111913] sm:p-9">

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-xl dark:bg-green-950/50">
                    +
                  </div>

                  <p className="mt-7 text-[9px] font-black uppercase tracking-[0.25em] text-green-700 dark:text-green-400">
                    Procurement
                  </p>

                  <h2 className="mt-2 text-2xl font-black tracking-tight text-gray-950 dark:text-white sm:text-3xl">
                    Book your procurement slot
                  </h2>

                  <p className="mt-3 max-w-xl text-sm leading-7 text-gray-500 dark:text-gray-400">
                    Enter your produce details and select a procurement centre and preferred time slot. Your booking details will appear here once confirmed.
                  </p>

                  <button
                    onClick={() =>
                      router.push(
                        "/slotbook"
                      )
                    }
                    className="mt-7 rounded-xl bg-[#14532d] px-6 py-3.5 text-sm font-black text-white shadow-xl shadow-green-900/15 transition duration-300 hover:-translate-y-0.5 hover:bg-[#0f4224]"
                  >
                    Start Booking →
                  </button>

                </div>
              ) : (

                <div className="overflow-hidden rounded-[1.75rem] border border-gray-200 bg-white shadow-sm dark:border-[#29362e] dark:bg-[#111913]">

                  {/* TOKEN HEADER */}

                  <div className="relative overflow-hidden bg-[#14532d] p-7 text-white sm:p-9">

                    <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full border-[40px] border-white/[0.04]" />

                    <div className="relative">

                      <div className="flex items-start justify-between gap-4">

                        <div>

                          <p className="text-[9px] font-black uppercase tracking-[0.25em] text-green-200">
                            Booking Confirmed
                          </p>

                          <h2 className="mt-2 text-2xl font-black">
                            Your Digital Token
                          </h2>

                        </div>

                        <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-[10px] font-bold">
                          {booking.status}
                        </span>

                      </div>

                      <div className="mt-8">

                        <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-green-200">
                          Token Number
                        </p>

                        <p className="mt-1 text-5xl font-black tracking-tight sm:text-6xl">
                          {booking.token}
                        </p>

                      </div>

                    </div>
                  </div>

                  {/* DETAILS */}

                  <div className="p-7 sm:p-9">

                    <div className="grid gap-4 sm:grid-cols-2">

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
                          booking.centre
                        }
                      />

                      <Detail
                        label="Date"
                        value={formatDate(
                          booking.date
                        )}
                      />

                      <Detail
                        label="Selected Slot"
                        value={
                          booking.slot
                        }
                      />

                      <Detail
                        label="Queue Position"
                        value={`#${booking.queuePosition}`}
                      />

                      <Detail
                        label="Estimated Waiting Time"
                        value={
                          booking.estimatedWaitTime ||
                          formatWaitingTime(
                            booking.estimatedWaitMinutes
                          )
                        }
                      />

                      <Detail
                        label="Recommended Arrival"
                        value={
                          booking.recommendedArrivalTime ||
                          "—"
                        }
                      />

                    </div>

                    {/* WAITING TIME */}

                    <div className="mt-6 rounded-2xl border border-green-200 bg-green-50 p-5 dark:border-green-900/40 dark:bg-green-950/20">

                      <div className="flex items-start gap-4">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-600 text-sm text-white">
                          ⏱
                        </div>

                        <div>

                          <p className="text-sm font-black text-green-800 dark:text-green-300">
                            Estimated waiting time
                          </p>

                          <p className="mt-1 text-xs leading-5 text-green-700 dark:text-green-400">

                            {booking.waitingStatusIcon ||
                              "🟢"}{" "}
                            {booking.estimatedWaitTime ||
                              "Calculating..."}

                            {" "}estimated wait based on your current queue position.

                          </p>

                        </div>

                      </div>

                    </div>

                  </div>

                </div>
              )}

            </div>

            {/* JOURNEY */}

            <div className="rounded-[1.75rem] border border-gray-200 bg-white p-7 shadow-sm dark:border-[#29362e] dark:bg-[#111913]">

              <p className="text-[9px] font-black uppercase tracking-[0.25em] text-green-700 dark:text-green-400">
                Your Journey
              </p>

              <h2 className="mt-2 text-xl font-black text-gray-950 dark:text-white">
                Procurement Status
              </h2>

              <div className="mt-7">

                <StatusStep
                  number="01"
                  title="Registration"
                  completed
                />

                <StatusStep
                  number="02"
                  title="Slot Booking"
                  completed={
                    !!booking
                  }
                />

                <StatusStep
                  number="03"
                  title="Arrival & Verification"
                  completed={false}
                />

                <StatusStep
                  number="04"
                  title="Quality Testing"
                  completed={false}
                />

                <StatusStep
                  number="05"
                  title="Procurement"
                  completed={false}
                  last
                />

              </div>

            </div>

          </div>

        </div>
      </div>

      {/* KEEP EXISTING MODAL STRUCTURE AVAILABLE */}

      {showBooking && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">

          <div className="w-full max-w-2xl rounded-[1.75rem] border border-gray-200 bg-white p-7 shadow-2xl dark:border-[#29362e] dark:bg-[#111913]">

            <div className="flex items-start justify-between">

              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.25em] text-green-700 dark:text-green-400">
                  New Booking
                </p>

                <h2 className="mt-2 text-2xl font-black text-gray-950 dark:text-white">
                  Book Procurement Slot
                </h2>
              </div>

              <button
                onClick={() =>
                  setShowBooking(
                    false
                  )
                }
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-500 dark:bg-[#1d2921]"
              >
                ✕
              </button>

            </div>

            <form
              onSubmit={
                handleBooking
              }
              className="mt-7 space-y-5"
            >

              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                  {error}
                </div>
              )}

              <div>
                <label className="mb-2 block text-sm font-bold">
                  Crop
                </label>

                <select
                  name="crop"
                  value={
                    form.crop
                  }
                  onChange={
                    handleChange
                  }
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm dark:border-[#2b392f] dark:bg-[#172019] dark:text-white"
                >
                  <option value="">
                    Select your crop
                  </option>

                  <option value="Wheat">
                    Wheat
                  </option>

                  <option value="Rice">
                    Rice
                  </option>

                  <option value="Soybean">
                    Soybean
                  </option>

                  <option value="Cotton">
                    Cotton
                  </option>

                  <option value="Maize">
                    Maize
                  </option>

                  <option value="Other">
                    Other
                  </option>
                </select>
              </div>

              {form.crop ===
                "Other" && (
                <div>
                  <label className="mb-2 block text-sm font-bold">
                    Crop Name
                  </label>

                  <input
                    name="otherCrop"
                    value={
                      form.otherCrop
                    }
                    onChange={
                      handleChange
                    }
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm dark:border-[#2b392f] dark:bg-[#172019] dark:text-white"
                  />
                </div>
              )}

              <div className="grid gap-5 sm:grid-cols-2">

                <div>
                  <label className="mb-2 block text-sm font-bold">
                    Quantity
                  </label>

                  <input
                    type="number"
                    min="1"
                    name="quantity"
                    value={
                      form.quantity
                    }
                    onChange={
                      handleChange
                    }
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm dark:border-[#2b392f] dark:bg-[#172019] dark:text-white"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold">
                    Unit
                  </label>

                  <select
                    name="unit"
                    value={
                      form.unit
                    }
                    onChange={
                      handleChange
                    }
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm dark:border-[#2b392f] dark:bg-[#172019] dark:text-white"
                  >
                    <option value="Quintal">
                      Quintal
                    </option>

                    <option value="Kg">
                      Kilogram
                    </option>

                    <option value="Ton">
                      Ton
                    </option>
                  </select>
                </div>

              </div>

              <div>
                <label className="mb-2 block text-sm font-bold">
                  Procurement Centre
                </label>

                <select
                  name="centre"
                  value={
                    form.centre
                  }
                  onChange={
                    handleChange
                  }
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm dark:border-[#2b392f] dark:bg-[#172019] dark:text-white"
                >
                  <option value="">
                    Select procurement centre
                  </option>

                  <option value="Main Procurement Centre">
                    Main Procurement Centre
                  </option>

                  <option value="North Zone Procurement Centre">
                    North Zone Procurement Centre
                  </option>

                  <option value="South Zone Procurement Centre">
                    South Zone Procurement Centre
                  </option>

                  <option value="Central Procurement Centre">
                    Central Procurement Centre
                  </option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold">
                  Preferred Date
                </label>

                <input
                  type="date"
                  name="date"
                  min={
                    new Date()
                      .toISOString()
                      .split("T")[0]
                  }
                  value={
                    form.date
                  }
                  onChange={
                    handleChange
                  }
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm dark:border-[#2b392f] dark:bg-[#172019] dark:text-white"
                />
              </div>

              <div>
                <label className="mb-3 block text-sm font-bold">
                  Select Time Slot
                </label>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">

                  {[
                    "09:00 AM",
                    "10:00 AM",
                    "11:00 AM",
                    "12:00 PM",
                    "02:00 PM",
                    "03:00 PM",
                    "04:00 PM",
                    "05:00 PM",
                  ].map(
                    (slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() =>
                          setForm({
                            ...form,
                            slot,
                          })
                        }
                        className={`rounded-xl border px-3 py-3 text-xs font-bold ${
                          form.slot ===
                          slot
                            ? "border-green-600 bg-green-700 text-white"
                            : "border-gray-200 bg-gray-50 text-gray-600 dark:border-[#2b392f] dark:bg-[#172019] dark:text-gray-400"
                        }`}
                      >
                        {slot}
                      </button>
                    )
                  )}

                </div>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-[#14532d] py-4 text-sm font-black text-white"
              >
                Confirm Booking →
              </button>

            </form>

          </div>
        </div>
      )}

    </main>
  );
}

/* =========================================================
   COMPONENTS
========================================================= */

function ProfileBadge({
  label,
  value,
}) {
  return (
    <div className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-2 dark:border-[#29362e] dark:bg-[#172019]">

      <p className="text-[9px] font-black uppercase tracking-wider text-gray-400">
        {label}
      </p>

      <p className="mt-1 text-xs font-bold text-gray-800 dark:text-gray-200">
        {value}
      </p>

    </div>
  );
}

function StatCard({
  icon,
  title,
  value,
}) {
  return (
    <div className="group rounded-[1.5rem] border border-gray-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-[#29362e] dark:bg-[#111913]">

      <div className="flex items-center justify-between">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-[10px] font-black text-green-700 dark:bg-green-950/40 dark:text-green-400">
          {icon}
        </div>

        <span className="text-green-700 opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100 dark:text-green-400">
          ↗
        </span>

      </div>

      <p className="mt-5 text-[10px] font-black uppercase tracking-wider text-gray-400">
        {title}
      </p>

      <p className="mt-1 truncate text-base font-black text-gray-900 dark:text-white">
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

      <p className="mt-1.5 truncate text-sm font-bold text-gray-800 dark:text-gray-200">
        {value}
      </p>

    </div>
  );
}

function StatusStep({
  number,
  title,
  completed,
  last,
}) {
  return (
    <div className="flex gap-4">

      <div className="flex flex-col items-center">

        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xs font-black ${
            completed
              ? "bg-green-600 text-white"
              : "bg-gray-100 text-gray-400 dark:bg-[#1d2921] dark:text-gray-500"
          }`}
        >
          {completed
            ? "✓"
            : number}
        </div>

        {!last && (
          <div
            className={`mt-1 h-8 w-px ${
              completed
                ? "bg-green-300 dark:bg-green-900"
                : "bg-gray-200 dark:bg-[#29362e]"
            }`}
          />
        )}

      </div>

      <div className="pt-1">

        <p
          className={`text-sm font-bold ${
            completed
              ? "text-green-700 dark:text-green-400"
              : "text-gray-400 dark:text-gray-500"
          }`}
        >
          {title}
        </p>

        <p className="mt-1 text-[10px] text-gray-400">
          {completed
            ? "Completed"
            : "Pending"}
        </p>

      </div>

    </div>
  );
}

function formatDate(date) {
  if (!date) return "";

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