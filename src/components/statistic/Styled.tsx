import styled from "styled-components";

export const Container = styled.div`
  max-width: 100vw;
  height: 100vh;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  transition: all 0.3s ease-in-out;
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
  transition: all 0.3s ease-in-out;
  padding: 5%;
  margin-bottom: 15px;
  z-index: 1;
  @media all and (max-width: 900px) {
    height: 200px;
    min-height: 200px;
    max-height: 200px;
    flex-direction: column;
    align-items: flex-start;
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
  justify-content: space-between;
  gap: 25px;
  transition: all 0.3s ease-in-out;
  @media all and (max-width: 900px) {
    width: 100%;
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
  }
`;

interface NavSpanProps {
  isCurrent: Boolean;
}
export const StatisticNav = styled.span<NavSpanProps>`
  opacity: ${(props) => (props.isCurrent ? 1 : 0.5)};
  transition: all 0.3s ease-in-out;
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
  }
`;

export const LogoutSpan = styled.span`
  font-size: 10px;
  opacity: 0.75;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    opacity: 1;
  }
`;

export const BodySection = styled.section`
  width: 100%;
  height: calc(100% - 166px);
  min-height: calc(100% - 166px);
  max-height: calc(100% - 166px);
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 30px;
  padding: 5%;
  overflow: hidden;
  @media all and (max-width: 900px) {
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: repeat(4, 1fr);
  }
`;

export const GraphBox = styled.section`
  width: 100%;
  max-width: 100%;
  height: 100%;
  justify-self: center;
  align-self: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease-in-out;
`;

export const Graph = styled.section`
  width: 100%;
  min-height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-bottom: 1px solid #fff;
  margin-bottom: 10px;
`;

export const GraphTitle = styled.h2`
  width: 100%;
  text-align: left;
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
