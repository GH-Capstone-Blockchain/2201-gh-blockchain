import React from "react";
import {List, Link, ListItem, ListItemAvatar, Avatar, ListItemText} from '@mui/material'

export default function ContributionList(props) {
  return (
    <List sx={{ display: 'flex', flexDirection: 'row', flexWrap:'wrap', width: "100%", maxWidth: 500, bgcolor: "background.paper" }}>
      {props.contributions.map((contribution) => (
        <Link to={`/user/${contribution.user.id}`}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar
                alt="profile picture"
                src={contribution.user.profileImg}
              />
            </ListItemAvatar>
            <ListItemText
              primary={contribution.user.username}
              secondary={
                <React.Fragment>{contribution.user.bio}</React.Fragment>
              }
            />
          </ListItem>
        </Link>
      ))}
    </List>
  );
}
