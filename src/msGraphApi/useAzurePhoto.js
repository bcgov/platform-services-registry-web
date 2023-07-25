import { useState, useEffect } from "react";

function usePhotoUrl(email) {
  const [url, setUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserPhoto() {
      if (email) {
        let image = localStorage.getItem(email);

        if (!image) {
          const result = await fetch(
            `${
              process.env.REACT_APP_API_URL || '{{ env "MSAL_ENDPOINT" }}'
            }/api/v1/getIdirPhoto?email=${email}`
          );

          const data = await result.json();

          image = data.imageUrl;
          localStorage.setItem(email, image);
        }

        setUrl(image);
        setLoading(false);
      }
    }

    fetchUserPhoto();
  }, [email, loading]);

  return { url, loading };
}

export default usePhotoUrl;
