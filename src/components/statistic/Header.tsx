import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import * as S from "./Styled";
import Image from "next/image";
import MainLogo from "@/../public/icons/mainLogo.png";
import { removeCookie } from "@/Cookie";

interface HeaderProps {
  param: string;
}
export const Header: React.FC<HeaderProps> = ({ param }) => {
  const router = useRouter();
  const { id } = useParams();
  const userName = localStorage.getItem("userName");

  // UseEffect--------------------------------------------
  useEffect(() => {
    if (!localStorage.getItem("userName")) {
      alert("Please login");
      router.push("/");
    }
  }, []);

  // Function---------------------------------------------
  const goToPage = (page: string) => {
    router.push(`/${page}/${id}`);
  };
  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("userRole");
    removeCookie("accessToken", {});
    router.push("/");
  };

  return (
    <>
      <S.HeaderSection>
        <S.LogoBox>
          <Image src={MainLogo} alt="mainLogo" width={150} priority />
          <S.NavBox>
            <S.StatisticNav
              $isCurrent={param === "statistic" ? true : false}
              onClick={() => goToPage("statistic")}
            >
              Statistic
            </S.StatisticNav>
            <S.ManagementNav
              $isCurrent={param === "management" ? true : false}
              onClick={() => goToPage("management")}
            >
              Management
            </S.ManagementNav>
            <S.AdminNav
              $isCurrent={param === "admin" ? true : false}
              onClick={() => goToPage("admin")}
            >
              Admin
            </S.AdminNav>
          </S.NavBox>
        </S.LogoBox>
        <S.InfoBox>
          Manager, {userName && userName}
          <br />
          <S.LogoutSpan onClick={handleLogout}>Logout</S.LogoutSpan>
        </S.InfoBox>
      </S.HeaderSection>
      <S.HeaderLine />
    </>
  );
};

export default Header;
