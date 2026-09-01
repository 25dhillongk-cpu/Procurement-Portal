"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ThemeToggle from "../../components/ThemeToggle";

const states = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    farmerId: "",
    village: "",
    state: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");

    if (!formData.name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!/^\d{10}$/.test(formData.mobile)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!formData.farmerId.trim()) {
      setError("Please enter your Farmer ID.");
      return;
    }

    if (!formData.village.trim()) {
      setError("Please enter your village or location.");
      return;
    }

    if (!formData.state) {
      setError("Please select your state.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          mobile: formData.mobile,
          farmerId: formData.farmerId,
          village: formData.village,
          state: formData.state,
          password: formData.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(
          result.message || "Registration failed. Please try again."
        );
        return;
      }

      router.push("/login");
    } catch (error) {
      console.error("Registration error:", error);

      setError(
        "Unable to connect to the server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f4f7f3] text-[#172019] transition-colors duration-300 dark:bg-[#080d0a] dark:text-[#edf5ef]">

      {/* NAVBAR */}
      <nav className="fixed left-0 right-0 top-0 z-50 px-4 pt-4 sm:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-white/70 bg-white/95 px-4 py-3 shadow-lg shadow-black/5 backdrop-blur-xl dark:border-[#29372e] dark:bg-[#111813]/95 sm:px-6">

          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#14532d] text-xs font-black text-white">
              KS
            </div>

            <div>
              <p className="text-[17px] font-black tracking-tight text-green-800 dark:text-green-400">
                KisanSetu
              </p>

              <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
                Smart Procurement
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <ThemeToggle />

            <Link
              href="/login"
              className="hidden rounded-xl px-3 py-2 text-sm font-bold text-gray-600 transition hover:bg-green-50 hover:text-green-800 dark:text-gray-400 dark:hover:bg-green-950/40 dark:hover:text-green-300 sm:block"
            >
              Already registered? Login
            </Link>
          </div>
        </div>
      </nav>

      {/* MAIN */}
      <div className="relative mx-auto max-w-6xl px-5 pb-12 pt-32 sm:px-8">

        <div className="pointer-events-none absolute left-[-15rem] top-20 h-[30rem] w-[30rem] rounded-full bg-green-200/40 blur-3xl dark:bg-green-950/20" />

        <div className="relative grid overflow-hidden rounded-[2rem] border border-gray-200 bg-white shadow-2xl shadow-green-950/10 dark:border-[#29372e] dark:bg-[#111813] md:grid-cols-5">

          {/* LEFT */}
          <div className="relative overflow-hidden bg-[#173d25] p-8 text-white md:col-span-2 md:p-10">

            <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full border-[35px] border-white/[0.04]" />

            <div className="relative">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-xs font-black">
                KS
              </div>

              <p className="mt-10 text-[9px] font-black uppercase tracking-[0.25em] text-green-300">
                Farmer Registration
              </p>

              <h1 className="mt-4 text-4xl font-black leading-tight">
                Begin your
                <br />
                digital journey.
              </h1>

              <p className="mt-5 text-sm leading-7 text-green-100">
                Create your farmer account to access the
                KisanSetu procurement platform.
              </p>

            </div>

            <div className="relative mt-10 space-y-5">

              <Benefit
                number="01"
                title="Register"
                text="Create your digital farmer profile."
              />

              <Benefit
                number="02"
                title="Schedule"
                text="Choose an available procurement slot."
              />

              <Benefit
                number="03"
                title="Token"
                text="Receive your digital queue token."
              />

              <Benefit
                number="04"
                title="Track"
                text="Follow your procurement journey."
              />

            </div>
          </div>

          {/* FORM */}
          <div className="p-7 md:col-span-3 sm:p-10 lg:p-12">

            <div className="mx-auto max-w-xl">

              <p className="text-[9px] font-black uppercase tracking-[0.25em] text-green-700 dark:text-green-400">
                Create account
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                Farmer Registration
              </h2>

              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Enter your details to create your account.
              </p>

              {error && (
                <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700 dark:border-red-900/50 dark:bg-red-950/20 dark:text-red-300">
                  {error}
                </div>
              )}

              <form
                onSubmit={handleSubmit}
                className="mt-8 grid gap-5 sm:grid-cols-2"
              >

                <Field
                  label="Full Name"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="sm:col-span-2"
                />

                <Field
                  label="Mobile Number"
                  name="mobile"
                  type="tel"
                  placeholder="10-digit mobile number"
                  value={formData.mobile}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      mobile: e.target.value.replace(/\D/g, ""),
                    }));
                    setError("");
                  }}
                  maxLength={10}
                  required
                  disabled={loading}
                />

                <Field
                  label="Farmer ID"
                  name="farmerId"
                  placeholder="Enter Farmer ID"
                  value={formData.farmerId}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />

                <Field
                  label="Village / Location"
                  name="village"
                  placeholder="Enter village or location"
                  value={formData.village}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />

                {/* STATE */}
                <div>
                  <label className="mb-2 block text-sm font-bold text-gray-700 dark:text-gray-300">
                    State
                  </label>

                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-4 text-sm text-gray-900 outline-none transition focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-[#2a372e] dark:bg-[#151f18] dark:text-white dark:focus:border-green-500 dark:focus:bg-[#151f18] dark:focus:ring-green-950/40"
                  >
                    <option value="">Select your state</option>

                    {states.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>

                <Field
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="Create password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />

                <Field
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />

                <div className="sm:col-span-2">

                  <label className="flex items-start gap-3">

                    <input
                      type="checkbox"
                      required
                      disabled={loading}
                      className="mt-1 h-4 w-4 accent-green-700"
                    />

                    <span className="text-sm leading-6 text-gray-500 dark:text-gray-400">
                      I agree to the terms and conditions and
                      confirm that the information provided is
                      accurate.
                    </span>

                  </label>

                </div>

                <div className="sm:col-span-2">

                  <button
                    type="submit"
                    disabled={loading}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#14532d] py-4 text-sm font-black text-white shadow-xl shadow-green-900/15 transition duration-300 hover:-translate-y-0.5 hover:bg-[#0f4224] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Creating account...
                      </>
                    ) : (
                      <>
                        Create Farmer Account
                        <span>→</span>
                      </>
                    )}
                  </button>

                </div>

              </form>

              <div className="mt-7 border-t border-gray-100 pt-6 text-center dark:border-[#29372e]">

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Already have an account?
                </p>

                <Link
                  href="/login"
                  className="mt-2 inline-block text-sm font-black text-green-700 hover:underline dark:text-green-400"
                >
                  Login →
                </Link>

              </div>

            </div>
          </div>

        </div>
      </div>
    </main>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  disabled = false,
  maxLength,
  className = "",
}) {
  return (
    <div className={className}>

      <label className="mb-2 block text-sm font-bold text-gray-700 dark:text-gray-300">
        {label}
      </label>

      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        maxLength={maxLength}
        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-[#2a372e] dark:bg-[#151f18] dark:text-white dark:focus:border-green-500 dark:focus:bg-[#151f18] dark:focus:ring-green-950/40"
      />

    </div>
  );
}

function Benefit({ number, title, text }) {
  return (
    <div className="flex gap-4">

      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-[10px] font-black">
        {number}
      </div>

      <div>
        <h3 className="text-sm font-bold">
          {title}
        </h3>

        <p className="mt-1 text-xs leading-5 text-green-200">
          {text}
        </p>
      </div>

    </div>
  );
}