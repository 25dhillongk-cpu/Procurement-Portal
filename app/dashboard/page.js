"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  const [farmer, setFarmer] = useState(null);
  const [booking, setBooking] = useState(null);
  const [showBooking, setShowBooking] = useState(false);

  const [form, setForm] = useState({
    crop: "",
    quantity: "",
    unit: "Quintal",
    centre: "",
    date: "",
    slot: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    const loggedIn = localStorage.getItem("kisanSetuLoggedIn");
    const storedFarmer = localStorage.getItem("kisanSetuFarmer");
    const storedBooking = localStorage.getItem("kisanSetuBooking");

    if (loggedIn !== "true" || !storedFarmer) {
      router.push("/login");
      return;
    }

    setFarmer(JSON.parse(storedFarmer));

    if (storedBooking) {
      setBooking(JSON.parse(storedBooking));
    }
  }, [router]);


  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setError("");
  }


  function generateToken() {
    const letters = "ABCDEFGHJKLMNPQRSTUVWXYZ";
    const firstLetter =
      letters[Math.floor(Math.random() * letters.length)];

    const number = Math.floor(100 + Math.random() * 900);

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
      setError("Please complete all booking details.");
      return;
    }

    const newBooking = {
      id: crypto.randomUUID(),
      token: generateToken(),
      crop: form.crop,
      quantity: form.quantity,
      unit: form.unit,
      centre: form.centre,
      date: form.date,
      slot: form.slot,
      status: "Booked",
      queuePosition: Math.floor(Math.random() * 8) + 1,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(
      "kisanSetuBooking",
      JSON.stringify(newBooking)
    );

    setBooking(newBooking);
    setShowBooking(false);

    setForm({
      crop: "",
      quantity: "",
      unit: "Quintal",
      centre: "",
      date: "",
      slot: "",
    });
  }


  function logout() {
    localStorage.removeItem("kisanSetuLoggedIn");
    router.push("/");
  }


  if (!farmer) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f5f8f4]">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 animate-pulse items-center justify-center rounded-2xl bg-green-100 text-2xl">
            🌾
          </div>

          <p className="mt-4 text-sm font-semibold text-gray-500">
            Loading your dashboard...
          </p>
        </div>
      </main>
    );
  }


  return (
    <main className="min-h-screen bg-[#f5f8f4]">

      {/* ================= NAVBAR ================= */}

      <nav className="sticky top-0 z-50 border-b border-green-100 bg-white/95 backdrop-blur">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">

          <Link href="/" className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-700 text-xl">
              🌾
            </div>

            <div>
              <h1 className="font-extrabold text-green-800">
                KisanSetu
              </h1>

              <p className="text-[9px] uppercase tracking-wider text-gray-400">
                Farmer Portal
              </p>
            </div>

          </Link>


          <div className="flex items-center gap-3">

            <div className="hidden text-right sm:block">

              <p className="text-sm font-bold text-gray-800">
                {farmer.name}
              </p>

              <p className="text-xs text-gray-400">
                Farmer ID: {farmer.farmerId}
              </p>

            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-lg">
              👨‍🌾
            </div>

            <button
              onClick={logout}
              className="ml-1 rounded-xl px-3 py-2 text-xs font-bold text-gray-500 transition hover:bg-red-50 hover:text-red-600"
            >
              Logout
            </button>

          </div>

        </div>

      </nav>


      {/* ================= DASHBOARD ================= */}

      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">

        {/* Greeting */}

        <div className="mb-8">

          <p className="text-sm font-semibold text-green-700">
            FARMER DASHBOARD
          </p>

          <h1 className="mt-1 text-3xl font-black text-gray-900 sm:text-4xl">
            Welcome, {farmer.name.split(" ")[0]} 👋
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Manage your procurement journey from one place.
          </p>

        </div>


        {/* ================= PROFILE STRIP ================= */}

        <div className="mb-7 rounded-3xl border border-green-100 bg-white p-5 shadow-sm">

          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

            <div className="flex items-center gap-4">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-2xl">
                👨‍🌾
              </div>

              <div>

                <h2 className="font-extrabold text-gray-900">
                  {farmer.name}
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                  {farmer.village} • {farmer.mobile}
                </p>

              </div>

            </div>

            <div className="flex flex-wrap gap-3">

              <ProfileBadge
                label="Farmer ID"
                value={farmer.farmerId}
              />

              <ProfileBadge
                label="Account"
                value="Active"
              />

            </div>

          </div>

        </div>


        {/* ================= STAT CARDS ================= */}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <StatCard
            icon="🎫"
            title="Current Token"
            value={booking ? booking.token : "—"}
            background="bg-green-50"
          />

          <StatCard
            icon="📍"
            title="Procurement Centre"
            value={booking ? booking.centre : "Not booked"}
            background="bg-blue-50"
          />

          <StatCard
            icon="🌾"
            title="Crop"
            value={booking ? booking.crop : "Not added"}
            background="bg-orange-50"
          />

          <StatCard
            icon="📊"
            title="Status"
            value={booking ? booking.status : "No booking"}
            background="bg-purple-50"
          />

        </div>


        {/* ================= MAIN GRID ================= */}

        <div className="mt-7 grid gap-7 lg:grid-cols-3">

          {/* BOOKING / TOKEN */}

          <div className="lg:col-span-2">

            {!booking ? (

              <div className="rounded-[2rem] border border-gray-100 bg-white p-7 shadow-sm sm:p-9">

                <div className="flex flex-col justify-between gap-5 sm:flex-row">

                  <div>

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-xl">
                      📅
                    </div>

                    <h2 className="mt-5 text-2xl font-black text-gray-900">
                      Book your procurement slot
                    </h2>

                    <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">
                      Enter your produce details and choose a centre
                      and time slot. Your unique token will be generated
                      automatically.
                    </p>

                  </div>

                </div>

                <button
                  onClick={() => setShowBooking(true)}
                  className="mt-7 rounded-xl bg-green-700 px-6 py-3.5 font-bold text-white shadow-lg shadow-green-700/20 transition hover:-translate-y-0.5 hover:bg-green-800"
                >
                  Start Booking →
                </button>

              </div>

            ) : (

              <div className="overflow-hidden rounded-[2rem] border border-green-100 bg-white shadow-sm">

                {/* TOKEN HEADER */}

                <div className="bg-gradient-to-br from-green-700 to-green-900 p-7 text-white sm:p-9">

                  <div className="flex items-start justify-between">

                    <div>

                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-green-200">
                        Booking Confirmed
                      </p>

                      <h2 className="mt-2 text-2xl font-black">
                        Your Digital Token
                      </h2>

                    </div>

                    <div className="rounded-xl bg-white/10 px-3 py-2 text-xs font-bold">
                      {booking.status}
                    </div>

                  </div>


                  <div className="mt-8">

                    <p className="text-xs font-semibold uppercase tracking-wider text-green-200">
                      Token Number
                    </p>

                    <p className="mt-1 text-6xl font-black tracking-tight">
                      {booking.token}
                    </p>

                  </div>

                </div>


                {/* DETAILS */}

                <div className="p-7 sm:p-9">

                  <div className="grid gap-5 sm:grid-cols-2">

                    <Detail
                      icon="🌾"
                      label="Crop"
                      value={booking.crop}
                    />

                    <Detail
                      icon="⚖️"
                      label="Quantity"
                      value={`${booking.quantity} ${booking.unit}`}
                    />

                    <Detail
                      icon="📍"
                      label="Procurement Centre"
                      value={booking.centre}
                    />

                    <Detail
                      icon="📅"
                      label="Date"
                      value={formatDate(booking.date)}
                    />

                    <Detail
                      icon="⏰"
                      label="Selected Slot"
                      value={booking.slot}
                    />

                    <Detail
                      icon="👥"
                      label="Queue Position"
                      value={`#${booking.queuePosition}`}
                    />

                  </div>


                  {/* STATUS */}

                  <div className="mt-7 rounded-2xl bg-green-50 p-5">

                    <div className="flex items-center gap-4">

                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-600 text-white">
                        ✓
                      </div>

                      <div>

                        <p className="font-bold text-green-800">
                          Booking successfully created
                        </p>

                        <p className="mt-1 text-xs text-green-700">
                          Keep your token handy when you arrive at
                          the procurement centre.
                        </p>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            )}

          </div>


          {/* PROFILE / JOURNEY */}

          <div className="rounded-[2rem] border border-gray-100 bg-white p-7 shadow-sm">

            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-green-700">
              Your Journey
            </p>

            <h2 className="mt-2 text-xl font-black text-gray-900">
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
                completed={!!booking}
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


      {/* ================= BOOKING MODAL ================= */}

      {showBooking && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-5 backdrop-blur-sm">

          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] bg-white shadow-2xl">

            <div className="sticky top-0 border-b border-gray-100 bg-white p-6 sm:p-7">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-green-700">
                    New Booking
                  </p>

                  <h2 className="mt-1 text-2xl font-black text-gray-900">
                    Book Procurement Slot
                  </h2>
                </div>

                <button
                  onClick={() => setShowBooking(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-500 transition hover:bg-gray-200"
                >
                  ✕
                </button>

              </div>

            </div>


            <form
              onSubmit={handleBooking}
              className="space-y-5 p-6 sm:p-7"
            >

              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                  {error}
                </div>
              )}


              {/* CROP */}

              <div>

                <label className="mb-2 block text-sm font-bold text-gray-700">
                  Crop
                </label>

                <select
                  name="crop"
                  value={form.crop}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-100"
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


              {/* QUANTITY */}

              <div className="grid gap-5 sm:grid-cols-2">

                <div>

                  <label className="mb-2 block text-sm font-bold text-gray-700">
                    Quantity
                  </label>

                  <input
                    type="number"
                    min="1"
                    name="quantity"
                    value={form.quantity}
                    onChange={handleChange}
                    placeholder="Enter quantity"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-100"
                  />

                </div>


                <div>

                  <label className="mb-2 block text-sm font-bold text-gray-700">
                    Unit
                  </label>

                  <select
                    name="unit"
                    value={form.unit}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-100"
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


              {/* CENTRE */}

              <div>

                <label className="mb-2 block text-sm font-bold text-gray-700">
                  Procurement Centre
                </label>

                <select
                  name="centre"
                  value={form.centre}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-100"
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


              {/* DATE */}

              <div>

                <label className="mb-2 block text-sm font-bold text-gray-700">
                  Preferred Date
                </label>

                <input
                  type="date"
                  name="date"
                  min={new Date().toISOString().split("T")[0]}
                  value={form.date}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-100"
                />

              </div>


              {/* SLOT */}

              <div>

                <label className="mb-3 block text-sm font-bold text-gray-700">
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
                  ].map((slot) => (

                    <button
                      key={slot}
                      type="button"
                      onClick={() =>
                        setForm({
                          ...form,
                          slot,
                        })
                      }
                      className={`rounded-xl border px-3 py-3 text-xs font-bold transition ${
                        form.slot === slot
                          ? "border-green-600 bg-green-700 text-white"
                          : "border-gray-200 bg-gray-50 text-gray-600 hover:border-green-300 hover:bg-green-50"
                      }`}
                    >
                      {slot}
                    </button>

                  ))}

                </div>

              </div>


              {/* SUBMIT */}

              <button
                type="submit"
                className="w-full rounded-xl bg-green-700 py-4 font-bold text-white shadow-lg shadow-green-700/20 transition hover:bg-green-800"
              >
                Confirm Booking & Generate Token →
              </button>

            </form>

          </div>

        </div>
      )}

    </main>
  );
}


