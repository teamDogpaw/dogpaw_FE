import Lottie from "lottie-react";
import loadingimg from "../styles/icon/loadingimg.json"

const Loading = ()=>{

    return (
        <div>
            <Lottie animationData={loadingimg}/>
        </div>
    )
}

export default Loading;