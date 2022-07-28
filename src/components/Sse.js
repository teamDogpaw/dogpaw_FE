import { useEffect } from "react";
import { EventSourcePolyfill, NativeEventSource } from "event-source-polyfill";
import {
  useDeleteAlert,
  useDeleteAlertAll,
  useGetMessageAlert,
  useGetUnreadAlert,
  usePostReadAlert,
} from "../hook/useNotification";
import { useQueryClient } from "react-query";
import styled from "styled-components";
import { ReactComponent as Remove } from "../styles/icon/detail/remove.svg";
import { useRecoilState } from "recoil";
import { alertListAtom, newAlertListAtom } from "../atom/atom";

const Sse = () => {
  const token = localStorage.getItem("token")
  const EventSource = EventSourcePolyfill || NativeEventSource;
  const [alert, setAlert] = useRecoilState(alertListAtom);
  const [newAlert, setNewAlert] = useRecoilState(newAlertListAtom);
  //const [unread,setUnread] = useState(); // 보류
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
          queryClient.invalidateQueries("alertList");
        }
      });

      sse.addEventListener("error", (e) => {
        ////console.log("에러", e);
      });
    }
  }, [token]);

  useEffect(() => {
  
    if (token) {
      setNewAlert(allList);
      //console.log(allList);
      //setUnread(unreadList);
    }
  }, [token, allList, setNewAlert]);

  const messageDelete = async (id) => {
    // const { data } = await removeAlert(id)
    // if(data === true) {
    //   queryClient.invalidateQueries("alertList");
    // } else {
    //   queryClient.invalidateQueries("alertList");
    // }
    //console.log(data)
    await removeAlert(id);
    queryClient.invalidateQueries("alertList");
  };

  const messageAllDelete = async () => {
    await removeAllAlert();
    queryClient.invalidateQueries("alertList");
  };

  const messageRead = async (id, url, status) => {
    window.location.href = url;
    //console.log(id, url, status);
    await readAlert(id);
    queryClient.invalidateQueries("alertList");
  };



  return (
    <div>
      {newAlert?.length === 0 ? (
        <p>아직 알림이 없어요!</p>
      ) : (
        <>
          <AllDelete onClick={messageAllDelete}>
            <RemoveIcon />
            <span>전체삭제</span>
          </AllDelete>

          {newAlert?.map((list) => {
            return (
              <ul key={list.id}>
                <ListWrap>
                  <List
                    status={list.status}
                    onClick={() => {
                      messageRead(list.id, list.url, list.status);
                    }}
                  >
                    {list.notificationContent}
                  </List>
                  <span
                    onClick={() => {
                      messageDelete(list.id);
                    }}
                  >
                    <RemoveIcon />
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
  display: flex;
  align-items: center;

  span {
    padding-left: 8px;
  }
`;

const List = styled.li`
  position: relative;
  color: ${(props) => props.theme.textColor};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  opacity: ${(props) => (props.status ? "0.5" : "1")};
`;

const AllDelete = styled.div`
  background-color: ${(props) => props.theme.divBackGroundColor};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  height: 32px;
  border-radius: 50px;
  border: ${(props) => props.theme.alertBorder};
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;

  span {
    color: ${(props) => props.theme.removeBtnColor};
    font-size: 0.875rem;
  }
`;

const RemoveIcon = styled(Remove)`
  stroke: ${(props) => props.theme.removeBtnColor};
`;

export default Sse;
