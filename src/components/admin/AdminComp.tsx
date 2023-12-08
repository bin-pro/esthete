"use client";

import { useEffect, useState } from "react";
import * as S from "@/components/statistic/Styled";
import * as A from "./Styled";
import Image from "next/image";
import Background from "@/../public/images/background.jpg";
import Header from "@/components/statistic/Header";
import { Instance } from "@/api/axios";
import { useRouter } from "next/navigation";

interface ManagerProps {
  user_id: string;
  username: string;
  password: string;
  role: string;
}

const AdminComp: React.FC = () => {
  const router = useRouter();
  // State-----------------------------------------------
  const [createNumber, setCreateNumber] = useState<number>(1);
  const [managerList, setManagerList] = useState<ManagerProps[]>([]);

  // Handling--------------------------------------------
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (/^\d+$/.test(value) && parseInt(value) >= 1 && parseInt(value) <= 10) {
      setCreateNumber(Number(e.target.value));
    }
  };

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await Instance.post(`/managers`, {
        create_number: createNumber,
      });
      if (result.status === 200) {
        console.log(result);
      }
    } catch (err: any) {
      console.log(err);
      console.log(createNumber);
    }
  };

  const handleDelete = async (userId: string) => {
    try {
      const result = await Instance.delete(`/managers/${userId}`);
      if (result.status === 200) {
        console.log(result);
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
          setManagerList(result.data.content);
        }
      } catch (err: any) {
        console.log(err);
        if (err?.response.status === 401) {
          alert("관리자만 접근 가능합니다.");
          router.push("/");
        }
      }
    })();
  }, []);

  // Hydration--------------------------------------------
  const [element, setElement] = useState<HTMLCollectionOf<HTMLHtmlElement> | null>(null);
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
            <A.Input
              type="number"
              min={1}
              max={10}
              name="create-manager"
              value={createNumber}
              placeholder="How many Manager accounts do u create?"
              onChange={handleOnChange}
            />
            <A.SubmitButton type="submit">Create</A.SubmitButton>
          </A.FormBox>
          <A.ListBox>
            {managerList.length === 0 ? (
              <A.ListEmptyBox>* Add your Manager *</A.ListEmptyBox>
            ) : (
              <>
                <A.ListUnit>
                  <A.ListTextBox>
                    <A.ListText $title={true}>username</A.ListText>
                    <A.ListText $title={true}>password</A.ListText>
                  </A.ListTextBox>
                </A.ListUnit>
                {managerList.map((manager: ManagerProps) => {
                  return (
                    <A.ListUnit key={manager.user_id}>
                      <A.ListTextBox>
                        <A.ListText>{manager.username}</A.ListText>
                        <A.ListText>{manager.password}</A.ListText>
                      </A.ListTextBox>
                      <A.ListDeleteButton onClick={() => handleDelete(manager.user_id)}>
                        DEL
                      </A.ListDeleteButton>
                    </A.ListUnit>
                  );
                })}
              </>
            )}
          </A.ListBox>
        </A.Body>
      </A.Container>
    </>
  );
};

export default AdminComp;
