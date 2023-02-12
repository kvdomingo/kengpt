import { useContext } from "react";
import { Button } from "@mui/material";
import api from "../api";
import Context from "../context/Context";
import ChatItem from "./ChatItem";

interface ExampleButtonProps {
  children: string;
  disabled: boolean;
}

function ExampleButton({ children, disabled }: ExampleButtonProps) {
  const { history, setHistory, setHasApiError } = useContext(Context);

  function handleSubmit(e: any, prompt: string) {
    e.preventDefault();
    setHistory([
      ...history,
      <ChatItem isUser>{prompt}</ChatItem>,
      <ChatItem isThinking />,
    ]);
    api
      .chat({ prompt })
      .then(res =>
        setHistory([
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
    <Button
      variant="contained"
      color="inherit"
      sx={{
        textTransform: "unset",
        whiteSpace: "normal",
        boxShadow: "none",
        mb: 1,
        mx: 2,
        py: 1,
        pointerEvents: disabled ? "none" : undefined,
      }}
      onClick={disabled ? () => {} : e => handleSubmit(e, children)}
    >
      {children} {!disabled && "→"}
    </Button>
  );
}

ExampleButton.defaultProps = {
  disabled: false,
};

export default ExampleButton;
