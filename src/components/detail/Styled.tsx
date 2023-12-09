import ReactPaginate from "react-paginate";
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

export const FullImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
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
  justify-content: space-between;
  border-top: 1px solid #fff;
  padding: 15px;
`;

export const TextBox = styled.section`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const InfoText = styled.span`
  font-size: 12px;
  color: #7ec9ff;
`;

export const SmallText = styled.span`
  font-size: 10px;
`;

export const BorderLine = styled.section`
  width: 100%;
  border-bottom: 1px solid #a6a6a6;
  margin: 15px 0;
`;

export const PostImageBox = styled.div`
  width: 100%;
  height: 65%;
  position: relative;
`;

export const ReportDetailBox = styled.div`
  width: 100%;
  height: calc(35% - 40px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  padding: 15px;
  border-top: 1px solid #fff;
  overflow-y: auto;
`;

export const ReportDetailDelete = styled.button`
  width: 60px;
  height: 30px;
  position: absolute;
  top: 15px;
  right: 15px;
  background-color: #000;
  font-family: "Syncopate", sans-serif;
  font-size: 12px;
  color: #ff6d6d;
  border: 1px solid #fff;
  border-radius: 5px;
  cursor: pointer;
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
  color: ${(props) => (props.$attr === "delete" ? "#FF6D6D" : "#7EC9FF")};
  cursor: pointer;
`;

export const StyledPagination = styled(ReactPaginate).attrs({
  activeClassName: "active",
})`
  margin-top: 10px;
  display: flex;
  justify-content: center;
  list-style-type: none;
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
