(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const grid = document.querySelector('.project-grid');
  const updateFocusLinks = mode => {
    document.querySelectorAll('a[href]').forEach(link => {
      if (link.getAttribute('href').startsWith('#')) return;
      const url = new URL(link.href);
      if (url.origin !== location.origin || !url.pathname.endsWith('.html')) return;
      if (mode === 'product') url.searchParams.set('focus', 'product');
      else url.searchParams.delete('focus');
      link.href = url.pathname + url.search + url.hash;
    });
  };
  const setFocus = (focus, updateURL = true) => {
    const mode = focus === 'product' ? 'product' : 'engineering';
    updateFocusLinks(mode);
    if (!grid) return;
    document.querySelectorAll('[data-lens]').forEach(item => item.setAttribute('aria-pressed', String(item.dataset.lens === mode)));
    document.querySelectorAll('.lens-copy').forEach(item => item.textContent = item.dataset[mode]);
    [...grid.querySelectorAll('[data-project]')].sort((a, b) => Number(a.dataset[mode === 'product' ? 'orderProduct' : 'orderEngineering']) - Number(b.dataset[mode === 'product' ? 'orderProduct' : 'orderEngineering'])).forEach(item => {
      item.hidden = !['both', mode].includes(item.dataset.visible);
      grid.append(item);
    });
    const resume = document.getElementById('primaryResume');
    resume.href = mode === 'product' ? 'resumes/sizhang-xu-ai-product.pdf' : 'resumes/sizhang-xu-fullstack.pdf';
    resume.textContent = mode === 'product' ? 'Product resume' : 'Engineering resume';
    if (updateURL) {
      const url = new URL(location.href);
      if (mode === 'product') url.searchParams.set('focus', 'product'); else url.searchParams.delete('focus');
      history.replaceState(null, '', url);
    }
  };
  document.querySelectorAll('[data-lens]').forEach(button => button.addEventListener('click', () => setFocus(button.dataset.lens)));
  setFocus(new URLSearchParams(location.search).get('focus'), false);
  const dialog = document.querySelector('.gallery-dialog');
  if (dialog) {
    let pages = [], index = 0, title = '', opener = null;
    const render = () => {
      document.getElementById('galleryImage').src = pages[index];
      document.getElementById('galleryFullSize').href = pages[index];
      document.getElementById('galleryImage').alt = `${title}, original portfolio page ${index + 1}`;
      document.getElementById('galleryStatus').textContent = `${index + 1} / ${pages.length}`;
      document.getElementById('galleryTitle').textContent = title;
    };
    const change = delta => { index = (index + delta + pages.length) % pages.length; render(); };
    document.querySelectorAll('[data-gallery]').forEach(button => {
      const img = button.querySelector('img'), slides = img.dataset.slides.split(',');
      button.addEventListener('click', () => {
        opener = button; pages = slides; index = 0; title = button.querySelector('strong').textContent;
        render(); dialog.showModal(); document.body.style.overflow = 'hidden';
      });
    });
    dialog.querySelector('[data-gallery-close]').addEventListener('click', () => dialog.close());
    dialog.querySelector('[data-gallery-prev]').addEventListener('click', () => change(-1));
    dialog.querySelector('[data-gallery-next]').addEventListener('click', () => change(1));
    dialog.addEventListener('close', () => { document.body.style.overflow = ''; opener?.focus({preventScroll: true}); });
    dialog.addEventListener('keydown', event => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); change(event.key === 'ArrowRight' ? 1 : -1); }
    });
    dialog.addEventListener('click', event => {
      if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); }
    });
  }
  const next = document.getElementById('simNext');
  if (next) {
    let state = 0;
    const steps = [
      ['The controller waits for the configured signal conditions.', 'Simulate a signal'],
      ['A configured trigger condition is met. The controller checks whether intervention is allowed and the cooldown has elapsed.', 'Start playback'],
      ['The selected sound strategy runs. The application records the intervention event alongside the signal context.', 'Finish playback'],
      ['Playback has finished. The controller observes the following signal window and retains it for session review.', 'Finish observation'],
      ['A cooldown prevents another immediate intervention. When it expires, the controller can accept a new trigger.', 'Return to idle']
    ];
    const render = () => {
      document.querySelectorAll('[data-state]').forEach(item => item.classList.toggle('active', Number(item.dataset.state) === state));
      document.getElementById('simText').textContent = steps[state][0]; next.textContent = steps[state][1];
    };
    next.addEventListener('click', () => { state = (state + 1) % steps.length; render(); });
    document.getElementById('simReset').addEventListener('click', () => { state = 0; render(); });
  }
})();
