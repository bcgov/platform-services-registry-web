import { useState, useEffect } from "react";

function usePhotoUrl(email) {
  const [url, setUrl] = useState(null);

  useEffect(() => {
    async function fetchUserPhoto() {
      if (email) {
        let image = localStorage.getItem(email);

        if (!image) {
          const result = await fetch(
            `${process.env.REACT_APP_MSAL_ENDPOINT}/getIdirPhoto?email=${email}`
          );

          const data = await result.json();

          image = data.imageUrl;
          localStorage.setItem(email, image);
        }

        setUrl(image);
      }
    }

    fetchUserPhoto();
  }, [email]);

  return url;
}

export default usePhotoUrl;
