// A custom hook for debouncing click events in React applications.

// Debouncing is a technique used to improve the performance of an application
// by limiting the rate at which a function is executed. In the context of click events,
// debouncing can help to reduce the number of API calls made in response to rapid or repetitive
// user interactions, such as multiple clicks on a button.

// This hook makes it easy to debounce click events in your React components, by
// wrapping your event handler in a debounced function and returning it for use with the onClick prop.
//  The hook uses the setTimeout API to wait for a specified time period after the last click
//  before executing the handler, and it clears the timeout whenever a new click occurs, resetting the countdown.

import { useLayoutEffect, useState } from "react";

export const DEFAULT_DEBOUNCE_TIME = 500;

type useDebounceProps = {
  callback: () => unknown;
  debounceTime?: number;
};

export const useDebounce = ({
  callback,
  debounceTime = DEFAULT_DEBOUNCE_TIME,
}: useDebounceProps) => {
  const [debouncing, setDebouncing] = useState(false);
  useLayoutEffect(() => {
    if (debouncing) {
      const timeout = setTimeout(() => {
        setDebouncing(false);
        callback();
      }, debounceTime);
      return () => clearTimeout(timeout);
    }
  }, [debouncing, callback, debounceTime]);
  return () => setDebouncing(true);
};

// Example of how you can use it with any click-events

import React from "react";
import { useDebounce } from "./useDebounce";

function App() {

  const onclick = () => {
    dispatch(makesomeApiCall({ id: "abc" }));
  };
  const debouncedGetVersions = useDebounce({ callback: onclick, debounceTime:300 });

  return <button onClick={debouncedGetVersions}>Click me</button>;
}
