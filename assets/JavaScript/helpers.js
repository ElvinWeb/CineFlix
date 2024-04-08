export const addEventOnElements = function (elements, eventType, callback) {
  for (const elem of elements) elem.addEventListener(eventType, callback);
};

export const fetchDataFromServer = function (url, callback, optionalParam) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => callback(data, optionalParam));
};
