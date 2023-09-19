import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useFetchLike, useFetchUnLike } from '@apis/like';
import { useFetchCreateNotification } from '@apis/notifications';

interface ButtonGroupProps {
  numberOfLikes: number;
  numberOfComments: number;
  likeId: string | undefined;
  postId: string;
  authorId: string;
  onGoDetailPage: () => void;
}

const ButtonGroup = ({
  numberOfLikes,
  numberOfComments,
  likeId,
  postId,
  authorId,
  onGoDetailPage: goDetailPage,
}: ButtonGroupProps) => {
  const [userLikeId, setUserLikeId] = useState(likeId);
  const [likes, setLikes] = useState(numberOfLikes);
  const [isLiked, setIsLiked] = useState(likeId !== undefined);

  const { likeMutate, likeData } = useFetchLike();
  const { unLikeMutate } = useFetchUnLike();
  const { createNotificationMutate } = useFetchCreateNotification();

  useEffect(() => {
    setLikes(numberOfLikes);
    setUserLikeId(likeId);
    setIsLiked(likeId !== undefined);
  }, [numberOfLikes, likeId]);

  const handleLike = () => {
    if (userLikeId) {
      setLikes((prev) => prev - 1);
      unLikeMutate({ id: userLikeId });
    } else {
      setLikes((prev) => prev + 1);
      likeMutate({ postId });
    }
    setIsLiked((prev) => !prev);
  };

  useEffect(() => {
    if (isLiked) {
      if (!likeData.likeId) return;
      setUserLikeId(likeData.likeId);
      createNotificationMutate({
        notificationType: 'LIKE',
        notificationTypeId: likeData.likeId,
        postId,
        userId: authorId,
      });
    } else {
      setUserLikeId(undefined);
    }
  }, [likeData.likeId, isLiked]);

  return (
    <ShortButtonContainer>
      <ShortButton
        className={isLiked ? 'liked' : ''}
        onClick={handleLike}>
        ♥️{likes}
      </ShortButton>
      <ShortButton onClick={goDetailPage}>💬{numberOfComments}</ShortButton>
    </ShortButtonContainer>
  );
};

export default ButtonGroup;

const ShortButtonContainer = styled.div`
  display: flex;
  color: black;
  gap: 10px;
`;

const ShortButton = styled.div`
  font-size: 20px;
  border: 1px solid black;
  padding: 10px;
  height: 20px;
  border-radius: 15px;
  cursor: pointer;
  &.liked {
    background-color: pink;
  }
`;
