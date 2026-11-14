// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile menu
const menu = document.getElementById('menu');
document.getElementById('burger').onclick = () => menu.classList.toggle('open');
menu.querySelectorAll('a').forEach(a => a.onclick = () => menu.classList.remove('open'));

// Theme toggle (remembered)
const root = document.documentElement;
try { const t = localStorage.getItem('theme'); if (t) root.dataset.theme = t; } catch (e) {}
document.getElementById('theme').onclick = () => {
  root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
  try { localStorage.setItem('theme', root.dataset.theme); } catch (e) {}
};

// Typing effect
const words = ['AI & NLP Researcher', 'Machine Learning Enthusiast', 'Low-Resource Language Builder', 'Computer Science Graduate'];
const el = document.getElementById('typed');
let w = 0, c = 0, del = false;
(function type() {
  const word = words[w];
  el.textContent = word.slice(0, c);
  if (!del && c < word.length) c++;
  else if (del && c > 0) c--;
  else if (!del) { del = true; return setTimeout(type, 1400); }
  else { del = false; w = (w + 1) % words.length; }
  setTimeout(type, del ? 40 : 85);
})();

// Scroll reveal + skill bars
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('show');
      e.target.querySelectorAll('.bar i').forEach(b => { b.style.setProperty('--w', b.dataset.w + '%'); b.classList.add('go'); });
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(n => io.observe(n));

// Contact form -> opens the visitor's email app (free, no backend needed)
document.getElementById('form').addEventListener('submit', e => {
  e.preventDefault();
  const n = encodeURIComponent(document.getElementById('name').value);
  const m = encodeURIComponent(document.getElementById('msg').value + '\n\nFrom: ' + document.getElementById('name').value + ' (' + document.getElementById('email').value + ')');
  location.href = `mailto:mureeddroty@gmail.com?subject=Portfolio message from ${n}&body=${m}`;
});

// Animated particle network background
const cv = document.getElementById('bg'), ctx = cv.getContext('2d');
let W, H, pts = [];
function resize() {
  W = cv.width = innerWidth; H = cv.height = innerHeight;
  const n = Math.min(90, Math.floor(W * H / 16000));
  pts = Array.from({ length: n }, () => ({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .45, vy: (Math.random() - .5) * .45 }));
}
addEventListener('resize', resize); resize();
(function draw() {
  ctx.clearRect(0, 0, W, H);
  const light = root.dataset.theme === 'light';
  const col = light ? '90,80,200' : '124,160,255';
  pts.forEach((p, i) => {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0 || p.x > W) p.vx *= -1;
    if (p.y < 0 || p.y > H) p.vy *= -1;
    ctx.beginPath(); ctx.arc(p.x, p.y, 1.8, 0, 6.283); ctx.fillStyle = `rgba(${col},.7)`; ctx.fill();
    for (let j = i + 1; j < pts.length; j++) {
      const q = pts[j], d = Math.hypot(p.x - q.x, p.y - q.y);
      if (d < 130) { ctx.strokeStyle = `rgba(${col},${.18 * (1 - d / 130)})`; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke(); }
    }
  });
  requestAnimationFrame(draw);
})();
