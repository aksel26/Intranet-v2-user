export const countPlaceFrequency = (data: any) => {
  // 장소 빈도수를 저장할 객체
  const placeCount: any = {};

  // 데이터를 순회하면서 장소 빈도수 계산
  data.forEach((item: any) => {
    // 아침, 점심, 저녁 각각 체크
    ["breakfast", "lunch", "dinner"].forEach((mealType) => {
      if (item[mealType] && item[mealType].place) {
        // 공백 제거
        const place = item[mealType].place.trim();

        // 빈 문자열이 아닌 경우에만 카운트
        if (place) {
          if (placeCount[place]) {
            placeCount[place]++;
          } else {
            placeCount[place] = 1;
          }
        }
      }
    });
  });

  // 결과 형식으로 변환
  const result = Object.keys(placeCount).map((place) => ({
    place,
    visited: placeCount[place],
  }));

  // visited 기준으로 내림차순 정렬
  result.sort((a, b) => {
    if (b.visited !== a.visited) {
      return b.visited - a.visited; // 방문 횟수 내림차순
    }
    return a.place.localeCompare(b.place, "ko"); // 방문 횟수가 같으면 장소명 가나다순
  });

  return result;
};
