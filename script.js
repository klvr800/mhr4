// التصميم الجديد الهادئ - JavaScript بسيط وفعال

// شريط التقدم
function updateScrollProgress() {
    const scrollProgress = document.getElementById('scrollProgress');
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';
}

// التنقل السلس
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // تعديل لارتفاع الشريط العلوي
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// تأثيرات الظهور عند التمرير
function setupFadeInAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // مراقبة العناصر التي تحتاج تأثير الظهور
    const elementsToObserve = document.querySelectorAll('.section, .project-item, .skill-category');
    elementsToObserve.forEach(el => observer.observe(el));
}

// نموذج التواصل
function setupContactForm() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // جمع البيانات
            const formData = new FormData(form);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // التحقق من البيانات
            if (!name || !email || !message) {
                showNotification('يرجى ملء جميع الحقول', 'error');
                return;
            }
            
            // محاكاة إرسال النموذج
            showNotification('شكراً لك! تم إرسال رسالتك بنجاح', 'success');
            form.reset();
        });
    }
}

// عرض الإشعارات
function showNotification(message, type = 'info') {
    // إزالة الإشعارات الموجودة
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // إنشاء إشعار جديد
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // إضافة ستايل الإشعار
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4A90E2' : '#e74c3c'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 8px 30px rgba(74, 144, 226, 0.3);
        z-index: 1001;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // إظهار الإشعار
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // إخفاء الإشعار تلقائياً
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
    
    // زر الإغلاق
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
}

// تمييز الرابط النشط في القائمة
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + sectionId) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// تأثيرات الأرقام المتحركة
function animateNumbers() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const finalNumber = parseInt(element.textContent);
                const duration = 2000; // مدة الأنيميشن بالميلي ثانية
                const startTime = performance.now();
                
                function updateNumber(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    
                    const currentNumber = Math.floor(progress * finalNumber);
                    element.textContent = currentNumber + (element.textContent.includes('+') ? '+' : '');
                    
                    if (progress < 1) {
                        requestAnimationFrame(updateNumber);
                    }
                }
                
                requestAnimationFrame(updateNumber);
                observer.unobserve(element);
            }
        });
    });
    
    statNumbers.forEach(num => observer.observe(num));
}

// إضافة ستايل للرابط النشط
function addActiveNavStyle() {
    const style = document.createElement('style');
    style.textContent = `
        .nav-link.active {
            color: var(--primary-blue) !important;
            font-weight: 600;
        }
        
        .nav-link.active::after {
            content: '';
            position: absolute;
            bottom: -5px;
            left: 0;
            right: 0;
            height: 2px;
            background: var(--primary-blue);
            border-radius: 1px;
        }
        
        .nav-link {
            position: relative;
        }
    `;
    document.head.appendChild(style);
}

// تحسين الأداء - استخدام throttle للأحداث المتكررة
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}



// بدء التطبيق عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // إعداد كل الوظائف
    setupSmoothScrolling();
    setupFadeInAnimations();
    setupContactForm();
    animateNumbers();
    addActiveNavStyle();

    
    // إعداد أحداث التمرير مع تحسين الأداء
    const throttledScrollHandler = throttle(() => {
        updateScrollProgress();
        updateActiveNavLink();
    }, 16); // حوالي 60fps
    
    window.addEventListener('scroll', throttledScrollHandler);
    
    // تحديث عند تغيير حجم النافذة
    window.addEventListener('resize', throttle(() => {
        updateActiveNavLink();
    }, 250));
    
    console.log('تم تحميل موقع ماهر جمال بنجاح! 🚀');
});