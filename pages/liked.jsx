import axios from "axios";
import React, { useEffect, useState } from "react";
import { Box, Grid, Button } from "@mui/material";
import { Text } from "../components/Text";
import NextLink from "next/link";
import { useRouter } from "next/router";

export const style = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "4rem",
};
const btnStyle = {
  position: "absolute",
  top: "5%",
  left: "5%",
};
const loading = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  fontSize: "25px",
};

const liked = () => {
  const router = useRouter();
  const [liked, setLiked] = useState("");
  const [chars, setChars] = useState([]);

  useEffect(() => {
    setLiked(localStorage.getItem("liked"));
  }, []);

  useEffect(() => {
    if (liked.length > 2) {
      axios
        .get(`https://rickandmortyapi.com/api/character/${liked}`)
        .then((res) => {
          console.log(res.data);
          setChars(res.data);
        });
    }
    // console.log(chars);
  }, [liked]);
  //   console.log(liked);
  //   if (typeof window !== "undefined") {
  //     arrId = JSON.parse(localStorage.getItem("liked"));
  //   }

  return (
    <div style={style}>
      <Button variant="text" style={btnStyle} onClick={() => router.back()}>
        Go Back
      </Button>
      <Grid container spacing={4} marginTop={2}>
        {chars.length === 0 ? (
          <div style={loading}>You haven't liked any characters</div>
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
            </Grid>
          ))
        )}
      </Grid>
    </div>
  );
};

export default liked;
