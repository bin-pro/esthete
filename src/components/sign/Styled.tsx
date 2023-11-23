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
  position: relative;
  overflow-y: auto;
`;

export const ImageBackground: React.CSSProperties = {
  position: "absolute",
  width: "100%",
  height: "100%",
  objectFit: "cover",
  zIndex: -1,
  opacity: 0.5,
};

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
interface EmailProps {
  isEmail: Boolean;
}
interface NameProps {
  isName: Boolean;
}
interface PasswordProps {
  isPassword: Boolean;
}
interface PasswordCheckProps {
  isPasswordCheck: Boolean;
}

export const MessageStyle = styled.p`
  width: 400px;
  height: 20px;
  font-family: "Syncopate", sans-serif;
  font-size: 12px;
  text-align: left;
`;

export const EmailMessage = styled(MessageStyle)<EmailProps>`
  color: ${(props) =>
    props.isEmail ? props.theme.primaryColor : props.theme.secondaryColor};
`;

export const NameMessage = styled(MessageStyle)<NameProps>`
  color: ${(props) => (props.isName ? "red" : "green")};
`;

export const PasswordMessage = styled(MessageStyle)<PasswordProps>`
  color: ${(props) => (props.isPassword ? "red" : "green")};
`;

export const PasswordCheckMessage = styled(MessageStyle)<PasswordCheckProps>`
  color: ${(props) => (props.isPasswordCheck ? "red" : "green")};
`;
