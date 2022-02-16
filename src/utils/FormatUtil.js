import { PhoneNumberFormat, PhoneNumberUtil } from "google-libphonenumber";
import pluralize from "pluralize";
import { DateTime } from "luxon";

const phoneUtil = PhoneNumberUtil.getInstance();
/**
 * Parses the raw given input and determines if it's
 * considered to be a valid US number.
 */
export const isValidUSPhoneNumber = (value) => {
  if (!value) {
    return false;
  }
  try {
    const number = phoneUtil.parseAndKeepRawInput(value, "US");
    return phoneUtil.isValidNumberForRegion(number, "US");
  } catch (e) {
    return false;
  }
};

/**
 * Format any 10 digit phone number for display. This only performs
 * basic validation for display purposes.
 *
 * Ex. Input: [8005557777], Output: [(800) 555-7777]
 */
export const formatPhoneNumber = (value) => {
  if (!value) {
    return "";
  }
  try {
    const number = phoneUtil.parseAndKeepRawInput(value, "US");
    return phoneUtil.isValidNumberForRegion(number, "US")
      ? phoneUtil.format(number, PhoneNumberFormat.NATIONAL)
      : value;
  } catch (e) {
    return "";
  }
};

export const isValidEmail = (value) => {
  if (!value) {
    return false;
  }

  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    value
  );
};

export const formatName = (firstName, lastName) => {
  if (!firstName && !lastName) {
    return null;
  }

  return `${firstName || ""} ${lastName || ""}`.trim();
};

const dobInTime = (dob) => {
  if (!dob) {
    return "";
  }

  const dobDateTime = DateTime.fromISO(dob);

  const { years, months, weeks, days } = DateTime.now()
    .diff(dobDateTime, ["years", "months", "weeks", "days"])
    .toObject();

  if (years >= 1) {
    return `${years} ${pluralize("year", years)}`;
  }

  if (months >= 1) {
    return `${months} ${pluralize("month", months)}`;
  }

  if (weeks >= 1) {
    return `${weeks} ${pluralize("week", weeks)}`;
  }

  return `${days} ${pluralize("day", days)}`;
};

export const formatDob = (dob) => {
  if (!dob) {
    return "";
  }

  return `${dob} (${dobInTime(dob)})`;
};

export const formatDate = (date) => {
  const dateObj = date instanceof DateTime ? date : DateTime.fromISO(date);
  return dateObj.toFormat("MM-dd-yyyy").toLowerCase();
};

export const formatDateTime = (date) => {
  const dateObj = date instanceof DateTime ? date : DateTime.fromISO(date);
  return dateObj.toFormat("MM-dd-yyyy hh:mma").toLowerCase();
};

export default {
  isValidUSPhoneNumber,
  formatPhoneNumber,
  formatName,
  formatDob,
  dobInTime,
  formatDate,
  formatDateTime,
};
