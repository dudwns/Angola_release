import { MouseEvent, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { Comment } from '@type';
import { splitCommentBySeparator } from '@utils';
import { ButtonStyled } from '@components/Button';
import Icon from '@components/Icon';
import Modal from '@components/Modal';
import { calculateLevel, getUserLevelInfo } from '@utils/calculateUserLevel';
import { ANGOLA_STYLES } from '@styles/commonStyles';

interface CommentListProps {
  comments: Comment[];
  deleteComment: (id: string) => void;
  myId: string | undefined;
}

const CommentList = ({ comments, deleteComment, myId }: CommentListProps) => {
  const [isClickedDeleteBtn, setIsClickedDeleteBtn] = useState<boolean>(false);
  const [commentId, setCommentId] = useState<string>('');
  const deleteButtonRef = useRef<HTMLButtonElement>(null);

  const handleClickDeleteComment = (e: MouseEvent) => {
    setCommentId(e.currentTarget.classList[0]);
    setIsClickedDeleteBtn(true);
    deleteButtonRef.current && deleteButtonRef.current.blur();
  };

  const handleClickDeleteCommentModalBtn = () => {
    deleteComment(commentId);
    setIsClickedDeleteBtn(false);
  };

  useEffect(() => {
    if (!isClickedDeleteBtn) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleClickDeleteCommentModalBtn();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  const [commentsData, setCommentsData] = useState(comments);

  useEffect(() => {
    setCommentsData(comments);
  }, [comments.length, comments]);

  return (
    <>
      {commentsData.map((commentItem) => {
        const fullName = commentItem.author.fullName;
        const commentAuthorId = commentItem.author._id;
        const { vote, comment } = splitCommentBySeparator(commentItem.comment);
        const userLevel = calculateLevel(commentItem.author);
        const { userColor, userEmoji } = getUserLevelInfo(userLevel);

        return (
          <CommentWrapper key={commentItem._id}>
            <MakerName userColor={userColor}>
              {fullName}
              {userEmoji}
            </MakerName>
            <CommentSubWrapper>
              <VotedItem>{vote.toUpperCase()}</VotedItem>
              <CommentStyled>
                {comment ? comment : `${vote.toUpperCase()}를 선택하였습니다.`}
              </CommentStyled>
              {myId === commentAuthorId && (
                <DeleteButton
                  size="sm"
                  className={commentItem._id}
                  onClick={handleClickDeleteComment}
                  ref={deleteButtonRef}>
                  <Icon name={'close'} />
                </DeleteButton>
              )}
            </CommentSubWrapper>
            {isClickedDeleteBtn && (
              <Modal onClose={() => setIsClickedDeleteBtn(false)}>
                <ModalWrapper>
                  <div>정말로 댓글을 삭제하시겠습니까?</div>
                  <ButtonContainer onClick={(e) => e.stopPropagation()}>
                    <ModalButton
                      size="sm"
                      onClick={handleClickDeleteCommentModalBtn}
                      style={{ color: '#F66' }}>
                      네
                    </ModalButton>
                    <ModalButton
                      size="sm"
                      onClick={() => setIsClickedDeleteBtn(false)}>
                      아니요
                    </ModalButton>
                  </ButtonContainer>
                </ModalWrapper>
              </Modal>
            )}
          </CommentWrapper>
        );
      })}
    </>
  );
};

export default CommentList;

const CommentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px 16px;
  gap: 8px;
  border: ${ANGOLA_STYLES.border.default};
  border-top: none;
`;

const MakerName = styled.div<{ userColor: string }>`
  font-size: ${ANGOLA_STYLES.textSize.title};

  color: ${(props) => props.userColor};
`;

const CommentSubWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;

const VotedItem = styled.div`
  display: flex;
  width: 60px;
  height: 60px;
  padding: 12px 12px 0 12px;
  justify-content: center;
  align-items: center;
  border-radius: 40px;
  background-color: ${ANGOLA_STYLES.color.gray};
  font-size: ${ANGOLA_STYLES.textSize.title};
`;

const CommentStyled = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 0 0;
  padding: 16px 24px;
  border-radius: 40px;
  width: 100%;
  font-size: ${ANGOLA_STYLES.textSize.titleSm};
`;

const DeleteButton = styled(ButtonStyled)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid ${ANGOLA_STYLES.color.text};
  border-radius: 40px;
  background-color: ${ANGOLA_STYLES.color.gray};
  width: 40px;
  height: 40px;
  padding: 0;

  &:hover {
    border: ${ANGOLA_STYLES.border.default};
  }
`;

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: space-around;
  align-items: center;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const ModalButton = styled(ButtonStyled)`
  justify-content: center;
  align-items: center;
  padding: 0;
`;
