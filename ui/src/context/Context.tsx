import { Dispatch, ReactNode, SetStateAction, createContext } from "react";

interface ContextProps {
  history: ReactNode[];
  setHistory: Dispatch<SetStateAction<ReactNode[]>>;
  hasApiError: boolean;
  setHasApiError: Dispatch<SetStateAction<boolean>>;
}

const Context = createContext<ContextProps>({
  history: [],
  setHistory: () => {},
  hasApiError: false,
  setHasApiError: () => {},
});

export default Context;
