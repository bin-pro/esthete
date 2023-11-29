"use client";

import * as S from "@/components/statistic/Styled";
import Image from "next/image";
import Background from "@/../public/images/background.jpg";
import Header from "@/components/statistic/Header";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

const BACKGROUND_COLORS = [
  "rgba(255, 99, 132, 0.2)",
  "rgba(54, 162, 235, 0.2)",
  "rgba(255, 206, 86, 0.2)",
  "rgba(75, 192, 192, 0.2)",
  "rgba(153, 102, 255, 0.2)",
  "rgba(255, 159, 64, 0.2)",
  "rgba(255, 99, 132, 0.2)",
];

const BORDER_COLORS = [
  "rgba(255, 99, 132, 1)",
  "rgba(54, 162, 235, 1)",
  "rgba(255, 206, 86, 1)",
  "rgba(75, 192, 192, 1)",
  "rgba(153, 102, 255, 1)",
  "rgba(255, 159, 64, 1)",
  "rgba(255, 99, 132, 1)",
];

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const OPTIONS = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};

const CHART_DEFAULT_OPTIONS = {
  labels: [],
  datasets: [],
};

const Statistic: React.FC = () => {
  return (
    <>
      <S.Container>
        <Image
          src={Background}
          fill
          alt="background"
          style={S.ImageBackground}
        />
        <Header param="statistic" />
        <S.BodySection>
          <S.GraphBox>
            <S.Graph>
              <Bar data={CHART_DEFAULT_OPTIONS} options={OPTIONS} />
            </S.Graph>
            <S.GraphTitle>* Number of Access user / day</S.GraphTitle>
          </S.GraphBox>
          <S.GraphBox>
            <S.Graph>
              <Bar data={CHART_DEFAULT_OPTIONS} options={OPTIONS} />
            </S.Graph>
            <S.GraphTitle>* Number of Infringement / day</S.GraphTitle>
          </S.GraphBox>
          <S.GraphBox>
            <S.Graph>
              <Bar data={CHART_DEFAULT_OPTIONS} options={OPTIONS} />
            </S.Graph>
            <S.GraphTitle>* Number of Active user / day</S.GraphTitle>
          </S.GraphBox>
          <S.GraphBox>
            <S.Graph>
              <Bar data={CHART_DEFAULT_OPTIONS} options={OPTIONS} />
            </S.Graph>
            <S.GraphTitle>* Number of Bad / day</S.GraphTitle>
          </S.GraphBox>
        </S.BodySection>
      </S.Container>
    </>
  );
};

export default Statistic;
