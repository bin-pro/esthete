"use client";

import { useEffect, useState } from "react";
import * as S from "@/components/statistic/Styled";
import * as A from "./Styled";
import Image from "next/image";
import Background from "@/../public/images/background.jpg";
import Header from "@/components/statistic/Header";

const AdminComp: React.FC = () => {
  // State-----------------------------------------------
  const [managerList, setManagerList] = useState<string[]>([]);

  // Hydration--------------------------------------------
  const [element, setElement] =
    useState<HTMLCollectionOf<HTMLHtmlElement> | null>(null);
  useEffect(() => {
    setElement(document.getElementsByTagName("html"));
  }, []);
  if (!element) return <></>;
  return (
    <>
      <A.Container>
        <Image
          src={Background}
          fill
          alt="background"
          style={S.ImageBackground}
          priority
          quality={100}
        />
        <Header param="admin" />
        <A.Body>
          <A.FormBox>
            <A.InputBox>
              <A.Input placeholder="Manager ID" />
              <A.Input placeholder="Manager PW" />
            </A.InputBox>
            <A.SubmitButton>Add</A.SubmitButton>
          </A.FormBox>
          <A.ListBox>
            <A.ListUnit>
              <A.ListTextBox>
                <A.ListText>test1</A.ListText>
                <A.ListText>test1234@</A.ListText>
              </A.ListTextBox>
              <A.ListDeleteButton>DEL</A.ListDeleteButton>
            </A.ListUnit>
            <A.ListUnit>
              <A.ListTextBox>
                <A.ListText>test2</A.ListText>
                <A.ListText>test1234@</A.ListText>
              </A.ListTextBox>
              <A.ListDeleteButton>DEL</A.ListDeleteButton>
            </A.ListUnit>
            <A.ListUnit>
              <A.ListTextBox>
                <A.ListText>test3</A.ListText>
                <A.ListText>test1234@</A.ListText>
              </A.ListTextBox>
              <A.ListDeleteButton>DEL</A.ListDeleteButton>
            </A.ListUnit>
            <A.ListUnit>
              <A.ListTextBox>
                <A.ListText>test4</A.ListText>
                <A.ListText>test1234@</A.ListText>
              </A.ListTextBox>
              <A.ListDeleteButton>DEL</A.ListDeleteButton>
            </A.ListUnit>
            <A.ListUnit>
              <A.ListTextBox>
                <A.ListText>test4</A.ListText>
                <A.ListText>test1234@</A.ListText>
              </A.ListTextBox>
              <A.ListDeleteButton>DEL</A.ListDeleteButton>
            </A.ListUnit>
            <A.ListUnit>
              <A.ListTextBox>
                <A.ListText>test4</A.ListText>
                <A.ListText>test1234@</A.ListText>
              </A.ListTextBox>
              <A.ListDeleteButton>DEL</A.ListDeleteButton>
            </A.ListUnit>
            <A.ListUnit>
              <A.ListTextBox>
                <A.ListText>test4</A.ListText>
                <A.ListText>test1234@</A.ListText>
              </A.ListTextBox>
              <A.ListDeleteButton>DEL</A.ListDeleteButton>
            </A.ListUnit>
            <A.ListUnit>
              <A.ListTextBox>
                <A.ListText>test4</A.ListText>
                <A.ListText>test1234@</A.ListText>
              </A.ListTextBox>
              <A.ListDeleteButton>DEL</A.ListDeleteButton>
            </A.ListUnit>
          </A.ListBox>
        </A.Body>
      </A.Container>
    </>
  );
};

export default AdminComp;
