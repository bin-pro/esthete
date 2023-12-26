"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import MainLogo from "@/../public/icons/mainLogo.png";
import Background from "@/../public/images/background.jpg";
import { ImageBackground } from "./Styled";
import Image from "next/image";
import * as S from "./Styled";
import axios from "axios";
import { AxiosError } from "axios";
import { setCookie } from "@/Cookie";

export const SignInComp: React.FC = () => {
  // Auto login----------------------------
  const router = useRouter();

  // Login---------------------------------
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "userName") {
      setUserName(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const handleSignIn = async (e: any) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        `https://api.esthete.roberniro-projects.xyz/admin/users/sign-in`,
        {
          username: userName,
          password: password,
        }
      );
      if (result.status === 200) {
        setCookie("accessToken", result.data.access_token, {});
        setCookie("userId", result.data.user_id, {});
        setCookie("userName", result.data.username, {});
        setCookie("userRole", result.data.role, {});
        router.push(`/statistic/${result.data.user_id}`);
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.status === 404) {
          alert(err.response.data.error);
        }
      }
    }
  };

  // Navigation----------------------------
  const goToSignUp = () => {
    router.push("/sign-up");
  };

  // Hydration--------------------------------------------
  const [element, setElement] = useState<HTMLCollectionOf<HTMLHtmlElement> | null>(null);
  useEffect(() => {
    setElement(document.getElementsByTagName("html"));
  }, []);
  if (!element) return <></>;

  return (
    <>
      <S.Container onSubmit={handleSignIn}>
        <Image
          src={Background}
          fill
          alt="background"
          style={ImageBackground}
          priority
          quality={100}
        />
        <Image
          src={MainLogo}
          width={200}
          alt="esthete-logo"
          placeholder="empty"
          priority
          quality={100}
        />
        <S.TitleBox>
          <S.Title>
            My own small Exhibition
            <br />
            Management system
          </S.Title>
        </S.TitleBox>
        <br />
        <S.Input
          placeholder="userName"
          type="text"
          name="userName"
          onChange={handleChange}
          autoFocus
        />
        <S.Input placeholder="password" type="password" name="password" onChange={handleChange} />
        <S.RightBox>{/* <S.SmallText onClick={goToSignUp}>sign up</S.SmallText> */}</S.RightBox>
        <S.Button>Sign In</S.Button>
      </S.Container>
    </>
  );
};
