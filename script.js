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
