import * as React from "react";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import usePhotoUrl from "../../msGraphApi/useAzurePhoto";

export default function UserAvatar({ email, firstName, ...rest }) {
  const photoUrl = usePhotoUrl(email);

  return <Avatar {...rest} alt={firstName} src={photoUrl} />;
}
