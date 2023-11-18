"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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

  return (
    <>
      <p>Sign In</p>
    </>
  );
};
