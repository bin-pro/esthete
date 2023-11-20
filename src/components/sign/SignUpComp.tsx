"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import * as S from "./Styled";
import MainLogo from "@/../public/icons/mainLogo.png";

const SignUpComp: React.FC = () => {
  // Input State-----------------------------------------------
  const [email, setEmail] = useState<String>("");
  const [name, setName] = useState<String>("");
  const [password, setPassword] = useState<String>("");
  const [passwordCheck, setPasswordCheck] = useState<String>("");

  // ErrorMessage State----------------------------------------
  const [emailMessage, setEmailMessage] = useState<String>("");
  const [nameMessage, setNameMessage] = useState<String>("");
  const [passwordMessage, setPasswordMessage] = useState<String>("");
  const [passwordCheckMessage, setPasswordCheckMessage] = useState<String>("");

  // Validation State------------------------------------------
  const [isEmail, setIsEmail] = useState<Boolean>(false);
  const [isName, setIsName] = useState<Boolean>(false);
  const [isPassword, setIsPassword] = useState<Boolean>(false);
  const [isPasswordCheck, setIsPasswordCheck] = useState<Boolean>(false);

  // Email 유효성 관리------------------------------------------------------
  const onChangeEmail = useCallback(
    (e: any) => {
      const emailRegex =
        /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
      const emailCurrent = e.target.value;
      setEmail(emailCurrent);

      if (!emailRegex.test(emailCurrent)) {
        setEmailMessage("Invalid email format");
        setIsEmail(false);
      } else {
        setEmailMessage("Valid email format");
        setIsEmail(true);
      }
    },
    [email]
  );

  // 이름 유효성 관리-------------------------------------------------------
  const onChangeName = useCallback((e: any) => {
    const nameRegex = /^[가-힣]{2,4}|[a-zA-Z]{2,10}\s[a-zA-Z]{2,10}$/;
    const nameCurrent = e.target.value;
    setName(nameCurrent);

    if (!nameRegex.test(nameCurrent)) {
      setNameMessage("Invalid name format");
      setIsName(false);
    } else {
      setNameMessage("Valid name format");
      setIsName(true);
    }
  }, []);

  // 비밀번호 유효성 관리----------------------------------------------------
  const onChangePassword = useCallback((e: any) => {
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    const passwordCurrent = e.target.value;
    setPassword(passwordCurrent);

    if (!passwordRegex.test(passwordCurrent)) {
      setPasswordMessage(
        "At least 8 letters using num | Eng | special characters"
      );
      setIsPassword(false);
    } else {
      setPasswordMessage("Valid password format");
      setIsPassword(true);
    }
  }, []);

  // 비밀번호 확인 유효성 관리-----------------------------------------------
  const onChangePasswordCheck = useCallback(
    (e: any) => {
      const password2Current = e.target.value;
      setPasswordCheck(password2Current);

      if (password === password2Current) {
        setPasswordCheckMessage("password match");
        setIsPasswordCheck(true);
      } else {
        setPasswordCheckMessage("Password mismatch");
        setIsPasswordCheck(false);
      }
    },
    [password]
  );
  return (
    <>
      <S.Container>
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
          <br />
          <S.CursorText>* Excel Upload *</S.CursorText>
        </S.TitleBox>
        <S.Input placeholder="Email" type="email" onChange={onChangeEmail} />
        <S.StatusMessage>{emailMessage}</S.StatusMessage>
        <S.Input placeholder="Name" type="text" onChange={onChangeName} />
        <S.StatusMessage>{nameMessage}</S.StatusMessage>
        <S.Input
          placeholder="Password"
          type="password"
          onChange={onChangePassword}
        />
        <S.StatusMessage>{passwordMessage}</S.StatusMessage>
        <S.Input
          placeholder="Confirm Password"
          type="password"
          onChange={onChangePasswordCheck}
        />
        <S.StatusMessage>{passwordCheckMessage}</S.StatusMessage>
        <S.Button>Submit</S.Button>
      </S.Container>
    </>
  );
};

export default SignUpComp;
