import { useEffect, useRef } from "react";

function useClickAwayListener(ref, onClickAway) {
  useEffect(() => {
    function handleClickAway(e) {
      if (ref.current && e?.target && !ref.current.contains(e?.target)) {
        onClickAway();
      }
    }
    document.addEventListener("mousedown", handleClickAway);
    return () => {
      document.removeEventListener("mousedown", handleClickAway);
    };
  }, [ref]);
}

const ClickAwayListener = ({ onClickAway, children }) => {
  const wrapperRef = useRef(null);
  useClickAwayListener(wrapperRef, onClickAway);
  return <div ref={wrapperRef}>{children}</div>;
};

export default ClickAwayListener;
