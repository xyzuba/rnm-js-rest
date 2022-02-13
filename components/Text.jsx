import React from "react";
import { Typography } from "@mui/material";

const spanStyle = {
  fontSize: 15,
};

export const Text = (props) => {
  return (
    <Typography mt={2} fontSize={22}>
      <span style={spanStyle}>{props.fieldName + ":"} </span> {props.text}
    </Typography>
  );

  //   <Typography fontSize={22} mt={2}>
  //   <span style={spanStyle}>Name: </span>
  //   {char.name}
  // </Typography>
};
