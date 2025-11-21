/**
 * 顶部栏脚本（无依赖，直接运行）
 */
(function() {
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

    // 创建顶部栏HTML
    function createHeader() {
        const temp = document.createElement('div');
        temp.innerHTML = `
            <div class="top-nav">
                <a href="index.html" style="color: #fff; text-decoration: none;">
                    <div class="logo-wrapper"> 
                        <img src="img/logo-1.png" alt="logo" class="top-logo"> 
                        <div class="logo-text">
                            <h1 style="font-family: 'FangSong', '仿宋', serif; margin: 0;">反GAY教</h1>
                        </div>
                    </div>
                </a>    
                <ul class="nav-list">
                    <li class="nav-item"><a href="index.html">首页</a></li>
                    <li class="nav-item"><a href="about.html">关于</a></li>
                    <li class="nav-item"><a href="join.html">加入</a></li>
                    <li class="nav-item">
                        <details class="dropdown">
                            <summary class="dropdown-trigger">其他</summary>
                            <ul class="dropdown-menu">
                                <li class="dropdown-item"><a href="notic.html">公告</a></li>
                                <li class="dropdown-item"><a href="news.html">新闻</a></li>
                                <li class="dropdown-item"><a href="role.html">职务</a></li>
                            </ul>
                        </details>
                    </li>
                </ul>
            </div>
        `;
        return temp.firstElementChild;
    }

    // 初始化
    async function init() {
        try {
            await waitDOMReady();
            const header = createHeader();
            // 插入到body最前面
            document.body.insertBefore(header, document.body.firstChild);
            console.log('📌 顶部栏渲染完成');
        } catch (err) {
            console.error('❌ 顶部栏加载失败:', err);
            // 降级显示
            const fallback = document.createElement('div');
            fallback.className = 'top-nav';
            fallback.innerHTML = '<a href="index.html" style="color: #fff; padding: 20px; display: block; text-decoration: none;">反GAY教/顶部栏加载失败</a>';
            document.body.insertBefore(fallback, document.body.firstChild);
        }
    }

    // 启动
    init();
})();