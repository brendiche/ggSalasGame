export const showForm = () => {
  const form = document.getElementsByTagName('form').item(0);
  form.removeAttribute('hidden');
  form.style.display = 'grid';
};
