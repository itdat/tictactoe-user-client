/* import React from 'react';

export default function useStateWithLocalStorage(localStorageKey) {
  // console.log(localStorage.getItem(localStorageKey) || '..Chua co');

  const [value, setValue] = React.useState(
    localStorage.getItem(localStorageKey) || ''
  );

  React.useEffect(() => {
    // console.log("..Kich hoat useEffect");
    localStorage.setItem(localStorageKey, value);
    // console.log(localStorage.getItem(localStorageKey) || '');
  }, [value]);

  return [value, setValue];
}; */