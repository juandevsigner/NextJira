import { ChangeEvent, useContext, useState } from "react";
import { AddCircleOutlined, SaveOutlined } from "@mui/icons-material";
import { Box, Button, TextField } from "@mui/material";
import { EntriesContext, UIContext } from "../../context";

export const NewEntry = () => {
  const [inputValue, setInputValue] = useState("");
  const [touched, setTouched] = useState(false);

  const { addNewEntry } = useContext(EntriesContext);
  const { isAddingEntry, setIsAddingEntry } = useContext(UIContext);

  const onTextFiledChanges = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    setInputValue(e.target.value);
  };

  const onSave = () => {
    if (inputValue.length === 0) return;
    setTouched(false);
    addNewEntry(inputValue);
    setIsAddingEntry(false);
    setInputValue("");
    setTouched(false);
  };

  return (
    <Box sx={{ marginBottom: 2, paddingX: 2 }}>
      {isAddingEntry ? (
        <>
          <TextField
            fullWidth
            sx={{ marginTop: 2, marginBottom: 1 }}
            placeholder="exm: this is a new entry"
            autoFocus
            multiline
            label="New Entry"
            helperText={inputValue.length <= 0 && touched && "Put a value"}
            error={inputValue.length <= 0 && touched}
            value={inputValue}
            onChange={onTextFiledChanges}
            onBlur={() => setTouched(true)}
          />
          <Box display="flex" justifyContent="space-between">
            <Button onClick={() => setIsAddingEntry(false)} color="error">
              Cancel
            </Button>
            <Button
              color="primary"
              endIcon={<SaveOutlined />}
              variant="outlined"
              onClick={onSave}
            >
              Save
            </Button>
          </Box>
        </>
      ) : (
        <Button
          onClick={() => setIsAddingEntry(true)}
          fullWidth
          variant="outlined"
          startIcon={<AddCircleOutlined />}
        >
          Add Task
        </Button>
      )}
    </Box>
  );
};
