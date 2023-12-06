"use client";

import { useEffect, useState } from "react";
import * as S from "@/components/statistic/Styled";
import * as M from "@/components/management/Styled";
import Image from "next/image";
import Background from "@/../public/images/background.jpg";
import Header from "@/components/statistic/Header";
import MasonryComponent from "@/components/management/MasonryComponent";
import SwiperComponent from "@/components/management/SwiperComponent";

const Management: React.FC = () => {
  const [isSelect, setIsSelect] = useState<Boolean>(false);

  const handleSelect = () => {
    setIsSelect(!isSelect);
  };

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
        <Header param="management" />
        <M.SelectSection>
          <M.SelectText $isSelect={!isSelect ? true : false} onClick={handleSelect}>
            Post
          </M.SelectText>
          <M.SelectText $isSelect={isSelect ? true : false} onClick={handleSelect}>
            Guest Book
          </M.SelectText>
        </M.SelectSection>
        {isSelect ? <SwiperComponent /> : <MasonryComponent />}
      </S.Container>
    </>
  );
};

export default Management;
