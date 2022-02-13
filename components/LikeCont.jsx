import { Box } from "@mui/material";
import React, { useState } from "react";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";

export const LikeCont = () => {
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);

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
        }}
      >
        {like ? <ThumbUpAltIcon /> : <ThumbUpOffAltIcon />}
      </Box>
      <Box
        style={{ cursor: "pointer" }}
        onClick={() => {
          setDislike(!dislike);
          setLike(false);
        }}
      >
        {dislike ? <ThumbDownAltIcon /> : <ThumbDownOffAltIcon />}
      </Box>
    </Box>
  );
};
