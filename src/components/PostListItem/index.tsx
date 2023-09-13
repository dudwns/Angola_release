import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { splitPostBySeparator } from '@utils/parseDataBySeparator';

interface PostListItemProps {
  id: string;
  image: string;
  title: string;
  likes: number;
  comments: number;
}

const PostListItem = ({
  id,
  image,
  title,
  likes,
  comments,
}: PostListItemProps) => {
  const navigate = useNavigate();
  const { title: postTitle } = splitPostBySeparator(title);
  return (
    <ListItemContainer>
      <Profile>프로필</Profile>
      <Title>{postTitle}</Title>
      <Info>
        <div>♥️{likes}</div>
        <div>💬{comments}</div>
      </Info>
      <More onClick={() => navigate(`/post/${id}`)}>more</More>
    </ListItemContainer>
  );
};

export default PostListItem;

const ListItemContainer = styled.li`
  display: flex;
  border: 1px solid black;
  margin: 30px 0;
  gap: 20px;
  border-radius: 12px;
`;

const Profile = styled.div`
  border: 1px solid black;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  margin-left: 10px;
  margin: 10px 0 10px 10px;
`;

const Title = styled.div`
  border: 1px solid black;
  border-radius: 30px;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 14px 0;
`;

const More = styled.div`
  border-left: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  cursor: pointer;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  gap: 10px;
  flex-shrink: 0;
`;
