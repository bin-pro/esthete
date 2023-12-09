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
import { getCookie, removeAllCookies } from "@/Cookie";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import {
  BACKGROUND_COLORS,
  BORDER_COLORS,
  CHART_DUMMY_OPTIONS1,
  CHART_DUMMY_OPTIONS2,
  CHART_DUMMY_OPTIONS3,
  CHART_DUMMY_OPTIONS4,
} from "../../../../DummyData";

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

interface dataProps {
  count: number;
  date: string;
}

const Statistic: React.FC = () => {
  const router = useRouter();

  // state--------------------------------------------------
  const [userCount, setUserCount] = useState<{ content?: dataProps[] }>({
    content: [],
  });
  const [exhibitionCount, setExhibitionCount] = useState<{
    content?: dataProps[];
  }>({
    content: [],
  });
  const [photoCount, setPhotoCount] = useState<{ content?: dataProps[] }>({
    content: [],
  });
  const [guestBookCount, setGuestBookCount] = useState<{
    content?: dataProps[];
  }>({
    content: [],
  });

  // useEffect--------------------------------------------------
  useEffect(() => {
    (async () => {
      try {
        const res1 = await Instance.get(`/api/v1/statistics/users`);
        const res2 = await Instance.get(`/api/v1/statistics/exhibition`);
        const res3 = await Instance.get(`/api/v1/statistics/photos/infringement`);
        const res4 = await Instance.get(`/api/v1/statistics/guestbooks/infringement`);
        setUserCount(res1.data);
        setExhibitionCount(res2.data);
        setPhotoCount(res3.data);
        setGuestBookCount(res4.data);
      } catch (err) {
        if (err instanceof AxiosError && err.response) {
          if (err?.response.status === 401) {
            alert("Please login");
            removeAllCookies();
            router.push("/");
            console.clear();
            console.log(err);
          }
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

  const userCountData = {
    labels: userCount.content?.map((uc: any) => uc.date.slice(5)),
    datasets: [
      {
        label: "",
        data: userCount.content?.map((uc: any) => uc.count),
        backgroundColor: BACKGROUND_COLORS,
        borderColor: BORDER_COLORS,
        borderWidth: 1,
      },
    ],
  };

  const exhibitionCountData = {
    labels: exhibitionCount.content?.map((ec: any) => ec.date.slice(5)),
    datasets: [
      {
        label: "",
        data: exhibitionCount.content?.map((ec: any) => ec.count),
        backgroundColor: BACKGROUND_COLORS,
        borderColor: BORDER_COLORS,
        borderWidth: 1,
      },
    ],
  };

  const photoCountData = {
    labels: photoCount.content?.map((pc: any) => pc.date.slice(5)),
    datasets: [
      {
        label: "",
        data: photoCount.content?.map((pc: any) => pc.count),
        backgroundColor: BACKGROUND_COLORS,
        borderColor: BORDER_COLORS,
        borderWidth: 1,
      },
    ],
  };

  const guestBookCountData = {
    labels: guestBookCount.content?.map((gc: any) => gc.date.slice(5)),
    datasets: [
      {
        label: "",
        data: guestBookCount.content?.map((gc: any) => gc.count),
        backgroundColor: BACKGROUND_COLORS,
        borderColor: BORDER_COLORS,
        borderWidth: 1,
      },
    ],
  };

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
                <Bar
                  data={
                    userCount?.content && userCount.content[0]?.date && userCount.content[9]?.date
                      ? CHART_DUMMY_OPTIONS1
                      : userCountData
                  }
                  options={OPTIONS}
                />
              </S.Graph>
              <S.GraphTitle>* Number of user</S.GraphTitle>
            </S.GraphBox>
            <S.GraphBox>
              <S.Graph>
                <Bar
                  data={
                    exhibitionCount?.content &&
                    exhibitionCount.content[0]?.date &&
                    exhibitionCount.content[9]?.date
                      ? CHART_DUMMY_OPTIONS2
                      : exhibitionCountData
                  }
                  options={OPTIONS}
                />
              </S.Graph>
              <S.GraphTitle>* Number of Exhibition Upload</S.GraphTitle>
            </S.GraphBox>
          </S.RowSection>
          <S.RowSection>
            <S.GraphBox>
              <S.Graph>
                <Bar
                  data={
                    photoCount?.content &&
                    photoCount.content[0]?.date &&
                    photoCount.content[9]?.date
                      ? CHART_DUMMY_OPTIONS3
                      : photoCountData
                  }
                  options={OPTIONS}
                />
              </S.Graph>
              <S.GraphTitle>* Number of Photo Infringment</S.GraphTitle>
            </S.GraphBox>
            <S.GraphBox>
              <S.Graph>
                <Bar
                  data={
                    guestBookCount?.content &&
                    guestBookCount.content[0]?.date &&
                    guestBookCount.content[9]?.date
                      ? CHART_DUMMY_OPTIONS4
                      : guestBookCountData
                  }
                  options={OPTIONS}
                />
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
