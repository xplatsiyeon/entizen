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

// const chartData = [
//   { date: '2023-01-15', fast: 3, normal: 0, slow: 2, superFast: 0 },
//   { date: '2023-01-17', fast: 0, normal: 0, slow: 2, superFast: 0 },
//   { date: '2023-01-18', fast: 0, normal: 0, slow: 2, superFast: 2 },
//   { date: '2023-01-19', fast: 4, normal: 3, slow: 2, superFast: 0 },
//   { date: '2023-01-20', fast: 0, normal: 4, slow: 2, superFast: 0 },
//   { date: '2023-01-21', fast: 0, normal: 0, slow: 2, superFast: 0 },
//   { date: '2023-01-22', fast: 0, normal: 5, slow: 2, superFast: 3 },
//   { date: '2023-01-23', fast: 0, normal: 6, slow: 2, superFast: 0 },
//   { date: '2023-01-24', fast: 6, normal: 0, slow: 2, superFast: 0 },
//   { date: '2023-01-25', fast: 0, normal: 0, slow: 2, superFast: 0 },
//   { date: '2023-01-26', fast: 1, normal: 0, slow: 2, superFast: 0 },
//   { date: '2023-01-27', fast: 0, normal: 0, slow: 2, superFast: 4 },
//   { date: '2023-02-01', fast: 0, normal: 0, slow: 2, superFast: 0 },
//   { date: '2023-02-02', fast: 2, normal: 0, slow: 2, superFast: 0 },
//   { date: '2023-02-03', fast: 0, normal: 0, slow: 2, superFast: 6 },
//   { date: '2023-02-04', fast: 0, normal: 7, slow: 2, superFast: 0 },
//   { date: '2023-02-05', fast: 0, normal: 8, slow: 2, superFast: 0 },
//   { date: '2023-02-06', fast: 0, normal: 0, slow: 2, superFast: 5 },
//   { date: '2023-02-07', fast: 0, normal: 0, slow: 2, superFast: 0 },
//   { date: '2023-02-08', fast: 0, normal: 0, slow: 2, superFast: 0 },
//   { date: '2023-02-09', fast: 0, normal: 0, slow: 2, superFast: 0 },
//   { date: '2023-02-10', fast: 0, normal: 0, slow: 2, superFast: 0 },
//   { date: '2023-02-11', fast: 0, normal: 0, slow: 2, superFast: 0 },
//   { date: '2023-02-12', fast: 0, normal: 2, slow: 2, superFast: 2 },
//   { date: '2023-02-13', fast: 0, normal: 0, slow: 2, superFast: 0 },
//   { date: '2023-02-14', fast: 0, normal: 0, slow: 2, superFast: 0 },
//   { date: '2023-03-01', fast: 0, normal: 0, slow: 2, superFast: 0 },
//   { date: '2023-03-02', fast: 0, normal: 0, slow: 2, superFast: 0 },
//   { date: '2023-03-03', fast: 0, normal: 0, slow: 2, superFast: 6 },
//   { date: '2023-03-04', fast: 6, normal: 0, slow: 2, superFast: 0 },
//   { date: '2023-03-05', fast: 7, normal: 0, slow: 2, superFast: 0 },
//   { date: '2023-03-06', fast: 8, normal: 0, slow: 2, superFast: 7 },
//   { date: '2023-03-07', fast: 0, normal: 0, slow: 2, superFast: 0 },
//   { date: '2023-03-08', fast: 0, normal: 0, slow: 2, superFast: 0 },
//   { date: '2023-03-09', fast: 0, normal: 0, slow: 2, superFast: 8 },
//   { date: '2023-03-10', fast: 0, normal: 0, slow: 2, superFast: 0 },
//   { date: '2023-03-11', fast: 2, normal: 0, slow: 2, superFast: 0 },
//   { date: '2023-03-12', fast: 0, normal: 0, slow: 2, superFast: 0 },
//   { date: '2023-03-13', fast: 1, normal: 0, slow: 2, superFast: 0 },
//   { date: '2023-03-14', fast: 0, normal: 0, slow: 2, superFast: 0 },
//   { date: '2023-03-15', fast: 4, normal: 0, slow: 2, superFast: 0 },
// ];

// const ChartBar = () => {
const ChartBar = ({ chartData }: Props) => {
  console.log('🔥 chartData ==>', chartData);
  const options = {
    maxBarThickness: 7,
    // pointHitRadius: 5,
    responsive: true,
    maintainAspectRatio: false,
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
        data: chartData?.map((e) => e.superFast),
        backgroundColor: ChartColor[3],
      },
    ],
  };
  return (
    <Container>
      <Chart options={options} data={data} />
    </Container>
  );
};
export default ChartBar;

const Container = styled.div`
  position: relative;
  /* width: 100%; */
  width: 900px;
  height: 450px;
  overflow-x: scroll;
`;
const Chart = styled(Bar)`
  min-width: 900px;
  width: 1000px !important;
  /* border: 1px solid red; */
`;
