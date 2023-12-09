"use client";

import React, { useEffect, useState } from "react";
import { Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import {
  EffectCoverflow,
  Autoplay,
  Pagination,
  Navigation,
} from "swiper/modules";
import * as M from "@/components/management/Styled";
import Image from "next/image";
import { Instance } from "@/api/axios";
import GuestBookDetailModal from "../detail/GuestBookDetailModal";

const ITEMS_PER_PAGE = 10;

interface GuestBookProps {
  guest_book_id: string;
  photographer_id: string;
  photographer_nickname: string;
  photographer_profile_img: string;
  guest_book_author_id: string;
  guest_book_author_nickname: string;
  guest_book_author_profile_img: string;
  guest_book_content: string;
  guest_book_created_at: string;
  guest_book_abusing_report_count: number | null;
}

const SwiperComponent: React.FC = () => {
  // State-------------------------------------------
  const [guestBookList, setGuestBookList] = useState<GuestBookProps[]>([]);

  // Modal-------------------------------------------
  const [modal, setModal] = useState<boolean>(false);

  // Pagination--------------------------------------
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [render, setRender] = useState<boolean>(false);
  const currentPageData = guestBookList.slice(0, ITEMS_PER_PAGE);

  // Handling----------------------------------------
  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected);
    const paginationItems = document.querySelectorAll(".page-item");
    paginationItems.forEach((item) => {
      item.classList.remove("active");
    });
  };

  const handleDelete = async (guestBookId: string) => {
    if (window.confirm("해당 방명록 신고 건을 정말 삭제하시겠습니까?")) {
      try {
        const result = await Instance.delete(
          `/api/v1/management/guestbooks/delete/${guestBookId}`
        );
        if (result.status === 200) {
          setRender(!render);
        }
      } catch (err: any) {
        console.log(err);
      }
    } else return;
  };

  const handleReject = async (guestBookId: string) => {
    if (window.confirm("해당 방명록 신고 건을 반려 처리하시겠습니까?")) {
      try {
        const result = await Instance.put(
          `/api/v1/management/guestbooks/reject/${guestBookId}`
        );
        if (result.status === 200) {
          setRender(!render);
        }
      } catch (err: any) {
        console.log(err);
      }
    } else return;
  };

  // componentDidMount-------------------------------
  useEffect(() => {
    (async () => {
      try {
        const result = await Instance.get(`/api/v1/management/guestbooks`, {
          params: {
            page: currentPage,
            size: ITEMS_PER_PAGE,
          },
        });
        setGuestBookList(result.data.content);
        console.log(result.data);
        setTotalPage(result.data.totalPages);
      } catch (err: any) {
        console.log(err);
      }
    })();
  }, [render, currentPage]);

  return (
    <>
      <M.SwiperContainer>
        <Swiper
          autoplay={{
            delay: 7000,
            disableOnInteraction: false,
          }}
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          modules={[Autoplay, EffectCoverflow, Pagination, Navigation]}
          style={{ overflow: guestBookList.length === 0 ? "visible" : "" }}
        >
          {currentPageData.map((data, idx) => {
            return (
              <React.Fragment key={data?.guest_book_id}>
                <M.SwiperCard>
                  <M.ImageBox onClick={() => setModal(true)}>
                    <Image
                      src={data.photographer_profile_img}
                      alt="author-profile"
                      fill
                      style={M.SwiperImageStyle}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </M.ImageBox>
                  <M.InfoSection onClick={() => setModal(true)}>
                    <M.InfoBox>
                      <M.ColHeadBox>
                        <M.ColHalfBox>
                          <M.InfoSpan $attr="title">user-id</M.InfoSpan>
                          <M.InfoSpan $attr="title">name</M.InfoSpan>
                        </M.ColHalfBox>
                        <M.ColHalfBox>
                          <M.InfoSpan>
                            {data?.guest_book_author_id.length > 7
                              ? data?.guest_book_author_id.slice(0, 7) + "..."
                              : data?.guest_book_author_id}
                          </M.InfoSpan>
                          <M.InfoSpan>
                            {data?.guest_book_author_nickname}
                          </M.InfoSpan>
                        </M.ColHalfBox>
                      </M.ColHeadBox>
                      <M.ColLogBox>
                        <M.InfoSpan $attr="log">Log</M.InfoSpan>
                        <M.InfoSpan>{data?.guest_book_content}</M.InfoSpan>
                      </M.ColLogBox>
                    </M.InfoBox>
                    <M.ActionBox>
                      <M.ActionButton
                        $attr="delete"
                        onClick={() => handleDelete(data?.guest_book_id)}
                      >
                        DELETE
                      </M.ActionButton>
                      <M.ActionButton
                        $attr="reject"
                        onClick={() => handleReject(data?.guest_book_id)}
                      >
                        REJECT
                      </M.ActionButton>
                    </M.ActionBox>
                  </M.InfoSection>
                  <GuestBookDetailModal
                    modal={modal}
                    setModal={setModal}
                    modalData={data}
                    handleDelete={handleDelete}
                    handleReject={handleReject}
                  />
                </M.SwiperCard>
              </React.Fragment>
            );
          })}
        </Swiper>
      </M.SwiperContainer>

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

export default SwiperComponent;
