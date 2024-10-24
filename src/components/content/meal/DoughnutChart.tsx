import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { mealStore } from "@/lib/store/mealStore";

// 필요한 차트 요소를 등록
ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {
  const { mealBudget, mealExpense, mealBalance } = mealStore((state) => state.mealInfo.mealStats);

  const overExpense = (mealBudget as number) - (mealBudget as number);
  const data = {
    labels: ["사용한 금액", "남은 금액", "초과금액"],
    datasets: [
      {
        data: [mealExpense, mealBalance, overExpense],
        backgroundColor: ["#005b99", "#cedde9", "#fca5a5"], // 메인 컬러, 서브 컬러(회색)
        borderWidth: 0, // 테두리 제거
        borderRadius: 10, // 모서리 둥글게
      },
    ],
  };

  const options = {
    responsive: true,
    cutout: "70%", // 도넛 차트의 중앙 구멍 크기
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    animation: {
      duration: 1500, // 애니메이션 지속 시간을 2초로 설정
    },
  };

  return <Doughnut data={data} options={options} />;
};

export default DoughnutChart;
