/**
 * 无依赖 JS 加载器（入口文件）
 * 直接加载所有核心脚本，无模块化，避免 404
 */
const JSLoader = {
    // 配置所有需要加载的脚本（路径务必和实际文件一致！）
    scripts: [
        {
            src: 'js/load-header.js',
            name: '顶部栏脚本',
            isCore: true
        },
        {
            src: 'js/load-footer.js',
            name: '底部栏脚本',
            isCore: true
        },
        {
            src: 'js/scroll-nav.js',
            name: '滚动导航脚本',
            isCore: false
        },
        {
            src: 'js/global-notice.js',
            name: '全局公告脚本',
            isCore: false
        }
    ],

    // 工具函数：加载单个脚本（内嵌，不依赖 utils.js）
    loadScript: (config) => {
        return new Promise((resolve) => {
            const { src, name, isCore } = config;

            // 避免重复加载
            if (document.querySelector(`script[src="${src}"]`)) {
                console.log(`ℹ️ ${name}已存在，跳过加载`);
                resolve();
                return;
            }

            const script = document.createElement('script');
            script.src = src;
            script.async = false; // 按顺序加载

            // 成功回调
            script.onload = () => {
                console.log(`✅ 加载成功：${name}（${src}）`);
                resolve();
            };

            // 失败回调（核心脚本降级，非核心忽略）
            script.onerror = (error) => {
                console.error(`❌ 加载失败：${name}（${src}），请检查文件路径`, error);
                if (isCore) {
                    JSLoader.handleCoreFallback(name);
                }
                resolve(); // 继续加载下一个，不中断
            };

            document.body.appendChild(script);
        });
    },

    // 核心脚本加载失败降级方案
    handleCoreFallback(name) {
        if (name === '顶部栏脚本') {
            // 顶部栏降级
            const fallbackHeader = document.createElement('div');
            fallbackHeader.className = 'top-nav';
            fallbackHeader.innerHTML = '<a href="index.html" style="color: #fff; padding: 20px; display: block; text-decoration: none;">反GAY教/顶部导航加载失败</a>';
            document.body.insertBefore(fallbackHeader, document.body.firstChild);
        } else if (name === '底部栏脚本') {
            // 底部栏降级
            const fallbackFooter = document.createElement('div');
            fallbackFooter.className = 'footer';
            fallbackFooter.innerHTML = `
                <div class="footer-container">
                    <div class="current-time">© 2025 Anti-Gay Church 反GAY教</div>
                    <div class="footer-links">
                        <a href="about.html">关于我们</a>
                        <a href="notic.html">公告</a>
                        <a href="join.html">加入我们</a>
                    </div>
                    <p>声明：本网站仅为亚文化交流，无任何歧视意图</p>
                </div>
            `;
            document.body.appendChild(fallbackFooter);
        }
    },

    // 按顺序加载所有脚本
    async loadAll() {
        console.log('🔧 启动无依赖加载流程...');
        for (const script of this.scripts) {
            await this.loadScript(script);
        }
        console.log('🎉 所有脚本加载流程完成！');
    }
};

// DOM 就绪后加载（兼容所有浏览器）
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    JSLoader.loadAll();
} else {
    document.addEventListener('DOMContentLoaded', () => JSLoader.loadAll());
}