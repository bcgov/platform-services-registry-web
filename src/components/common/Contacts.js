import * as React from "react";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";

export default function GroupAvatars({ users }) {
  return (
    <AvatarGroup sx={{ display: "flex", justifyContent: "left" }} max={3}>
      {users.map((user) => (
        <Avatar
          alt={user.firstName}
          src={`https://github.com/${user.githubId}.png`}
        />
      ))}
    </AvatarGroup>
  );
}
