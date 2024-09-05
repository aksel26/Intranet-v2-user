"use client";

import React from "react";

const Background = () => {
  return (
    <div
      style={{
        position: "fixed",
        right: 0,
        bottom: 0,
        minWidth: "100%",
        minHeight: "100%",
        width: "auto",
        height: "auto",
        zIndex: -1,
      }}
    ></div>
  );
};

export default Background;
