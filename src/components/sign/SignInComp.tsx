"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import MainLogo from "@/../public/icons/mainLogo.png";
import Image from "next/image";
import * as S from "./Styled";

export const SignInComp: React.FC = () => {
  // Auto login----------------------------
  const router = useRouter();
  const [autoLogin, setAutoLogin] = useState<Boolean>(false);
  useEffect(() => {
    if (autoLogin) {
      const userId = "1basd2s1ds";
      router.push(`statistic/${userId}`);
    }
  }, []);

  // Navigation----------------------------
  const goToSignUp = () => {
    router.push("/sign-up");
  };

  return (
    <>
      <S.Container>
        <Image src={MainLogo} width={200} alt="esthete-logo" loading="lazy" placeholder="empty" />
        <S.TitleBox>
          <S.Title>
            My own small Exhibition
            <br />
            Management system
          </S.Title>
        </S.TitleBox>
        <S.Input placeholder="email" />
        <S.Input placeholder="password" />
        <S.RightBox>
          <S.SmallText onClick={goToSignUp}>sign up</S.SmallText>
        </S.RightBox>
        <S.Button onClick={() => setAutoLogin(true)}>Sign In</S.Button>
      </S.Container>
    </>
  );
};
