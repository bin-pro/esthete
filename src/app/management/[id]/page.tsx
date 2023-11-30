"use client";

import { useState } from "react";
import * as S from "@/components/statistic/Styled";
import * as M from "@/components/management/Styled";
import Image from "next/image";
import Background from "@/../public/images/background.jpg";
import Header from "@/components/statistic/Header";
import { DUMMY_DATA } from "../../../../DummyData";
import MasonryComponent from "@/components/management/MasonryComponent";
import SwiperComponent from "@/components/management/SwiperComponent";

const Management = () => {
  const [isSelect, setIsSelect] = useState<Boolean>(false);

  const handleSelect = () => {
    setIsSelect(!isSelect);
  };
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
        <M.SelectSection>
          <M.SelectText
            isSelect={!isSelect ? true : false}
            onClick={handleSelect}
          >
            Post
          </M.SelectText>
          <M.SelectText
            isSelect={isSelect ? true : false}
            onClick={handleSelect}
          >
            Guest Book
          </M.SelectText>
        </M.SelectSection>
        {isSelect ? <SwiperComponent /> : <MasonryComponent />}
      </S.Container>
    </>
  );
};

export default Management;
