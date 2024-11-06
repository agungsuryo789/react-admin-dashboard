import { atom } from "recoil";

interface User {
  isAuth: boolean;
  email: string;
  accessToken: string
}

// Function to persist state in localStorage
const persistState = <T>(key: string, defaultValue: T): T => {
  const savedState = localStorage.getItem(key);
  if (savedState) {
    return JSON.parse(savedState);
  }
  return defaultValue;
};

//state
export const userState = atom<User>({
  key: "userState",
  default: persistState<User>("userState", { isAuth: false, email: "", accessToken: '' }),
});
