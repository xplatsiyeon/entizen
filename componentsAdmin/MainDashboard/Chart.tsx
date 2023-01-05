import styled from '@emotion/styled';
import { faker } from '@faker-js/faker';
import { Bar } from 'react-chartjs-2';
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);
type Props = {
  chartData: {
    date: string;
    slow: number;
    normal: number;
    fast: number;
    superFast: number;
  }[];
};
const ChartBar = ({ chartData }: Props) => {
  console.log('🔥 chartData ==>');
  // console.log(chartData[0]);
  const options = {
    maxBarThickness: 7,
    responsive: true,
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
    },
  };

  const labels = chartData?.map((el) => {
    const temp = el.date.split('-');
    return temp[1] + '.' + temp[2];
  });
  const ChartColor = ['#B096EF', '#FFC043', '#A6A9B0', '#F75015'];
  const data = {
    labels,
    datasets: [
      {
        label: '완속',
        data: chartData?.map((e) => e.slow),
        backgroundColor: ChartColor[0],
      },
      {
        label: '중속',
        data: chartData?.map((e) => e.normal),
        backgroundColor: ChartColor[1],
      },
      {
        label: '급속',
        data: chartData?.map((e) => e.fast),
        backgroundColor: ChartColor[2],
      },
      {
        label: '초급속',
        data: chartData?.map((e) => e.fast),
        backgroundColor: ChartColor[3],
      },
    ],
  };
  return (
    <Container>
      <Bar options={options} data={data} />
    </Container>
  );
};
export default ChartBar;

const Container = styled.div`
  position: relative;
  width: 100%;
`;
