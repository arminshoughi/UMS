import Jalaali, { isValidJalaaliDate } from "jalaali-js";

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
  SATURDAY: "شنبه",
  SUNDAY: "یکشنبه",
  MONDAY: "دوشنبه",
  TUESDAY: "سه شنبه",
  WEDNESDAY: "چهارشنبه",
  THURSDAY: "پنج شنبه",
  FRIDAY: "جمعه",
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
export function toFarsiNumber(n) {
  const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

  return n.toString().replace(/\d/g, (x) => farsiDigits[x]);
}
export function toGregorianDate(value) {
  const [year, month, day] = value.split("/");
  if (!isValidJalaaliDate(year, month, day)) {
    return null;
  }

  const { gy, gm, gd } = Jalaali.toGregorian(
    Number(year),
    Number(month),
    Number(day)
  );
  return `${gy}-${gm < 10 ? `0${gm}` : gm}-${gd}`;
}
const JalaliDate = {
  g_days_in_month: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
  j_days_in_month: [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29],
};

JalaliDate.jalaliToGregorian = function (j_y, j_m, j_d) {
  j_y = parseInt(j_y);
  j_m = parseInt(j_m);
  j_d = parseInt(j_d);
  var jy = j_y - 979;
  var jm = j_m - 1;
  var jd = j_d - 1;

  var j_day_no =
    365 * jy + parseInt(jy / 33) * 8 + parseInt(((jy % 33) + 3) / 4);
  for (var i = 0; i < jm; ++i) j_day_no += JalaliDate.j_days_in_month[i];

  j_day_no += jd;

  var g_day_no = j_day_no + 79;

  var gy =
    1600 +
    400 *
      parseInt(
        g_day_no / 146097
      ); /* 146097 = 365*400 + 400/4 - 400/100 + 400/400 */
  g_day_no = g_day_no % 146097;

  var leap = true;
  if (g_day_no >= 36525) {
    /* 36525 = 365*100 + 100/4 */
    g_day_no--;
    gy +=
      100 * parseInt(g_day_no / 36524); /* 36524 = 365*100 + 100/4 - 100/100 */
    g_day_no = g_day_no % 36524;

    if (g_day_no >= 365) g_day_no++;
    else leap = false;
  }

  gy += 4 * parseInt(g_day_no / 1461); /* 1461 = 365*4 + 4/4 */
  g_day_no %= 1461;

  if (g_day_no >= 366) {
    leap = false;

    g_day_no--;
    gy += parseInt(g_day_no / 365);
    g_day_no = g_day_no % 365;
  }

  for (
    var i = 0;
    g_day_no >= JalaliDate.g_days_in_month[i] + (i == 1 && leap);
    i++
  )
    g_day_no -= JalaliDate.g_days_in_month[i] + (i == 1 && leap);
  var gm = i + 1;
  var gd = g_day_no + 1;

  gm = gm < 10 ? "0" + gm : gm;
  gd = gd < 10 ? "0" + gd : gd;

  return [gy, gm, gd];
};

export function toGregorianDate1(value) {
  var myDate = value;
  let dateSplitted = myDate.split("-");
  let jD = JalaliDate.jalaliToGregorian(
    dateSplitted[0],
    dateSplitted[1],
    dateSplitted[2]
  );
  return jD[0] + "-" + jD[1] + "-" + jD[2];
}
