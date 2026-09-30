const button = document.getElementById('theme');
const root = document.documentElement;
const preference = window.matchMedia('(prefers-color-scheme: dark)');
let manualTheme = null;
try { manualTheme = localStorage.getItem('theme'); } catch {}
if (manualTheme === 'light' || manualTheme === 'dark') root.dataset.theme = manualTheme;
function isDark() { return root.dataset.theme ? root.dataset.theme === 'dark' : preference.matches; }
function updateLabel() {
  const next = isDark() ? 'Light' : 'Dark';
  button.textContent = `${next} mode`;
  button.setAttribute('aria-label', `Switch to ${next.toLowerCase()} mode`);
}
button.addEventListener('click', () => {
  root.dataset.theme = isDark() ? 'light' : 'dark';
  try { localStorage.setItem('theme', root.dataset.theme); } catch {}
  updateLabel();
});
preference.addEventListener('change', updateLabel);
updateLabel();
