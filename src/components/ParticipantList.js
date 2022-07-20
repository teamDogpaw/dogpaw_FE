import { useGetParticipantsLists } from "../hook/useProjectData";
import { LineBtn, ListProfilePic } from "../styles/style";
import { ApplyListContent, EmptyBody, EmptyImg, MyBtn, Section, Stack, StackBody, Stacks, User } from "./ApplyList";
import profilepic from "../styles/icon/global/profile.svg";
import { useExplusionMateMutation } from "../hook/useProjectMutation";

const ParticipantList = ({ myPostId, currentTab }) => {

    const { isLoading: isParticipantListLoading, data: participantList } = useGetParticipantsLists(myPostId)
    const { mutate: ExplusionMate } = useExplusionMateMutation()
    console.log(participantList)

    const explusionMate = (data) => {
        console.log(data)
        window.confirm("해당 팀원을 프로젝트에서 강퇴시키겠습니까?")
        ExplusionMate(data)
    };


    if (isParticipantListLoading) {
        return (
            <EmptyBody>
                <EmptyImg />
                <br />
                <span> Loading . . . </span>
            </EmptyBody>
        )
    }
    return (
        <>
            {participantList.data.length === 0 ? <EmptyBody>
                <EmptyImg />
                <br />
                <span> 아직 팀원이 없어요! </span>
            </EmptyBody> : null}
            {participantList.data.map((team) => {
                return (
                    <ApplyListContent>
                        <div>
                            <User>
                                {team.profileImg === null ? (
                                    <ListProfilePic src={profilepic} />
                                ) : (
                                    <ListProfilePic src={team.profileImg} />
                                )}
                                <span> {team.nickname} </span>  <br />
                                <span> {team.username} </span>
                                {currentTab === 2 ? null :
                                    <LineBtn onClick={() => explusionMate({ userId: team.userId, postId: myPostId })}> 팀원 탈퇴시키기 </LineBtn>}


                            </User>

                            <div>

                                <Stacks>

                                    {team.stacks?.map((stack, index) => {
                                        return <Stack key={index}>#{stack}</Stack>;
                                    })}
                                </Stacks>

                            </div>
                        </div>
                    </ApplyListContent>
                )
            })}

        </>

    )
}

export default ParticipantList;