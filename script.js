// ========================================
// TECH SUMMIT 2026 - JAVASCRIPT
// ========================================

// ===== Inicialização =====
document.addEventListener('DOMContentLoaded', () => {
    initCountdown();
    initNavigation();
    initSmoothScroll();
    initFormValidation();
    initScrollAnimations();
});

// ===== Contagem Regressiva =====
function initCountdown() {
    const eventDate = new Date('2026-09-15T08:00:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = eventDate - now;

        if (distance < 0) {
            document.getElementById('days').textContent = '000';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = String(days).padStart(3, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// ===== Navegação Mobile =====
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');

    // Toggle menu
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Fechar menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // Mudar estilo da navbar ao scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ===== Scroll Suave =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===== Validação do Formulário =====
function initFormValidation() {
    const form = document.getElementById('registrationForm');
    if (!form) return;

    form.addEventListener('submit', handleFormSubmit);

    // Validação em tempo real
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', () => {
            clearError(input);
        });
    });
}

function validateField(e) {
    const field = e.target;
    const fieldName = field.name;
    const value = field.value.trim();

    let isValid = true;
    let errorMessage = '';

    switch (fieldName) {
        case 'name':
            if (value === '') {
                isValid = false;
                errorMessage = 'Nome é obrigatório';
            } else if (value.length < 3) {
                isValid = false;
                errorMessage = 'Nome deve ter pelo menos 3 caracteres';
            }
            break;

        case 'email':
            if (value === '') {
                isValid = false;
                errorMessage = 'E-mail é obrigatório';
            } else if (!isValidEmail(value)) {
                isValid = false;
                errorMessage = 'E-mail inválido';
            }
            break;

        case 'company':
            if (value === '') {
                isValid = false;
                errorMessage = 'Empresa ou instituição é obrigatória';
            } else if (value.length < 2) {
                isValid = false;
                errorMessage = 'Empresa deve ter pelo menos 2 caracteres';
            }
            break;
    }

    if (!isValid) {
        showError(field, errorMessage);
    }

    return isValid;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showError(field, message) {
    field.classList.add('error');
    const errorElement = document.getElementById(`${field.name}Error`);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
}

function clearError(field) {
    field.classList.remove('error');
    const errorElement = document.getElementById(`${field.name}Error`);
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    }
}

function handleFormSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const nameInput = form.querySelector('#name');
    const emailInput = form.querySelector('#email');
    const companyInput = form.querySelector('#company');
    const termsInput = form.querySelector('#terms');
    const formMessage = document.getElementById('formMessage');

    // Limpar mensagens anteriores
    formMessage.className = '';
    formMessage.textContent = '';

    // Validar todos os campos
    let isValid = true;

    if (!validateField({ target: nameInput })) isValid = false;
    if (!validateField({ target: emailInput })) isValid = false;
    if (!validateField({ target: companyInput })) isValid = false;

    if (!termsInput.checked) {
        isValid = false;
        const termsError = document.getElementById('termsError');
        if (termsError) {
            termsError.textContent = 'Você deve concordar com os termos';
            termsError.classList.add('show');
        }
    }

    if (!isValid) {
        formMessage.className = 'form-message error';
        formMessage.textContent = 'Por favor, corrija os erros no formulário.';
        return;
    }

    // Dados do formulário
    const formData = {
        name: nameInput.value,
        email: emailInput.value,
        company: companyInput.value,
        phone: form.querySelector('#phone').value || 'Não informado'
    };

    // Simular envio
    console.log('Dados do formulário:', formData);

    // Mostrar sucesso
    formMessage.className = 'form-message success';
    formMessage.textContent = `✓ Obrigado, ${formData.name}! Sua inscrição foi confirmada. Verifique seu e-mail.`;

    // Limpar formulário
    form.reset();

    // Remover mensagem após 5 segundos
    setTimeout(() => {
        formMessage.className = '';
        formMessage.textContent = '';
    }, 5000);

    // Scroll para a mensagem de sucesso
    formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ===== Animações de Scroll =====
function initScrollAnimations() {
    const elements = document.querySelectorAll('[class*="animate-"]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    elements.forEach(element => {
        observer.observe(element);
    });
}

// ===== Utilitários =====

// Função para copiar para clipboard (opcional)
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        console.log('Copiado para a área de transferência!');
    }).catch(err => {
        console.error('Erro ao copiar:', err);
    });
}

// Função para adicionar classe com delay
function addClassWithDelay(element, className, delay) {
    setTimeout(() => {
        element.classList.add(className);
    }, delay);
}

// Função para remover classe com delay
function removeClassWithDelay(element, className, delay) {
    setTimeout(() => {
        element.classList.remove(className);
    }, delay);
}

// ===== Melhorias de Performance =====

// Lazy loading de imagens (se houver)
if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Event listener para analytics (opcional)
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-primary')) {
        trackEvent('button_click', {
            button_text: e.target.textContent,
            button_location: e.target.closest('section')?.id || 'unknown'
        });
    }
});

function trackEvent(eventName, eventData) {
    console.log(`Event: ${eventName}`, eventData);
    // Aqui você poderia enviar dados para um serviço de analytics
}

// ===== Debug Mode =====
const DEBUG = false;

if (DEBUG) {
    console.log('🚀 Tech Summit 2026 - Debug Mode Ativado');
    console.log('Documentação disponível em: https://techsummit2026.com.br/docs');
}

// ===== Exportar funções para console (desenvolvimento) =====
window.TechSummit = {
    trackEvent,
    copyToClipboard,
    validateEmail: isValidEmail,
    DEBUG
};
