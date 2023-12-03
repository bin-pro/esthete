"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import * as M from "@/components/management/Styled";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { DUMMY_DATA } from "../../../DummyData";
import { useParams, useRouter } from "next/navigation";
import PostDetailModal from "../detail/PostDetailModal";

const ITEMS_PER_PAGE = 5;

const MasonryComponent: React.FC = () => {
  const router = useRouter();
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemOffSet, setItemOffSet] = useState(0);

  // Hover-------------------------------------------
  const [hover, setHover] = useState<Number>(-1);

  // Modal-------------------------------------------
  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState({
    photo_id: 0,
    photo_title: "",
    photo_description: "",
    photo_url: "",
    photo_created_at: "",
    photographer_id: 0,
    photographer_nickname: "",
    photographer_profile_img: "",
    reporter_id: 0,
    reporter_nickname: "",
    reporter_profile_img: "",
    reason: "",
  });

  // useEffect(() => {
  //   setCurrentPage(Math.ceil(DUMMY_DATA.length / ITEMS_PER_PAGE));
  // }, [itemOffSet]);

  const offSet = currentPage - 1 * ITEMS_PER_PAGE;
  const currentData = DUMMY_DATA.slice(offSet, offSet + ITEMS_PER_PAGE);

  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected + 1);
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
            {DUMMY_DATA.map((data) => (
              <M.CardContainer key={data.id}>
                <Image
                  src={data.image}
                  alt="postImage"
                  width={250}
                  style={M.CardImageStyle}
                  onMouseEnter={() => {
                    setHover(data.id);
                  }}
                />
                <M.CardIageHoverBox
                  $isHover={hover === data.id}
                  onMouseLeave={() => setHover(-1)}
                  onClick={() => setModal(true)}
                >
                  <M.CardHalfBox>
                    <M.SmallText>user-id</M.SmallText>
                    <M.SmallText>name</M.SmallText>
                    <M.SmallText>post</M.SmallText>
                    <M.SmallText>accounts</M.SmallText>
                  </M.CardHalfBox>
                  <M.CardHalfBox>
                    <M.SmallText>{data.id}</M.SmallText>
                    <M.SmallText>{data.nickname}</M.SmallText>
                    <M.SmallText>{data.postWarning}</M.SmallText>
                    <M.SmallText>{data.accountsWarning}</M.SmallText>
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
            ))}
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
      <PostDetailModal modal={modal} setModal={setModal} />
    </>
  );
};

export default MasonryComponent;
