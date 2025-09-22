// 格式化补零
function pad(n) { return n < 10 ? '0' + n : '' + n; }

// 计算并渲染时间
function currentTime() {
  const now = new Date();

  let hh = now.getHours();
  const mm = now.getMinutes();
  const ss = now.getSeconds();

  let ampm = 'AM';
  if (hh >= 12) ampm = 'PM';
  if (hh === 0) hh = 12;          // 0点显示为12 AM
  if (hh > 12)  hh = hh - 12;     // 13-23 转 1-11

  const timeStr = `${pad(hh)}:${pad(mm)}:${pad(ss)} ${ampm}`;

  const clockEl = document.getElementById('clock');
  if (clockEl) clockEl.innerHTML = `${pad(hh)}:${pad(mm)}:${pad(ss)} <span class="ampm">${ampm}</span>`;

  // 简单的本地时区显示（例如 GMT+8 / GMT-7）
  const tzEl = document.getElementById('timezone');
  if (tzEl) {
    const offsetMin = -now.getTimezoneOffset(); // 本地相对UTC的分钟偏移
    const sign = offsetMin >= 0 ? '+' : '-';
    const absMin = Math.abs(offsetMin);
    const tzH = Math.floor(absMin / 60);
    const tzM = absMin % 60;
    const tzStr = `GMT${sign}${tzH}${tzM ? ':' + pad(tzM) : ''}`;
    tzEl.textContent = tzStr;
  }
}

// 启动时钟
currentTime();
setInterval(currentTime, 1000);
