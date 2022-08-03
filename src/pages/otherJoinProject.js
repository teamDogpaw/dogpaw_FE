import EmptyPage from '../components/emptyPage';
import MyPagePostList from '../components/mypage/MyPagePostList';
import { MypagePostBox } from '../styles/style';

const OtherJoinProjects = ({ currentTab, data }) => {
  console.log(data);

  if (data.length === 0) {
    return <EmptyPage message={'아직 참여한 프로젝트가 없습니다!'} />;
  }

  return (
    <MypagePostBox>
      {data.map((post) => {
        return <MyPagePostList data={post} />;
      })}
    </MypagePostBox>
  );
};
export default OtherJoinProjects;
