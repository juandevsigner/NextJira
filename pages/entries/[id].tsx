import React, { ChangeEvent, useMemo, useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  capitalize,
  IconButton,
} from "@mui/material";
import { Layout } from "../../components/layouts";
import { DeleteOutline, SaveOutlined } from "@mui/icons-material";
import { EntryStatus } from "../../interfaces";

const validStatus: EntryStatus[] = ["pending", "in-progress", "finished"];

const EntryPage = () => {
  const [inputValue, setInputValue] = useState("");
  const [status, setStatus] = useState<EntryStatus>("pending");
  const [touched, setTouched] = useState(false);

  const isNotValid = useMemo(
    () => inputValue.length <= 0 && touched,
    [inputValue, touched]
  );

  const onInputValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onStatusChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(e.target.value as EntryStatus);
  };

  const onSave = () => {
    console.log({ inputValue, status });
  };

  return (
    <Layout title={"..."}>
      <Grid container sx={{ marginTop: 2 }} justifyContent="center">
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader
              title={`Entrada: ${inputValue}`}
              subheader={`Was created ago: ..`}
            />
            <CardContent>
              <TextField
                multiline
                label="New Entry"
                placeholder="New Entry"
                fullWidth
                autoFocus
                sx={{ marginTop: 2, marginBottom: 1 }}
                value={inputValue}
                onChange={onInputValueChange}
                helperText={isNotValid && "Put a Value"}
                onBlur={() => setTouched(true)}
                error={isNotValid}
              />
              <FormControl>
                <FormLabel>Status: </FormLabel>
                <RadioGroup value={status} onChange={onStatusChanged} row>
                  {validStatus.map(option => (
                    <FormControlLabel
                      control={<Radio />}
                      value={option}
                      key={option}
                      label={capitalize(option)}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </CardContent>
            <CardActions>
              <Button
                fullWidth
                variant="contained"
                startIcon={<SaveOutlined />}
                onClick={onSave}
                disabled={inputValue.length <= 0}
              >
                Save
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <IconButton
        sx={{
          position: "fixed",
          bottom: 30,
          right: 30,
          backgroundColor: "error.dark",
        }}
      >
        <DeleteOutline />
      </IconButton>
    </Layout>
  );
};
export default EntryPage;
