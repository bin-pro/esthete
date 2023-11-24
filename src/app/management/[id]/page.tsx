"use client";

import * as S from "@/components/statistic/Styled";
import * as M from "@/components/management/Styled";
import Image from "next/image";
import Background from "@/../public/images/background.jpg";
import Header from "@/components/statistic/Header";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import TestImage1 from "@/../public/images/testImage (1).png";
import TestImage2 from "@/../public/images/testImage (2).png";
import TestImage3 from "@/../public/images/testImage (3).png";
import TestImage4 from "@/../public/images/testImage (4).png";
import TestImage5 from "@/../public/images/testImage (5).png";
import TestImage6 from "@/../public/images/testImage (6).png";
import TestImage7 from "@/../public/images/testImage (7).png";
import TestImage8 from "@/../public/images/testImage (8).png";

const DUMMY_DATA = [
  {
    id: 1,
    image: TestImage1,
  },
  {
    id: 2,
    image: TestImage2,
  },
  {
    id: 3,
    image: TestImage3,
  },
  {
    id: 4,
    image: TestImage4,
  },
  {
    id: 5,
    image: TestImage5,
  },
  {
    id: 6,
    image: TestImage6,
  },
  {
    id: 7,
    image: TestImage7,
  },
  {
    id: 8,
    image: TestImage8,
  },
];

const Management = () => {
  return (
    <>
      <S.Container>
        <Image
          src={Background}
          fill
          alt="background"
          style={S.ImageBackground}
        />
        <Header param="management" />
        <M.MasonryContainer>
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1280: 4 }}
          >
            <Masonry gutter="25px" style={{}}>
              {DUMMY_DATA.map((data) => (
                <M.CardContainer key={data.id}>
                  <Image
                    src={data.image}
                    alt="testImage"
                    width={200}
                    style={M.CardImageStyle}
                  />
                  <M.CardFooter>
                    <M.CardButton>DELETE</M.CardButton>
                    <M.CardButton>REJECT</M.CardButton>
                  </M.CardFooter>
                </M.CardContainer>
              ))}
            </Masonry>
          </ResponsiveMasonry>
        </M.MasonryContainer>
      </S.Container>
    </>
  );
};

export default Management;
