import styled from "styled-components";

export const MasonryContainer = styled.div`
  width: 100%;
  height: calc(100% - 150px);
  border: 1px solid #fff;
`;

export const CardContainer = styled.div`
  width: 200px;
  height: auto;
  border: 1px solid #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`;

export const CardImageStyle: React.CSSProperties = {
  width: "200px",
  objectFit: "contain",
};

export const CardFooter = styled.section`
  width: 100%;
  height: 35px;
  border: 1px solid #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  bottom: 0;
  transition: all 0.3s ease-in-out;
`;

export const CardButton = styled.section`
  width: 50%;
  height: 100%;
  border: 1px solid #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease-in-out;
`;
