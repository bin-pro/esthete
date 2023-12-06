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
import { Instance } from "@/api/axios";
import { getCookie, removeCookie } from "@/Cookie";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

const BACKGROUND_COLORS = [
  "rgba(255, 99, 132, 0.2)",
  "rgba(54, 162, 235, 0.2)",
  "rgba(255, 206, 86, 0.2)",
  "rgba(75, 192, 192, 0.2)",
  "rgba(153, 102, 255, 0.2)",
  "rgba(255, 159, 64, 0.2)",
];

const BORDER_COLORS = [
  "rgba(255, 99, 132, 1)",
  "rgba(54, 162, 235, 1)",
  "rgba(255, 206, 86, 1)",
  "rgba(75, 192, 192, 1)",
  "rgba(153, 102, 255, 1)",
  "rgba(255, 159, 64, 1)",
];

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

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
    "11-15",
    "11-16",
    "11-17",
    "11-18",
    "11-19",
    "11-20",
    "11-21",
    "11-22",
    "11-23",
    "11-24",
  ],
  datasets: [
    {
      label: "Number of Access user / day",
      data: [65, 59, 80, 81, 56, 55, 40, 65, 59, 80],
      backgroundColor: BACKGROUND_COLORS,
      borderColor: BORDER_COLORS,
      borderWidth: 1,
    },
  ],
};

const Statistic: React.FC = () => {
  const accessToken = getCookie("accessToken");
  const router = useRouter();

  // state--------------------------------------------------
  const [userCount, setUserCount] = useState([]);
  const [exhibitionCount, setExhibitionCount] = useState([]);
  const [photoCount, setPhotoCount] = useState([]);
  const [guestBookCount, setGuestBookCount] = useState([]);

  const LogOut = () => {
    removeCookie("accessToken", {});
    removeCookie("user_id", {});
    removeCookie("user_name", {});
    removeCookie("user_role", {});
    router.push("/");
  };

  // useEffect--------------------------------------------------
  useEffect(() => {
    (async () => {
      try {
        // const res1 = await Instance.get(`/statistics/user/count/daily`);
        // const res2 = await Instance.get(`/statistics/exhibition/count/daily`);
        const res3 = await Instance.get(`/statistics/abusing-reports/photos/count/daily`);
        // const res4 = await Instance.get(`/statistics/abusing-reports/guest-books/count/daily`);
        console.log(res3);
      } catch (err) {
        if (err instanceof AxiosError) {
          console.log(err);
          // if (err?.response.status === 401) {
          //   alert("Please login");
          //   LogOut();
          // }
        }
      }
    })();
  }, []);

  // Hydration--------------------------------------------
  const [element, setElement] = useState<HTMLCollectionOf<HTMLHtmlElement> | null>(null);
  useEffect(() => {
    setElement(document.getElementsByTagName("html"));
  }, []);
  if (!element) return <></>;

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
              <S.GraphTitle>* Number of user</S.GraphTitle>
            </S.GraphBox>
            <S.GraphBox>
              <S.Graph>
                <Bar data={CHART_DEFAULT_OPTIONS} options={OPTIONS} />
              </S.Graph>
              <S.GraphTitle>* Number of Exhibition Upload</S.GraphTitle>
            </S.GraphBox>
          </S.RowSection>
          <S.RowSection>
            <S.GraphBox>
              <S.Graph>
                <Bar data={CHART_DEFAULT_OPTIONS} options={OPTIONS} />
              </S.Graph>
              <S.GraphTitle>* Number of Photo Infringment</S.GraphTitle>
            </S.GraphBox>
            <S.GraphBox>
              <S.Graph>
                <Bar data={CHART_DEFAULT_OPTIONS} options={OPTIONS} />
              </S.Graph>
              <S.GraphTitle>* Number of Guestbook Infringment</S.GraphTitle>
            </S.GraphBox>
          </S.RowSection>
        </S.BodySection>
      </S.Container>
    </>
  );
};

export default Statistic;
