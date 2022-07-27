import { useEffect } from "react";
import { EventSourcePolyfill, NativeEventSource } from "event-source-polyfill"
import {
  useDeleteAlert,
  useDeleteAlertAll,
  useGetMessageAlert,
  useGetUnreadAlert,
  usePostReadAlert,
} from "../hook/useNotification";
import { useQueryClient } from "react-query";
import styled from "styled-components";
import {ReactComponent as Remove} from "../styles/icon/detail/remove.svg";
import { useRecoilState } from "recoil";
import { alertListAtom } from "../atom/atom";
import { useLocation } from "react-router-dom";

const Sse = () => {
  const token = localStorage.getItem("token");
  const EventSource = EventSourcePolyfill || NativeEventSource;
  const [alert, setAlert] = useRecoilState(alertListAtom);
  //const [unread,setUnread] = useState();
  const queryClient = useQueryClient();
  const { data: alertList } = useGetMessageAlert();
  //const { data: alertUnreadList} = useGetUnreadAlert(); 보류
  const { mutateAsync: removeAlert } = useDeleteAlert();
  const { mutateAsync: removeAllAlert } = useDeleteAlertAll();
  const { mutateAsync: readAlert } = usePostReadAlert();

  const allList = alertList?.data;
  //const unreadList = alertUnreadList?.data.count;
  //console.log(allList)
  

  useEffect(() => {
    if (token) {
      const sse = new EventSource("https://dogfaw.dasole.shop/subscribe", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      sse.addEventListener("message", (e) => {
        if (e.type === "message" && e.data.startsWith("{")) {
          setAlert((prev) => [JSON.parse(e.data)]);
        }
      });

      sse.addEventListener("open", (e) => {
        ////console.log(e);
      });

      sse.addEventListener("error", (e) => {
        ////console.log("에러", e);
      });
    }
  }, [token, setAlert,EventSource]);

  useEffect(() => {
    if (token) {
      setAlert(allList);
      //console.log(allList);
      //setUnread(unreadList);
    }
  }, [token, allList, setAlert]);

  const messageDelete = async (id) => {
    const { data } = await removeAlert(id)
    if(data === true) {
      queryClient.invalidateQueries("alertList");
    } else {
      queryClient.invalidateQueries("alertList");
    }
    //console.log(data)
    // await removeAlert(id);
    // queryClient.invalidateQueries("alertList");
  };

  const messageAllDelete = async () => {
    await removeAllAlert();
    queryClient.invalidateQueries("alertList");
  };

  const messageRead = async (id, url, status) => {
   //window.location.href = url;
    console.log(id, url, status);
    await readAlert(id);
    queryClient.invalidateQueries("alertList");
  };

  return (
    <div>
      {alert?.length === 0 ? (
        <p>아직 알림이 없어요!</p>
      ) : (
        <>
          <AllDelete onClick={messageAllDelete}>
         <RemoveIcon/>
          <span>전체삭제</span>
          </AllDelete>
          {alert?.map((list) => {
            return (
              <ul key={list.id}>
                <ListWrap >
                  <List
                    onClick={() => {
                      messageRead(list.id, list.url, list.status);
                    }}
                    status={list.status}
                  >
                    {list.notificationContent}
                  </List>
                  <span
                    onClick={() => {
                      messageDelete(list.id);
                    }}
                  >
                    <RemoveIcon/>
                  </span>
                </ListWrap>
              </ul>
            );
          })}
        </>
      )}
    </div>
  );
};

const ListWrap = styled.div`
display:flex;
align-items:center;
span{
  padding-left:8px;
}
`;

const List = styled.li`
  color: ${(props) => (props.status ? "gray" : "black")};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const AllDelete = styled.div`
  background-color: ${(props) => props.theme.divBackGroundColor};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  height: 32px;
  border-radius: 50px;
  border:${props => props.theme.alertBorder};
  cursor: pointer;
  position:absolute;
  top:10px;
  right:10px;


  span {
    color: ${props => props.theme.removeBtnColor};
    font-size:14px;
  }
`;

const RemoveIcon = styled(Remove)`
stroke:${props => props.theme.removeBtnColor};

`;

export default Sse;
