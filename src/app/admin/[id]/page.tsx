"use client";

import * as S from "@/components/statistic/Styled";
import Image from "next/image";
import Background from "@/../public/images/background.jpg";
import Header from "@/components/statistic/Header";

const Admin: React.FC = () => {
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
        <Header param="admin" />
      </S.Container>
    </>
  );
};

export default Admin;
