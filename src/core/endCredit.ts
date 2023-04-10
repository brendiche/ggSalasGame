import '../assets/endCredit.css';
import { getMessages } from './goldenBook';
export class EndCredit {
  async display() {
    const wrapper = document.createElement('div');
    wrapper.className = 'wrapper';
    const movie = document.createElement('div');
    movie.className = 'movie';
    movie.appendChild(document.createTextNode('THE END'));
    wrapper.appendChild(movie);

    const messages: any[] = await getMessages();
    messages.forEach((message) => {
      const job = document.createElement('div');
      job.className = 'job';
      job.appendChild(document.createTextNode(message.data.name));
      wrapper.appendChild(job);
      const name = document.createElement('div');
      name.className = 'name';
      name.appendChild(document.createTextNode(message.data.message));
      wrapper.appendChild(name);
    });
    document.body.append(wrapper);
  }
}
