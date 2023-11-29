import ReactPaginate from "react-paginate";
import styled from "styled-components";

export const MasonryContainer = styled.div`
  width: 90%;
  height: calc(100% - 150px);
  padding: 5% 0;
  overflow-y: auto;
`;

export const CardContainer = styled.div`
  width: 200px;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: scale(1.03);
  }
`;

export const ResMasonryStyle: React.CSSProperties = {
  width: "100%",
  display: "flex",
  justifyContent: "center",
};

export const MasonryStyle: React.CSSProperties = {
  width: "650px",
  display: "flex",
  justifyContent: "center",
  gap: "0px",
};

export const CardImageStyle: React.CSSProperties = {
  border: "1px solid #fff",
};

export const CardFooter = styled.section`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  bottom: 0;
  transition: all 0.3s ease-in-out;
`;

interface CardButtonProps {
  del?: boolean;
}
export const CardButton = styled.section<CardButtonProps>`
  width: 50%;
  height: 100%;
  border: 1px solid #fff;
  border-right: ${(props) => (props.del ? "none" : "1px solid #fff")};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => (props.del ? "#7EC9FF" : "#FF6D6D")};
  background-color: #000;
  font-size: 12px;
  transition: all 0.3s ease-in-out;
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
    color: #62b6b7;
  }
  li.active a {
    color: #91cccd;
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
