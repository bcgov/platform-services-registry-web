import Avatar from "@mui/material/Avatar";
import usePhotoUrl from "../../msGraphApi/useAzurePhoto";

const stringToColor = (string) => {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
};

const stringAvatar = (name) => {
  return {
    sx: {
      bgcolor: stringToColor(name),
      color: "#ffffff!important"
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`
  };
};

export default function UserAvatar({ email, firstName, lastName, ...rest }) {
  const { loading, url } = usePhotoUrl(email);

  console.log(loading);
  console.log(url);

  let trimmedFirstName = firstName ? firstName.trim() : "";
  let trimmedLastName = lastName ? lastName.trim() : "";

  if (loading || !url || url === "undefined") {
    return (
      <Avatar
        {...rest}
        {...stringAvatar(`${trimmedFirstName} ${trimmedLastName}`)}
      />
    );
  } else {
    return (
      <Avatar
        {...rest}
        alt={`${trimmedFirstName} ${trimmedLastName}`}
        src={url}
      />
    );
  }
}
