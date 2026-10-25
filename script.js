const LINES = [
  "But if you're too drunk to drive",
  "and the music is right",
  "She might let you stay",
  "but just for the night",
  "And if she grabs for your hand",
  "and drags you along",
  "She might want a kiss before the end of this song",
  "Because love...",
  "can burn like a cigarette",
  "And leave you with nothing",
  "And leave you with nothing"
];

const lyricEl = document.getElementById('lyric');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const audio = document.getElementById('bg-music');
const vinyl = document.getElementById('vinyl');
let index = -1;

audio.volume = 0.8;

// Пластинка крутится ровно тогда, когда играет музыка
audio.addEventListener('play',  () => vinyl.classList.add('playing'));
audio.addEventListener('pause', () => vinyl.classList.remove('playing'));
audio.addEventListener('error', () => {
  console.error('Не удалось загрузить lovers-rock.mp3 — проверь имя файла и что он лежит рядом с index.html');
});

function showLine(i){
  if(i < 0) i = LINES.length - 1;
  if(i >= LINES.length) i = 0;
  index = i;
  lyricEl.classList.remove('show');
  setTimeout(()=>{
    const text = LINES[i];
    if(text.startsWith("Because love")) lyricEl.innerHTML = `<span class="accent">${text}</span>`;
    else lyricEl.textContent = text;
    lyricEl.classList.add('show');
  }, 100);
}

function startPlayback(){
  if (audio.paused) {
    audio.play().catch(err => {
      console.log("Не удалось запустить музыку:", err);
    });
  }
}

nextBtn.onclick = () => {
  startPlayback();
  showLine(index + 1);
};

prevBtn.onclick = () => {
  startPlayback();
  showLine(index - 1);
};

/* ---------- Частицы ---------- */
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let w, h;

function resize(){
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

const particles = Array.from({length:60}, ()=>({
  x: Math.random()*w,
  y: Math.random()*h,
  r: Math.random()*2+1,
  vx: (Math.random()-0.5)*0.3,
  vy: -Math.random()*0.2,
  color: `rgba(${100+Math.random()*155},${50+Math.random()*205},255,0.2)`
}));

function draw(){
  ctx.clearRect(0,0,w,h);
  particles.forEach(p=>{
    p.x += p.vx;
    p.y += p.vy;
    if(p.y<0) p.y=h;
    if(p.x>w) p.x=0;
    if(p.x<0) p.x=w;
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle=p.color;
    ctx.fill();
  });
  requestAnimationFrame(draw);
}
draw();
