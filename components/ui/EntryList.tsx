import { List, Paper } from "@mui/material";
import React, { FC, useContext, useMemo } from "react";
import { EntryStatus } from "../../interfaces";
import { EntryCard } from "./EntryCard";
import { EntriesContext } from "../../context/entries/EntriesContext";

interface Props {
  status: EntryStatus;
}

export const EntryList: FC<Props> = ({ status }) => {
  const { entries } = useContext(EntriesContext);

  const entriesByStatus = useMemo(
    () => entries.filter(entry => entry.status === status),
    [entries]
  );

  return (
    <div>
      <Paper
        sx={{
          height: "calc(100vh - 250px)",
          overflowY: "scroll",
          boxShadow: "none",
          backgroundColor: "transparent",
          padding: 1,
          "&::-webkit-scrollbar": {
            width: "3px",
            bgcolor: "#454545",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#423750",
            border: "7px none #fffff",
            borderRadius: "10px",
          },
        }}
      >
        <List sx={{ opacity: 1 }}>
          {entriesByStatus.map(entry => (
            <EntryCard key={entry._id} entry={entry} />
          ))}
        </List>
      </Paper>
    </div>
  );
};
