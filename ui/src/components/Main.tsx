import { Fragment, useContext, useState } from "react";
import { Send } from "@mui/icons-material";
import {
  Alert,
  Box,
  Container,
  Grid,
  IconButton,
  List,
  ListItem,
  TextField,
} from "@mui/material";
import api from "../api";
import Context from "../context/Context";
import ChatIntro from "./ChatIntro";
import ChatItem from "./ChatItem";

export default function Main() {
  const { history, setHistory, hasApiError, setHasApiError } = useContext(
    Context,
  );
  const [prompt, setPrompt] = useState("");

  function handleSubmit(e: any) {
    e.preventDefault();
    if (prompt.length === 0) return;
    setHasApiError(false);
    setHistory(history => [
      ...history,
      <ChatItem isUser>{prompt}</ChatItem>,
      <ChatItem isThinking />,
    ]);
    setPrompt("");
    api
      .chat({ prompt })
      .then(res =>
        setHistory(history => [
          ...history.slice(0, -1),
          <ChatItem>{res.data.text}</ChatItem>,
        ]),
      )
      .catch(() => {
        setHasApiError(true);
        setHistory(history => history.slice(0, -1));
      });
  }

  return (
    <Grid container className="main">
      <Grid item xs={2} sx={{ backgroundColor: "background.paper", p: 2 }} />
      <Grid
        item
        container
        xs
        sx={{ backgroundColor: "background.default", placeContent: "center" }}
      >
        <Container
          maxWidth="md"
          sx={{
            display: "flex",
            justifyContent: history.length > 0 ? "flex-start" : "center",
            alignItems: history.length > 0 ? "flex-end" : "center",
            height: "100%",
          }}
        >
          {history.length === 0 ? (
            <ChatIntro />
          ) : (
            <List sx={{ width: "100%", pb: 20 }}>
              {history.map((his, i) => (
                <Fragment key={i}>{his}</Fragment>
              ))}
              {hasApiError && (
                <ListItem sx={{ borderBottom: "1px solid white", py: 4 }}>
                  <Alert severity="error" sx={{ width: "100%" }}>
                    An error occurred. Please try again later.
                  </Alert>
                </ListItem>
              )}
            </List>
          )}
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              width: "50%",
              position: "fixed",
              bottom: 0,
              pb: 6,
              pt: 6,
            }}
            className="chatbox"
          >
            <TextField
              fullWidth
              autoFocus
              variant="outlined"
              name="prompt"
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={handleSubmit} size="small">
                    <Send />
                  </IconButton>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  border: "2px solid white",
                },
                "backgroundColor": "background.default",
              }}
            />
          </Box>
        </Container>
      </Grid>
    </Grid>
  );
}
