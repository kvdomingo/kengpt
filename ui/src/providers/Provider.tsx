import { ReactNode, useState } from "react";
import Context from "../context/Context";

function Provider({ children }: { children: ReactNode }) {
  const [history, setHistory] = useState<ReactNode[]>([]);
  const [hasApiError, setHasApiError] = useState(false);

  return (
    <Context.Provider
      value={{ history, setHistory, hasApiError, setHasApiError }}
    >
      {children}
    </Context.Provider>
  );
}

export default Provider;
