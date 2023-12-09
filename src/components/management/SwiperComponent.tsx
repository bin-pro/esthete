"use client";

import { useEffect, useState } from "react";
import { Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import { EffectCoverflow, Autoplay, Pagination, Navigation } from "swiper/modules";
import * as M from "@/components/management/Styled";
import { GUEST_BOOK_DATA } from "../../../DummyData";
import Image from "next/image";
import { Instance } from "@/api/axios";

const ITEMS_PER_PAGE = 10;

interface GuestBookProps {
  guest_book_author_id: string;
  guest_book_author_profile_img: string;
  guest_book_author_nickname: string;
  guest_book_content: string;
}

const SwiperComponent: React.FC = () => {
  // State-------------------------------------------
  const [guestBookList, setGuestBookList] = useState<GuestBookProps[]>([]);

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [render, setRender] = useState<boolean>(false);
  const currentPageData = guestBookList.slice(0, 10);

  // Handling----------------------------------------
  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected);
    const paginationItems = document.querySelectorAll(".page-item");
    paginationItems.forEach((item) => {
      item.classList.remove("active");
    });
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
          {currentPageData.map((data) => {
            return (
              <M.SwiperCard key={data.guest_book_author_id}>
                <M.ImageBox>
                  <Image
                    src={data.guest_book_author_profile_img}
                    alt="author-profile"
                    fill
                    style={M.SwiperImageStyle}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </M.ImageBox>
                <M.InfoSection>
                  <M.InfoBox>
                    <M.ColHeadBox>
                      <M.ColHalfBox>
                        <M.InfoSpan $attr="title">user-id</M.InfoSpan>
                        <M.InfoSpan $attr="title">name</M.InfoSpan>
                      </M.ColHalfBox>
                      <M.ColHalfBox>
                        <M.InfoSpan>
                          {data.guest_book_author_id.length > 7
                            ? data.guest_book_author_id.slice(0, 7) + "..."
                            : data.guest_book_author_id}
                        </M.InfoSpan>
                        <M.InfoSpan>{data.guest_book_author_nickname}</M.InfoSpan>
                      </M.ColHalfBox>
                    </M.ColHeadBox>
                    <M.ColLogBox>
                      <M.InfoSpan $attr="log">Log</M.InfoSpan>
                      <M.InfoSpan>{data.guest_book_content}</M.InfoSpan>
                    </M.ColLogBox>
                  </M.InfoBox>
                  <M.ActionBox>
                    <M.ActionButton $attr="delete">DELETE</M.ActionButton>
                    <M.ActionButton $attr="reject">REJECT</M.ActionButton>
                  </M.ActionBox>
                </M.InfoSection>
              </M.SwiperCard>
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
