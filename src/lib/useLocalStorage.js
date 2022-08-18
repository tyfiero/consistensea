import { useEffect, useRef, useState } from "react";
//from useHooks.com, modified by me
export function useLocalStorage(key, initialValue, windowFocused = null) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });
  //ref to prevent updating on first render
  const firstRender = useRef(true);

  //This useEffect will update the state every time the window is focused or unfocused. This is a fix to an issue where a user would complete a habit on one tab, then a return to an earlier tab would not display the change. NOTE: This does cause more renders, due to the useWindowFocus() hook, it's a small performance hit, but it is not a big deal in my eyes. It still is very fast.
  useEffect(() => {
    //I set windowFocused to null as the default parameter, and passed the useWindow focus hook to the  "CSHabits" useLocalStorage() from Habits.js, that way only "CSHabits" will use the useWindowFocus() hook.I had it set up initially to have the useWindowFocus hook here in this useLocalStorage() hook, but it caused unnecessary renders.
    if (windowFocused === null) return;
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (
      windowFocused &&
      JSON.stringify(storedValue) !== window.localStorage.getItem(key)
    ) {
      if (typeof window === "undefined") {
        setStoredValue(initialValue);
      }
      try {
        const item = window.localStorage.getItem(key);
        setStoredValue(item ? JSON.parse(item) : initialValue);
      } catch (error) {
        console.log(error);
        setStoredValue(initialValue);
      }
    }
  }, [windowFocused]);

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage or chrome storage
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };
  return [storedValue, setValue];
}
