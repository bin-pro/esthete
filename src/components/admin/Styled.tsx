import styled from "styled-components";

export const Container = styled.div`
  max-width: 100vw;
  min-height: 100vh;
  height: 100%;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

export const Body = styled.div`
  width: 90%;
  min-height: calc(100% - 150px);
  height: calc(100% - 150px);
  display: flex;
  flex-direction: column;
  align-items: center;
  @media all and (max-width: 900px) {
    height: calc(100% - 200px);
    min-height: calc(100% - 200px);
    max-height: calc(100% - 200px);
  }
`;

export const FormBox = styled.form`
  width: 90%;
  max-width: 900px;
  height: 150px;
  min-height: 150px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const InputBox = styled.div`
  width: 83%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Input = styled.input`
  width: 49%;
  height: 50px;
  font-family: "Syncopate", sans-serif;
  background-color: transparent;
  border: 1px solid #fff;
  border-radius: 5px;
  padding: 0 10px;
`;

export const SubmitButton = styled.button`
  width: 15%;
  min-width: 100px;
  height: 50px;
  font-family: "Syncopate", sans-serif;
  background-color: #fff;
  border: none;
  border-radius: 5px;
  color: #000;
  cursor: pointer;
`;

export const ListBox = styled.div`
  width: 90%;
  max-width: 900px;
  height: calc(100% - 100px);
  max-height: calc(100% - 100px);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-right: 15px;
  overflow-y: auto;
`;

export const ListUnit = styled.section`
  width: 100%;
  min-height: 70px;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #a7a7a7;
`;

export const ListTextBox = styled.section`
  width: 83%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const ListText = styled.p`
  width: 48%;
`;

export const ListDeleteButton = styled(SubmitButton)`
  width: 10%;
  min-width: 80px;
  height: 40px;
  background-color: #000;
  color: #fff;
  border: 1px solid #fff;
`;
