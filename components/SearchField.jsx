import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { charPage } from "../utils/styles";
import { TextField, Box, Typography } from "@mui/material";
import NextLink from "next/link";

//https://rickandmortyapi.com/api/character/?name=

export const SearchField = () => {
  const [dropdown, toggleDropdown] = useState(false);
  const [options, setOptions] = useState([]);
  const [search, setSearch] = useState("");
  const wrapperRef = useRef(null);

  useEffect(async () => {
    let res = null;
    try {
      res = await axios.get(
        `https://rickandmortyapi.com/api/character/?name=${search}`
      );
    } catch (err) {
      res = [];
    }
    if (!res.data) {
      setOptions([]);
    } else {
      setOptions(res.data.results);
    }

    if (search.length === 0) {
      toggleDropdown(false);
    }
  }, [search]);

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const handleClickOutside = (e) => {
    const { current: wrap } = wrapperRef;
    if (wrap && !wrap.contains(e.target)) {
      toggleDropdown(false);
    }
  };

  return (
    <Box position="relative" ref={wrapperRef}>
      <TextField
        id="outlined-basic"
        label="Find character"
        variant="outlined"
        style={{ width: "50vw" }}
        value={search.split(" ").join("")}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        onClick={() => toggleDropdown(!dropdown)}
      />
      {dropdown && (
        <Box
          display="flex"
          flexDirection="column"
          position="absolute"
          bgcolor="white"
          border="1px solid grey"
          borderRadius="0 0 7px 7px"
          width="100%"
        >
          {options.map((o) => (
            <Box
              key={o.id}
              padding="15px"
              border="1px solid rgba(220,220,220, 0.6)"
              style={{ cursor: "pointer" }}
            >
              <NextLink href="/character/[id]" as={`/character/${o.id}`}>
                <Box display="flex" alignItems="center">
                  <img
                    src={o.image}
                    alt={o.name}
                    style={{
                      height: "50px",
                      borderRadius: "7px",
                      marginRight: "12px",
                    }}
                  />
                  <Typography>{o.name}</Typography>
                </Box>
              </NextLink>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};
