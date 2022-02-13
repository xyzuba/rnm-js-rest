import { Button, Box, Grid, Autocomplete, TextField } from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import NextLink from "next/link";
import axios from "axios";
import { Text } from "../components/Text";
import { btnStyle, charPage, loading } from "../../styles/styles";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";

export default function Home() {
  const [chars, setChars] = useState([]);
  const [url, setUrl] = useState("");

  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);

  const [likedChars, setLikeChars] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("liked")) {
      setLikeChars(JSON.parse(localStorage.getItem("liked")));
    } else {
      localStorage.setItem("liked", []);
    }
  }, []);

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
    <div style={charPage}>
      <NextLink href="/liked">
        <Button variant="text" style={btnStyle}>
          Liked
        </Button>
      </NextLink>
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
            <div style={loading}>Loading...</div>
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
                <Box
                  height={"2rem"}
                  width="100%"
                  display="flex"
                  alignItems="center"
                  justifyContent="space-around"
                  borderTop="1px solid grey"
                  paddingTop={"1rem"}
                  marginTop={"1rem"}
                >
                  <Box
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      let localState = likedChars;
                      setLike(!like);
                      setDislike(false);
                      localState.push(c.id);
                      localStorage.setItem("liked", JSON.stringify(localState));
                      setLikeChars(localState);
                    }}
                  >
                    {likedChars.includes(c.id) ? (
                      <ThumbUpAltIcon />
                    ) : (
                      <ThumbUpOffAltIcon />
                    )}
                  </Box>
                  <Box
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      let localState = likedChars.filter((e) => e !== c.id);
                      localStorage.setItem("liked", JSON.stringify(localState));
                      setLikeChars(localState);
                    }}
                  >
                    {dislike ? <ThumbDownAltIcon /> : <ThumbDownOffAltIcon />}
                  </Box>
                </Box>
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
