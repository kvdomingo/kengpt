import { ReactNode } from "react";
import {
  Avatar,
  CircularProgress,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";

interface ChatItemProps {
  isUser: boolean;
  children?: ReactNode | string;
  isThinking: boolean;
}

function ChatItem({ isUser, children, isThinking }: ChatItemProps) {
  return (
    <ListItem
      sx={{
        borderBottom: "1px solid white",
        py: 4,
        backgroundColor: isUser ? "background.default" : "background.paper",
        display: "flex",
        alignItems: "flex-start",
      }}
    >
      <ListItemAvatar>
        <Avatar
          variant="rounded"
          sx={{ backgroundColor: isUser ? "primary.main" : "secondary.main" }}
        >
          {isUser ? "U" : "GPT"}
        </Avatar>
      </ListItemAvatar>
      <ListItemText sx={{ whiteSpace: "pre-line" }}>
        {isThinking ? (
          <CircularProgress color="inherit" size="1.5em" />
        ) : (
          children
        )}
      </ListItemText>
    </ListItem>
  );
}

ChatItem.defaultProps = {
  isUser: false,
  isThinking: false,
};

export default ChatItem;
