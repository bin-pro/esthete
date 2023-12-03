import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DetailBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  transition: all 0.3s ease;
  @media (max-width: 768px) {
    width: 90%;
    height: 90%;
  }
`;

export const LeftBox = styled.div`
  width: 35%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #fff;
`;

export const RightBox = styled.div`
  width: 65%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const ProfileBox = styled.div`
  width: 100%;
  height: 40%;
  position: relative;
  border: none;
`;

export const ImageStyle: React.CSSProperties = {
  objectFit: "cover",
  border: "none",
};

export const InfoBox = styled.div`
  width: 100%;
  height: 60%;
  display: flex;
  flex-direction: column;
  gap: 30px;
  border-top: 1px solid #fff;
  padding: 15px;
`;

export const InfoText = styled.p`
  font-size: 14px;
`;

export const PostImageBox = styled.div`
  width: 100%;
  height: 65%;
  position: relative;
`;

export const DescriptionBox = styled.div`
  width: 100%;
  height: calc(35% - 40px);
  padding: 15px;
  border-top: 1px solid #fff;
`;

export const ActionBox = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #fff;
`;

interface ActionButtonProps {
  $attr?: string;
}
export const ActionButton = styled.button<ActionButtonProps>`
  width: 50%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "syncopate", sans-serif;
  border: none;
  border-right: ${(props) => (props.$attr === "delete" ? "1px solid #fff" : "none")};
  background-color: transparent;
  color: ${(props) => (props.$attr === "delete" ? "#7EC9FF" : "#FF6D6D")};
  cursor: pointer;
`;
