import React from "react";
import { Button } from "antd";

const AntButton = ({ children, onClick, type }) => {
  return (
    <Button type={type} onClick={onClick}>
      {children}
    </Button>
  );
};

export default AntButton;
