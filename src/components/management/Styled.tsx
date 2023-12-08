import ReactPaginate from "react-paginate";
import styled from "styled-components";
import { SwiperSlide } from "swiper/react";

export const SelectSection = styled.section`
  width: 90%;
  height: 20px;
  display: flex;
  justify-content: center;
  margin-top: 15px;
`;

interface SelectProps {
  $isSelect: Boolean;
}
export const SelectText = styled.span<SelectProps>`
  font-size: 14px;
  opacity: ${(props) => (props.$isSelect ? 1 : 0.5)};
  margin: 0 15px;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
`;

// Masonry-----------------------------------
export const MasonryContainer = styled.div`
  width: 90%;
  min-width: 800px;
  height: calc(100% - 170px);
  max-height: calc(100% - 170px);
  padding: 5% 0;
  overflow-y: auto;
`;

export const ResMasonryStyle: React.CSSProperties = {
  width: "100%",
  display: "flex",
  justifyContent: "center",
};

export const MasonryStyle: React.CSSProperties = {
  width: "850px",
  display: "flex",
  padding: "15px",
};

export const CardContainer = styled.div`
  width: 250px;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow-x: hidden;
  &:hover {
    transform: scale(1.03);
  }
`;

export const CardImage = styled.img`
  width: 100%;
  height: 100%;
  min-height: calc(100% - 30px);
  object-fit: cover;
`;

interface CardImageProps {
  $isHover: Boolean;
}
export const CardIageHoverBox = styled.section<CardImageProps>`
  width: 100%;
  height: calc(100% - 30px);
  display: flex;
  position: absolute;
  top: 0;
  left: ${(props) => (props.$isHover ? "0" : "-250px")};
  border: 1px solid #fff;
  background-color: rgba(0, 0, 0, 0.8);
  overflow-x: hidden;
  overflow-y: auto;
`;

interface CardHalfBoxProps {
  $left: Boolean;
}
export const CardHalfBox = styled.section<CardHalfBoxProps>`
  width: ${(props) => (props.$left ? "45%" : "65%")};
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 15px;
`;

export const SmallText = styled.span`
  height: 25px;
  font-size: 10px;
  opacity: 0.75;
`;

export const CardImageStyle: React.CSSProperties = {
  border: "1px solid #fff",
  objectFit: "cover",
};

export const CardFooter = styled.section`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  bottom: 0;
`;

interface CardButtonProps {
  $attr?: String;
}
export const CardButton = styled.section<CardButtonProps>`
  width: 50%;
  height: 100%;
  border: 1px solid #fff;
  border-right: ${(props) => (props.$attr === "delete" ? "none" : "1px solid #fff")};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => (props.$attr === "delete" ? "#7EC9FF" : "#FF6D6D")};
  background-color: #000;
  font-size: 12px;
  cursor: pointer;
`;

export const StyledPagination = styled(ReactPaginate).attrs({
  activeClassName: "active",
})`
  margin: 50px 16px;
  display: flex;
  justify-content: center;
  list-style-type: none;
  padding: 0 5rem;
  li a {
    border-radius: 7px;
    padding: 0.1rem 1rem;
    cursor: pointer;
  }
  li.previous a,
  li.next a {
    color: #7ec9ff;
  }
  li.active a {
    color: #7ec9ff;
    font-weight: 700;
    min-width: 32px;
  }
  li.disabled a {
    color: #fff;
  }
  li.disable,
  li.disabled a {
    cursor: default;
  }
`;

// Swiper-----------------------------------
export const SwiperContainer = styled.div`
  width: 90%;
  height: calc(100% - 170px);
  min-width: 700px;
  max-height: calc(100% - 170px);
  display: flex;
  align-items: center;
  padding: 5% 0;
  overflow-y: auto;
  @media all and (max-width: 705px) {
    width: 500px;
    height: 400px;
  }
  @media all and (max-width: 505px) {
    width: 350px;
    height: 300px;
  }
`;

export const SwiperCard = styled(SwiperSlide)`
  width: 500px;
  height: 250px;
  display: flex;
  background-color: #000;
  border: 1px solid #fff;
`;

export const ImageBox = styled.section`
  width: 200px;
  height: 100%;
  position: relative;
`;

export const SwiperImageStyle: React.CSSProperties = {
  objectFit: "cover",
};

export const InfoSection = styled.section`
  width: calc(100% - 200px);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  border-left: 1px solid #fff;
`;

export const InfoBox = styled.section`
  width: 100%;
  height: calc(100% - 30px);
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
`;

export const ColHeadBox = styled.section`
  width: 100%;
  height: 40%;
  display: flex;
  justify-content: space-between;
`;

export const ColHalfBox = styled.section`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

interface InfoSpanProps {
  $attr?: String;
}
export const InfoSpan = styled.span<InfoSpanProps>`
  font-size: 14px;
  color: ${(props) =>
    props.$attr === "title" ? "#7EC9FF" : props.$attr === "log" ? "#FF6D6D" : "#fff"};
`;

export const ColLogBox = styled.section`
  width: 100%;
  height: 60%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ActionBox = styled.section`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #fff;
`;

interface ActionButtonProps {
  $attr?: String;
}
export const ActionButton = styled.button<ActionButtonProps>`
  width: 50%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-right: ${(props) => (props.$attr === "delete" ? "1px solid #fff" : "none")};
  font-family: "Syncopate", sans-serif;
  color: ${(props) => (props.$attr === "delete" ? "#7EC9FF" : "#FF6D6D")};
  background-color: transparent;
  font-size: 14px;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
`;
