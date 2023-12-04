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
import { useEffect, useState } from "react";

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
  labels: [
    "2021-09-01",
    "2021-09-02",
    "2021-09-03",
    "2021-09-04",
    "2021-09-05",
    "2021-09-06",
    "2021-09-07",
    "2021-09-08",
    "2021-09-09",
    "2021-09-10",
    "2021-09-11",
    "2021-09-12",
    "2021-09-13",
    "2021-09-14",
    "2021-09-15",
    "2021-09-16",
    "2021-09-17",
    "2021-09-18",
  ],
  datasets: [
    {
      label: "Number of Access user / day",
      data: [
        65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40, 65, 59, 80,
      ],
      backgroundColor: BACKGROUND_COLORS,
      borderColor: BORDER_COLORS,
      borderWidth: 1,
    },
  ],
};

const Statistic: React.FC = () => {
  // state--------------------------------------------------
  const [userCount, setUserCount] = useState({});
  const [exhibitionCount, setExhibitionCount] = useState({});
  const [photoCount, setPhotoCount] = useState({});
  const [guestBookCount, setGuestBookCount] = useState({});

  // useEffect--------------------------------------------------
  useEffect(() => {}, []);

  return (
    <>
      <S.Container>
        <Image
          src={Background}
          fill
          alt="background"
          style={S.ImageBackground}
          priority
          quality={100}
        />
        <Header param="statistic" />
        <S.BodySection>
          <S.RowSection>
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
          </S.RowSection>
          <S.RowSection>
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
          </S.RowSection>
        </S.BodySection>
      </S.Container>
    </>
  );
};

export default Statistic;
