"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { useRouter } from "next/navigation";
import Link from "next/link";
import ThemeToggle from "../../components/ThemeToggle";

import {
  predictWaitingTime,
  formatWaitingTime,
  getRecommendedArrivalTime,
  getWaitingStatus,
} from "../../lib/waitingTime";

const centres = [
  {
    id: "main",
    name: "Main Procurement Centre",
    cropsAccepted: [
      "Wheat",
      "Rice",
      "Soybean",
      "Cotton",
      "Maize",
      "Bajra",
      "Jowar",
      "Chana",
      "Tur",
      "Mustard",
      "Other",
    ],
  },
  {
    id: "north",
    name: "North Zone Procurement Centre",
    cropsAccepted: [
      "Wheat",
      "Rice",
      "Maize",
      "Bajra",
      "Jowar",
      "Chana",
      "Mustard",
      "Other",
    ],
  },
  {
    id: "south",
    name: "South Zone Procurement Centre",
    cropsAccepted: [
      "Rice",
      "Soybean",
      "Cotton",
      "Maize",
      "Tur",
      "Groundnut",
      "Other",
    ],
  },
  {
    id: "central",
    name: "Central Procurement Centre",
    cropsAccepted: [
      "Wheat",
      "Soybean",
      "Cotton",
      "Maize",
      "Chana",
      "Tur",
      "Mustard",
      "Other",
    ],
  },
];

const slots = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
];

