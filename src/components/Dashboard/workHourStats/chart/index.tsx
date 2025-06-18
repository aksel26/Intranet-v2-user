import { CompositeChart } from "@mantine/charts";
import React from "react";

const WorkStats = ({ workStats }: any) => {
  return (
    <CompositeChart
      h={230}
      barProps={{ radius: 5 }}
      dataKey="week"
      data={workStats}
      withLegend
      legendProps={{ verticalAlign: "top", height: 50 }}
      // dataKey="date"
      maxBarWidth={30}
      referenceLines={[{ y: 40, label: "주 40시간", color: "red.4" }]}
      series={[
        {
          name: "hours",
          color: "#23aee1",
          type: "bar",
          label: "근무시간",
        },
      ]}
      curveType="linear"
      yAxisProps={{
        domain: [0, 50],
        ticks: [0, 10, 20, 30, 40, 50],
        allowDecimals: false,
      }}
      tooltipProps={{
        content: ({ payload, label }) => {
          if (!payload || payload.length === 0) return null;

          return (
            <div
              style={{
                background: "white",
                padding: "8px 12px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              <div className="text-sm mb-1 font-semibold">{label}주차</div>
              {payload.map((entry, index) => (
                <div key={index} className="flex items-center">
                  <div
                    className="w-[10px] h-[10px]"
                    style={{
                      background: entry.color,
                    }}
                  />
                  <span className="ml-2 text-sm">{entry.value} 시간</span>
                </div>
              ))}
            </div>
          );
        },
      }}
    />
  );
};

export default WorkStats;
