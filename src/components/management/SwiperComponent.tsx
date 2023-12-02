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

const ITEMS_PER_PAGE = 5;

const SwiperComponent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemOffSet, setItemOffSet] = useState(0);

  // useEffect(() => {
  //   setCurrentPage(Math.ceil(GUEST_BOOK_DATA.length / ITEMS_PER_PAGE));
  // }, [itemOffSet, ITEMS_PER_PAGE]);

  const offSet = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = GUEST_BOOK_DATA.slice(offSet, offSet + ITEMS_PER_PAGE);

  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected);
  };
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
          style={{ overflow: GUEST_BOOK_DATA.length === 0 ? "visible" : "" }}
        >
          {GUEST_BOOK_DATA.map((data) => {
            return (
              <M.SwiperCard key={data.id}>
                <M.ImageBox>
                  <Image
                    src={data.profile}
                    alt="user-profile"
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
                        <M.InfoSpan>{data.id}</M.InfoSpan>
                        <M.InfoSpan>{data.name}</M.InfoSpan>
                      </M.ColHalfBox>
                    </M.ColHeadBox>
                    <M.ColLogBox>
                      <M.InfoSpan $attr="log">Log</M.InfoSpan>
                      <M.InfoSpan>{data.guestBook}</M.InfoSpan>
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
        forcePage={1}
        previousLabel={"〈"}
        nextLabel={"〉"}
        breakLabel={"..."}
        pageCount={2}
        marginPagesDisplayed={3}
        pageRangeDisplayed={2}
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
