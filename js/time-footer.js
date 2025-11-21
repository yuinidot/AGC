// web/js/time-footer.js（必须放在这个路径下）
function updateDynamicTime() {
  // 1. 精准匹配 load-footer.js 中的元素ID（必须完全一致）
  const timeElement = document.getElementById('dynamicTime');
  
  // 2. 先判断元素是否存在（避免报错）
  if (!timeElement) {
    console.error('时间容器未找到！请检查元素ID是否为 dynamicTime');
    return;
  }

  // 3. 格式化当前时间（按需调整格式）
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hour = String(now.getHours()).padStart(2, '0');
  const minute = String(now.getMinutes()).padStart(2, '0');
  const second = String(now.getSeconds()).padStart(2, '0');

  // 4. 更新元素内容
  timeElement.textContent = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

// 5. 页面加载完成后执行 + 每秒更新一次
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', updateDynamicTime);
} else {
  updateDynamicTime(); // 若脚本加载较晚，直接执行一次
}
setInterval(updateDynamicTime, 1000); // 每秒刷新时间