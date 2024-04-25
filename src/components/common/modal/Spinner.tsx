"use client";

import { ClipLoader } from "react-spinners";
import classes from "./Spinner.module.scss";

const Spinner = () => {
  return (
    <div className={classes.spinner}>
      <ClipLoader color="#ffffff" size={100} />
    </div>
  );
};

export default Spinner;
