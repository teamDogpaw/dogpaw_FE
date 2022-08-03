import { atom } from 'recoil';
import Login from '../components/logModal/Login';

export const UserInfoAtom = atom({
  key: 'UserInfo',
  default: [],
});

export const modalContentAtom = atom({
  key: 'modalContentAtom',
  default: <Login />,
});
