const { DateTime } = require("luxon");

/**
 * Returns true when both Date objects fall on the same UTC calendar day.
 * Returns false if either argument is null or undefined.
 *
 * @param {Date|null|undefined} dateA
 * @param {Date|null|undefined} dateB
 * @returns {boolean}
 */
function isSameDay(dateA, dateB) {
  if (!dateA || !dateB) return false;
  const a = DateTime.fromJSDate(dateA, { zone: "utc" });
  const b = DateTime.fromJSDate(dateB, { zone: "utc" });
  return a.toISODate() === b.toISODate();
}

module.exports = isSameDay;
