"use client";

import { useMemo, useState } from "react";
import { centres, slots } from "@/lib/mock-data";
import { Slot } from "@/lib/types";
import StatusBadge from "@/components/StatusBadge";

export default function BookSlotPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [farmerName, setFarmerName] = useState("");
  const [farmerId, setFarmerId] = useState("");
  const [phone, setPhone] = useState("");
  const [centreId, setCentreId] = useState(centres[0].id);
  const [crop, setCrop] = useState("");
  const [quantity, setQuantity] = useState("");
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [confirmedToken, setConfirmedToken] = useState<string | null>(null);

  const centre = centres.find((c) => c.id === centreId)!;
  const centreSlots = useMemo(
    () => slots.filter((s) => s.centreId === centreId),
    [centreId]
  );

  const groupedByDate = useMemo(() => {
    const groups: Record<string, Slot[]> = {};
    for (const s of centreSlots) {
      groups[s.date] = groups[s.date] ? [...groups[s.date], s] : [s];
    }
    return groups;
  }, [centreSlots]);

  function handleDetailsSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStep(2);
  }

  function handleConfirmBooking() {
    const prefix = centre.name.split(" ")[0].slice(0, 3).toUpperCase();
    const token = `${prefix}-${Math.floor(1000 + Math.random() * 9000)}`;
    setConfirmedToken(token);
    setStep(3);
  }

  return (
    <div className="px-6 md:px-12 py-12 md:py-16 max-w-3xl">
      <p className="text-xs uppercase tracking-wide text-mist mb-3">Step {step} of 3</p>
      <h1 className="font-display text-3xl md:text-4xl text-ink mb-8">Book a procurement slot</h1>

      <ol className="flex items-center gap-2 mb-10 text-sm">
        {["Your details", "Choose a slot", "Confirmation"].map((label, i) => {
          const n = (i + 1) as 1 | 2 | 3;
          return (
            <li key={label} className="flex items-center gap-2">
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs border ${
                  step >= n ? "bg-pasture text-paper border-pasture" : "border-ink/20 text-ink/40"
                }`}
              >
                {n}
              </span>
              <span className={step >= n ? "text-ink" : "text-ink/40"}>{label}</span>
              {i < 2 && <span className="w-8 h-px bg-ink/15 mx-1" />}
            </li>
          );
        })}
      </ol>

      {step === 1 && (
        <form onSubmit={handleDetailsSubmit} className="space-y-6 border hairline rounded-token p-6 md:p-8 bg-ledger/40">
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Full name">
              <input
                required
                value={farmerName}
                onChange={(e) => setFarmerName(e.target.value)}
                placeholder="As on your farmer registration"
                className="input"
              />
            </Field>
            <Field label="Farmer ID">
              <input
                required
                value={farmerId}
                onChange={(e) => setFarmerId(e.target.value)}
                placeholder="e.g. HRY-9284-1123"
                className="input"
              />
            </Field>
            <Field label="Mobile number">
              <input
                required
                type="tel"
                pattern="[0-9]{10}"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="10-digit number for SMS updates"
                className="input"
              />
            </Field>
            <Field label="Procurement centre">
              <select
                value={centreId}
                onChange={(e) => setCentreId(e.target.value)}
                className="input"
              >
                {centres.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Crop">
              <select required value={crop} onChange={(e) => setCrop(e.target.value)} className="input">
                <option value="" disabled>
                  Select crop
                </option>
                {centre.cropsAccepted.map((cr) => (
                  <option key={cr} value={cr}>
                    {cr}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Expected quantity (quintals)">
              <input
                required
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="e.g. 30"
                className="input"
              />
            </Field>
          </div>
          <button
            type="submit"
            className="bg-pasture text-paper px-5 py-3 rounded-token font-medium hover:bg-pasture-light transition-colors"
          >
            Continue to slot selection
          </button>
        </form>
      )}

      {step === 2 && (
        <div>
          <p className="text-ink/70 mb-6">
            Slots at <span className="text-ink font-medium">{centre.name}</span> for {crop || "your crop"}.
            Pick a window — each slot holds a fixed number of farmers so your wait stays predictable.
          </p>
          <div className="space-y-8">
            {Object.entries(groupedByDate).map(([date, daySlots]) => (
              <div key={date}>
                <p className="text-sm font-medium text-ink mb-3">
                  {new Date(date).toLocaleDateString("en-IN", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                  })}
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {daySlots.map((slot) => {
                    const isFull = slot.status === "full";
                    const isSelected = selectedSlot?.id === slot.id;
                    return (
                      <button
                        key={slot.id}
                        disabled={isFull}
                        onClick={() => setSelectedSlot(slot)}
                        className={`text-left border rounded-token p-4 transition-colors ${
                          isFull
                            ? "opacity-50 cursor-not-allowed hairline"
                            : isSelected
                            ? "border-pasture bg-pasture/5"
                            : "hairline hover:border-ink/40"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-ink">{slot.time}</span>
                          <StatusBadge status={slot.status} />
                        </div>
                        <p className="text-sm text-ink/60 mt-1">
                          {slot.capacity - slot.booked} of {slot.capacity} places left
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex gap-3">
            <button
              onClick={() => setStep(1)}
              className="border hairline px-5 py-3 rounded-token font-medium text-ink hover:bg-ledger transition-colors"
            >
              Back
            </button>
            <button
              disabled={!selectedSlot}
              onClick={handleConfirmBooking}
              className="bg-pasture text-paper px-5 py-3 rounded-token font-medium hover:bg-pasture-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Confirm booking
            </button>
          </div>
        </div>
      )}

      {step === 3 && confirmedToken && selectedSlot && (
        <div className="border hairline rounded-token p-8 bg-ledger/40 text-center">
          <p className="text-sm text-mist mb-2">Booking confirmed</p>
          <p className="font-display text-5xl text-ink mb-4">{confirmedToken}</p>
          <p className="text-ink/70 max-w-[45ch] mx-auto">
            An SMS with this token has been sent to {phone || "your registered number"}. Arrive at{" "}
            {centre.name} on {new Date(selectedSlot.date).toLocaleDateString("en-IN", { day: "numeric", month: "long" })}{" "}
            during {selectedSlot.time}.
          </p>
          <a
            href="/queue"
            className="inline-block mt-6 bg-pasture text-paper px-5 py-3 rounded-token font-medium hover:bg-pasture-light transition-colors"
          >
            View queue status
          </a>
        </div>
      )}

      <style jsx global>{`
        .input {
          width: 100%;
          background: #f7f1e4;
          border: 1px solid #241f1826;
          border-radius: 4px;
          padding: 0.65rem 0.8rem;
          font-size: 0.95rem;
          color: #241f18;
        }
        .input:focus {
          border-color: #2f4a34;
        }
      `}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-sm text-ink/70 mb-1.5">{label}</span>
      {children}
    </label>
  );
}
