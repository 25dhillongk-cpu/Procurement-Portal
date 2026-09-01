/*
  ============================================================
  KISANSETU WAITING TIME PREDICTION ENGINE
  ============================================================

  Current prototype prediction uses:
  - Queue position
  - Procurement centre
  - Crop
  - Quantity

  The function is intentionally kept independent from the UI.

  Later, this same file can be connected to real historical
  procurement data / ML predictions without changing the UI.
*/

const CENTRE_PROCESSING_TIME = {
  "Main Procurement Centre": 8,
  "North Zone Procurement Centre": 7,
  "South Zone Procurement Centre": 10,
  "Central Procurement Centre": 9,
};

const CROP_PROCESSING_TIME = {
  Wheat: 0,
  Rice: 1,
  Soybean: 2,
  Cotton: 2,
  Maize: 1,
  Bajra: 1,
  Jowar: 1,
  Chana: 1,
  Tur: 2,
  Mustard: 1,
  Groundnut: 2,
};

function getQuantityAdjustment(quantity) {
  const value = Number(quantity) || 0;

  if (value <= 20) return 0;
  if (value <= 50) return 1;
  if (value <= 100) return 2;

  return 3;
}

export function predictWaitingTime({
  queuePosition,
  centre,
  crop,
  quantity,
}) {
  const position = Math.max(
    1,
    Number(queuePosition) || 1
  );

  const centreTime =
    CENTRE_PROCESSING_TIME[centre] || 8;

  const cropTime =
    CROP_PROCESSING_TIME[crop] ?? 1;

  const quantityAdjustment =
    getQuantityAdjustment(quantity);

  const processingTime =
    centreTime +
    cropTime +
    quantityAdjustment;

  /*
    Example:

    Position = 5
    Processing = 10 min/farmer

    Estimated wait = 5 × 10
                   = 50 minutes
  */

  const waitingTime =
    position * processingTime;

  return Math.max(
    5,
    Math.min(waitingTime, 240)
  );
}

export function formatWaitingTime(minutes) {
  const value = Math.max(
    0,
    Number(minutes) || 0
  );

  if (value < 60) {
    return `${value} min`;
  }

  const hours = Math.floor(value / 60);
  const mins = value % 60;

  if (mins === 0) {
    return `${hours} hr`;
  }

  return `${hours} hr ${mins} min`;
}

export function getWaitingStatus(minutes) {
  const value = Number(minutes) || 0;

  if (value <= 20) {
    return {
      label: "Low waiting time",
      icon: "🟢",
    };
  }

  if (value <= 60) {
    return {
      label: "Moderate waiting time",
      icon: "🟡",
    };
  }

  return {
    label: "High waiting time",
    icon: "🟠",
  };
}

export function getSlotDate(date, slot) {
  if (!date || !slot) {
    return null;
  }

  const match = slot.match(
    /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i
  );

  if (!match) {
    return null;
  }

  let hours = Number(match[1]);
  const minutes = Number(match[2]);
  const period = match[3].toUpperCase();

  if (period === "PM" && hours !== 12) {
    hours += 12;
  }

  if (period === "AM" && hours === 12) {
    hours = 0;
  }

  const result = new Date(`${date}T00:00:00`);

  result.setHours(hours, minutes, 0, 0);

  return result;
}

export function getRecommendedArrivalTime({
  date,
  slot,
  waitingMinutes,
}) {
  const slotDate = getSlotDate(date, slot);

  if (!slotDate) {
    return "";
  }

  /*
    The slot represents the approximate start of the
    farmer's procurement window.

    We calculate the expected turn and recommend
    reaching approximately 10 minutes before it.
  */

  const predictedTurn = new Date(
    slotDate.getTime() +
      Number(waitingMinutes || 0) * 60000
  );

  const arrival = new Date(
    predictedTurn.getTime() -
      10 * 60000
  );

  return arrival.toLocaleTimeString(
    "en-IN",
    {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }
  );
}