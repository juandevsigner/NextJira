import { List, Paper } from "@mui/material";
import React, { DragEvent, FC, useContext, useMemo, useState } from "react";
import { EntryStatus } from "../../interfaces";
import { EntryCard } from "./EntryCard";
import { EntriesContext } from "../../context/entries/EntriesContext";
import { UIContext } from "../../context";
import styles from "./EntryList.module.css";

interface Props {
  status: EntryStatus;
}

export const EntryList: FC<Props> = ({ status }) => {
  const { entries, updateEntry } = useContext(EntriesContext);

  const { isDragging } = useContext(UIContext);

  const entriesByStatus = useMemo(
    () => entries?.filter(entry => entry.status === status),
    [entries, status, isDragging]
  );

  const allowDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
    const id = event.dataTransfer.getData("text");
    const entry = entries.find(entry => entry._id === id)!;
    entry.status = status;
    updateEntry(entry);
  };

  return (
    <div onDrop={onDropEntry} onDragOver={allowDrop}>
      <Paper
        className={isDragging ? styles.dragging : ""}
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
        <List sx={{ opacity: isDragging ? 0.2 : 1, transition: "all .4s" }}>
          {entriesByStatus.map(entry => (
            <EntryCard key={entry._id} entry={entry} />
          ))}
        </List>
      </Paper>
    </div>
  );
};
