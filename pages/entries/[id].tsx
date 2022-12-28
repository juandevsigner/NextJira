import React, { ChangeEvent, FC, useContext, useMemo, useState } from "react";
import { GetServerSideProps } from "next";
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
import { Entry, EntryStatus } from "../../interfaces";
import { dbEntries } from "../../database";
import { EntriesContext } from "../../context";
import { useRouter } from "next/router";
import { dateFunctions } from "../../utils";

const validStatus: EntryStatus[] = ["pending", "in-progress", "finished"];

interface Props {
  entry: Entry;
}

const EntryPage: FC<Props> = ({ entry }) => {
  const [inputValue, setInputValue] = useState(entry.description);
  const [status, setStatus] = useState<EntryStatus>(entry.status);
  const [touched, setTouched] = useState(false);
  const { updateEntry } = useContext(EntriesContext);
  const router = useRouter();

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
    if (inputValue.trim().length < 0) return;
    const updatedEntry: Entry = {
      ...entry,
      status,
      description: inputValue,
    };

    updateEntry(updatedEntry, true);
    setTimeout(() => {
      router.push("/");
    }, 1000);
  };

  return (
    <Layout title={inputValue.substring(0, 20) + "..."}>
      <Grid container sx={{ marginTop: 2 }} justifyContent="center">
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader
              title={`Entrada:`}
              subheader={dateFunctions.getFormatdDistaceToNow(entry.createdAt)}
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

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };
  const entry = await dbEntries.getEntryById(id);

  if (!entry) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: { entry },
  };
};

export default EntryPage;
