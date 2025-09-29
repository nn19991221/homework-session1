// js/randomcodes.js
(function () {
  // 生成 8 位随机码（可按需调整字符集）
  function genCode(len = 8) {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789';
    let out = '';
    for (let i = 0; i < len; i++) {
      out += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return out;
  }

  // 渲染 code 并禁用提交按钮
  function renderAndLock() {
    const codeSpan = document.getElementById('codeStr');
    const submitBtn = document.querySelector('form button[type="submit"]');
    if (codeSpan) codeSpan.textContent = genCode(8);
    if (submitBtn) {
      submitBtn.disabled = true; // 作业要求：默认禁用
      submitBtn.classList.add('btn-disabled');
    }
  }

  // 入口
  document.addEventListener('DOMContentLoaded', () => {
    // 仅在 contact 页面执行（可根据 <body id="contact"> 判断）
    const isContact = document.body && document.body.id === 'contact';
    if (!isContact) return;

    renderAndLock();

    const regen = document.getElementById('regenCode');
    if (regen) regen.addEventListener('click', renderAndLock);
  });
})();
