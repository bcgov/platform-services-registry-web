import { useState, useMemo, useEffect } from "react";
import ReadOnlyAdminContext from "../context/readOnlyAdmin";
import { useKeycloak } from "@react-keycloak/web";


function ReadOnlyAdminProvider({ children }) {
    const { keycloak } = useKeycloak();
    const hasReadOnlyAdminRole = keycloak.hasResourceRole("read-only-admin", "registry-web");
    const [readOnlyAdmin, toggleReadOnlyAdmin] = useState(false);

    useEffect(() => {
        toggleReadOnlyAdmin(hasReadOnlyAdminRole);
    }, [hasReadOnlyAdminRole]);

    const value = useMemo(
        () => ({
            readOnlyAdmin,
            toggleReadOnlyAdmin
        }),
        [readOnlyAdmin]
    );

    return (
        <ReadOnlyAdminContext.Provider value={value}>{children}</ReadOnlyAdminContext.Provider>
    );
}

export default ReadOnlyAdminProvider;
