"use client";

import * as S from "@/components/statistic/Styled";
import * as M from "@/components/management/Styled";
import Image from "next/image";
import Background from "@/../public/images/background.jpg";
import Header from "@/components/statistic/Header";
import { DUMMY_DATA } from "../../../../DummyData";
import MasonryComponent from "@/components/management/Masonry";

const Management = () => {
  return (
    <>
      <S.Container>
        <Image
          src={Background}
          fill
          alt="background"
          style={S.ImageBackground}
        />
        <Header param="management" />
        <MasonryComponent />
      </S.Container>
    </>
  );
};

export default Management;
