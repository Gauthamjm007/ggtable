import React from "react";

export default function FilterOption({
  children,
  onClick,
  active,
  notAllowed,
}) {
  return (
    <div
      className={`filterOption ${active ? "active" : ""} ${
        notAllowed ? "notAllowed" : ""
      }`}
      onClick={onClick}
    >
      <div className="iconBtn">{children}</div>
    </div>
  );
}
