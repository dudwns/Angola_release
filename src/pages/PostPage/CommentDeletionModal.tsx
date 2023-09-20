import styled from '@emotion/styled';
import Button from '@components/Button';
import Modal from '@components/Modal';

interface CommentDeletionModalProps {
  setIsClickedDeleteBtn: React.Dispatch<React.SetStateAction<boolean>>;
  handleClickDeleteCommentModalBtn: () => void;
}

const CommentDeletionModal = ({
  setIsClickedDeleteBtn,
  handleClickDeleteCommentModalBtn,
}: CommentDeletionModalProps) => {
  return (
    <Modal
      onClose={() => setIsClickedDeleteBtn(false)}
      onConfirm={handleClickDeleteCommentModalBtn}
      footerShow={false}>
      <ModalWrapper onClick={(e) => e.stopPropagation()}>
        <div>정말로 댓글을 삭제하시겠습니까?</div>
        <ButtonContainer>
          <Button
            size="sm"
            onClick={handleClickDeleteCommentModalBtn}
            style={{ width: '50px', height: '40px', color: '#F66' }}>
            네
          </Button>
          <Button
            size="sm"
            onClick={() => setIsClickedDeleteBtn(false)}
            style={{ width: '90px', height: '40px' }}>
            아니요
          </Button>
        </ButtonContainer>
      </ModalWrapper>
    </Modal>
  );
};

export default CommentDeletionModal;

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 150px;
  justify-content: space-around;
  align-items: center;
  gap: 50px;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;
