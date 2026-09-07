const mixes = [...document.querySelectorAll('.mix')];
const search = document.querySelector('#search');
let genre = 'all';
let view = 'all';
function filterMixes() {
  let count = 0;
  mixes.forEach(mix => {
    const matches = (genre === 'all' || mix.dataset.genre === genre)
      && (view === 'all' || mix.querySelector('.save').getAttribute('aria-pressed') === 'true')
      && mix.dataset.title.toLowerCase().includes(search.value.toLowerCase().trim());
    mix.hidden = !matches;
    if (matches) count++;
  });
  document.querySelector('.empty').hidden = count !== 0;
  document.querySelector('#result-count').textContent = `${count} ${count === 1 ? 'mix' : 'mixes'}`;
}
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  genre = button.dataset.filter;
  document.querySelectorAll('[data-filter]').forEach(item => {
    item.classList.toggle('selected', item === button);
    item.setAttribute('aria-pressed', String(item === button));
  });
  filterMixes();
}));
document.querySelectorAll('[data-view]').forEach(button => button.addEventListener('click', () => {
  view = button.dataset.view;
  document.querySelectorAll('[data-view]').forEach(item => {
    item.classList.toggle('active', item === button);
    item.setAttribute('aria-pressed', String(item === button));
  });
  document.querySelector('#library-title').textContent = view === 'saved' ? 'Your saved mixes' : 'A mood for every moment';
  filterMixes();
}));
document.querySelectorAll('.save').forEach(button => button.addEventListener('click', () => {
  const saved = button.getAttribute('aria-pressed') !== 'true';
  button.setAttribute('aria-pressed', String(saved));
  button.textContent = saved ? '✓' : '＋';
  const title = button.closest('.mix').dataset.title;
  button.setAttribute('aria-label', `${saved ? 'Unsave' : 'Save'} ${title}`);
  document.querySelector('#saved-count').textContent = document.querySelectorAll('.save[aria-pressed=true]').length;
  document.querySelector('#status').textContent = `${title} ${saved ? 'saved' : 'removed'}.`;
  filterMixes();
}));
search.addEventListener('input', filterMixes);
document.addEventListener('keydown', event => {
  if (event.key === '/' && !event.ctrlKey && !event.metaKey && !['INPUT','TEXTAREA'].includes(document.activeElement.tagName)) {
    event.preventDefault(); search.focus();
  }
});

// Original, bounded synth sketches. No recordings, remote audio, or autoplay.
const titles = ['Somewhere after hours', 'Soft landing', 'In rotation', 'Blue room', 'Open air'];
const chords = [[130.81,164.81,196,246.94],[146.83,174.61,220,261.63],[110,164.81,220,329.63],[130.81,155.56,196,233.08],[174.61,220,261.63,349.23]];
let audioContext, nodes = [], frame = 0, start = 0, playing = false, requestId = 0;
const stopButton = document.querySelector('#stop');
function stopAudio(announce = true) {
  requestId++;
  cancelAnimationFrame(frame);
  nodes.forEach(({oscillator,gain}) => { try { oscillator.stop(); } catch {} oscillator.disconnect(); gain.disconnect(); });
  nodes = []; playing = false; stopButton.disabled = true;
  document.querySelector('.progress').style.width = '0%';
  document.querySelector('#time').textContent = '0:00 / 0:08';
  if (announce) { document.querySelector('#now-sub').textContent = 'Preview stopped'; document.querySelector('#status').textContent = 'Preview stopped.'; }
}
function tick() {
  if (!playing) return;
  const elapsed = audioContext.currentTime - start;
  if (elapsed >= 8) { stopAudio(false); document.querySelector('#now-sub').textContent = 'Sketch complete'; return; }
  document.querySelector('.progress').style.width = `${elapsed / 8 * 100}%`;
  document.querySelector('#time').textContent = `0:0${Math.floor(elapsed)} / 0:08`;
  frame = requestAnimationFrame(tick);
}
async function preview(index) {
  stopAudio(false);
  const thisRequest = requestId;
  try {
    audioContext ||= new AudioContext();
    await audioContext.resume();
    if (thisRequest !== requestId || document.hidden) return;
    start = audioContext.currentTime;
    chords[index].forEach((frequency, i) => {
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      oscillator.type = 'sine'; oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(0, start);
      gain.gain.linearRampToValueAtTime(.035, start + .4 + i * .12);
      gain.gain.setValueAtTime(.035, start + 6.4);
      gain.gain.linearRampToValueAtTime(0, start + 8);
      oscillator.connect(gain); gain.connect(audioContext.destination);
      oscillator.start(start); oscillator.stop(start + 8);
      nodes.push({oscillator, gain});
    });
    playing = true; stopButton.disabled = false;
    document.querySelector('#now-title').textContent = titles[index];
    document.querySelector('#now-sub').textContent = 'Playing an original synth sketch';
    document.querySelector('#status').textContent = `Playing ${titles[index]}.`;
    tick();
  } catch {
    stopAudio(false);
    document.querySelector('#now-sub').textContent = 'Audio preview unavailable in this browser';
    document.querySelector('#status').textContent = 'Audio preview unavailable.';
  }
}
document.querySelectorAll('[data-preview]').forEach(button => button.addEventListener('click', () => preview(Number(button.dataset.preview))));
stopButton.addEventListener('click', () => stopAudio());
document.addEventListener('visibilitychange', () => { if (document.hidden) { stopAudio(false); if (audioContext) audioContext.suspend(); } });
window.addEventListener('pagehide', () => { stopAudio(false); if (audioContext) audioContext.suspend(); });
