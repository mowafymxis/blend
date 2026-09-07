(() => {
  'use strict';
  const section = document.querySelector('.assembly');
  const stage = section.querySelector('.stage');
  const object = section.querySelector('.object');
  const layers = [...section.querySelectorAll('.layer')];
  const mascot = document.querySelector('#mascot');
  const button = document.querySelector('#greet');
  const status = document.querySelector('#greeting');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const roomy = matchMedia('(min-width: 761px) and (min-height: 601px)');
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  const controller = new AbortController();
  const signal = controller.signal;
  const clamp = value => Math.max(0, Math.min(1, value));
  const phase = (p, a, b) => clamp((p - a) / (b - a));
  const smooth = t => t * t * (3 - 2 * t);
  let frame = 0, timer = 0, top = 0, distance = 1;
  let enhanced = false, active = true, hovered = false, focused = false, destroyed = false;
  function render() {
    frame = 0;
    if (!enhanced || !active || document.hidden || destroyed) return;
    const p = clamp((scrollY - top) / distance);
    const gather = smooth(phase(p, 0, .35));
    const turn = smooth(phase(p, .35, .75));
    const settle = smooth(phase(p, .75, 1));
    object.style.transform = `rotateX(${18 - 6 * settle}deg) rotateY(${-34 + 65 * turn - 18 * settle}deg) rotateZ(${-10 + 10 * gather - 5 * settle}deg)`;
    layers.forEach((layer, i) => {
      const z = (i - 2) * 22 + (i - 1) * 125 * (1 - gather);
      layer.style.transform = `translate3d(${(i - 1) * 32 * (1 - gather)}px,${(i - 1) * 24 * (1 - gather)}px,${z}px)`;
    });
  }
  function schedule() {
    if (!frame && enhanced && active && !document.hidden && !destroyed) frame = requestAnimationFrame(render);
  }
  function measure() {
    if (destroyed) return;
    enhanced = !reduce.matches && roomy.matches;
    section.classList.toggle('is-enhanced', enhanced);
    top = section.getBoundingClientRect().top + scrollY;
    distance = Math.max(1, section.offsetHeight - stage.offsetHeight);
    if (!enhanced) {
      cancelAnimationFrame(frame); frame = 0;
      object.style.removeProperty('transform');
      layers.forEach(layer => layer.style.removeProperty('transform'));
    } else schedule();
  }
  function rest() { mascot.dataset.state = hovered || focused ? 'notice' : 'idle'; }
  function attention() { if (mascot.dataset.state !== 'hello') rest(); }
  function greet() {
    clearTimeout(timer);
    // Repeated activation extends the response without queuing another animation.
    mascot.dataset.state = 'hello';
    status.textContent = 'Hello from Pip.';
    timer = setTimeout(rest, reduce.matches ? 250 : 700);
  }
  const observer = new IntersectionObserver(entries => {
    active = entries[0].isIntersecting;
    if (active) schedule();
    else { cancelAnimationFrame(frame); frame = 0; }
  }, { rootMargin: '100px' });
  const sizes = new ResizeObserver(measure);
  const on = (target, name, fn, options = {}) => target.addEventListener(name, fn, { ...options, signal });
  on(window, 'scroll', schedule, { passive: true });
  on(window, 'resize', measure, { passive: true });
  on(reduce, 'change', () => { clearTimeout(timer); rest(); measure(); });
  on(roomy, 'change', measure);
  on(fine, 'change', () => { hovered = false; attention(); });
  on(button, 'pointerenter', () => { hovered = fine.matches; attention(); });
  on(button, 'pointerleave', () => { hovered = false; attention(); });
  on(button, 'focus', () => { focused = true; attention(); });
  on(button, 'blur', () => { focused = false; attention(); });
  on(button, 'click', greet);
  on(document, 'visibilitychange', () => {
    if (document.hidden) { cancelAnimationFrame(frame); frame = 0; clearTimeout(timer); rest(); }
    else measure();
  });
  on(window, 'pageshow', measure);
  function destroy() {
    destroyed = true;
    controller.abort(); observer.disconnect(); sizes.disconnect();
    clearTimeout(timer); cancelAnimationFrame(frame);
    section.classList.remove('is-enhanced');
    object.style.removeProperty('transform');
    layers.forEach(layer => layer.style.removeProperty('transform'));
    mascot.dataset.state = 'idle'; button.disabled = true;
  }
  // bfcache keeps the document; pageshow refreshes restored geometry.
  on(window, 'pagehide', event => { if (!event.persisted) destroy(); });
  observer.observe(section); sizes.observe(document.body); sizes.observe(stage);
  document.fonts.ready.then(() => { if (!destroyed) measure(); });
  measure(); button.disabled = false;
})();
