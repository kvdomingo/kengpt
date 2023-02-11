import { useState } from "react";
import {
  Box,
  Container,
  Grid,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
import api from "../api";

export default function Main() {
  const [prompt, setPrompt] = useState("");
  const [history, setHistory] = useState<string[]>([]);

  function handleSubmit(e: any) {
    e.preventDefault();
    setHistory(history => [...history, prompt]);
    api
      .chat({ prompt })
      .then(res => setHistory(history => [...history, res.data.text]))
      .catch(err => alert(err.message))
      .finally(() => setPrompt(""));
  }

  return (
    <Grid container className="main">
      <Grid item xs={2} sx={{ backgroundColor: "background.paper", p: 2 }}>
        hello
      </Grid>
      <Grid
        item
        container
        xs
        sx={{ backgroundColor: "background.default", placeContent: "center" }}
      >
        <Container
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-end",
            height: "100%",
          }}
        >
          {history.length === 0 ? (
            <Typography variant="h4" component="h1">
              ChatGPT
            </Typography>
          ) : (
            <List sx={{ width: "100%" }}>
              {history.map((his, i) => (
                <ListItem
                  key={i}
                  sx={{
                    borderBottom: "1px solid white",
                    py: 4,
                    backgroundColor:
                      i % 2 === 0 ? "background.default" : "background.paper",
                  }}
                >
                  <div>{his}</div>
                </ListItem>
              ))}
            </List>
          )}
        </Container>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "absolute",
            bottom: 0,
            mb: "10em",
            width: "75%",
          }}
        >
          <TextField
            fullWidth
            autoFocus
            // multiline
            name="prompt"
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
          />
        </Box>
      </Grid>
    </Grid>
  );
}
