// 當頁面載入完成後執行新的功能
window.addEventListener('load', () => {
    // 延遲 1300ms（歡迎動畫約結束時）後，使 header 和 nav 的容器從上方滑入並淡入顯示
    setTimeout(() => {
        const topBar = document.getElementById('top-bar');
        topBar.style.transform = 'translateY(0)';  // 解除上移偏移，滑入畫面
        topBar.style.opacity = '1';               // 淡入呈現
    }, 1300);

    // 監聽窗口的滾動事件，動態調整頂部區域透明度
    window.addEventListener('scroll', () => {
        const topBar = document.getElementById('top-bar');
        if (window.pageYOffset > 0) {
            // 使用者捲動頁面：header/nav 半透明
            topBar.style.opacity = '0.7';
        } else {
            // 滑回頂端：恢復 header/nav 完全不透明
            topBar.style.opacity = '1';
        }
    });
});