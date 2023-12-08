import styled from "styled-components";

// Sign In---------------------------------
export const Container = styled.form`
  max-width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
  position: relative;
  padding: 5%;
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
  color: ${(props) => (props.isEmail ? "#7EC9FF" : "#FF6D6D")};
`;

export const NameMessage = styled(MessageStyle)<NameProps>`
  color: ${(props) => (props.isName ? "#7EC9FF" : "#FF6D6D")};
`;

export const PasswordMessage = styled(MessageStyle)<PasswordProps>`
  color: ${(props) => (props.isPassword ? "#7EC9FF" : "#FF6D6D")};
`;

export const PasswordCheckMessage = styled(MessageStyle)<PasswordCheckProps>`
  color: ${(props) => (props.isPasswordCheck ? "#7EC9FF" : "#FF6D6D")};
`;

// Excel---------------------------------
interface UploadStatusProps {
  status: String;
}
export const UploadStatusText = styled.p<UploadStatusProps>`
  width: 400px;
  font-family: "Syncopate", sans-serif;
  text-align: center;
  color: ${(props) =>
    props.status === "success" ? "#7EC9FF" : props.status === "fail" ? "#FF6D6D" : "#fff"};
`;

export const UploadInput = styled.input`
  display: none;
`;

export const UploadText = styled.label`
  cursor: pointer;
`;

export const ExcelDataBox = styled.div`
  min-width: 700px;
  height: 300px;
  max-height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
  border-radius: 5px;
  transition: all 0.3s ease;
  @media all and (min-width: 900px) {
    min-width: 800px;
  }
  @media all and (min-width: 1000px) {
    min-width: 900px;
  }
  @media all and (min-width: 1100px) {
    min-width: 1000px;
  }
`;

export const ExcelDataUnit = styled.div`
  width: calc(100% / 3);
  max-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 60px;
  padding: 0 10px;
`;

export const ExcelData = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  gap: 40px;
`;

export const ExcelDataText = styled.p`
  width: 100%;
  text-align: center;
  color: #fff;
  opacity: 0.75;
`;

interface ExcelSubmitButtonProps {
  isUpload: Boolean;
}
export const ExcelSubmitButton = styled(Button)<ExcelSubmitButtonProps>`
  background-color: ${(props) => (props.isUpload ? "#fff" : "#afafaf")};
`;
