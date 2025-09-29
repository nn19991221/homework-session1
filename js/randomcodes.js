// 全局变量
let code = "";                     // 用来存储生成的随机码
let str = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789"; // 字符集
let getCode = null;                // 输入框
let btnvalue = null;               // 提交按钮

// 生成 8 位随机码
function genCode(len = 8) {
  let out = "";
  for (let i = 0; i < len; i++) {
    out += str.charAt(Math.floor(Math.random() * str.length));
  }
  return out;
}

// 渲染随机码到页面
function renderCode() {
  code = genCode(8);
  const codeSpan = document.getElementById("codeStr");
  if (codeSpan) codeSpan.textContent = code;
  // 每次渲染新 code 都重置输入框与按钮状态
  if (getCode) getCode.value = "";
  disableButton(true);
}

// 根据布尔值禁用/启用按钮
function disableButton(isDisabled) {
  if (!btnvalue) return;
  btnvalue.disabled = isDisabled;

  // 同时切换视觉样式（可与 CSS 中的 :disabled 配合）
  if (isDisabled) {
    btnvalue.style.backgroundColor = "#bbb";
    btnvalue.style.cursor = "not-allowed";
  } else {
    btnvalue.style.backgroundColor = "#4977D1";
    btnvalue.style.cursor = "pointer";
  }
}

// 比较输入与生成的随机码，决定是否启用按钮
function evaluateCode() {
  const enteredCode = (getCode?.value || "").trim();
  const generatedCode = (code || "").trim();

  if (enteredCode.length === generatedCode.length && enteredCode === generatedCode) {
    disableButton(false);
  } else {
    disableButton(true);
  }
}

// 等待 DOM 准备好后取元素、绑定事件、首次生成验证码
document.addEventListener("DOMContentLoaded", () => {
  getCode   = document.getElementById("codeInput");
  btnvalue  = document.getElementById("submitBtn");
  const regenBtn = document.getElementById("regenCode");

  // 初始化：生成随机码、默认禁用按钮（注意：按钮禁用还会在 body onload 再执行一次，双保险）
  renderCode();

  // 输入监听：每输入一个字符就校验
  if (getCode) {
    getCode.addEventListener("input", evaluateCode);
  }

  // 重新生成按钮：刷新随机码并禁用提交
  if (regenBtn) {
    regenBtn.addEventListener("click", renderCode);
  }
});
