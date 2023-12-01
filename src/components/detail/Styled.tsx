import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DetailBox = styled.div`
  width: 700px;
  height: 85%;
  display: flex;
  justify-content: space-between;
  transition: all 0.3s ease;
  border: 1px solid #fff;
  @media (max-width: 768px) {
    width: 90%;
    height: 90%;
  }
`;

export const LeftBox = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid #fff;
`;

export const RightBox = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid #fff;
`;

export const ProfileBox = styled.div`
  width: 100%;
  height: 35%;
  border: 1px solid #fff;
`;

export const InfoBox = styled.div`
  width: 100%;
  height: 65%;
  display: flex;
  flex-direction: column;
  border: 1px solid #fff;
`;

export const PostImageBox = styled.div`
  width: 100%;
  height: 55%;
  border: 1px solid #fff;
`;

export const DescriptionBox = styled.div`
  width: 100%;
  height: calc(45% - 40px);
  border: 1px solid #fff;
`;

export const ActionBox = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #fff;
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
  border-right: ${(props) =>
    props.$attr === "delete" ? "1px solid #fff" : "none"};
  background-color: transparent;
  color: ${(props) => (props.$attr === "delete" ? "#7EC9FF" : "#FF6D6D")};
  cursor: pointer;
`;
