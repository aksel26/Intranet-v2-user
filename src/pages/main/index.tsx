import { Button } from "@mantine/core";
import React from "react";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();
  return (
    <div>
      Main<Button onClick={() => navigate("/approval")}>asdfasf</Button>
    </div>
  );
};

export default Main;
