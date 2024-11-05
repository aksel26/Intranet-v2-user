export const titleRender = (input: string) => {
  if (input === "근무") {
    return "🍙";
  } else if (input === "오전 반차" || input === "오후 반차") {
    return "🕑";
  } else if (input === "연차/휴무") {
    return "🏝️";
  }
};
