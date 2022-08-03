import { MypagePostBox } from '../../styles/style';
import EmptyPage from '../emptyPage';
import MyPagePostList from './MyPagePostList';

const OtherProjects = ({ currentTab, data }) => {
  console.log(data);
  console.log(currentTab);

  if (data.length === 0) {
    return <EmptyPage message={'아직 작성한 프로젝트가 없습니다.'} />;
  }

  return (
    <MypagePostBox>
      {data.map((post) => {
        return <MyPagePostList data={post} />;
      })}
    </MypagePostBox>
  );
};
export default OtherProjects;
