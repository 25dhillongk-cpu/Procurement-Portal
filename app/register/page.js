"use client";

import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    farmerId: "",
    village: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    alert(
      `Registration submitted!\nWelcome ${formData.name}`
    );
  };

  return (
    <main className="min-h-screen bg-[#f7faf7]">

      {/* NAVBAR */}
      <nav className="border-b border-green-100 bg-white">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          <Link href="/" className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-700 text-2xl">
              🌾
            </div>

            <div>
              <h1 className="text-xl font-bold text-green-800">
                KisanSetu
              </h1>

              <p className="text-xs text-gray-500">
                Smart Procurement
              </p>
            </div>

          </Link>

          <Link
            href="/login"
            className="text-sm font-medium text-gray-600 hover:text-green-700"
          >
            Already registered? Login
          </Link>

        </div>

      </nav>


      {/* MAIN */}
      <div className="mx-auto max-w-6xl px-6 py-12">

        <div className="grid overflow-hidden rounded-3xl bg-white shadow-xl md:grid-cols-5">

          {/* LEFT INFORMATION */}
          <div className="bg-green-800 p-8 text-white md:col-span-2 md:p-10">

            <div className="text-5xl">
              👨‍🌾
            </div>

            <h1 className="mt-7 text-3xl font-extrabold leading-tight">
              Join KisanSetu
            </h1>

            <p className="mt-4 leading-7 text-green-100">
              Create your farmer account and access a simpler,
              more transparent procurement process.
            </p>


            <div className="mt-10 space-y-5">

              <Benefit
                number="01"
                title="Register"
                text="Create your digital farmer profile."
              />

              <Benefit
                number="02"
                title="Book a Slot"
                text="Choose a procurement centre and available slot."
              />

              <Benefit
                number="03"
                title="Get Your Token"
                text="Receive a digital token and track your queue."
              />

              <Benefit
                number="04"
                title="Track Procurement"
                text="Follow quality testing, procurement and payment."
              />

            </div>

          </div>


          {/* FORM */}
          <div className="p-8 md:col-span-3 md:p-10">

            <h2 className="text-2xl font-extrabold text-gray-900">
              Farmer Registration
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Enter your details to create your account.
            </p>


            <form
              onSubmit={handleSubmit}
              className="mt-8 grid gap-5 sm:grid-cols-2"
            >

              {/* NAME */}
              <div className="sm:col-span-2">

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition focus:border-green-600 focus:bg-white focus:ring-2 focus:ring-green-100"
                />

              </div>


              {/* MOBILE */}
              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Mobile Number
                </label>

                <input
                  type="tel"
                  name="mobile"
                  placeholder="10-digit mobile number"
                  value={formData.mobile}
                  onChange={handleChange}
                  maxLength={10}
                  required
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition focus:border-green-600 focus:bg-white focus:ring-2 focus:ring-green-100"
                />

              </div>


              {/* FARMER ID */}
              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Farmer ID
                </label>

                <input
                  type="text"
                  name="farmerId"
                  placeholder="Enter Farmer ID"
                  value={formData.farmerId}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition focus:border-green-600 focus:bg-white focus:ring-2 focus:ring-green-100"
                />

              </div>


              {/* VILLAGE */}
              <div className="sm:col-span-2">

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Village / Location
                </label>

                <input
                  type="text"
                  name="village"
                  placeholder="Enter your village or location"
                  value={formData.village}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition focus:border-green-600 focus:bg-white focus:ring-2 focus:ring-green-100"
                />

              </div>


              {/* PASSWORD */}
              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  placeholder="Create password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition focus:border-green-600 focus:bg-white focus:ring-2 focus:ring-green-100"
                />

              </div>


              {/* CONFIRM PASSWORD */}
              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Confirm Password
                </label>

                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition focus:border-green-600 focus:bg-white focus:ring-2 focus:ring-green-100"
                />

              </div>


              {/* TERMS */}
              <div className="sm:col-span-2">

                <label className="flex items-start gap-3">

                  <input
                    type="checkbox"
                    required
                    className="mt-1 h-4 w-4 accent-green-700"
                  />

                  <span className="text-sm leading-6 text-gray-500">
                    I agree to the terms and conditions and confirm
                    that the information provided is accurate.
                  </span>

                </label>

              </div>


              {/* SUBMIT */}
              <div className="sm:col-span-2">

                <button
                  type="submit"
                  className="w-full rounded-xl bg-green-700 py-3.5 font-bold text-white shadow-lg shadow-green-700/20 transition hover:bg-green-800"
                >
                  Create Farmer Account →
                </button>

              </div>

            </form>


            {/* LOGIN */}
            <p className="mt-7 text-center text-sm text-gray-500">

              Already have an account?{" "}

              <Link
                href="/login"
                className="font-bold text-green-700 hover:underline"
              >
                Login
              </Link>

            </p>

          </div>

        </div>

      </div>

    </main>
  );
}


/* ================= BENEFIT COMPONENT ================= */

function Benefit({ number, title, text }) {
  return (
    <div className="flex gap-4">

      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-green-700 text-xs font-bold">
        {number}
      </div>

      <div>
        <h3 className="font-bold">
          {title}
        </h3>

        <p className="mt-1 text-sm leading-6 text-green-100">
          {text}
        </p>
      </div>

    </div>
  );
}