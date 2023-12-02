import Modal from "react-modal";
import * as D from "./Styled";

const customStyles = {
  content: {
    backgroundColor: "#161616",
    border: "1px solid #fff",
    borderRadius: "0px",
    outline: "none",
    padding: "0",
    top: "60%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "75%",
    minWidth: "600px",
    maxWidth: "800px",
    height: "75%",
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
}

const PostDetailModal: React.FC<PostDetailModalProps> = ({ modal, setModal }) => {
  return (
    <Modal isOpen={modal} onRequestClose={() => setModal(false)} style={customStyles}>
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
