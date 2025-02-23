(() => {
  const modalMenu = document.querySelector('.js-modal-container');
  const openModalBtn = document.querySelector('.js-open-modal');
  const closeModalBtn = document.querySelector('.js-close-modal');

  const toggleMenu = () => {
    const anchors = modalMenu.querySelectorAll('a[href*="#"]');
    const isModalOpen =
      openModalBtn.getAttribute('aria-expanded') === 'true' || false;
    openModalBtn.setAttribute('aria-expanded', !isModalOpen);
    modalMenu.classList.toggle('is-open');
    

    const scrollLockMethod = !isModalOpen
      ? 'disableBodyScroll'
      : 'enableBodyScroll';
    bodyScrollLock[scrollLockMethod](document.body);
    
    if(anchors.length === 0) return;
    
    if(!isModalOpen) {
      anchors.forEach(anchor => {
        anchor.addEventListener("click", toggleMenu)
      })
      return;
    }
    
    anchors.forEach(anchor => {
        anchor.removeEventListener("click", toggleMenu)
      })
  };

  openModalBtn.addEventListener('click', toggleMenu);
  closeModalBtn.addEventListener('click', toggleMenu);

  // Вказати брейкпоінт після якого повинна зачинятися
  window.matchMedia('(min-width: 2500px)').addEventListener('change', e => {
    if (!e.matches) return;
    modalMenu.classList.remove('is-open');
    openModalBtn.setAttribute('aria-expanded', false);
    bodyScrollLock.enableBodyScroll(document.body);
  });
})();