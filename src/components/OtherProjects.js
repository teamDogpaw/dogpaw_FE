import OtherPostList from "../pages/OtherPostList"
import { EmptyBody, EmptyImg } from "./ApplyList"
import MyPagePostList from "./MyPagePostList"

const OtherProjects = ({currentTab, data}) =>{
    console.log(data)
    console.log(currentTab)

    if(data.length === 0){
        return (
            <EmptyBody>
            <EmptyImg />
            <span>아직 작성한 프로젝트가 없습니다.
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
export default OtherProjects;