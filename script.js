// ===== 全局变量 =====
let currentPage = 0;
const totalPages = 13; // 首页 + 12个内页

// ===== 页面加载完成后初始化 =====
window.addEventListener('DOMContentLoaded', function() {
    initBackgroundAnimation();
    setupMusicControl();
});

// ===== 开始回忆之旅 =====
function startJourney() {
    playMusic();
    nextPage(0);
}

// ===== 下一页 =====
function nextPage(fromPage) {
    const currentPageElement = document.getElementById(`page${fromPage}`);
    const nextPageElement = document.getElementById(`page${fromPage + 1}`);
    
    if (currentPageElement && nextPageElement) {
        currentPageElement.classList.remove('active');
        nextPageElement.classList.add('active');
        currentPage = fromPage + 1;
    }
}

// ===== 返回首页 =====
function goHome() {
    const lastPage = document.getElementById(`page${currentPage}`);
    const homePage = document.getElementById('page0');
    
    if (lastPage && homePage) {
        lastPage.classList.remove('active');
        homePage.classList.add('active');
        currentPage = 0;
    }
}

// ===== 初始化背景动画 =====
function initBackgroundAnimation() {
    const container = document.getElementById('animationContainer');
    
    // 创建爱心
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            createHeart(container);
        }, i * 800);
    }
    
    // 创建星星
    for (let i = 0; i < 50; i++) {
        createStar(container);
    }
    
    // 创建花瓣
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            createPetal(container);
        }, i * 1200);
    }
    
    // 持续生成动画元素
    setInterval(() => {
        createHeart(container);
    }, 3000);
    
    setInterval(() => {
        createPetal(container);
    }, 4000);
}

// ===== 创建爱心 =====
function createHeart(container) {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = (Math.random() * 5 + 8) + 's';
    heart.style.animationDelay = Math.random() * 2 + 's';
    
    const size = Math.random() * 10 + 15;
    heart.style.width = size + 'px';
    heart.style.height = size + 'px';
    
    container.appendChild(heart);
    
    // 动画结束后移除元素
    setTimeout(() => {
        heart.remove();
    }, (parseFloat(heart.style.animationDuration) + parseFloat(heart.style.animationDelay)) * 1000);
}

// ===== 创建星星 =====
function createStar(container) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.animationDelay = Math.random() * 3 + 's';
    star.style.animationDuration = (Math.random() * 2 + 2) + 's';
    
    const size = Math.random() * 3 + 2;
    star.style.width = size + 'px';
    star.style.height = size + 'px';
    
    container.appendChild(star);
}

// ===== 创建花瓣 =====
function createPetal(container) {
    const petal = document.createElement('div');
    petal.className = 'petal';
    petal.style.left = Math.random() * 100 + '%';
    petal.style.animationDuration = (Math.random() * 6 + 10) + 's';
    petal.style.animationDelay = Math.random() * 2 + 's';
    
    const size = Math.random() * 10 + 10;
    petal.style.width = size + 'px';
    petal.style.height = size + 'px';
    
    // 随机颜色变化
    const colors = [
        'rgba(255, 192, 203, 0.7)',
        'rgba(255, 182, 193, 0.7)',
        'rgba(255, 218, 224, 0.7)',
        'rgba(255, 240, 245, 0.7)'
    ];
    petal.style.background = colors[Math.floor(Math.random() * colors.length)];
    
    container.appendChild(petal);
    
    // 动画结束后移除元素
    setTimeout(() => {
        petal.remove();
    }, (parseFloat(petal.style.animationDuration) + parseFloat(petal.style.animationDelay)) * 1000);
}

// ===== 音乐控制 =====
function setupMusicControl() {
    const music = document.getElementById('bgMusic');
    
    // 添加用户交互后播放的逻辑（某些浏览器需要用户交互才能播放）
    document.addEventListener('click', function playOnFirstClick() {
        if (music.paused) {
            music.play().catch(e => {
                console.log('音乐播放需要用户交互:', e);
            });
        }
    }, { once: true });
}

// ===== 播放音乐 =====
function playMusic() {
    const music = document.getElementById('bgMusic');
    music.play().catch(e => {
        console.log('音乐播放失败:', e);
        // 如果自动播放失败，在页面添加提示
        showMusicPrompt();
    });
}

// ===== 显示音乐播放提示 =====
function showMusicPrompt() {
    const prompt = document.createElement('div');
    prompt.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: rgba(255, 255, 255, 0.9);
        padding: 15px 25px;
        border-radius: 50px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        cursor: pointer;
        font-family: 'Georgia', 'Times New Roman', serif;
        color: #000;
        animation: pulse 2s infinite;
    `;
    prompt.textContent = '🎵 点击播放音乐';
    prompt.onclick = function() {
        const music = document.getElementById('bgMusic');
        music.play();
        prompt.remove();
    };
    document.body.appendChild(prompt);
}

// ===== 键盘导航支持 =====
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowRight' || e.key === 'Enter') {
        // 下一页
        if (currentPage < totalPages - 1) {
            nextPage(currentPage);
        }
    } else if (e.key === 'ArrowLeft') {
        // 上一页
        if (currentPage > 0) {
            const prevPageElement = document.getElementById(`page${currentPage}`);
            const currentPageElement = document.getElementById(`page${currentPage - 1}`);
            if (prevPageElement && currentPageElement) {
                prevPageElement.classList.remove('active');
                currentPageElement.classList.add('active');
                currentPage--;
            }
        }
    } else if (e.key === 'Home' || e.key === 'Escape') {
        // 返回首页
        goHome();
    }
});

// ===== 触摸滑动支持（移动端） =====
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0 && currentPage < totalPages - 1) {
            // 向左滑动 - 下一页
            nextPage(currentPage);
        } else if (diff < 0 && currentPage > 0) {
            // 向右滑动 - 上一页
            const prevPageElement = document.getElementById(`page${currentPage}`);
            const currentPageElement = document.getElementById(`page${currentPage - 1}`);
            if (prevPageElement && currentPageElement) {
                prevPageElement.classList.remove('active');
                currentPageElement.classList.add('active');
                currentPage--;
            }
        }
    }
}

// ===== 图片预加载 =====
window.addEventListener('load', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (!img.complete) {
            img.style.opacity = '0';
            img.onload = function() {
                img.style.transition = 'opacity 0.8s ease';
                img.style.opacity = '1';
            };
        }
    });
});
