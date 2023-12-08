"use client";

import React, { useEffect, useState } from "react";
import * as M from "@/components/management/Styled";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import PostDetailModal from "../detail/PostDetailModal";
import { Instance } from "@/api/axios";

const ITEMS_PER_PAGE = 10;

interface PhotoReportProps {
  photo_id: string;
  photo_title: string;
  photo_description: string;
  photo_url: string | undefined;
  photo_created_at: string;
  photographer_id: string;
  photographer_nickname: string;
  photographer_profile_img: string | undefined;
  photo_abusing_report_count: number | null;
  photographer_photo_abusing_report_count: number | null;
}

interface ModalDetailProps {
  report_id: string;
  reporter_id: string;
  reporter_nickname: string;
  reporter_profile_img: string | undefined;
  report_reason: string;
  reporter_photo_abusing_report_count: number | null;
  created_at: string;
}

const MasonryComponent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);

  // Hover-------------------------------------------
  const [hover, setHover] = useState<string>("-1");

  // Modal-------------------------------------------
  const [modal, setModal] = useState<boolean>(false);
  const [photoReport, setPhotoReport] = useState<{
    content?: PhotoReportProps[];
  }>({
    content: [],
  });
  const [modalDetail, setModalDetail] = useState<{
    content?: ModalDetailProps[];
  }>({
    content: [],
  });

  useEffect(() => {
    (async () => {
      const result = await Instance.get(`abusing-reports/photos`);
      if (result.status === 200) setPhotoReport(result.data);
    })();
  }, [photoReport.content]);

  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected + 1);
  };

  const handleModal = async (modalData: PhotoReportProps, photoId: string) => {
    setPhotoReport({ content: [modalData] });
    setModal(true);
  };

  const handleDelete = async (photoId: string) => {
    try {
      if (window.confirm("해당 저작권 신고 게시물을 정말 삭제하시겠습니까?")) {
        const result = await Instance.delete(`/photos/${photoId}`);
        if (result.status === 200) {
          alert("삭제되었습니다.");
          setModal(false);
          console.log(result);
        }
      } else {
        return;
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  const handleReject = async (photoId: string) => {
    try {
      if (window.confirm("해당 저작권 신고를 반려 처리하시겠습니까?")) {
        const result = await Instance.delete(`/abusing-reports/photos/${photoId}`);
        if (result.status === 200) {
          alert("신고 반려 처리되었습니다.");
          setModal(false);
        }
      } else {
        return;
      }
    } catch (err: any) {
      console.log(err);
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
            {photoReport.content?.map((pr: any) => {
              return (
                <M.CardContainer key={pr.photo_id}>
                  <M.CardImage
                    src={pr.photo_url}
                    alt="postImage"
                    onMouseEnter={() => {
                      setHover(pr.photo_id);
                    }}
                  />
                  <M.CardIageHoverBox
                    $isHover={hover === pr.photo_id}
                    onMouseLeave={() => setHover("-1")}
                    onClick={() => handleModal(pr, pr.photo_id)}
                  >
                    <M.CardHalfBox $left={true}>
                      <M.SmallText>user-id</M.SmallText>
                      <M.SmallText>name</M.SmallText>
                      <M.SmallText>post</M.SmallText>
                      <M.SmallText>accounts</M.SmallText>
                    </M.CardHalfBox>
                    <M.CardHalfBox $left={false}>
                      <M.SmallText>
                        {pr.photo_id.length > 9 ? pr.photo_id.slice(0, 9) + "..." : pr.photo_id}
                      </M.SmallText>
                      <M.SmallText>{pr.photographer_nickname}</M.SmallText>
                      <M.SmallText>{pr.photo_abusing_report_count}</M.SmallText>
                      <M.SmallText>{pr.photographer_photo_abusing_report_count}</M.SmallText>
                    </M.CardHalfBox>
                  </M.CardIageHoverBox>
                  <M.CardFooter>
                    <M.CardButton $attr={"delete"} onClick={() => handleDelete(pr.photo_id)}>
                      DELETE
                    </M.CardButton>
                    <M.CardButton $attr={"reject"} onClick={() => handleReject(pr.photo_id)}>
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
        photoReport={photoReport.content ? photoReport.content[0] : undefined}
        modalDetail={modalDetail.content ? modalDetail.content[0] : undefined}
        handleDelete={handleDelete}
        handleReject={handleReject}
      />
    </>
  );
};

export default MasonryComponent;
