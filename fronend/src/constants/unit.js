export const UNIT = {
  COMPUTER: "buyer",
  MAVAD: "mavad",
  BARGH: "bargh",
  OTHER: "other",
};
export const SAMESTER = {
  mehr: "mehr",
  bahman: "bahman",
  tabestan: "tabestan",
};
export const WEAK = {
  Saturday: "شنبه",
  Sunday: "یکشنبه",
  Monday: "دوشنبه",
  Tuesday: "سه شنبه",
  Wednesday: "چهارشنبه",
  Thursday: "پنج شنبه",
  Friday: "جمعه",
};

export const TIME = {
  "08:00 - 10:00": "08:00 - 10:00",
  "10:00 - 12:00": "10:00 - 12:00",
  "12:00 - 14:00": "12:00 - 14:00",
  "14:00 - 16:00": "14:00 - 16:00",
  "16:00 - 18:00": "16:00 - 18:00",
};
export function toJalaali(date, includeTime = false) {
  const dateFormatter = new Intl.DateTimeFormat("fa", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  const timeFormatter = new Intl.DateTimeFormat("fa", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });

  const d = typeof date === "string" ? new Date(date) : date;

  const formattedDate = dateFormatter.format(d);
  const [year, month, day] = formattedDate.split("/");

  return `${includeTime ? timeFormatter.format(d) : ""} ${year}/${
    month.length < 2 ? `۰${month}` : month
  }/${day.length < 2 ? `۰${day}` : day}`.trim();
}
