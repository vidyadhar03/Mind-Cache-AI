export function smoothifyDate(date) {
  const parts = date.split("T");

  const datePart = parts[0];

  const timePart = parts[1].substring(0, 5);

  const formattedDateString = datePart + '  ' + timePart;

  return formattedDateString
}
