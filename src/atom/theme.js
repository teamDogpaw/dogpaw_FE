import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();
export const DarkThemeAtom = atom({
    key:"DarkTheme",
    default:false,
    effects_UNSTABLE:[persistAtom],
});