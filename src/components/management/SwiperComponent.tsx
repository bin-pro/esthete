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
import Link from "next/link";
import { GUEST_BOOK_DATA } from "../../../DummyData";
import Image from "next/image";

const SwiperComponent: React.FC = () => {
  return (
    <>
      <M.SwiperContainer>
        <Swiper
          pagination={{
            dynamicBullets: true,
            clickable: true,
          }}
          autoplay={{
            delay: 4000,
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
          className="mySwiper"
          style={{ overflow: GUEST_BOOK_DATA.length === 0 ? "visible" : "" }}
        >
          {GUEST_BOOK_DATA.map((data) => {
            return (
              <M.SwiperCard key={data.id}>
                <Image
                  src={data.profile}
                  alt="user-profile"
                  width={200}
                  height={250}
                  style={M.SwiperImageStyle}
                />
                <M.InfoSection>
                  <M.InfoBox>
                    {data.id}
                    <br />
                    {data.name}
                    <br />
                    {data.guestBook}
                  </M.InfoBox>
                  <M.ActionBox></M.ActionBox>
                </M.InfoSection>
              </M.SwiperCard>
            );
          })}
        </Swiper>
      </M.SwiperContainer>
    </>
  );
};

export default SwiperComponent;
