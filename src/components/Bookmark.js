import axios from "axios";
import { useEffect } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import instance from "../shared/axios";
import { Btn, ListProfilePic, ListStack } from "../styles/style";

const Bookmark = () => {

  const GetMyBookmark = async () => {
    try{
      const response = await instance.get(`/api/user/mypage/bookmark`)
      console.log(response.data)
      return response.data
    }
   catch(error){
    console.log(error)
   }
  }

  const myBookmark = useQuery('mybookmark', GetMyBookmark)

  useEffect(() => {
  }, [])

  const addBookmark = async (postId) => {
    const response = await axios.post(`/api/bookMark/${postId}`)
 
    return response.data
  }

  if (myBookmark.isLoading) {
    return (
      <h1>loading...</h1>
    )
  }
  return (
    <div>
      {myBookmark?.data.map((content) => {
        return (
          <div>
            <ListProfilePic src={content.profileImg} />
            {content.nickname}<br />
            <svg width="19" height="27" viewBox="0 0 19 27" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.9286 0H4.07143C2.99163 0 1.95604 0.426611 1.1925 1.18598C0.428963 1.94535 1.06982e-05 2.97528 1.06982e-05 4.0492V25.6449C-0.000938714 25.8827 0.0613191 26.1166 0.180481 26.3228C0.299642 26.529 0.471476 26.7003 0.678581 26.8192C0.884893 26.9376 1.11892 27 1.35715 27C1.59538 27 1.82941 26.9376 2.03572 26.8192L9.5 22.527L16.9643 26.8192C17.1711 26.9358 17.4051 26.9963 17.6428 26.9946C17.8806 26.9963 18.1146 26.9358 18.3214 26.8192C18.5285 26.7003 18.7004 26.529 18.8195 26.3228C18.9387 26.1166 19.0009 25.8827 19 25.6449V4.0492C19 2.97528 18.571 1.94535 17.8075 1.18598C17.044 0.426611 16.0084 0 14.9286 0ZM16.2857 23.3099L10.1786 19.8006C9.97226 19.6821 9.73823 19.6197 9.5 19.6197C9.26177 19.6197 9.02774 19.6821 8.82143 19.8006L2.71429 23.3099V4.0492C2.71429 3.69122 2.85728 3.34791 3.11179 3.09479C3.3663 2.84167 3.7115 2.69946 4.07143 2.69946H14.9286C15.2885 2.69946 15.6337 2.84167 15.8882 3.09479C16.1427 3.34791 16.2857 3.69122 16.2857 4.0492V23.3099Z" fill="#FFB673" />
              <path d="M1.01807 4.02539V22.5947C1.01807 24.1899 2.79387 25.1431 4.1233 24.2616L8.59419 21.2971C9.26627 20.8515 10.1402 20.8531 10.8107 21.3012L15.0473 24.1324C16.408 25.0417 18.2253 24.0209 18.1568 22.3858L17.384 3.94167C17.3392 2.87061 16.4578 2.02539 15.3858 2.02539H3.01807C1.9135 2.02539 1.01807 2.92082 1.01807 4.02539Z" fill="#FFB673" stroke="#FFB673" />
            </svg> 



            {content.title}<br />
            {content.content}<br />
            {content.stacks.map((stack) => {
              return (
                <ListStack>#{stack}</ListStack>
              )
            })}
            {content.startAt}
            <Btn>참여자 보기</Btn>

          </div>

        )
      })}

    </div>


  );
};


export default Bookmark;
