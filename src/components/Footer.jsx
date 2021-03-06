import React from "react";
import { Typography, Link } from "@material-ui/core";

export default function Footer() {
  return (
    <div
      style={{
        left: 0,
        bottom: 0,
        textAlign: "center",
        margin: "1rem",
      }}
    >
      <Typography>
        Made with{" "}
        <span role="img" aria-label="blue heart">
          💙
        </span>{" "}
        and {"</>"} by
        <Link href="https://abdulrashid.dev" target="_blank">
          <Typography display="inline" color="secondary" component="span">
            {" "}
            Abdul Rashid
          </Typography>
        </Link>
      </Typography>
      <Typography color="textSecondary" variant="caption">
        Copyright &copy; 2020 All rights reserved{" "}
      </Typography>
    </div>
  );
}
