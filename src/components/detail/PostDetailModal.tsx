import Modal from "react-modal";
import * as D from "./Styled";

const customStyles = {
  content: {
    backgroundColor: "white",
    border: "1px solid #1DAE86",
    borderRadius: "16px",
    outline: "none",
    padding: "20px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    minWidth: "350px",
  },
};
// Modal.setAppElement("#root");

interface PostDetailModalProps {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const PostDetailModal: React.FC<PostDetailModalProps> = ({
  modal,
  setModal,
}) => {
  return (
    <Modal
      isOpen={modal}
      onRequestClose={() => setModal(false)}
      style={customStyles}
    >
      <D.Container>
        <D.DetailBox>
          <D.LeftBox>
            <D.ProfileBox>Profile</D.ProfileBox>
            <D.InfoBox>Info</D.InfoBox>
          </D.LeftBox>
          <D.RightBox>
            <D.PostImageBox>Post Image</D.PostImageBox>
            <D.DescriptionBox>Desc</D.DescriptionBox>
            <D.ActionBox>
              <D.ActionButton $attr="delete">DELETE</D.ActionButton>
              <D.ActionButton $attr="reject">REJECT</D.ActionButton>
            </D.ActionBox>
          </D.RightBox>
        </D.DetailBox>
      </D.Container>
    </Modal>
  );
};

export default PostDetailModal;
