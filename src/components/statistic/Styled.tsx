import styled from "styled-components";

export const Container = styled.div`
  max-width: 100vw;
  height: 100vh;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: hidden;
`;

export const ImageBackground: React.CSSProperties = {
  position: "absolute",
  width: "100%",
  height: "100%",
  objectFit: "cover",
  zIndex: -1,
  opacity: 0.5,
};

// Header------------------------------------
export const HeaderSection = styled.header`
  width: 100%;
  height: 150px;
  min-height: 150px;
  max-height: 150px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  position: sticky;
  top: 0;
  backdrop-filter: blur(2px);
  padding: 0 5%;
  margin-bottom: 15px;
  z-index: 1;
  @media all and (max-width: 900px) {
    height: 200px;
    min-height: 200px;
    max-height: 200px;
    flex-direction: column;
    align-items: flex-start;
    padding-top: 5%;
  }
`;

export const HeaderLine = styled.section`
  width: 90%;
  height: 0px;
  position: sticky;
  top: 150px;
  border-bottom: 1px solid #fff;
  @media all and (max-width: 900px) {
    width: 90%;
    position: sticky;
    top: 215px;
    border-bottom: 1px solid #fff;
  }
`;

export const LogoBox = styled.section`
  min-width: 500px;
  width: calc(100% - 300px);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 25px;
  @media all and (max-width: 900px) {
    width: 100%;
    min-width: auto;
    height: 150px;
  }
`;

export const NavBox = styled.section`
  width: 100%;
  display: flex;
  gap: 40px;
  @media all and (max-width: 900px) {
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
  }
  @media all and (max-width: 500px) {
    max-width: 480px;
    font-size: 12px;
  }
  @media all and (max-width: 436px) {
    max-width: 380px;
    font-size: 10px;
  }
`;

interface NavSpanProps {
  $isCurrent: Boolean;
  $role?: string;
}
export const StatisticNav = styled.span<NavSpanProps>`
  opacity: ${(props) => (props.$isCurrent ? 1 : 0.5)};
  display: ${(props) => (props.$role === "MANAGER" ? "none" : "block")};
  cursor: pointer;
`;

export const ManagementNav = styled(StatisticNav)``;
export const AdminNav = styled(StatisticNav)``;

export const InfoBox = styled.section`
  min-width: 300px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 20px;
  transition: all 0.3s ease-in-out;
  @media all and (max-width: 900px) {
    width: 100%;
    height: 150px;
    justify-content: center;
    align-items: flex-end;
    font-size: 14px;
  }
  @media all and (max-width: 500px) {
    max-width: 480px;
    font-size: 12px;
  }
  @media all and (max-width: 436px) {
    max-width: 380px;
    font-size: 10px;
  }
`;

export const LogoutSpan = styled.span`
  font-size: 10px;
  opacity: 0.75;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  @media all and (max-width: 500px) {
    font-size: 8px;
  }
  &:hover {
    opacity: 1;
  }
`;

export const BodySection = styled.section`
  width: 90%;
  height: calc(100% - 166px);
  min-height: calc(100% - 166px);
  max-height: calc(100% - 166px);
  display: flex;
  flex-direction: column;
  padding-bottom: 30px;
  /* gap: 30px; */
  overflow-y: auto;
  @media all and (max-width: 900px) {
    height: calc(100% - 216px);
    min-height: calc(100% - 216px);
    max-height: calc(100% - 216px);
  }
`;

export const RowSection = styled.section`
  width: 100%;
  height: 50%;
  min-height: 50%;
  max-height: 50%;
  display: flex;
  flex-direction: row;
  /* gap: 30px; */
  @media all and (max-width: 900px) {
    height: 100%;
    min-height: 100%;
    max-height: 100%;
    flex-direction: column;
  }
`;

export const GraphBox = styled.section`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  @media all and (max-width: 900px) {
    width: 100%;
    height: 100%;
  }
`;

export const Graph = styled.section`
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-bottom: 1px solid #949494;
`;

export const GraphTitle = styled.h2`
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 12px;
  font-family: "Syncopate", sans-serif;
`;

export const TitleBox = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #fff;
`;

export const Title = styled.h1`
  text-align: center;
  line-height: 2;
`;
