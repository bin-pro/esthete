import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import * as S from "./Styled";
import Image from "next/image";
import MainLogo from "@/../public/icons/mainLogo.png";
import { getCookie, removeAllCookies } from "@/Cookie";

interface HeaderProps {
  param: string;
}
export const Header: React.FC<HeaderProps> = ({ param }) => {
  const router = useRouter();
  const { id } = useParams();
  const userName = getCookie("userName");
  const role = getCookie("userRole");

  // UseEffect--------------------------------------------
  useEffect(() => {
    if (!getCookie("userName")) {
      alert("Please login");
      handleLogout();
    }
  }, []);

  // Function---------------------------------------------
  const goToPage = (page: string) => {
    router.push(`/${page}/${id}`);
  };
  const handleLogout = () => {
    removeAllCookies();
    router.push("/");
    console.clear();
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
              $role={role}
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
