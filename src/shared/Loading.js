import Lottie from "lottie-react";
import lodingimg from "../styles/icon/lodingimg.json"

const Loading = ()=>{

    return (
        <div>
            <Lottie animationData={lodingimg}/>
        </div>
    )
}

export default Loading;