(function() {
  // Stvaranje audio objekta
  const audio = new Audio('galerija/glazba.mp3');
  audio.loop = true;
  audio.volume = 0.3; // Jačina zvuka (30%)

  // Preglednici traže barem 1 dodir/klik prije reprodukcije
  function pokreniGlazbu() {
    audio.play().then(() => {
      document.removeEventListener('click', pokreniGlazbu);
      document.removeEventListener('touchstart', pokreniGlazbu);
    }).catch(() => {});
  }

  document.addEventListener('click', pokreniGlazbu);
  document.addEventListener('touchstart', pokreniGlazbu);

  // Zaustavljanje glazbe ako se pokrene video sjećanja
  window.addEventListener('DOMContentLoaded', () => {
    if (typeof window.openVideo === 'function') {
      const StariVideo = window.openVideo;
      window.openVideo = function() {
        audio.pause();
        StariVideo.apply(this, arguments);
      };
    }

    if (typeof window.closeModal === 'function') {
      const StaraZatvori = window.closeModal;
      window.closeModal = function(id) {
        StaraZatvori.apply(this, arguments);
        if (id === 'videoModal') {
          audio.play().catch(() => {});
        }
      };
    }
  });
})();