export const MEETING_ROOMS = [
  { id: "A", room: "A Room", limit: "6인" },
  { id: "C", room: "C Room", limit: "12인" },
  { id: "C2", room: "C_2 Room", limit: "12인" },
  { id: "G", room: "G Room", limit: "6인" },
  { id: "R", room: "R Room", limit: "12인" },
  { id: "L1", room: "L_1 Room", limit: "1인" },
  { id: "L2", room: "L_2 Room", limit: "1인" },
  { id: "S1", room: "S_1 Room", limit: "1인" },
  { id: "S2", room: "S_2 Room", limit: "1인" },
];
export const MEETING_TYPES = ["검사", "면접", "회의", "고객사미팅", "협력사미팅"];

export const MEETING_ROOMS_COLUMNS = [
  {
    field: "room",
    headerContent: "회의실",
    width: 80,
  },
  {
    field: "limit",
    headerContent: "정원",
    width: 60,
  },
];

export const MEETING_TIME = Array.from({ length: 26 }, (_, i) => {
  const hour = 8 + Math.floor(i / 2);
  const minute = i % 2 === 0 ? "00" : "30";
  return `${hour.toString().padStart(2, "0")}:${minute}`;
}).slice(0, 26);
