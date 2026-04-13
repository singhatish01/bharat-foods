function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const success = document.getElementById('formSuccess');
  form.querySelectorAll('input, textarea, button').forEach(el => el.disabled = true);
  success.classList.add('visible');
  setTimeout(() => {
    form.reset();
    form.querySelectorAll('input, textarea, button').forEach(el => el.disabled = false);
    success.classList.remove('visible');
  }, 4000);
}
