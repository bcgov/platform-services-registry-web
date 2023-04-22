import UserContext from "../context/user";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface UserProviderProps {
  user: User;
  children: React.ReactNode;
}

function UserProvider({ user, children }: UserProviderProps) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export default UserProvider;
