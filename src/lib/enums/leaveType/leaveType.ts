export const ATTENDANCE_OPTIONS = ["근무", "재택 근무", "연차/휴무", "오전 반차", "오후 반차"];

export enum LEAVE_TYPE {
  "근무" = 1,
  "오전 반차" = 2,
  "오후 반차" = 3,
  "오전 반반차" = 4,
  "오후 반반차" = 5,
  "연차" = 6,
  "특별 휴무" = 7,
  "특별 휴무(오전)" = 8,
  "특별 휴무(오후)" = 9,
  "특별 휴무(오전 반반)" = 10,
  "특별 휴무(오후 반반)" = 11,
  "대체 휴무" = 12,
  "대체 휴무(오전)" = 13,
  "대체 휴무(오후)" = 14,
  "경조 휴무" = 15,
  "보건휴가" = 16,
  "훈련" = 17,
  "훈련(오전)" = 18,
  "훈련(오후)" = 19,
  "병가" = 20,
}

export const ADMIN_URL = "https://test-benefit-admin.insahr.co.kr/";

export enum RELATION_TYPE {
  "APPROVER" = "승인요청",
  "CC" = "참조",
}
