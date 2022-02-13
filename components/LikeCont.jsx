import { Box } from "@mui/material";
import React, { useState } from "react";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";

export const LikeCont = (props) => {
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);

  let localState = [];

  localState =
    typeof localStorage !== "undefined"
      ? JSON.parse(localStorage.getItem("liked"))
      : [];

  const likeFunc = (arr, id) => arr.push(id);
  const dislikeFunc = (arr, id) => arr.filter(id);

  return (
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
          setLike(!like);
          setDislike(false);
          likeFunc(props.arr, props.id);
        }}
      >
        {like ? <ThumbUpAltIcon /> : <ThumbUpOffAltIcon />}
      </Box>
      <Box
        style={{ cursor: "pointer" }}
        onClick={() => {
          setDislike(!dislike);
          setLike(false);
          dislikeFunc(props.arr, props.id);
        }}
      >
        {dislike ? <ThumbDownAltIcon /> : <ThumbDownOffAltIcon />}
      </Box>
    </Box>
  );
};
