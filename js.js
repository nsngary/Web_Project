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
        const scrollPosition = window.pageYOffset;
        const headerHeight = topBar.offsetHeight;
        
        if (scrollPosition > 0) {
            // 計算透明度，隨著滾動距離增加而降低，但不低於 0.3
            const opacity = Math.max(0.5, 1 - (scrollPosition / (headerHeight * 2)));
            // 計算位移，最多向上移動一半的高度
            const translateY = Math.min(-headerHeight / 1.45);
            
            topBar.style.transform = `translateY(${translateY}px)`;
            topBar.style.opacity = opacity;
        } else {
            // 回到頂部時恢復原狀
            topBar.style.transform = 'translateY(0)';
            topBar.style.opacity = '1';
        }
    });

    // 歡迎動畫與主內容切換
    const welcome = document.getElementById('welcome');
    const main = document.getElementById('main-content');
    
    setTimeout(() => {
        // 修改為原地淡出效果
        welcome.style.transition = 'opacity 1s ease-out';
        welcome.style.opacity = '0';
        
        setTimeout(() => {
            welcome.style.display = 'none';
            main.style.display = 'block';
            main.style.opacity = '0';
            requestAnimationFrame(() => {
                main.style.transition = 'opacity 0.5s ease-in';
                main.style.opacity = '1';
            });
            
            // 初始化 Swiper 輪播
            const mySwiper = new Swiper('.swiper', {
                loop: true,
                navigation: { 
                    nextEl: '.swiper-button-next', 
                    prevEl: '.swiper-button-prev' 
                },
                pagination: { 
                    el: '.swiper-pagination', 
                    clickable: true 
                }
            });
        }, 1000); // 延長等待時間，確保淡出動畫完成
    }, 1000);

    // 初始化 AOS
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // 初始化 NProgress
    NProgress.configure({ showSpinner: false });
    NProgress.start();
    NProgress.done();
    
    // 初始化技能條動畫
    document.querySelectorAll('.skill-bar .fill').forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });

    // 初始化粒子系統
    initThreeBackground();

    // 初始化暗黑模式切換按鈕
    initThemeSwitch();

    // 初始化側邊選單點擊事件
    document.querySelectorAll('.side-nav-link').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetID = this.getAttribute('href').substring(1);
            const targetEl = document.getElementById(targetID);
            if (targetEl) {
                const offsetY = -80; // header 高度補償
                const y = targetEl.getBoundingClientRect().top + window.pageYOffset + offsetY;
                smoothScrollTo(y, 800); // 調整捲動毫秒
            }
        });
    });
});

// 初始化暗黑模式切換按鈕
function initThemeSwitch() {
    const themeSwitch = document.createElement('button');
    themeSwitch.className = 'theme-switch';
    themeSwitch.innerHTML = '<i class="fas fa-moon"></i>';
    document.body.appendChild(themeSwitch);

    // 檢查本地存儲中的主題設置
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        themeSwitch.innerHTML = savedTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    }

    themeSwitch.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        themeSwitch.innerHTML = newTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        
        // 保存主題設置到本地存儲
        localStorage.setItem('theme', newTheme);
        
        // 重新初始化粒子系統
        setTimeout(() => {
            initThreeBackground();
        }, 100);
    });
}

// 平滑滾動功能
function smoothScrollTo(targetY, duration = 800) {
    const startY = window.scrollY;
    const distance = targetY - startY;
    let startTime = null;

    function animation(currentTime) {
        if (!startTime) startTime = currentTime;
        const elapsed = currentTime - startTime;

        // 動畫函數
        const ease = t => t < 0.5
            ? 2 * t * t
            : -1 + (4 - 2 * t) * t;

        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = ease(progress);

        window.scrollTo(0, startY + distance * easedProgress);

        if (elapsed < duration) {
            requestAnimationFrame(animation);
        }
    }

    requestAnimationFrame(animation);
}

// 回到頂端按鈕功能
$(function () {
    $("body").append("<img id='goTopButton' style='display:none; z-index:5; cursor:pointer;' title='回到頂端'>");
    var img = "./image.png",
        location = 0.8,
        right = 30,
        opacity = 0.6,
        speed = 800,
        $button = $("#goTopButton"),
        $body = $(document),
        $win = $(window);

    $button.attr("src", img);

    window.goTopMove = function () {
        var scrollH = $body.scrollTop(),
            winH = $win.height(),
            css = { "top": winH * location + "px", "position": "fixed", "right": right, "opacity": opacity };
        if (scrollH > 20) {
            $button.css(css);
            $button.fadeIn("slow");
        } else {
            css = { "transform": "none", "transition": "none" };
            $button.css(css);
            $button.fadeOut("slow");
        }
    };

    $win.on({
        scroll: function () { goTopMove(); },
        resize: function () { goTopMove(); }
    });

    $button.on({
        mouseover: function () { $button.css("opacity", 1); },
        mouseout: function () { $button.css("opacity", opacity); },
        click: function () {
            css = { "transform": "rotate(+720deg)", "transition": "transform 0.5s ease-in-out 0s" };
            $button.css(css);
            $("html, body").animate({ scrollTop: 0 }, speed);
        }
    });
});

// 視差滾動效果
document.addEventListener('scroll', () => {
    const parallaxElements = document.querySelectorAll('.parallax-section');
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(window.pageYOffset * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// Three.js 背景動畫
let particles, scene, camera, renderer;

function initThreeBackground() {
    // 如果已經存在容器，先移除
    const existingContainer = document.getElementById('three-bg');
    if (existingContainer) {
        existingContainer.remove();
    }

    const container = document.createElement('div');
    container.id = 'three-bg';
    document.body.appendChild(container);

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ 
        alpha: true,
        antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // 創建粒子系統
    particles = new THREE.Group();
    const particleCount = 1000;
    const particleGeometry = new THREE.SphereGeometry(0.1, 8, 8);
    
    // 根據主題設定粒子顏色
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const particleColor = isDark ? 0xA6722D : 0x2196F3;
    
    const particleMaterial = new THREE.MeshBasicMaterial({ 
        color: particleColor,
        transparent: true,
        opacity: 0.6
    });

    for (let i = 0; i < particleCount; i++) {
        const particle = new THREE.Mesh(particleGeometry, particleMaterial);
        particle.position.set(
            Math.random() * 100 - 50,
            Math.random() * 100 - 50,
            Math.random() * 100 - 50
        );
        particles.add(particle);
    }
    scene.add(particles);

    camera.position.z = 30;

    // 動畫循環
    function animate() {
        requestAnimationFrame(animate);
        if (particles) {
            particles.rotation.x += 0.001;
            particles.rotation.y += 0.001;
            renderer.render(scene, camera);
        }
    }
    animate();

    // 視窗大小調整
    window.addEventListener('resize', () => {
        if (camera && renderer) {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }
    });

    // 確保容器可見
    container.style.display = 'block';
    container.style.visibility = 'visible';
}