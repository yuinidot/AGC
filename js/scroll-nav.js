/**
 * 滚动导航脚本（无依赖，直接运行）
 */
(function() {
    let navElement = null;
    const threshold = 50; // 滚动阈值
    let lastScrollTop = 0;

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

    // 处理滚动事件
    function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > threshold) {
            navElement.classList.add('hide'); // 向下滚动且超过阈值，隐藏导航
        } else {
            navElement.classList.remove('hide'); // 向上滚动或未超过阈值，显示导航
        }
        
        lastScrollTop = scrollTop;
    }

    // 初始化
    async function init() {
        await waitDOMReady();
        navElement = document.querySelector('.top-nav');
        if (!navElement) {
            console.warn('⚠️  未找到 .top-nav 元素，滚动导航功能未启用');
            return;
        }
        window.addEventListener('scroll', handleScroll);
        console.log('📌 滚动导航功能初始化完成');
    }

    // 启动
    init();
})();