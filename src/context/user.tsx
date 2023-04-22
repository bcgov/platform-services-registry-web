import { createContext } from "react";
import { User } from "../providers/user";

const UserContext = createContext<User | null>(null);

export default UserContext;
