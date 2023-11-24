import { useParams, useRouter } from "next/navigation";
import * as S from "./Styled";
import Image from "next/image";
import MainLogo from "@/../public/icons/mainLogo.png";

interface HeaderProps {
  param: string;
}
export const Header: React.FC<HeaderProps> = ({ param }) => {
  const router = useRouter();
  const { id } = useParams();
  const goToPage = (page: string) => {
    router.push(`/${page}/${id}}`);
  };

  return (
    <S.HeaderSection>
      <S.LogoBox>
        <Image src={MainLogo} alt="mainLogo" width={150} />
        <S.NavBox>
          <S.StatisticNav
            isCurrent={param === "statistic" ? true : false}
            onClick={() => goToPage("statistic")}
          >
            Statistic
          </S.StatisticNav>
          <S.ManagementNav
            isCurrent={param === "management" ? true : false}
            onClick={() => goToPage("management")}
          >
            Management
          </S.ManagementNav>
          <S.AdminNav
            isCurrent={param === "admin" ? true : false}
            onClick={() => goToPage("admin")}
          >
            Admin
          </S.AdminNav>
        </S.NavBox>
      </S.LogoBox>
      <S.InfoBox>
        Manager, JUN SEO
        <br />
        <S.LogoutSpan>Logout</S.LogoutSpan>
      </S.InfoBox>
    </S.HeaderSection>
  );
};

export default Header;
