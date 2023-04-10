export const showForm = () => {
  const form = document.getElementsByTagName('form').item(0);
  form.removeAttribute('hidden');
  form.style.display = 'grid';
};

const GET_MESSAGE_URL = '.netlify/functions/getGoldenBookMessages';

export const getMessages = async (): Promise<any[]> => {
  let baseUrl: string;
  if (window.location.hostname.includes('localhost')) {
    baseUrl = 'http://localhost:8888';
  } else {
    baseUrl = window.location.origin;
  }
  try {
    const request = await fetch(`${baseUrl}/${GET_MESSAGE_URL}`);
    const data = await request.json(); // TODO type this data
    const messages = data.goldenBook;
    console.log(messages);
    return messages;
  } catch (error) {
    console.error(error);
  }
};
