"use client";

import { useState } from "react";
import * as S from "@/components/sign/Styled";
import Image from "next/image";
import MainLogo from "@/../public/icons/mainLogo.png";
import Background from "@/../public/images/background.jpg";
import Warning from "@/../public/icons/warning.png";
import { ImageBackground } from "@/components/sign/Styled";

const DUMMUY_DATA = [
  {
    email: "test1@naver.com",
    name: "test1",
    password: "test1!",
  },
  {
    email: "test2@naver.com",
    name: "test2",
    password: "test2!",
  },
  {
    email: "test3@naver.com",
    name: "test3",
    password: "test3!",
  },
  {
    email: "test4@naver.com",
    name: "test4",
    password: "test4!",
  },
  {
    email: "test5@naver.com",
    name: "test5",
    password: "test5!",
  },
];

const Excel: React.FC = () => {
  const [isUpload, setIsUpload] = useState<Boolean>(false);
  const [status, setStatus] = useState<String>("not yet");

  return (
    <>
      <S.Container>
        <Image src={Background} fill alt="background" style={ImageBackground} />
        <Image
          src={MainLogo}
          width={200}
          alt="esthete-logo"
          loading="lazy"
          placeholder="empty"
        />
        <br />
        <S.TitleBox>
          <S.Title>
            My own small Exhibition
            <br />
            Management system
          </S.Title>
        </S.TitleBox>
        <br />
        <S.UploadStatusText status={status}>
          {status === "not yet" ? (
            ""
          ) : status === "success" ? (
            <p>Excel upload success</p>
          ) : status === "fail" ? (
            <p>Excel upload failed</p>
          ) : (
            <p></p>
          )}
        </S.UploadStatusText>
        <br />
        <S.ExcelDataBox>
          {DUMMUY_DATA.length !== 0 ? (
            <>
              <S.UploadInput type="file" accept=".xlsx" id="excel" />
              <S.UploadText htmlFor="excel">Upload your file</S.UploadText>
            </>
          ) : (
            <>
              {/* email */}
              <S.ExcelDataUnit>
                Email
                <S.ExcelData>
                  {DUMMUY_DATA.map((data, idx) => (
                    <S.ExcelDataText key={idx}>{data.email}</S.ExcelDataText>
                  ))}
                </S.ExcelData>
              </S.ExcelDataUnit>
              {/* name */}
              <S.ExcelDataUnit>
                Name
                <S.ExcelData>
                  {DUMMUY_DATA.map((data, idx) => (
                    <S.ExcelDataText key={idx}>{data.name}</S.ExcelDataText>
                  ))}
                </S.ExcelData>
              </S.ExcelDataUnit>
              {/* password */}
              <S.ExcelDataUnit>
                Password
                <S.ExcelData>
                  {DUMMUY_DATA.map((data, idx) => (
                    <S.ExcelDataText key={idx}>{data.password}</S.ExcelDataText>
                  ))}
                </S.ExcelData>
              </S.ExcelDataUnit>
            </>
          )}
        </S.ExcelDataBox>
        <br />
        <S.ExcelSubmitButton disabled={!isUpload} isUpload={isUpload}>
          Submit
        </S.ExcelSubmitButton>
      </S.Container>
    </>
  );
};

export default Excel;
