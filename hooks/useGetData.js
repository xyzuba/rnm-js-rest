import React, { useEffect } from "react";
import axios from "axios";

export const useGetData = (url, setState) => {
  useEffect(() => {
    axios.get(url).then((res) => setState(res.data));
  }, []);
};
