// == to open the left side bar
export const SET_LOADER_OPEN = 'SET_LOADER_OPEN';

export const setLoaderOpen = (message) => ({
  type: SET_LOADER_OPEN,
  message,
});

// == to close le left side bar
export const SET_LOADER_CLOSE = 'SET_LOADER_CLOSE';

export const setLoaderClose = () => ({
  type: SET_LOADER_CLOSE,
});
