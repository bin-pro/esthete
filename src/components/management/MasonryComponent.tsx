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

  // Modal
  const [modal, setModal] = useState(false);

  // useEffect(() => {
  //   setCurrentPage(Math.ceil(DUMMY_DATA.length / ITEMS_PER_PAGE));
  // }, [itemOffSet]);

  const offSet = currentPage - 1 * ITEMS_PER_PAGE;
  const currentData = DUMMY_DATA.slice(offSet, offSet + ITEMS_PER_PAGE);

  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected + 1);
  };

  return (
    <>
      <M.MasonryContainer>
        <ResponsiveMasonry
          columnsCountBreakPoints={{ 350: 2, 750: 3, 900: 3, 1280: 3 }}
          style={M.ResMasonryStyle}
        >
          <Masonry gutter="20px" style={M.MasonryStyle}>
            {DUMMY_DATA.map((data) => (
              <M.CardContainer key={data.id}>
                <Image
                  src={data.image}
                  alt="testImage"
                  width={200}
                  style={M.CardImageStyle}
                  onClick={() =>
                    router.push(`/detail/post//${id}/${data.id}`, {
                      id: data.id,
                      post_id: data.id,
                      image: data.image,
                      description: data.description,
                    })
                  }
                />
                <M.CardFooter>
                  <M.CardButton $attr={"delete"}>DELETE</M.CardButton>
                  <M.CardButton $attr={"reject"}>REJECT</M.CardButton>
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
