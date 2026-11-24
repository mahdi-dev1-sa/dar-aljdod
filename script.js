// قائمة الجوال
const burger = document.getElementById('burger');
const menu = document.getElementById('menu');
burger.addEventListener('click', () => menu.classList.toggle('open'));
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));

// تبويبات قائمة الطعام
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(tab.dataset.tab).classList.add('active');
  });
});

// الحجز عبر واتساب (غيّر الرقم بصيغة دولية بدون + أو أصفار)
const WHATSAPP_NUMBER = '213000000000';
document.getElementById('reserveForm').addEventListener('submit', e => {
  e.preventDefault();
  const d = Object.fromEntries(new FormData(e.target));
  const msg = `طلب حجز جديد%0Aالاسم: ${d.name}%0Aالهاتف: ${d.phone}%0Aالتاريخ: ${d.date}%0Aالوقت: ${d.time}%0Aعدد الأشخاص: ${d.guests}%0Aملاحظات: ${d.notes || '-'}`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
});

document.getElementById('year').textContent = new Date().getFullYear();

// ===== السكرول السينمائي =====
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const scenes = [...document.querySelectorAll('[data-scene]')];
const bar = document.getElementById('bar');
const track = document.getElementById('track');
let ticking = false;

function update() {
  const vh = window.innerHeight;
  scenes.forEach(s => {
    const r = s.getBoundingClientRect();
    const total = r.height - vh;
    const p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
    s.style.setProperty('--p', p.toFixed(4));
  });
  const max = document.documentElement.scrollHeight - vh;
  bar.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
  if (track && !reduce) {
    const gp = parseFloat(track.closest('[data-scene]').style.getPropertyValue('--p')) || 0;
    const dist = Math.max(0, track.offsetWidth - window.innerWidth);
    // الكتابة من اليمين: البطاقات تبدأ من اليمين وتنزلق نحو اليمين
    track.style.transform = `translate3d(${gp * dist}px,0,0)`;
  }
  ticking = false;
}
function onScroll() {
  if (!ticking) { ticking = true; requestAnimationFrame(update); }
}
if (!reduce) {
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
}
update();

// ظهور العناصر عند الوصول إليها
const io = new IntersectionObserver(entries => {
  entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// عنوان الواجهة: الكلمات تصعد واحدة بعد الأخرى
const kinetic = document.getElementById('kinetic');
const startKinetic = () => kinetic.classList.add('in');
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(() => setTimeout(startKinetic, 150));
  setTimeout(startKinetic, 1200);
} else {
  setTimeout(startKinetic, 300);
}
