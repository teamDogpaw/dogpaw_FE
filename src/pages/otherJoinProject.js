import { EmptyBody, EmptyImg } from "../components/ApplyList";
import MyPagePostList from "../components/MyPagePostList";

const OtherJoinProjects = ({currentTab, data}) =>{
    console.log(data)

    if(data.length === 0){
        return (
            <EmptyBody>
            <EmptyImg />
            <span>아직 참여한 프로젝트가 없습니다.
      </span> 
          </EmptyBody>
        )
    }

    return (
        <>
         {data.map((post)=> {
            return(
                <MyPagePostList data={post}/>
            )
        })}
        </>
    )
}
export default OtherJoinProjects;