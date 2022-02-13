import { Box, Typography, Button } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Text } from "../../components/Text";
import { btnStyle, charPage, loading } from "../../utils/styles";

const Character = () => {
  const router = useRouter();

  const routeId = typeof router.query.id !== "undefined" ? router.query.id : -1;

  const [char, setChar] = useState({});
  const [episodes, setEpisodes] = useState([]);
  const [fetched, setFetched] = useState(false);

  const url = `https://rickandmortyapi.com/api/character/${routeId}`;

  useEffect(() => {
    if (routeId !== -1) {
      axios.get(url).then((res) => {
        setChar(res.data);
      });
    }
  }, [routeId]);

  useEffect(async () => {
    if (char.episode) {
      let episodeArr = [];

      for (let index = 0; index < char.episode.length; index++) {
        const element = char.episode[index];

        const ep = await axios.get(element);

        episodeArr.push(ep.data);
      }
      setEpisodes(episodeArr);
      setFetched(true);
    }
  }, [char]);

  return (
    <div style={charPage}>
      <Button variant="text" style={btnStyle} onClick={() => router.back()}>
        Go Back
      </Button>
      {routeId === -1 ? (
        <div style={loading}>Loading...</div>
      ) : (
        <Box
          width="70%"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent={"center"}
        >
          <img src={char.image} />
          <Box>
            <Text text={char.name} fieldName={"Name"} />
            <Text text={char.species} fieldName={"Species"} />
            <Text text={char.gender} fieldName={"Gender"} />
            <Text
              text={char.location && char.location.name}
              fieldName={"Location"}
            />
            <Text text={char.status} fieldName={"Status"} />
            <Text text={char.created} fieldName={"Created"} />
          </Box>
          <Typography fontSize={24} my={2}>
            Episodes:{" "}
          </Typography>
          {fetched ? (
            <Box>
              {episodes.map((e) => (
                <p key={e.id}>
                  {e.episode}
                  {": "}
                  {e.name}
                </p>
              ))}
            </Box>
          ) : (
            <div>Loading...</div>
          )}
        </Box>
      )}
    </div>
  );
};

export default Character;
