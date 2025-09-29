// js/digclock.js
function pad(n) { return n < 10 ? '0' + n : '' + n; }

function currentTime() {
  const now = new Date();
  let hh = now.getHours();
  const mm = now.getMinutes();
  const ss = now.getSeconds();

  let ampm = 'AM';
  if (hh >= 12) ampm = 'PM';
  if (hh === 0) hh = 12;
  if (hh > 12)  hh = hh - 12;

  const clockEl = document.getElementById('clock');
  if (clockEl) {
    clockEl.innerHTML = `${pad(hh)}:${pad(mm)}:${pad(ss)} <span class="ampm">${ampm}</span>`;
  }

  const tzEl = document.getElementById('timezone');
  if (tzEl) {
    const offsetMin = -now.getTimezoneOffset();
    const sign = offsetMin >= 0 ? '+' : '-';
    const absMin = Math.abs(offsetMin);
    const tzH = Math.floor(absMin / 60);
    const tzM = absMin % 60;
    const tzStr = `GMT${sign}${tzH}${tzM ? ':' + pad(tzM) : ''}`;
    tzEl.textContent = tzStr;
  }
}

currentTime();
setInterval(currentTime, 1000);