/* ================= COMPONENTS ================= */

function ProfileBadge({ label, value }) {
  return (
    <div className="rounded-xl bg-gray-50 px-4 py-2">
      <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
        {label}
      </p>

      <p className="mt-0.5 text-xs font-bold text-gray-700">
        {value}
      </p>
    </div>
  );
}


function StatCard({ icon, title, value, background }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

      <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${background}`}>
        {icon}
      </div>

      <p className="mt-4 text-xs font-semibold text-gray-400">
        {title}
      </p>

      <p className="mt-1 truncate text-lg font-black text-gray-900">
        {value}
      </p>

    </div>
  );
}


function Detail({ icon, label, value }) {
  return (
    <div className="rounded-2xl bg-gray-50 p-4">

      <div className="flex items-center gap-3">

        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-sm shadow-sm">
          {icon}
        </div>

        <div className="min-w-0">

          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
            {label}
          </p>

          <p className="mt-1 truncate text-sm font-bold text-gray-800">
            {value}
          </p>

        </div>

      </div>

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
          className={`flex h-9 w-9 items-center justify-center rounded-xl text-xs font-black ${
            completed
              ? "bg-green-600 text-white"
              : "bg-gray-100 text-gray-400"
          }`}
        >
          {completed ? "✓" : number}
        </div>

        {!last && (
          <div
            className={`mt-1 h-8 w-px ${
              completed ? "bg-green-300" : "bg-gray-200"
            }`}
          />
        )}

      </div>

      <div className="pt-1">

        <p
          className={`text-sm font-bold ${
            completed ? "text-green-700" : "text-gray-400"
          }`}
        >
          {title}
        </p>

        <p className="mt-1 text-xs text-gray-400">
          {completed ? "Completed" : "Pending"}
        </p>

      </div>

    </div>
  );
}


function formatDate(date) {
  if (!date) return "";

  return new Date(date + "T00:00:00").toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  );
}