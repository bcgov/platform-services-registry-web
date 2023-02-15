import { useState, useEffect } from "react";
import { getUserPhotoByEmail } from "../msGraphApi";

function usePhotoUrl(email) {
  const [url, setUrl] = useState(null);

  useEffect(() => {
    async function fetchUserPhoto() {
      if (email) {
        const result = await getUserPhotoByEmail(email);
        setUrl(result);
      }
    }

    fetchUserPhoto();
  }, [email]);

  return url;
}

export default usePhotoUrl;
