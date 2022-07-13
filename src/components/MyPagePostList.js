import { LineBtn, ListProfilePic, ListStack } from "../styles/style"
import { ReactComponent as BookmarkIcon } from "../styles/icon/u_bookmark.svg";
import { ReactComponent as BookmarkFill } from "../styles/icon/Vector 33.svg";
import { useRecoilValue } from "recoil";
import { UserInfoAtom } from "../atom/atom";
import { useState } from "react";
import instance from "../shared/axios";
import { Navigate, useNavigate } from "react-router-dom";
const MyPagePostList = ({
    data,
    viewApplyModal
}) => {
    const navigate = useNavigate()
    const userInfo = useRecoilValue(UserInfoAtom);
    const [isMyBookmark, setIsMyBookmark] = useState(<BookmarkFill/>);
    console.log(data)

    const DoBookmark = async (postId) => {
 
        setIsMyBookmark((prev) => !prev)
        const response = await instance.post(`/api/bookMark/${postId}`)
        return response.data
      }

    return (
     
            <div key={data.postId} onClick={()=>navigate(`/detail/${data.postId}`)}>
            <ListProfilePic src={data.profileImg} />
            {data.nickname}<br />
            {isMyBookmark ?   <BookmarkFill onClick={()=>{DoBookmark(data.postId)}}/> :
             <BookmarkIcon onClick={()=>{DoBookmark(data.postId)}}/> }
           

            {data.title}<br />
            {data.content}<br />
            {data.stacks.map((stack, index) => {
              return (
                <ListStack key={index}>#{stack}</ListStack>
              )

            })}

 
            {data.startAt}

            {data.nickname === userInfo.nickname ? 
            <LineBtn onClick={viewApplyModal} >지원자 보기</LineBtn> : 
            null }

          </div>
 
    )
}

export default MyPagePostList;