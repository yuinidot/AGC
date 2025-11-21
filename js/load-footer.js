/**
 * 底部栏+时间脚本（无依赖，直接运行）
 */
(function() {
    const timeElementId = 'dynamicTime';

    // 等待DOM就绪
    function waitDOMReady() {
        return new Promise((resolve) => {
            if (document.readyState === 'complete' || document.readyState === 'interactive') {
                resolve();
            } else {
                document.addEventListener('DOMContentLoaded', resolve);
            }
        });
    }

    // 创建底部栏HTML
    function createFooter() {
        const temp = document.createElement('div');
        temp.innerHTML = `
            <div class="footer">
                <div class="footer-container">
                    <div id="${timeElementId}" class="current-time"></div>
                    <div class="footer-links">
                        <a href="about.html">关于我们</a>
                        <a href="notic.html">公告</a>
                        <a href="join.html">加入我们</a>
                    </div>
                    <p>声明：本网站仅为亚文化交流，无任何歧视意图</p>
                </div>
            </div>
        `;
        return temp.firstElementChild;
    }

    // 更新时间
    function updateTime() {
        const elem = document.getElementById(timeElementId);
        if (!elem) return;

        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hour = String(now.getHours()).padStart(2, '0');
        const minute = String(now.getMinutes()).padStart(2, '0');
        const second = String(now.getSeconds()).padStart(2, '0');

        elem.textContent = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    }

    // 初始化
    async function init() {
        try {
            await waitDOMReady();
            const footer = createFooter();
            document.body.appendChild(footer);
            // 启动时间更新
            updateTime();
            setInterval(updateTime, 1000);
            console.log('📌 底部栏渲染完成，时间开始更新');
        } catch (err) {
            console.error('❌ 底部栏加载失败:', err);
            // 降级显示
            const fallback = document.createElement('div');
            fallback.className = 'footer';
            fallback.innerHTML = `
                <div class="footer-container">
                    <p>© 2025 Anti-Gay Church 反GAY教/底部栏加载失败</p>
                </div>
            `;
            document.body.appendChild(fallback);
        }
    }

    // 启动
    init();
})();