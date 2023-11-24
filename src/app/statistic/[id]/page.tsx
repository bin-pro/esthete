"use client";

import * as S from "@/components/statistic/Styled";
import Image from "next/image";
import Background from "@/../public/images/background.jpg";
import Header from "@/components/statistic/Header";

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
        <Header />
        <S.BodySection>
          <S.GraphBox></S.GraphBox>
          <S.GraphBox></S.GraphBox>
          <S.GraphBox></S.GraphBox>
          <S.GraphBox></S.GraphBox>
        </S.BodySection>
      </S.Container>
    </>
  );
};

export default Statistic;
