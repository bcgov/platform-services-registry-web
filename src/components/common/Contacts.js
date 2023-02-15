import * as React from "react";
import Avatar from "./Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";

export default function GroupAvatars({ users }) {
  return (
    <AvatarGroup sx={{ display: "flex", justifyContent: "left" }} max={3}>
      {users.map((user) => (
        <Avatar email={user.email} firstName={user.firstName} />
      ))}
    </AvatarGroup>
  );
}
