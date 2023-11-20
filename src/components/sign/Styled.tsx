import styled from "styled-components";

// Sign In---------------------------------
export const Container = styled.div`
  max-width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
  overflow-y: auto;
`;

export const TitleBox = styled.section`
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.h1`
  text-align: center;
  line-height: 2;
`;

export const CursorText = styled(Title)`
  cursor: pointer;
`;

export const Input = styled.input`
  width: 400px;
  height: 50px;
  font-family: "Syncopate", sans-serif;
  background-color: transparent;
  border: 1px solid #fff;
  border-radius: 5px;
  padding: 0 10px;
`;

export const RightBox = styled.section`
  width: 400px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const SmallText = styled.span`
  font-size: 14px;
  opacity: 0.75;
  transition: all 0.3s ease;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
`;

export const Button = styled.button`
  width: 400px;
  height: 50px;
  font-family: "Syncopate", sans-serif;
  font-size: 15px;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  cursor: pointer;
`;

// Sign Up---------------------------------
export const StatusMessage = styled.p`
  width: 400px;
  height: 20px;
  font-family: "Syncopate", sans-serif;
  font-size: 12px;
  text-align: left;
`;
