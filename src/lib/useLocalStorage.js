/*global chrome*/

import { useState } from "react";
// import { localMode } from "./constants";
//from useHooks.com, modified by me
export function useLocalStorage(key, initialValue) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      // Get from local storage by key

      //   if (!localMode) {
      // const item = () =>
      //   chrome.storage.local.get([key], (result) => {
      //     if (chrome.runtime.lastError) console.log("Error getting");
      //     console.log(result.key);
      //     // console.log('Retrieved name: ' + result.myKey.name);
      //   });
      // item();
      // console.log(item());
      // return item ? JSON.parse(item) : initialValue;

      //   } else {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
      //   }
      // Parse stored json or if none return initialValue
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });
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
        // if (!localMode) {
        //   chrome.storage.local.set(
        //     { key: JSON.stringify(valueToStore) },
        //     () => {
        //       if (chrome.runtime.lastError) console.log("Error setting");

        //       console.log(key + " set");
        //       console.log(valueToStore);
        //     }
        //   );
        // } else {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
        // }
      }
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };
  return [storedValue, setValue];
}
