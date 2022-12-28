import { useEffect, useReducer, useState } from "react";
import { useSnackbar } from "notistack";
import { Entry } from "../../interfaces";
import { EntriesContext, entriesReducer } from "./";
import entriesApi from "../../apis/entriesApi";

export interface EntriesState {
  entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [],
};

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const EntriesProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);
  const [update, setUpdate] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const addNewEntry = async (description: string) => {
    try {
      const { data } = await entriesApi.post<Entry>("/entries", {
        description,
      });
      dispatch({ type: "[Entry] - Add-Entry", payload: data });
    } catch (error) {
      console.log(error);
    }
  };

  const updateEntry = async (
    { _id, description, status }: Entry,
    showSnackbar = false
  ) => {
    try {
      const { data } = await entriesApi.put<Entry[]>(`/entries/${_id}`, {
        description,
        status,
      });

      dispatch({ type: "[Entry] - Update-Entry", payload: data });

      if (showSnackbar) {
        enqueueSnackbar("Entry Update Correctly", {
          variant: "success",
          autoHideDuration: 1500,
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      }
      setUpdate(!update);
    } catch (error) {
      console.log(error);
    }
  };

  const refreshEntries = async () => {
    const { data } = await entriesApi<Entry[]>("/entries");
    dispatch({ type: "[Entry] - Refresh-Data", payload: data });
  };
  useEffect(() => {
    refreshEntries();
  }, [update]);

  return (
    <EntriesContext.Provider
      value={{
        ...state,
        //methods
        addNewEntry,
        updateEntry,
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
