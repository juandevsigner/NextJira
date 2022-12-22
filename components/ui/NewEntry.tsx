import { AddCircleOutlined, SaveOutlined } from "@mui/icons-material";
import { Box, Button, TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";

export const NewEntry = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [touched, setTouched] = useState(false);

  const onTextFiledChanges = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();

    setInputValue(e.target.value);
  };

  const onSave = () => {
    if (inputValue.length === 0) return;
    console.log(inputValue);
    setTouched(false);
  };

  return (
    <Box sx={{ marginBottom: 2, paddingX: 2 }}>
      {isAdding ? (
        <>
          <TextField
            fullWidth
            sx={{ marginTop: 2, marginBottom: 1 }}
            placeholder="exm: this is a new entry"
            autoFocus
            multiline
            label="New Entry"
            helperText={inputValue === "" && touched && "Put a value"}
            error={inputValue === "" && touched}
            value={inputValue}
            onChange={e => onTextFiledChanges(e)}
            onBlur={() => setTouched(true)}
          />
          <Box display="flex" justifyContent="space-between">
            <Button onClick={() => setIsAdding(false)} color="error">
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
          onClick={() => setIsAdding(true)}
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
