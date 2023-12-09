"use client";

import Modal from "react-modal";
import * as D from "./Styled";
import DefaultLogo from "@/../public/images/OG-Thumbnail.png";
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
    maxWidth: "800px",
    height: "85%",
    minHeight: "400px",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.8)",
    zIndex: 1,
  },
};
Modal.setAppElement("#root");

interface PostDetailModalProps {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  modalData?: {
    photo_id: string;
    photo_title: string;
    photo_description: string;
    photo_url: string;
    photo_created_at: string;
    photographer_id: string;
    photographer_nickname: string;
    photographer_profile_img: string;
    photo_abusing_report_count: number | null;
    photographer_photo_abusing_report_count: number | null;
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
  reporter_photo_abusing_report_count: number | null;
  created_at: string;
}

const PostDetailModal: React.FC<PostDetailModalProps> = ({
  modal,
  setModal,
  modalData,
  handleDelete,
  handleReject,
}) => {
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
  // ComponentDidMount-------------------------------
  useEffect(() => {
    (async () => {
      try {
        const result = await Instance.get(`/api/v1/management/photos/details`, {
          params: {
            photoId: modalData?.photo_id,
            page: currentDetailPage,
            size: 1,
          },
        });
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

  const handleDetailDelete = async (photoAbusingReportId: string) => {
    try {
      if (window.confirm("해당 저작권 신고 건을 삭제하시겠습니까?")) {
        const result = await Instance.delete(
          `/api/v1/management/photos/details/delete/${photoAbusingReportId}`
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
      console.log(err);
    }
  };

  return (
    <Modal
      isOpen={modal}
      onRequestClose={() => setModal(false)}
      style={customStyles}
      shouldCloseOnOverlayClick={true}
    >
      <D.Container>
        <D.DetailBox>
          <D.LeftBox>
            <D.ProfileBox>
              <D.FullImage src={modalData?.photographer_profile_img} alt="profile-image" />
            </D.ProfileBox>
            <D.InfoBox>
              <D.InfoText>user-id</D.InfoText>
              <D.SmallText>{modalData?.photographer_id}</D.SmallText>
              <br />
              <D.InfoText>user-nickname</D.InfoText>
              <D.SmallText>{modalData?.photographer_nickname}</D.SmallText>
              <br />
              <D.InfoText>photo-report count</D.InfoText>
              <D.SmallText>{modalData?.photo_abusing_report_count}</D.SmallText>
              <br />
              <D.InfoText>author-report count</D.InfoText>
              <D.SmallText>{modalData?.photographer_photo_abusing_report_count}</D.SmallText>
              <br />
              <D.InfoText>photo-description</D.InfoText>
              <D.SmallText>{modalData?.photo_description}</D.SmallText>
            </D.InfoBox>
          </D.LeftBox>
          <D.RightBox>
            <D.PostImageBox>
              <D.FullImage src={modalData?.photo_url} alt="post-image" />
            </D.PostImageBox>
            <D.ReportDetailBox>
              {currentDetailPageData.length === 0 ? (
                <D.SmallText>No photo reports exsists</D.SmallText>
              ) : (
                currentDetailPageData?.map((data) => (
                  <React.Fragment key={data.report_id}>
                    <D.InfoText>report-created-at</D.InfoText>
                    <D.SmallText>{data?.created_at.slice(0, 10)}</D.SmallText>
                    <br />
                    <D.InfoText>report-reason</D.InfoText>
                    <D.SmallText>{data?.report_reason}</D.SmallText>
                    <br />
                    <D.TextBox>
                      <D.InfoText>reporter-nickname</D.InfoText>
                      <D.SmallText>{data?.reporter_nickname}</D.SmallText>
                      <br />
                      <D.InfoText>reporter-report</D.InfoText>
                      <D.SmallText>{data?.reporter_photo_abusing_report_count}</D.SmallText>
                    </D.TextBox>
                    <D.ReportDetailDelete onClick={() => handleDetailDelete(data?.report_id)}>
                      DEL
                    </D.ReportDetailDelete>
                  </React.Fragment>
                ))
              )}
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
            </D.ReportDetailBox>
            <D.ActionBox>
              <D.ActionButton
                $attr="delete"
                onClick={() => handleDelete(modalData?.photo_id ?? "")}
              >
                DELETE
              </D.ActionButton>
              <D.ActionButton
                $attr="reject"
                onClick={() => handleReject(modalData?.photo_id ?? "")}
              >
                REJECT
              </D.ActionButton>
            </D.ActionBox>
          </D.RightBox>
        </D.DetailBox>
      </D.Container>
    </Modal>
  );
};

export default memo(PostDetailModal);
