"use client";

import { useEffect, useState } from "react";
import * as S from "@/components/statistic/Styled";
import * as A from "./Styled";
import Image from "next/image";
import Background from "@/../public/images/background.jpg";
import Header from "@/components/statistic/Header";
import { Instance } from "@/api/axios";

interface ManagerProps {
  user_id: string;
  username: string;
  password: string;
  role: string;
}

const AdminComp: React.FC = () => {
  // State-----------------------------------------------
  const [managerId, setManagerId] = useState<string>("");
  const [managerPw, setManagerPw] = useState<string>("");
  const [managerList, setManagerList] = useState<ManagerProps[]>([]);

  // Handling--------------------------------------------
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "manager-id") {
      setManagerId(value);
    } else if (name === "manager-pw") {
      setManagerPw(value);
    }
  };

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await Instance.post(`/managers`, {
        createNumber: 1,
        username: managerId,
        password: managerPw,
      });
      if (result.status === 200) {
        console.log(result);
        // setManagerList([...managerList, managerId, managerPw]);
        setManagerId("");
        setManagerPw("");
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  // useEffect--------------------------------------------
  useEffect(() => {
    (async () => {
      try {
        const result = await Instance.get(`/managers`);
        if (result.status === 200) {
          console.log(result.data);
          setManagerList(result.data.content);
        }
      } catch (err: any) {
        console.log(err);
      }
    })();
  }, []);

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
          sizes="(max-width: 768px) 100vw,
          (max-width: 1200px) 50vw,
          33vw"
          quality={100}
        />
        <Header param="admin" />
        <A.Body>
          <A.FormBox onSubmit={handleOnSubmit}>
            <A.InputBox>
              <A.Input
                type="text"
                name="manager-id"
                placeholder="Manager ID"
                onChange={handleOnChange}
              />
              <A.Input
                type="text"
                name="manager-pw"
                placeholder="Manager PW"
                onChange={handleOnChange}
              />
            </A.InputBox>
            <A.SubmitButton>Add</A.SubmitButton>
          </A.FormBox>
          <A.ListBox>
            {managerList.length === 0 ? (
              <A.ListEmptyBox>* Add your Manager *</A.ListEmptyBox>
            ) : (
              managerList.map((manager: ManagerProps) => {
                return (
                  <A.ListUnit key={manager.user_id}>
                    <A.ListTextBox>
                      <A.ListText>{manager.username}</A.ListText>
                      <A.ListText>{manager.password}</A.ListText>
                    </A.ListTextBox>
                    <A.ListDeleteButton>DEL</A.ListDeleteButton>
                  </A.ListUnit>
                );
              })
            )}
          </A.ListBox>
        </A.Body>
      </A.Container>
    </>
  );
};

export default AdminComp;
