import Modal from "react-modal";
import * as D from "./Styled";
import DefaultLogo from "@/../public/images/OG-Thumbnail.png";
import { StaticImageData } from "next/image";

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
    photo_url: string | StaticImageData;
    photo_created_at: string;
    photographer_id: string;
    photographer_nickname: string;
    photographer_profile_img: string | StaticImageData;
    photo_abusing_report_count: number | null;
    photographer_photo_abusing_report_count: number | null;
  };
  modalDetail?: {
    report_id: string;
    reporter_id: string;
    reporter_nickname: string;
    reporter_profile_img: string | undefined;
    report_reason: string;
    reporter_photo_abusing_report_count: number | null;
    created_at: string;
  };
  handleDelete: (photoId: string) => void;
  handleReject: (photoId: string) => void;
}

const PostDetailModal: React.FC<PostDetailModalProps> = ({
  modal,
  setModal,
  modalData,
  modalDetail,
  handleDelete,
  handleReject,
}) => {
  return (
    <Modal isOpen={modal} onRequestClose={() => setModal(false)} style={customStyles}>
      <D.Container>
        <D.DetailBox>
          <D.LeftBox>
            <D.ProfileBox>
              <D.FullImage
                src={modalData?.photographer_profile_img || DefaultLogo}
                alt="profile-image"
              />
            </D.ProfileBox>
            <D.InfoBox>
              <D.InfoText>
                user-id
                <br />
                {modalData?.photographer_id}
              </D.InfoText>
              <D.InfoText>
                user-nickname
                <br />
                {modalData?.photographer_nickname}
              </D.InfoText>
              <D.InfoText>
                user-report-count
                <br />
                {modalData?.photographer_photo_abusing_report_count}
              </D.InfoText>
            </D.InfoBox>
          </D.LeftBox>
          <D.RightBox>
            <D.PostImageBox>
              <D.FullImage src={modalData?.photo_url || DefaultLogo} alt="post-image" />
            </D.PostImageBox>
            <D.DescriptionBox>{modalData?.photo_description}</D.DescriptionBox>
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

export default PostDetailModal;
