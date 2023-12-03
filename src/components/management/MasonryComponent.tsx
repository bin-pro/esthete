"use client";

import React, { useState, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import * as M from "@/components/management/Styled";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { DUMMY_DATA } from "../../../DummyData";
import { useParams, useRouter } from "next/navigation";
import PostDetailModal from "../detail/PostDetailModal";
import { Instance } from "@/api/axios";
const ITEMS_PER_PAGE = 5;

interface ModalDataProps {
  photo_id: string;
  photo_title: string;
  photo_description: string;
  photo_url: string | StaticImageData;
  photo_created_at: string;
  photographer_id: string;
  photographer_nickname: string;
  photographer_profile_img: string | StaticImageData;
  photo_abusing_report_count: number | null;
  photographer_photo_abusing_report_count: number | null;
}

interface ModalDetailProps {
  report_id: string;
  reporter_id: string;
  reporter_nickname: string;
  reporter_profile_img: string | StaticImageData;
  report_reason: string;
  reporter_photo_abusing_report_count: number | null;
  created_at: string;
}

const MasonryComponent: React.FC = () => {
  const router = useRouter();
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemOffSet, setItemOffSet] = useState<number>(0);

  // Hover-------------------------------------------
  const [hover, setHover] = useState<string>("-1");

  // Modal-------------------------------------------
  const [modal, setModal] = useState<boolean>(false);
  const [modalData, setModalData] = useState<ModalDataProps>({
    photo_id: "",
    photo_title: "",
    photo_description: "",
    photo_url: "",
    photo_created_at: "",
    photographer_id: "",
    photographer_nickname: "",
    photographer_profile_img: "",
    photo_abusing_report_count: null,
    photographer_photo_abusing_report_count: null,
  });
  const [modalDetail, setModalDetail] = useState<ModalDetailProps>({
    report_id: "",
    reporter_id: "",
    reporter_nickname: "",
    reporter_profile_img: "",
    report_reason: "",
    reporter_photo_abusing_report_count: null,
    created_at: "",
  });

  // useEffect(() => {
  //   setCurrentPage(Math.ceil(DUMMY_DATA.length / ITEMS_PER_PAGE));
  // }, [itemOffSet]);

  // const offSet = currentPage - 1 * ITEMS_PER_PAGE;
  // const currentData = DUMMY_DATA.slice(offSet, offSet + ITEMS_PER_PAGE);

  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected + 1);
  };

  const handleModal = async (modalData: ModalDataProps, photoId: string) => {
    setModalData(modalData);
    // const detailData = await Instance.get(`abusing-reports/photos/details`, {
    //   photoId: photoId,
    // });
    setModal(true);
  };

  const handleDelete = async () => {
    if (window.confirm("해당 저작권 신고 게시물을 정말 삭제하시겠습니까?")) {
      console.log("delete");
    } else {
      return;
    }
  };

  const handleReject = async () => {
    if (window.confirm("해당 저작권 신고 게시물을 유보 처리하시겠습니까?")) {
      console.log("reject");
    } else {
      return;
    }
  };

  return (
    <>
      <M.MasonryContainer>
        <ResponsiveMasonry
          columnsCountBreakPoints={{ 350: 3, 750: 3, 900: 3, 1280: 3 }}
          style={M.ResMasonryStyle}
        >
          <Masonry gutter="30px" style={M.MasonryStyle}>
            {DUMMY_DATA.map((data) => {
              return (
                <M.CardContainer key={data.photo_id}>
                  <Image
                    src={data.photo_url}
                    alt="postImage"
                    width={250}
                    style={M.CardImageStyle}
                    onMouseEnter={() => {
                      setHover(data.photo_id);
                    }}
                  />
                  <M.CardIageHoverBox
                    $isHover={hover === data.photo_id}
                    onMouseLeave={() => setHover("-1")}
                    onClick={() => handleModal(data, data.photo_id)}
                  >
                    <M.CardHalfBox>
                      <M.SmallText>user-id</M.SmallText>
                      <M.SmallText>name</M.SmallText>
                      <M.SmallText>post</M.SmallText>
                      <M.SmallText>accounts</M.SmallText>
                    </M.CardHalfBox>
                    <M.CardHalfBox>
                      <M.SmallText>{data.photo_id}</M.SmallText>
                      <M.SmallText>{data.photographer_nickname}</M.SmallText>
                      <M.SmallText>{data.photo_abusing_report_count}</M.SmallText>
                      <M.SmallText>{data.photographer_photo_abusing_report_count}</M.SmallText>
                    </M.CardHalfBox>
                  </M.CardIageHoverBox>
                  <M.CardFooter>
                    <M.CardButton $attr={"delete"} onClick={handleDelete}>
                      DELETE
                    </M.CardButton>
                    <M.CardButton $attr={"reject"} onClick={handleReject}>
                      REJECT
                    </M.CardButton>
                  </M.CardFooter>
                </M.CardContainer>
              );
            })}
          </Masonry>
        </ResponsiveMasonry>
      </M.MasonryContainer>
      <M.StyledPagination
        forcePage={1}
        previousLabel={"〈"}
        nextLabel={"〉"}
        breakLabel={"..."}
        pageCount={4}
        marginPagesDisplayed={3}
        pageRangeDisplayed={2}
        onPageChange={handlePageClick}
        containerClassName="pagination justify-content-center"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        activeClassName="active"
      />
      <PostDetailModal
        modal={modal}
        setModal={setModal}
        modalData={modalData}
        modalDetail={modalDetail}
        handleDelete={handleDelete}
        handleReject={handleReject}
      />
    </>
  );
};

export default MasonryComponent;
