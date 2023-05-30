import { useState, useEffect } from "react";
import { getUserPhotoByEmail } from "../msGraphApi";

// function usePhotoUrl(email) {
//   const [url, setUrl] = useState(null);

//   useEffect(() => {
//     async function fetchUserPhoto() {
//       if (email) {
//         const result = await getUserPhotoByEmail(email);
//         console.log(result);
//         setUrl(result);
//       }
//     }

//     fetchUserPhoto();
//   }, [email]);

//   return url;
// }

// export default usePhotoUrl;

function usePhotoUrl(email) {
  const [url, setUrl] = useState(null);

  useEffect(() => {
    async function fetchUserPhoto() {
      // console.log(
      //   `${process.env.REACT_APP_MSAL_ENDPOINT}/getIdirPhoto?email=${email}`
      // );
      if (email) {
        const result = await fetch(
          `${process.env.REACT_APP_MSAL_ENDPOINT}/getIdirPhoto?email=${email}`
        );
        setUrl(result?.url);

        // console.log(result);
      }
    }

    fetchUserPhoto();
  }, [email]);

  return url;
}

export default usePhotoUrl;
