
(function() {
    const noticeId = 'globalMaintenanceNotice';
    // 🔴 手动控制开关：true = 显示公告，false = 隐藏公告（直接修改这里即可）
    const showNotice = true;

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

    // 创建公告样式和元素
    function createNotice() {
        // 样式
        const style = document.createElement('style');
        style.textContent = `
            #${noticeId} {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                background-color: #dc3545;
                color: #fff;
                text-align: center;
                padding: 12px 0;
                font-size: 14px;
                font-weight: 500;
                z-index: 9999;
                box-shadow: 0 2px 8px rgba(0,0,0,0.2);
                display: none; /* 默认隐藏，后续按开关控制 */
            }
            #${noticeId} .notice-content {
                max-width: 1200px;
                margin: 0 auto;
                padding: 0 20px;
            }
            @media (max-width: 768px) {
                #${noticeId} {
                    padding: 10px 0;
                    font-size: 13px;
                }
            }
        `;
        document.head.appendChild(style);

        // 公告元素
        const notice = document.createElement('div');
        notice.id = noticeId;
        notice.innerHTML = `
            <div class="notice-content">
                ⚠️ 全局提醒：网站正在维修升级，部分功能可能暂时无法使用，敬请谅解！
            </div>
        `;
        document.body.insertAdjacentElement('afterbegin', notice);
    }

    // 显示/隐藏公告（直接根据开关变量控制）
    function toggleNotice() {
        const notice = document.getElementById(noticeId);
        if (notice) {
            notice.style.display = showNotice ? 'block' : 'none';
            console.log(`📌 全局公告${showNotice ? '显示' : '隐藏'}（手动控制开关：${showNotice}）`);
        }
    }

    // 初始化（去掉文件检测，直接按开关执行）
    async function init() {
        try {
            await waitDOMReady();
            createNotice();
            toggleNotice(); // 直接调用控制函数
        } catch (err) {
            console.error('❌ 全局公告初始化失败:', err);
        }
    }

    // 启动
    init();
})();