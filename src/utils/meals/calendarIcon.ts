export const calendarIcon = (input: string) => {
  if (!input) return;
  if (input === "근무") return "🍙";
  if (input.includes("반차")) return "🕑";
  if (input.includes("연차") || input.includes("휴무")) return "🌴";
};
