import React from "react";
import "./styles.scss";

const NormalButton = (props) => {
  const {
    className = "",
    label = "",
    onClick,
    id,
    type = "button",
    disabled = false,
    rightIcon = "",
  } = props;

  return (
    <>
      <button
        id={id}
        type={type}
        className={`${className}  ${disabled && "cursor-not-allowed"}`}
        onClick={onClick}
        disabled={disabled}
      >
        {label}
        {rightIcon !== "" ? (
          <span className={`btn-right-icon ${rightIcon}`}></span>
        ) : null}
      </button>
    </>
  );
};

export default NormalButton;
