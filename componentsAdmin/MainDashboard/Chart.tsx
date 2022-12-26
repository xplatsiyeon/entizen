import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export const options = {
  maxBarThickness: 7,
  responsive: false,
  type: 'line',
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      afterDataLimits: (scale: any) => {
        scale.max = scale.max * 1.2;
      },
    },
  },
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        font: {
          size: 0,
        },
      },
    },
    title: {
      display: false,
    },
  },
  tooltip: {
    callbacks: {
      label: (context: any) => {
        // 툴팁에서 y축 값이 어떻게 표시될지 설정할 수 있어요.
        let label = context.dataset.label + '' || '';

        const isPrice = label === '주가';
        const isEV = label === 'EV';

        if (label) {
          label = isPrice ? ' 주가 : ' : ' ' + label + ' : ';
        }
        if (context.parsed.y !== null) {
          // y축 값이 null이 아니라면,
          // 조건에 따라 label 재할당
        } else {
          // y축 값이 null이라면
          return null; // null 반환
        }

        return label; // 마찬가지로 재설정한 label도 꼭 반환해주세요!
      },
    },
  },
};

const labels = [
  '12.02',
  '12.02',
  '12.02',
  '12.02',
  '12.02',
  '12.02',
  '12.02',
  '12.02',
  '12.02',
  '12.02',
  '12.02',
];
const ChartColor = ['#B096EF', '#FFC043', '#A6A9B0', '#F75015'];
export const data = {
  labels,
  datasets: [
    {
      label: '완속',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 300 })),
      backgroundColor: ChartColor[0],
    },
    {
      label: '중속',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 300 })),
      backgroundColor: ChartColor[1],
    },
    {
      label: '급속',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 300 })),
      backgroundColor: ChartColor[2],
    },
    {
      label: '초급속',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 300 })),
      backgroundColor: ChartColor[3],
    },
  ],
};

// export function App() {
//   return <Bar options={options} data={data} />;
// }
