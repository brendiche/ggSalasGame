require('@netlify/open-api')
const netlifyPromise =  import('netlify');

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
};

exports.handler = async function () {
  return netlifyPromise.then(async (netlify) => {
    const client = new netlify.NetlifyAPI(process.env.API_ACCESS_TOKEN);
    try {
      const sub = await client.listFormSubmissions({form_id:process.env.FORM_ID});
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          goldenBook: sub,
        })}
    } catch (error) {
      console.error(error);
      return {
        statusCode: 500
      }
    }
  })
};