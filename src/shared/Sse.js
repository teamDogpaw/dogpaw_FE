import { useEffect } from "react";
import { EventSourcePolyfill, NativeEventSource } from "event-source-polyfill";
import instance from "./axios";

const Sse = () => {
  const token = localStorage.getItem("token");
  const EventSource = EventSourcePolyfill || NativeEventSource;


 

  useEffect(() => {
    if (token) {
      const sse = new EventSource("https://dogfaw.dasole.shop/subscribe", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      sse.addEventListener("message", (e) => {
        console.log("메세지");
         const result = JSON.parse(e.data)
       console.log(result)
       console.log(e);
      });

      sse.addEventListener("open", (e) => {
        console.log(e);
        console.log("연결");
      });

      sse.addEventListener("error", (e) => {
        console.log("에러", e);
      });
    }
  }, [token, EventSource]);


  return <div></div>;
};

export default Sse;
