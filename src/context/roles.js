import { createContext } from "react";

const AdminContext = createContext({
  admin: false,
  readOnlyAdmin: false,
  featureTester: false,
  toggleReadOnlyAdmin: () => {},
  toggleAdmin: () => {},
  toggleFeatureTester: () => {},
});

export default AdminContext;
