const netlifyPromise =  import('netlify');

exports.handler = async function () {
  return netlifyPromise.then(async (netlify) => {
    const client = new netlify.NetlifyAPI(process.env.API_ACCESS_TOKEN);
    try {
      const sub = await client.listFormSubmissions({form_id:process.env.FORM_ID});
      return {
        statusCode: 200,
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