import { useReducer } from "react";
import { Entry } from "../../interfaces";
import { EntriesContext, entriesReducer } from "./";
import { v4 as uuidv4 } from "uuid";

export interface EntriesState {
  entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [
    {
      _id: uuidv4(),
      description:
        "Exercitation pariatur et do esse minim est consequat adipisicing irure velit deserunt sint culpa.",
      status: "pending",
      createdAt: Date.now(),
    },
    {
      _id: uuidv4(),
      description:
        "Cupidatat eiusmod proident culpa esse commodo sint pariatur in ipsum cillum duis irure.",
      status: "in-progress",
      createdAt: Date.now() - 1000000,
    },
    {
      _id: uuidv4(),
      description: "Cupidatat laboris cupidatat officia laborum veniam..",
      status: "finished",
      createdAt: Date.now() - 1000000000,
    },
  ],
};

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const EntriesProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);

  return (
    <EntriesContext.Provider
      value={{
        ...state,
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
