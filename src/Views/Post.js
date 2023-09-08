import React from "react";
import { useParams } from "react-router-dom";
import { Home } from "./Home";

export function Post({}) {
  let { id } = useParams();
  return (
    <div>
      <p>{id}</p>
    </div>
  );
}
