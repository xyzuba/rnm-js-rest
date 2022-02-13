import { Box, Grid, Autocomplete, TextField, Button } from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import NextLink from "next/link";
import axios from "axios";
import { Text } from "../components/Text";
import { LikeCont } from "../components/LikeCont";

export const style = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "4rem",
};

export default function Home() {
  const [chars, setChars] = useState([]);
  const [url, setUrl] = useState("");

  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);

  //https://rickandmortyapi.com/api/character/?name=

  useEffect(async () => {
    let charArr = [];
    const res = await axios.get("https://rickandmortyapi.com/api/character/");

    setUrl(res.data.info.next);

    for (let index = 0; index < res.data.results.length; index++) {
      const element = res.data.results[index];

      charArr.push(element);
    }

    setChars(charArr);
  }, []);

  const fetchMore = useCallback(async () => {
    let charArr = [];
    charArr = chars;

    const res = await axios.get(url);

    for (let index = 0; index < res.data.results.length; index++) {
      const element = res.data.results[index];

      charArr.push(element);
    }

    setUrl(res.data.info.next);
    setChars(charArr);
  }, [url, chars]);

  return (
    <div style={style}>
      <Box
        width={"70%"}
        display="flex"
        flexDirection={"column"}
        alignItems="center"
      >
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={chars && chars.map((c) => c.name)}
          sx={{ width: 500 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Character"
              onClick={() => console.log(params)}
            />
          )}
        />
        <Grid container spacing={4} marginTop={2}>
          {chars.length === 0 ? (
            <div>Loading...</div>
          ) : (
            chars.map((c) => (
              <Grid
                item
                key={c.id}
                textAlign={"center"}
                border={"1px solid grey"}
                borderRadius={4}
                padding={3}
                margin={2}
                width={390}
              >
                <NextLink href={"/character/[id]"} as={`/character/${c.id}`}>
                  <Box style={{ cursor: "pointer" }}>
                    <img src={c.image} />
                    <Text text={c.name} fieldName={"Name: "} />
                    <Text text={c.status} fieldName={"Status: "} />
                  </Box>
                </NextLink>
                <LikeCont />
              </Grid>
            ))
          )}
        </Grid>
        <Button variant="contained" onClick={() => fetchMore()}>
          Load More
        </Button>
      </Box>
    </div>
  );
}
