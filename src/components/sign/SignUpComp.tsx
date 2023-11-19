"use client";

import Image from "next/image";
import * as S from "./Styled";
import MainLogo from "@/../public/icons/mainLogo.png";

const SignUpComp: React.FC = () => {
  return (
    <>
      <S.Container>
        <Image src={MainLogo} width={200} alt="esthete-logo" loading="lazy" placeholder="empty" />
        <br />
        <S.TitleBox>
          <S.Title>
            My own small Exhibition
            <br />
            Management system
          </S.Title>
          <br />
          <S.CursorText>* Excel Upload *</S.CursorText>
        </S.TitleBox>

        <S.Input placeholder="Email" type="email" />
        <S.Input placeholder="Name" type="text" />
        <S.Input placeholder="Password" type="password" />
        <S.Input placeholder="Confirm Password" type="password" />
        <S.Button>Submit</S.Button>
      </S.Container>
    </>
  );
};

export default SignUpComp;
