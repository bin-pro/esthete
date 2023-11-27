"use client";

import * as S from "@/components/statistic/Styled";
import * as M from "@/components/management/Styled";
import Image from "next/image";
import Background from "@/../public/images/background.jpg";
import Header from "@/components/statistic/Header";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import TestImage1 from "@/../public/images/testImage (1).png";
import TestImage2 from "@/../public/images/testImage (2).png";
import TestImage4 from "@/../public/images/testImage (4).png";
import TestImage5 from "@/../public/images/testImage (5).png";
import TestImage6 from "@/../public/images/testImage (6).png";
import TestImage7 from "@/../public/images/testImage (7).png";
import TestImage8 from "@/../public/images/testImage (8).png";
import { useState } from "react";
import ReactPaginate from "react-paginate";

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
    image: TestImage5,
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
  {
    id: 9,
    image: TestImage1,
  },
  {
    id: 10,
    image: TestImage2,
  },
  {
    id: 11,
    image: TestImage5,
  },
  {
    id: 12,
    image: TestImage4,
  },
  {
    id: 13,
    image: TestImage5,
  },
  {
    id: 14,
    image: TestImage6,
  },
  {
    id: 15,
    image: TestImage7,
  },
  {
    id: 16,
    image: TestImage8,
  },
  {
    id: 17,
    image: TestImage1,
  },
  {
    id: 18,
    image: TestImage2,
  },
  {
    id: 19,
    image: TestImage5,
  },
  {
    id: 20,
    image: TestImage4,
  },
  {
    id: 21,
    image: TestImage5,
  },
  {
    id: 22,
    image: TestImage6,
  },
  {
    id: 23,
    image: TestImage7,
  },
  {
    id: 24,
    image: TestImage8,
  },
  {
    id: 25,
    image: TestImage1,
  },
  {
    id: 26,
    image: TestImage2,
  },
  {
    id: 27,
    image: TestImage5,
  },
  {
    id: 28,
    image: TestImage4,
  },
  {
    id: 29,
    image: TestImage5,
  },
  {
    id: 30,
    image: TestImage6,
  },
  {
    id: 31,
    image: TestImage7,
  },
  {
    id: 32,
    image: TestImage8,
  },
  {
    id: 33,
    image: TestImage1,
  },
  {
    id: 34,
    image: TestImage2,
  },
  {
    id: 35,
    image: TestImage5,
  },
  {
    id: 36,
    image: TestImage4,
  },
  {
    id: 37,
    image: TestImage5,
  },
];

const Management = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected + 1);
  };
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
            columnsCountBreakPoints={{ 350: 3, 750: 3, 900: 3, 1280: 3 }}
            style={M.ResMasonryStyle}
          >
            <Masonry gutter="16px" style={M.MasonryStyle}>
              {DUMMY_DATA.map((data) => (
                <M.CardContainer key={data.id}>
                  <Image
                    src={data.image}
                    alt="testImage"
                    width={200}
                    style={M.CardImageStyle}
                  />
                  <M.CardFooter>
                    <M.CardButton del={true}>DELETE</M.CardButton>
                    <M.CardButton del={false}>REJECT</M.CardButton>
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
