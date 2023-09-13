import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';
import PostListItem from '@components/PostListItem';
import Spinner from '@components/Spinner';
import { useFetchUserPosts } from '@apis/post';
import { useFetchUser } from '@apis/user';
import { authInfoState } from '@atoms/index';
import UserInfo from './UserInfo';

const UserPage = ({ userId }: { userId: string }) => {
  const auth = useRecoilValue(authInfoState);
  const myId = auth?.userId;
  const { userData, isUserLoading } = useFetchUser(userId);
  const { userPostsData, isUserPostsLoading } = useFetchUserPosts(userId);

  if (isUserLoading || isUserPostsLoading) {
    return <Spinner />;
  }

  // userData.followers._id // 고유 id
  // userData.followers.user // 유저
  // userData.followers.follower // 나
  // console.log(userData?.followers);

  // console.log(
  //   userData?.followers.find((follower) => follower.follower === myId)
  //     ?.follower,
  // );
  // console.log(
  //   userData?.followers.find((follower) => follower.follower === myId)?._id,
  // );

  return (
    <div>
      {userData && (
        <UserInfo
          userId={userId}
          image={userData.image}
          name={userData.fullName}
          likes={userData.likes?.length}
          followers={userData.followers?.length}
          following={userData.following?.length}
          followerId={
            userData.followers.find((follower) => follower.follower === myId)
              ?._id
          }
          isFollowed={userData?.followers.some(
            (follower) => follower.follower === myId,
          )}
        />
      )}
      <ul>
        {userPostsData?.length === 0 ? (
          <NoPostMessage>작성한 글이 없습니다.</NoPostMessage>
        ) : (
          userPostsData?.map((post) => (
            <PostListItem
              key={post._id}
              id={post._id}
              title={post.title}
            />
          ))
        )}
      </ul>
    </div>
  );
};

export default UserPage;

const NoPostMessage = styled.div`
  display: flex;
  margin-top: 30px;
  width: 80%;
  justify-content: center;
  align-items: center;
`;
