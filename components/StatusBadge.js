"use client";

const styles = {
  open: "bg-green-100 text-green-700 border-green-200 dark:bg-green-950/30 dark:text-green-300 dark:border-green-900/40",
  filling:
    "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-950/30 dark:text-yellow-300 dark:border-yellow-900/40",
  full: "bg-red-100 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-300 dark:border-red-900/40",

  booked:
    "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-900/40",

  "checked-in":
    "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-950/30 dark:text-yellow-300 dark:border-yellow-900/40",

  weighed:
    "bg-green-100 text-green-700 border-green-200 dark:bg-green-950/30 dark:text-green-300 dark:border-green-900/40",

  completed:
    "bg-green-600 text-white border-green-600",

  pending:
    "bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700",

  processing:
    "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-950/30 dark:text-yellow-300 dark:border-yellow-900/40",

  paid:
    "bg-green-100 text-green-700 border-green-200 dark:bg-green-950/30 dark:text-green-300 dark:border-green-900/40",
};

const labels = {
  open: "Open",
  filling: "Filling up",
  full: "Full",

  booked: "Booked",
  "checked-in": "Checked in",
  weighed: "Weighed",
  completed: "Completed",

  pending: "Pending",
  processing: "Processing",
  paid: "Paid",
};

export default function StatusBadge({ status }) {
  const safeStatus = status || "pending";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-bold ${
        styles[safeStatus] ||
        "border-gray-200 bg-gray-100 text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />

      {labels[safeStatus] || safeStatus}
    </span>
  );
}