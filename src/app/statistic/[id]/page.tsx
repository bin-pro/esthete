"use client";

import * as S from "@/components/statistic/Styled";
import Image from "next/image";
import MainLogo from "@/../public/icons/mainLogo.png";
import Background from "@/../public/images/background.jpg";
import { useParams, useRouter } from "next/navigation";

const Statistic: React.FC = () => {
  const router = useRouter();
  const { id } = useParams();
  const goToPage = (page: string) => {
    router.push(`/${page}/${id}}`);
  };

  return (
    <>
      <S.Container>
        <Image
          src={Background}
          fill
          alt="background"
          style={S.ImageBackground}
        />
        <S.HeaderSection>
          <S.LogoBox>
            <Image src={MainLogo} alt="mainLogo" width={150} />
            <S.NavBox>
              <S.StatisticNav
                isCurrent={true}
                onClick={() => goToPage("statistic")}
              >
                Statistic
              </S.StatisticNav>
              <S.ManagementNav
                isCurrent={false}
                onClick={() => goToPage("management")}
              >
                Management
              </S.ManagementNav>
              <S.AdminNav isCurrent={false} onClick={() => goToPage("admin")}>
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
        <S.BodySection>
          <S.GraphBox></S.GraphBox>
          <S.GraphBox></S.GraphBox>
          <S.GraphBox></S.GraphBox>
          <S.GraphBox></S.GraphBox>
        </S.BodySection>
      </S.Container>
    </>
  );
};

export default Statistic;
