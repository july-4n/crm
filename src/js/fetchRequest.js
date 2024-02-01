export const address = 'https://rambunctious-gem-snowshoe.glitch.me';

const fetchRequest = async (url, {
  method = 'GET',
  callback,
  body,
  headers,
}) => {
  try {
    const options = {
      method,
    };

    if (body) options.body = JSON.stringify(body);
    if (headers) options.headers = headers;

    const response = await fetch(`${address}${url}`, options);

    if (response.ok) {
      const data = await response.json();
      if (callback) return callback(null, data);
      return;
    }

    throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
  } catch (err) {
    if (err.message.includes('404') || err.message.includes('422') || err.message.includes('500')) {
      callback(err.message);
      return;
    }
    callback('Что-то пошло не так');
  }
};

export default fetchRequest;
