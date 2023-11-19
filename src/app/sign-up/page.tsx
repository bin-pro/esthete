"use client";

import { useCallback, useState } from "react";
import SignUpComp from "@/components/sign/SignUpComp";

const SignUp: React.FC = () => {
  // Input State-----------------------------------------------
  const [email, setEmail] = useState<String>("");
  const [password, setPassword] = useState<String>("");
  const [passwordCheck, setPasswordCheck] = useState<String>("");

  // ErrorMessage State----------------------------------------
  const [emailMessage, setEmailMessage] = useState<String>("");
  const [passwordMessage, setPasswordMessage] = useState<String>("");
  const [passwordCheckMessage, setPasswordCheckMessage] = useState<String>("");

  // Validation State------------------------------------------
  const [isEmail, setIsEmail] = useState<Boolean>(false);
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
        setEmailMessage("유효하지 않은 이메일 형식입니다.");
        setIsEmail(false);
      } else {
        setEmailMessage("유효한 이메일 형식입니다.");
        setIsEmail(true);
      }
    },
    [email]
  );

  // 비밀번호 유효성 관리----------------------------------------------------
  const onChangePassword = useCallback((e: any) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    const passwordCurrent = e.target.value;
    setPassword(passwordCurrent);

    if (!passwordRegex.test(passwordCurrent)) {
      setPasswordMessage("숫자+영문자+특수문자를 조합하여 8글자 이상 작성하세요.");
      setIsPassword(false);
    } else {
      setPasswordMessage("유효한 비밀번호 형식입니다.");
      setIsPassword(true);
    }
  }, []);

  // 비밀번호 확인 유효성 관리-----------------------------------------------
  const onChangePasswordCheck = useCallback(
    (e: any) => {
      const password2Current = e.target.value;
      setPasswordCheck(password2Current);

      if (password === password2Current) {
        setPasswordCheckMessage("비밀번호 입력 일치합니다.");
        setIsPasswordCheck(true);
      } else {
        setPasswordCheckMessage("비밀번호 입력 불일치합니다.");
        setIsPasswordCheck(false);
      }
    },
    [password]
  );
  return (
    <>
      <SignUpComp />
    </>
  );
};

export default SignUp;
