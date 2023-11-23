"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import MainLogo from "@/../public/icons/mainLogo.png";
import Background from "@/../public/images/background.jpg";
import { ImageBackground } from "./Styled";
import Image from "next/image";
import * as S from "./Styled";
import axios from "axios";

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

  // Login---------------------------------
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const handleSignIn = async () => {
    try {
      router.push("/statistic/1");
    } catch (err) {
      console.log(err);
    }
  };

  // Navigation----------------------------
  const goToSignUp = () => {
    router.push("/sign-up");
  };

  return (
    <>
      <S.Container>
        <Image src={Background} fill alt="background" style={ImageBackground} />
        <Image
          src={MainLogo}
          width={200}
          alt="esthete-logo"
          loading="lazy"
          placeholder="empty"
        />
        <br />
        <S.TitleBox>
          <S.Title>
            My own small Exhibition
            <br />
            Management system
          </S.Title>
        </S.TitleBox>
        <S.Input placeholder="email" type="email" />
        <S.Input placeholder="password" type="password" />
        <S.RightBox>
          <S.SmallText onClick={goToSignUp}>sign up</S.SmallText>
        </S.RightBox>
        <S.Button onClick={handleSignIn}>Sign In</S.Button>
      </S.Container>
    </>
  );
};
