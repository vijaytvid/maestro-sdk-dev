const defaultOptions = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

const fetchInstance = function (url, options = {}) {
  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  return fetch(url, mergedOptions).then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  });
};
