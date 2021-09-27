import React from "react";

export default function FilterOption({ children }) {
  return (
    <div className="filterOption active">
      <div className="iconBtn">{children}</div>
    </div>
  );
}
