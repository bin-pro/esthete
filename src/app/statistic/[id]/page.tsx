"use client";

import * as S from "@/components/statistic/Styled";
import Image from "next/image";
import MainLogo from "@/../public/icons/mainLogo.png";
import Background from "@/../public/images/background.jpg";

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
        <Image
          src={MainLogo}
          width={200}
          alt="esthete-logo"
          loading="lazy"
          placeholder="empty"
        />
        <S.TitleBox>
          <S.Title>
            My own small Exhibition
            <br />
            Management system
          </S.Title>
        </S.TitleBox>
      </S.Container>
    </>
  );
};

export default Statistic;
