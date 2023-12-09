"use client";

import Modal from "react-modal";
import * as D from "./Styled";
import React, { memo, useEffect, useState } from "react";
import { Instance } from "@/api/axios";
import { removeAllCookies } from "@/Cookie";
import { useRouter } from "next/navigation";

const customStyles = {
  content: {
    backgroundColor: "#161616",
    border: "1px solid #fff",
    borderRadius: "0px",
    outline: "none",
    padding: "0",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "85%",
    minWidth: "600px",
    maxWidth: "700px",
    height: "95%",
    minHeight: "400px",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.6)",
    zIndex: 1,
  },
};
Modal.setAppElement("#root");

interface PostDetailModalProps {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  modalData?: {
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
  };
  handleDelete: (photoId: string) => void;
  handleReject: (photoId: string) => void;
}

interface ModalDetailProps {
  report_id: string;
  reporter_id: string;
  reporter_nickname: string;
  reporter_profile_img: string;
  report_reason: string;
  reporter_guest_book_abusing_report_count: number | null;
  created_at: string;
}

const GuestBookDetailModal: React.FC<PostDetailModalProps> = ({
  modal,
  setModal,
  modalData,
  handleDelete,
  handleReject,
}) => {
  // State-------------------------------------------
  const router = useRouter();
  const [modalDetail, setModalDetail] = useState<ModalDetailProps[]>([]);

  // Pagination--------------------------------------
  const [currentDetailPage, setCurrentDetailPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [render, setRender] = useState<boolean>(false);
  const currentDetailPageData = modalDetail?.slice(0, 1);

  // Handling----------------------------------------
  const handlePageClick = (data: { selected: number }) => {
    setCurrentDetailPage(data.selected);
    const paginationItems = document.querySelectorAll(".page-item");
    paginationItems.forEach((item) => {
      item.classList.remove("active");
    });
  };

  const handleDetailDelete = async (guestBookAbusingReportId: string) => {
    try {
      if (window.confirm("해당 방명록 신고 건을 삭제하시겠습니까?")) {
        const result = await Instance.delete(
          `/api/v1/management/guestbooks/details/delete/${guestBookAbusingReportId}`
        );
        if (result.status === 200) {
          setRender(!render);
          if (currentDetailPageData.length === 1) {
            setCurrentDetailPage(currentDetailPage - 1);
            const paginationItems = document.querySelectorAll(".page-item");
            paginationItems[currentDetailPage].classList.add("active");
          }
        }
      } else {
        return;
      }
    } catch (err: any) {
      alert(err.response.data.error);
    }
  };

  // ComponentDidMount-------------------------------
  useEffect(() => {
    (async () => {
      try {
        const result = await Instance.get(
          `/api/v1/management/guestbooks/details`,
          {
            params: {
              guestBookId: modalData?.guest_book_id,
            },
          }
        );
        if (result.status === 200) {
          setModalDetail(result.data.content);
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
  }, [render, currentDetailPage]);

  return (
    <Modal
      isOpen={modal}
      onRequestClose={() => setModal(false)}
      style={customStyles}
      shouldCloseOnOverlayClick={true}
    >
      <D.Container>
        <D.ColumnDetailBox>
          <D.RowBox>
            <D.ImageBox>
              <D.FullImage
                src={modalData?.photographer_profile_img}
                alt="photographer-image"
              />
            </D.ImageBox>
            <D.InfoSection>
              <D.InfoText>photographer-id</D.InfoText>
              <D.SmallText>{modalData?.photographer_id}</D.SmallText>
              <br />
              <D.InfoText>photographer-nickname</D.InfoText>
              <D.SmallText>{modalData?.photographer_nickname}</D.SmallText>
            </D.InfoSection>
          </D.RowBox>
          <D.RowBox>
            <D.InfoSection>
              <D.InfoText>guestbook-created-at</D.InfoText>
              <D.SmallText>
                {modalData?.guest_book_created_at.slice(0, 10)}
              </D.SmallText>
              <br />
              <D.InfoText>guestbook-content</D.InfoText>
              <D.SmallText>{modalData?.guest_book_content}</D.SmallText>
              <br />
              <D.InfoText>guestbook-author-id</D.InfoText>
              <D.SmallText>{modalData?.guest_book_author_id}</D.SmallText>
              <br />
              <D.InfoText>guestbook-author</D.InfoText>
              <D.SmallText>{modalData?.guest_book_author_nickname}</D.SmallText>
              <br />
              <D.InfoText>abusing-report-count</D.InfoText>
              <D.SmallText>
                {modalData?.guest_book_abusing_report_count}
              </D.SmallText>
            </D.InfoSection>
            <D.ImageBox>
              <D.FullImage
                src={modalData?.guest_book_author_profile_img}
                alt="guestbook-author-image"
              />
            </D.ImageBox>
          </D.RowBox>
          <D.RowBox $last={true}>
            {currentDetailPageData.length === 0 ? (
              <D.InfoEmptySection>
                No guestbook reports exsists
              </D.InfoEmptySection>
            ) : (
              currentDetailPageData?.map((data) => (
                <React.Fragment key={data.report_id}>
                  <D.ImageBox>
                    <D.FullImage
                      src={data?.reporter_profile_img}
                      alt="reporter-image"
                    />
                  </D.ImageBox>
                  <D.InfoSection $rel={true}>
                    <D.InfoText>report-reason</D.InfoText>
                    <D.SmallText>{data?.report_reason}</D.SmallText>
                    <br />
                    <D.InfoText>reporter-id</D.InfoText>
                    <D.SmallText>
                      {data?.reporter_id.slice(0, 25) + "..."}
                    </D.SmallText>
                    <br />
                    <D.InfoText>reporter-nickname</D.InfoText>
                    <D.SmallText>{data?.reporter_nickname}</D.SmallText>
                    <br />
                    <D.InfoText>abusing-report-count</D.InfoText>
                    <D.SmallText>
                      {data?.reporter_guest_book_abusing_report_count}
                    </D.SmallText>
                    <D.ReportDetailDelete
                      onClick={() => handleDetailDelete(data?.report_id)}
                    >
                      DEL
                    </D.ReportDetailDelete>
                    <D.StyledPagination
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
                  </D.InfoSection>
                </React.Fragment>
              ))
            )}
          </D.RowBox>
        </D.ColumnDetailBox>
      </D.Container>
    </Modal>
  );
};

export default memo(GuestBookDetailModal);
