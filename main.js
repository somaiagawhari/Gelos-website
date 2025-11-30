(() => {
  const body = document.body;
const btn  = document.getElementById('hamburger');
const nav  = document.getElementById('site-nav');

btn?.addEventListener('click', () => {
  const open = body.classList.toggle('nav-open');
  btn.setAttribute('aria-expanded', String(open));
  if (open) nav?.focus();
});

// Close on ESC
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    body.classList.remove('nav-open');
    btn?.setAttribute('aria-expanded','false');
  }
});

// Close after clicking a link
document.querySelectorAll('#site-nav a').forEach(a => {
  a.addEventListener('click', () => {
    body.classList.remove('nav-open');
    btn?.setAttribute('aria-expanded','false');
  });
});
  
  const slidesWrap = document.querySelector('.slides');
  const slides = Array.from(document.querySelectorAll('.slide'));
  const dots = Array.from(document.querySelectorAll('.dots button'));
  let index = 0, startX = 0, currentX = 0;

  function go(i){
    index = (i + slides.length) % slides.length;
    slidesWrap.style.transform = `translateX(-${index*100}%)`;
    dots.forEach((d,di)=>d.setAttribute('aria-selected', di===index ? 'true':'false'));
  }
  document.querySelector('.next')?.addEventListener('click', ()=>go(index+1));
  document.querySelector('.prev')?.addEventListener('click', ()=>go(index-1));
  dots.forEach(d => d.addEventListener('click', ()=>go(parseInt(d.dataset.go || '0',10))));

  // Touch swipe
  slidesWrap?.addEventListener('touchstart', (e)=>{ startX = e.touches[0].clientX; }, {passive:true});
  slidesWrap?.addEventListener('touchmove', (e)=>{ currentX = e.touches[0].clientX; }, {passive:true});
  slidesWrap?.addEventListener('touchend', ()=>{
    const dx = currentX - startX;
    if (Math.abs(dx) > 40) go(index + (dx<0 ? 1 : -1));
    startX = currentX = 0;
  }, {passive:true});

  // Accordion
  document.querySelectorAll('.acc-btn').forEach((btn)=>{
    btn.addEventListener('click', ()=>{
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      const panel = document.getElementById(btn.getAttribute('aria-controls'));
      btn.setAttribute('aria-expanded', String(!expanded));
      if (panel) panel.hidden = expanded;
    });
  });

  // Contact validation (Name letters/space/dot; Phone digits 10; Message <=300)
  const form = document.getElementById('contactForm');
  function validateField(){
    const name = form?.name.value ?? '';
    const phone = form?.phone.value ?? '';
    const message = form?.message.value ?? '';

    // Patterns
    const nameOk = /^[A-Za-z .]{1,100}$/.test(name);
    const phoneOk = /^[0-9]{10}$/.test(phone);
    const msgOk = message.length > 0 && message.length <= 300;

    const nameErr = document.getElementById('nameError');
    const phoneErr = document.getElementById('phoneError');
    const msgErr = document.getElementById('messageError');
    const formErr = document.getElementById('formError');

    if (nameErr) nameErr.textContent = name && !nameOk ? "This field allows only letters, space, and dots for upper and lower case letters." : "";
    if (phoneErr) phoneErr.textContent = phone && !phoneOk ? "This field allows only numbers" : "";
    if (msgErr) msgErr.textContent = message && !msgOk ? "Message must be 300 characters or less." : "";
    if (formErr) formErr.textContent = "";

    return nameOk && phoneOk && msgOk;
  }

  form?.addEventListener('input', validateField);
  form?.addEventListener('submit', (e)=>{
    e.preventDefault();
    if (!form?.name.value || !form?.phone.value || !form?.message.value){
      document.getElementById('formError').textContent = "Enter the complete details";
      return;
    }
    if (validateField()){
      alert('Thanks! Your message has been sent (demo).');
      form.reset();
    }
  });
})();
