import * as React from "react";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Link from '@mui/material/Link';
import {stopPropagationRow}  from './FormHelpers'


export default function GroupAvatars({ users }) {
  return (
    <AvatarGroup sx={{ display: "flex", justifyContent: "left" }} max={3}>
      {users.map((user) => (
            <Link
            underline="hover"
            onClick={(e) => stopPropagationRow(e, "mailto:" + user.email)}
          >
            <Avatar
          alt={user.firstName}
          src={`https://github.com/${user.githubId}.png`}
        />
        </Link>
      ))}
    </AvatarGroup>
  );
}
