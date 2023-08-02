import { Dispatch, SetStateAction, createContext } from "react";

type User = {
  name: string;
  lastname: string;
  nickname: string;
  id: string;
};

interface ThemeContextProps {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
}

const UserContext = createContext<ThemeContextProps>({
  user: {
    name: "",
    lastname: "",
    nickname: "",
    id: "",
  },
  setUser: () => {},
});

export type { User };
export default UserContext;
