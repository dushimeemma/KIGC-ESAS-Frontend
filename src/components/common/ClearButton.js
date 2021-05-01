import React from "react";
import { Button } from "reactstrap";

const ClearButton = ({ action }) => {
  return (
    <div className="clear">
      <Button onClick={() => action()} color="danger">
        Clear all Records
      </Button>
    </div>
  );
};

export default ClearButton;
