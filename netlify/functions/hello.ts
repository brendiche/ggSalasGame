import { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';
import { NetlifyAPI } from 'netlify';

const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  const client: any = new NetlifyAPI(process.env.sites, {});
  const sites = await client.listSites();
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello World', sites: sites }),
  };
};

export { handler };
