"use client";

import React, { useEffect, useState } from "react";
import * as M from "@/components/management/Styled";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import PostDetailModal from "../detail/PostDetailModal";
import { Instance } from "@/api/axios";
import { useRouter } from "next/navigation";
import { removeAllCookies } from "@/Cookie";

const ITEMS_PER_PAGE = 10;

interface PhotoReportdataops {
  photo_id: string;
  photo_title: string;
  photo_description: string;
  photo_url: string | undefined;
  photo_created_at: string;
  photographer_id: string;
  photographer_nickname: string;
  photographer_dataofile_img: string | undefined;
  photo_abusing_report_count: number | null;
  photographer_photo_abusing_report_count: number | null;
}

const MasonryComponent: React.FC = () => {
  const router = useRouter();

  // Hover-------------------------------------------
  const [hover, setHover] = useState<string>("-1");

  // Modal-------------------------------------------
  const [modal, setModal] = useState<boolean>(false);
  const [photoReportList, setPhotoReportList] = useState<PhotoReportdataops[]>([]);

  // Pagination--------------------------------------
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [render, setRender] = useState<boolean>(false);
  const currentPageData = photoReportList.slice(0, 10);
  // Handling----------------------------------------
  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected);
    const paginationItems = document.querySelectorAll(".page-item");
    paginationItems.forEach((item) => {
      item.classList.remove("active");
    });
  };

  useEffect(() => {
    (async () => {
      try {
        const result = await Instance.get(`/api/v1/management/photos`, {
          params: {
            page: currentPage,
            size: ITEMS_PER_PAGE,
          },
        });
        if (result.status === 200) {
          setPhotoReportList(result.data.content);
          setTotalPage(result.data.totalPages);
        }
      } catch (err: any) {
        if (err?.response.status === 403 || err?.response.status === 401) {
          alert("로그인이 필요합니다.");
          removeAllCookies();
          router.push("/");
          console.clear();
        }
      }
    })();
  }, [render, currentPage]);

  const handleDelete = async (photoId: string) => {
    try {
      if (window.confirm("해당 저작권 신고 게시물을 정말 삭제하시겠습니까?")) {
        const result = await Instance.delete(`/api/v1/management/photos/delete/${photoId}`);
        if (result.status === 200) {
          setRender(!render);
          alert("삭제되었습니다.");
          setModal(false);
          if (currentPageData.length === 1) {
            setCurrentPage(currentPage - 1);
            const paginationItems = document.querySelectorAll(".page-item");
            paginationItems[currentPage].classList.add("active");
          }
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
        const result = await Instance.delete(`/api/v1/management/photos/reject/${photoId}`);
        if (result.status === 200) {
          setRender(!render);
          alert("신고 반려 처리되었습니다.");
          setModal(false);
          if (currentPageData.length === 1) {
            setCurrentPage(currentPage - 1);
            const paginationItems = document.querySelectorAll(".page-item");
            paginationItems[currentPage].classList.add("active");
          }
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
            {currentPageData?.map((data: any) => {
              return (
                <React.Fragment key={data.photo_id}>
                  <M.CardContainer>
                    <M.CardImage
                      src={data.photo_url}
                      alt="postImage"
                      onMouseEnter={() => {
                        setHover(data.photo_id);
                      }}
                    />
                    <M.CardIageHoverBox
                      $isHover={hover === data.photo_id}
                      onMouseLeave={() => setHover("-1")}
                      onClick={() => setModal(true)}
                    >
                      <M.CardHalfBox $left={true}>
                        <M.SmallText>user-id</M.SmallText>
                        <M.SmallText>name</M.SmallText>
                        <M.SmallText>post</M.SmallText>
                        <M.SmallText>accounts</M.SmallText>
                      </M.CardHalfBox>
                      <M.CardHalfBox $left={false}>
                        <M.SmallText>
                          {data.photo_id.length > 9
                            ? data.photo_id.slice(0, 9) + "..."
                            : data.photo_id}
                        </M.SmallText>
                        <M.SmallText>{data.photographer_nickname}</M.SmallText>
                        <M.SmallText>{data.photo_abusing_report_count}</M.SmallText>
                        <M.SmallText>{data.photographer_photo_abusing_report_count}</M.SmallText>
                      </M.CardHalfBox>
                    </M.CardIageHoverBox>
                    <M.CardFooter>
                      <M.CardButton $attr={"delete"} onClick={() => handleDelete(data.photo_id)}>
                        DELETE
                      </M.CardButton>
                      <M.CardButton $attr={"reject"} onClick={() => handleReject(data.photo_id)}>
                        REJECT
                      </M.CardButton>
                    </M.CardFooter>
                  </M.CardContainer>
                  <PostDetailModal
                    modal={modal}
                    setModal={setModal}
                    modalData={data}
                    handleDelete={handleDelete}
                    handleReject={handleReject}
                  />
                </React.Fragment>
              );
            })}
          </Masonry>
        </ResponsiveMasonry>
      </M.MasonryContainer>
      <M.StyledPagination
        previousLabel={"〈"}
        nextLabel={"〉"}
        breakLabel={"..."}
        pageCount={totalPage}
        marginPagesDisplayed={2}
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
    </>
  );
};

export default MasonryComponent;