export default function SlotBookingPage() {
  const router = useRouter();

  const [farmer, setFarmer] = useState(null);
  const [step, setStep] = useState(1);

  const [centreId, setCentreId] =
    useState("main");

  const [crop, setCrop] =
    useState("");

  const [otherCrop, setOtherCrop] =
    useState("");

  const [quantity, setQuantity] =
    useState("");

  const [selectedSlot, setSelectedSlot] =
    useState("");

  const [date, setDate] =
    useState("");

  const [error, setError] =
    useState("");

  const [booking, setBooking] =
    useState(null);

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
      setFarmer(
        JSON.parse(storedFarmer)
      );
    } catch {
      router.push("/login");
    }
  }, [router]);

  const centre = useMemo(
    () =>
      centres.find(
        (item) => item.id === centreId
      ) || centres[0],
    [centreId]
  );

  const availableCrops =
    centre.cropsAccepted;

  function handleCentreChange(e) {
    setCentreId(e.target.value);
    setCrop("");
    setOtherCrop("");
    setSelectedSlot("");
    setError("");
  }

  function handleCropChange(e) {
    setCrop(e.target.value);

    if (e.target.value !== "Other") {
      setOtherCrop("");
    }

    setError("");
  }

  function continueToSlots(e) {
    e.preventDefault();

    if (!crop) {
      setError(
        "Please select a crop."
      );
      return;
    }

    if (
      crop === "Other" &&
      !otherCrop.trim()
    ) {
      setError(
        "Please enter the name of your crop."
      );
      return;
    }

    if (
      !quantity ||
      Number(quantity) <= 0
    ) {
      setError(
        "Please enter a valid quantity."
      );
      return;
    }

    if (!date) {
      setError(
        "Please select a preferred date."
      );
      return;
    }

    setError("");
    setStep(2);
  }

  function generateToken() {
    const prefix =
      centre.name
        .split(" ")
        .slice(0, 2)
        .map(
          (word) => word[0]
        )
        .join("")
        .toUpperCase();

    return `${prefix}-${Math.floor(
      1000 + Math.random() * 9000
    )}`;
  }

  function confirmBooking() {
    if (!selectedSlot) {
      setError(
        "Please select a time slot."
      );
      return;
    }

    if (!farmer) {
      setError(
        "Farmer information is missing. Please login again."
      );
      return;
    }

    const finalCrop =
      crop === "Other"
        ? otherCrop.trim()
        : crop;

    /*
      Current prototype queue.
      Later this value can come from MongoDB.
    */
    const queuePosition =
      Math.floor(
        Math.random() * 8
      ) + 1;

    /*
      NEW:
      Actual waiting-time prediction.
    */
    const estimatedWaitMinutes =
      predictWaitingTime({
        queuePosition,
        centre: centre.name,
        crop: finalCrop,
        quantity,
      });

    const estimatedWaitTime =
      formatWaitingTime(
        estimatedWaitMinutes
      );

    const recommendedArrivalTime =
      getRecommendedArrivalTime({
        date,
        slot: selectedSlot,
        waitingMinutes:
          estimatedWaitMinutes,
      });

    const waitingStatus =
      getWaitingStatus(
        estimatedWaitMinutes
      );

    /*
      Generate ONE token.
      token === tokenNumber
    */
    const token =
      generateToken();

    const newBooking = {
      id: crypto.randomUUID(),

      token,
      tokenNumber: token,

      farmerName:
        farmer.name || "",

      farmerId:
        farmer.farmerId || "",

      phone:
        farmer.mobile || "",

      crop: finalCrop,

      quantity,

      quantityQuintals:
        Number(quantity),

      unit: "Quintal",

      centre: centre.name,
      centreName: centre.name,
      centreId: centre.id,

      date,

      slot: selectedSlot,
      time: selectedSlot,

      status: "Booked",
      stage: "booked",

      queuePosition,

      estimatedWaitMinutes,

      estimatedWaitTime,

      recommendedArrivalTime,

      waitingStatus:
        waitingStatus.label,

      waitingStatusIcon:
        waitingStatus.icon,

      createdAt:
        new Date().toISOString(),
    };

    /*
      Keep old storage key so existing
      parts of the project continue working.
    */
    localStorage.setItem(
      "kisanSetuBooking",
      JSON.stringify(newBooking)
    );

    /*
      Account-specific storage.
    */
    localStorage.setItem(
      `kisanSetuBooking_${farmer.farmerId}`,
      JSON.stringify(newBooking)
    );

    /*
      Keep booking in React state so the
      confirmation page does not need to
      read localStorage again.
    */
    setBooking(newBooking);

    setError("");
    setStep(3);
  }

  if (!farmer) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f4f7f3] text-[#172019] dark:bg-[#090d0b] dark:text-white">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 animate-pulse items-center justify-center rounded-2xl bg-green-100 text-2xl dark:bg-green-950/50">
            🌾
          </div>

          <p className="mt-4 text-sm font-semibold text-gray-500 dark:text-gray-400">
            Loading slot booking...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f4f7f3] text-[#172019] transition-colors duration-300 dark:bg-[#090d0b] dark:text-[#edf4ee]">

      {/* NAVBAR */}

      <nav className="sticky top-0 z-50 border-b border-gray-200/80 bg-white/90 backdrop-blur-xl dark:border-[#263229] dark:bg-[#0d140f]/90">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">

          <Link
            href="/dashboard"
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

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-sm dark:bg-green-950/50">
              👨‍🌾
            </div>
          </div>
        </div>
      </nav>

      {/* MAIN */}

      <div className="relative mx-auto max-w-6xl px-5 pb-12 pt-10 sm:px-8">

        <div className="pointer-events-none absolute left-[-15rem] top-0 h-[30rem] w-[30rem] rounded-full bg-green-200/30 blur-3xl dark:bg-green-950/20" />

        <div className="relative">

          {/* HEADER */}

          <div className="mb-8">
            <p className="text-[9px] font-black uppercase tracking-[0.25em] text-green-700 dark:text-green-400">
              Procurement
            </p>

            <h1 className="mt-2 text-3xl font-black tracking-tight text-gray-950 dark:text-white sm:text-4xl">
              Book Procurement Slot
            </h1>

            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Select your produce, centre and preferred time.
            </p>
          </div>

          {/* PROGRESS */}

          <div className="mb-8 flex items-center gap-3">
            <Step
              number="01"
              title="Details"
              active={step >= 1}
            />

            <div className="h-px flex-1 bg-gray-200 dark:bg-[#29362e]" />

            <Step
              number="02"
              title="Time Slot"
              active={step >= 2}
            />

            <div className="h-px flex-1 bg-gray-200 dark:bg-[#29362e]" />

            <Step
              number="03"
              title="Confirmation"
              active={step >= 3}
            />
          </div>

          {/* STEP 1 */}

          {step === 1 && (
            <div className="rounded-[1.75rem] border border-gray-200 bg-white p-7 shadow-sm dark:border-[#29362e] dark:bg-[#111913] sm:p-9">

              <div className="grid gap-5">

                <Field label="Procurement Centre">
                  <select
                    value={centreId}
                    onChange={
                      handleCentreChange
                    }
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-gray-900 outline-none transition focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-100 dark:border-[#2b392f] dark:bg-[#172019] dark:text-white"
                  >
                    {centres.map(
                      (item) => (
                        <option
                          key={item.id}
                          value={item.id}
                        >
                          {item.name}
                        </option>
                      )
                    )}
                  </select>
                </Field>

                <Field label="Crop">
                  <select
                    value={crop}
                    onChange={
                      handleCropChange
                    }
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-gray-900 outline-none transition focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-100 dark:border-[#2b392f] dark:bg-[#172019] dark:text-white"
                  >
                    <option value="">
                      Select your crop
                    </option>

                    {availableCrops.map(
                      (item) => (
                        <option
                          key={item}
                          value={item}
                        >
                          {item}
                        </option>
                      )
                    )}
                  </select>
                </Field>

                {crop === "Other" && (
                  <Field label="Enter Crop Name">
                    <input
                      type="text"
                      value={otherCrop}
                      onChange={(e) =>
                        setOtherCrop(
                          e.target.value
                        )
                      }
                      placeholder="Enter crop name"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-gray-900 outline-none transition focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-100 dark:border-[#2b392f] dark:bg-[#172019] dark:text-white"
                    />
                  </Field>
                )}

                <div className="grid gap-5 sm:grid-cols-2">

                  <Field label="Quantity">
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) =>
                        setQuantity(
                          e.target.value
                        )
                      }
                      placeholder="Enter quantity"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-gray-900 outline-none transition focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-100 dark:border-[#2b392f] dark:bg-[#172019] dark:text-white"
                    />
                  </Field>

                  <Field label="Unit">
                    <div className="flex h-[50px] items-center rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm font-bold text-gray-700 dark:border-[#2b392f] dark:bg-[#172019] dark:text-gray-300">
                      Quintal
                    </div>
                  </Field>

                </div>

                <Field label="Preferred Date">
                  <input
                    type="date"
                    min={
                      new Date()
                        .toISOString()
                        .split("T")[0]
                    }
                    value={date}
                    onChange={(e) =>
                      setDate(
                        e.target.value
                      )
                    }
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-gray-900 outline-none transition focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-100 dark:border-[#2b392f] dark:bg-[#172019] dark:text-white"
                  />
                </Field>

              </div>

              {error && (
                <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 dark:border-red-900/50 dark:bg-red-950/20 dark:text-red-300">
                  {error}
                </div>
              )}

              <button
                onClick={
                  continueToSlots
                }
                className="mt-7 w-full rounded-xl bg-[#14532d] py-4 text-sm font-black text-white shadow-xl shadow-green-900/15 transition duration-300 hover:-translate-y-0.5 hover:bg-[#0f4224]"
              >
                Continue →
              </button>
            </div>
          )}

          {/* STEP 2 */}

          {step === 2 && (
            <div className="rounded-[1.75rem] border border-gray-200 bg-white p-7 shadow-sm dark:border-[#29362e] dark:bg-[#111913] sm:p-9">

              <p className="text-[9px] font-black uppercase tracking-[0.25em] text-green-700 dark:text-green-400">
                Step 02
              </p>

              <h2 className="mt-2 text-2xl font-black text-gray-950 dark:text-white">
                Select Time Slot
              </h2>

              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Choose a convenient procurement window.
              </p>

              <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {slots.map(
                  (slot, index) => {
                    const isSelected =
                      selectedSlot ===
                      slot;

                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => {
                          setSelectedSlot(
                            slot
                          );
                          setError("");
                        }}
                        className={`rounded-2xl border p-5 text-left transition ${
                          isSelected
                            ? "border-green-600 bg-green-50 dark:border-green-500 dark:bg-green-950/30"
                            : "border-gray-200 bg-white hover:border-green-300 hover:bg-green-50 dark:border-[#29362e] dark:bg-[#111913]"
                        }`}
                      >
                        <p className="text-sm font-black text-gray-900 dark:text-white">
                          {slot}
                        </p>

                        <p className="mt-2 text-xs text-gray-400">
                          {index % 3 ===
                          0
                            ? "More availability"
                            : "Available"}
                        </p>
                      </button>
                    );
                  }
                )}
              </div>

              {error && (
                <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 dark:border-red-900/50 dark:bg-red-950/20 dark:text-red-300">
                  {error}
                </div>
              )}

              <div className="mt-7 flex gap-3">
                <button
                  onClick={() => {
                    setStep(1);
                    setError("");
                  }}
                  className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-bold text-gray-600 hover:bg-gray-100 dark:border-[#29362e] dark:text-gray-300 dark:hover:bg-[#172019]"
                >
                  ← Back
                </button>

                <button
                  onClick={
                    confirmBooking
                  }
                  disabled={
                    !selectedSlot
                  }
                  className="flex-1 rounded-xl bg-[#14532d] px-6 py-3 text-sm font-black text-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Confirm Booking →
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 */}

          {step === 3 &&
            booking && (
              <BookingConfirmation
                booking={booking}
              />
            )}
        </div>
      </div>
    </main>
  );
}

/* =========================================================
   BOOKING CONFIRMATION
========================================================= */

function BookingConfirmation({
  booking,
}) {
  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-gray-200 bg-white shadow-sm dark:border-[#29362e] dark:bg-[#111913]">

      <div className="relative overflow-hidden bg-[#14532d] p-8 text-center text-white sm:p-10">

        <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full border-[40px] border-white/[0.04]" />

        <div className="relative">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-2xl">
            ✓
          </div>

          <p className="mt-5 text-[10px] font-black uppercase tracking-[0.25em] text-green-200">
            Booking Confirmed
          </p>

          <p className="mt-2 text-5xl font-black sm:text-6xl">
            {booking.token}
          </p>

          <p className="mt-2 text-xs text-green-200">
            Your digital token
          </p>
        </div>
      </div>

      <div className="p-7 sm:p-9">

        <div className="grid gap-4 sm:grid-cols-2">

          <Info
            label="Crop"
            value={booking.crop}
          />

          <Info
            label="Quantity"
            value={`${booking.quantity} ${booking.unit}`}
          />

          <Info
            label="Procurement Centre"
            value={booking.centre}
          />

          <Info
            label="Date"
            value={formatDate(
              booking.date
            )}
          />

          <Info
            label="Selected Slot"
            value={booking.slot}
          />

          <Info
            label="Queue Position"
            value={`#${booking.queuePosition}`}
          />

          <Info
            label="Estimated Waiting Time"
            value={
              booking.estimatedWaitTime ||
              formatWaitingTime(
                booking.estimatedWaitMinutes
              )
            }
          />

          <Info
            label="Recommended Arrival"
            value={
              booking.recommendedArrivalTime ||
              "—"
            }
          />
        </div>

        <div className="mt-7 rounded-2xl border border-green-200 bg-green-50 p-5 dark:border-green-900/40 dark:bg-green-950/20">

          <div className="flex items-start gap-4">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-600 text-sm text-white">
              ⏱
            </div>

            <div>
              <p className="text-sm font-black text-green-800 dark:text-green-300">
                Waiting time predicted
              </p>

              <p className="mt-1 text-xs leading-5 text-green-700 dark:text-green-400">
                Estimated wait:{" "}
                <strong>
                  {booking.estimatedWaitTime}
                </strong>
                . You can plan your arrival accordingly.
              </p>
            </div>

          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">

          <Link
            href="/dashboard"
            className="rounded-xl bg-[#14532d] px-5 py-3 text-sm font-black text-white"
          >
            Go to Dashboard
          </Link>

          <Link
            href="/queue"
            className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-bold text-gray-700 dark:border-[#29362e] dark:text-gray-300"
          >
            View Queue
          </Link>

        </div>
      </div>
    </div>
  );
}

/* =========================================================
   SMALL COMPONENTS
========================================================= */

function Step({
  number,
  title,
  active,
}) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`flex h-9 w-9 items-center justify-center rounded-xl text-xs font-black ${
          active
            ? "bg-green-600 text-white"
            : "bg-gray-100 text-gray-400 dark:bg-[#1d2921]"
        }`}
      >
        {active ? "✓" : number}
      </div>

      <span
        className={`hidden text-xs font-bold sm:block ${
          active
            ? "text-green-700 dark:text-green-400"
            : "text-gray-400"
        }`}
      >
        {title}
      </span>
    </div>
  );
}

function Field({
  label,
  children,
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-gray-700 dark:text-gray-300">
        {label}
      </span>

      {children}
    </label>
  );
}

function Info({
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