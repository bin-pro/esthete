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

const SwiperComponent: React.FC = () => {
  return (
    <>
      <M.SwiperContainer></M.SwiperContainer>
    </>
  );
};

export default SwiperComponent;
