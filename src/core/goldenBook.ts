export class GoldenBook {
  createForm() {
    const form = document.createElement('form');
    form.style.color = 'white';
    form.name = 'goldenBook';
    form.method = 'POST';
    form.setAttribute('data-netlify', 'true');
    const nameLabel = document.createElement('label');
    nameLabel.appendChild(document.createTextNode('Nom : '));
    const nameInput = document.createElement('input');
    nameInput.style.color = 'white';
    nameInput.name = 'name';
    nameInput.type = 'text';
    nameLabel.appendChild(nameInput);
    const submit = document.createElement('button');
    submit.type = 'submit';
    submit.appendChild(document.createTextNode('Envoyer'));
    form.appendChild(nameLabel);
    form.appendChild(submit);
    document.body.appendChild(form);
  }
}
