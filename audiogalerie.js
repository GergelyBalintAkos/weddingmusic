(function () {
  'use strict';

  const items    = Array.from(document.querySelectorAll('.track-item'));
  const playerBar  = document.getElementById('playerBar');
  const playerTitle  = document.getElementById('playerTitle');
  const playerArtist = document.getElementById('playerArtist');
  const playerPrev   = document.getElementById('playerPrev');
  const playerNext   = document.getElementById('playerNext');
  const playerBtn    = document.getElementById('playerPlayPause');
  const progressBar  = document.getElementById('progressBar');
  const progressFill = document.getElementById('progressFill');
  const playerTime   = document.getElementById('playerTime');
  const playerDur    = document.getElementById('playerDuration');

  let currentIndex = -1;
  let currentAudio = null;

  function fmt(sec) {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return m + ':' + (s < 10 ? '0' : '') + s;
  }

  function setPlayIcon(el, playing) {
    el.querySelector('.icon-play').classList.toggle('hidden', playing);
    el.querySelector('.icon-pause').classList.toggle('hidden', !playing);
  }

  function deactivateAll() {
    items.forEach(function (item) {
      item.classList.remove('is-active');
      setPlayIcon(item.querySelector('.track-play-btn'), false);
    });
  }

  function loadTrack(index) {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }

    deactivateAll();
    currentIndex = index;
    const item  = items[index];
    currentAudio = item.querySelector('audio');

    item.classList.add('is-active');

    playerTitle.textContent  = item.querySelector('.track-title').textContent.trim();
    playerArtist.textContent = item.querySelector('.track-artist').textContent.trim();
    playerBar.classList.add('visible');
    playerBar.removeAttribute('aria-hidden');

    currentAudio.addEventListener('timeupdate', onTimeUpdate);
    currentAudio.addEventListener('loadedmetadata', onMeta);
    currentAudio.addEventListener('ended', onEnded);
  }

  function playTrack(index) {
    if (index === currentIndex && currentAudio) {
      currentAudio.play();
      setPlayIcon(playerBtn, true);
      setPlayIcon(items[index].querySelector('.track-play-btn'), true);
      return;
    }
    loadTrack(index);
    currentAudio.play();
    setPlayIcon(playerBtn, true);
    setPlayIcon(items[index].querySelector('.track-play-btn'), true);
  }

  function pauseTrack() {
    if (!currentAudio) return;
    currentAudio.pause();
    setPlayIcon(playerBtn, false);
    if (currentIndex >= 0) {
      setPlayIcon(items[currentIndex].querySelector('.track-play-btn'), false);
    }
  }

  function onTimeUpdate() {
    if (!currentAudio.duration) return;
    const pct = (currentAudio.currentTime / currentAudio.duration) * 100;
    progressFill.style.width = pct + '%';
    playerTime.textContent = fmt(currentAudio.currentTime);
  }

  function onMeta() {
    playerDur.textContent = fmt(currentAudio.duration);
  }

  function onEnded() {
    setPlayIcon(playerBtn, false);
    if (currentIndex >= 0) {
      setPlayIcon(items[currentIndex].querySelector('.track-play-btn'), false);
    }
    const next = (currentIndex + 1) % items.length;
    playTrack(next);
  }

  /* --- Track row clicks --- */
  items.forEach(function (item, idx) {
    const btn = item.querySelector('.track-play-btn');

    item.addEventListener('click', function (e) {
      if (e.target.closest('.track-play-btn')) return;
      if (idx === currentIndex && currentAudio && !currentAudio.paused) {
        pauseTrack();
      } else {
        playTrack(idx);
      }
    });

    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      if (idx === currentIndex && currentAudio && !currentAudio.paused) {
        pauseTrack();
      } else {
        playTrack(idx);
      }
    });
  });

  /* --- Player bar controls --- */
  playerBtn.addEventListener('click', function () {
    if (currentIndex < 0) { playTrack(0); return; }
    if (currentAudio.paused) { playTrack(currentIndex); } else { pauseTrack(); }
  });

  playerPrev.addEventListener('click', function () {
    const prev = (currentIndex - 1 + items.length) % items.length;
    playTrack(prev);
  });

  playerNext.addEventListener('click', function () {
    const next = (currentIndex + 1) % items.length;
    playTrack(next);
  });

  /* --- Progress bar seek --- */
  progressBar.addEventListener('click', function (e) {
    if (!currentAudio || !currentAudio.duration) return;
    const rect = progressBar.getBoundingClientRect();
    const pct  = (e.clientX - rect.left) / rect.width;
    currentAudio.currentTime = pct * currentAudio.duration;
  });
})();
