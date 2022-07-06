import { useSetRecoilState } from "recoil";
import { DarkThemeAtom } from "../atom/theme";

const Header = () => {
   const isDarkTheme = useSetRecoilState(DarkThemeAtom)

    return (
       <button onClick={()=> isDarkTheme((prev) => !prev)}>
         모드 바꾸기
       </button>
    )
   }
   
   export default Header;