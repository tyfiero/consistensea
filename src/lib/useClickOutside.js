import React from "react";

export function useClickOutside(elRef, callback) {
  const callbackRef = React.useRef();
  callbackRef.current = callback;

  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if (!elRef?.current?.contains(e.target) && callbackRef.current)
        callbackRef.current(e);
    };

    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [callbackRef, elRef]);
}
