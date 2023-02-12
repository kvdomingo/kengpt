import {
  ElectricBoltOutlined,
  WarningAmber,
  WbSunnyOutlined,
} from "@mui/icons-material";
import { Grid, Typography } from "@mui/material";
import ExampleButton from "./ExampleButton";

const examples = [
  "Explain quantum computing in simple terms",
  "Got any creative ideas for a 10 year old's birthday?",
  "How do I make an HTTP request in JavaScript?",
];

const capabilities = [
  "Remembers what user said earlier in the conversation",
  "Allows user to provide follow-up corrections",
  "Trained to decline inappropriate requests",
];

const limitations = [
  "May occasionally generate incorrect information",
  "May occasionally produce harmful instructions or biased content",
  "Limited knowledge of world and events after 2021",
];

function ChatIntro() {
  return (
    <Grid container>
      <Grid item xs={12} container justifyContent="center" sx={{ mb: 6 }}>
        <Typography variant="h4" component="h1">
          ChatGPT
        </Typography>
      </Grid>
      <Grid item xs={4} container alignItems="center" flexDirection="column">
        <WbSunnyOutlined sx={{ mb: 1 }} />
        <Typography variant="h6" component="h2" sx={{ mb: 4 }}>
          Examples
        </Typography>
        {examples.map((example, i) => (
          <ExampleButton key={i}>{example}</ExampleButton>
        ))}
      </Grid>
      <Grid item xs={4} container alignItems="center" flexDirection="column">
        <ElectricBoltOutlined sx={{ mb: 1 }} />
        <Typography variant="h6" component="h2" sx={{ mb: 4 }}>
          Capabilities
        </Typography>
        {capabilities.map((capability, i) => (
          <ExampleButton key={i} disabled>
            {capability}
          </ExampleButton>
        ))}
      </Grid>
      <Grid item xs={4} container alignItems="center" flexDirection="column">
        <WarningAmber sx={{ mb: 1 }} />
        <Typography variant="h6" component="h2" sx={{ mb: 4 }}>
          Limitations
        </Typography>
        {limitations.map((limitation, i) => (
          <ExampleButton key={i} disabled>
            {limitation}
          </ExampleButton>
        ))}
      </Grid>
    </Grid>
  );
}

export default ChatIntro;
