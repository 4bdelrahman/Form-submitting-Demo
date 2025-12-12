// ===================================
// CONFIGURATION
// ===================================
const CONFIG = {
    // Replace this URL with your webhook endpoint
    // Examples:
    // - Webhook.site: https://webhook.site/your-unique-url
    // - Discord: https://discord.com/api/webhooks/your-webhook
    // - Zapier: https://hooks.zapier.com/hooks/catch/your-hook
    // - Make.com: https://hook.us1.make.com/your-hook
    webhookUrl: 'YOUR_WEBHOOK_URL_HERE', // Replace with your webhook URL (see WEBHOOK_SETUP.md)

    // Validation rules
    validation: {
        minNameLength: 2,
        phoneRegex: /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/,
        emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    }
};

// ===================================
// FORM VALIDATION
// ===================================
class FormValidator {
    constructor(form) {
        this.form = form;
        this.errors = {};
    }

    // Validate full name
    validateFullName(value) {
        if (!value || value.trim().length < CONFIG.validation.minNameLength) {
            return 'Please enter a valid full name';
        }
        return null;
    }

    // Validate email
    validateEmail(value) {
        if (!value || !CONFIG.validation.emailRegex.test(value)) {
            return 'Please enter a valid email address';
        }
        return null;
    }

    // Validate phone
    validatePhone(value) {
        if (!value || !CONFIG.validation.phoneRegex.test(value)) {
            return 'Please enter a valid phone number';
        }
        return null;
    }

    // Validate select field
    validateSelect(value, fieldName) {
        if (!value || value === '') {
            return `Please select a ${fieldName}`;
        }
        return null;
    }

    // Validate required field
    validateRequired(value, fieldName) {
        if (!value || value.trim() === '') {
            return `${fieldName} is required`;
        }
        return null;
    }

    // Show error message
    showError(fieldId, message) {
        const errorElement = document.getElementById(`${fieldId}Error`);
        const inputElement = document.getElementById(fieldId);

        if (errorElement && inputElement) {
            errorElement.textContent = message;
            inputElement.classList.add('error');
            this.errors[fieldId] = message;
        }
    }

    // Clear error message
    clearError(fieldId) {
        const errorElement = document.getElementById(`${fieldId}Error`);
        const inputElement = document.getElementById(fieldId);

        if (errorElement && inputElement) {
            errorElement.textContent = '';
            inputElement.classList.remove('error');
            delete this.errors[fieldId];
        }
    }

    // Clear all errors
    clearAllErrors() {
        const errorElements = this.form.querySelectorAll('.error-message');
        const inputElements = this.form.querySelectorAll('.error');

        errorElements.forEach(el => el.textContent = '');
        inputElements.forEach(el => el.classList.remove('error'));

        this.errors = {};
    }

    // Validate all fields
    validateAll(formData) {
        this.clearAllErrors();

        // Validate full name
        const nameError = this.validateFullName(formData.fullName);
        if (nameError) this.showError('fullName', nameError);

        // Validate email
        const emailError = this.validateEmail(formData.email);
        if (emailError) this.showError('email', emailError);

        // Validate phone
        const phoneError = this.validatePhone(formData.phone);
        if (phoneError) this.showError('phone', phoneError);

        // Validate property type
        const propertyTypeError = this.validateSelect(formData.propertyType, 'property type');
        if (propertyTypeError) this.showError('propertyType', propertyTypeError);

        // Validate budget
        const budgetError = this.validateSelect(formData.budget, 'budget range');
        if (budgetError) this.showError('budget', budgetError);

        // Validate location
        const locationError = this.validateRequired(formData.location, 'Location');
        if (locationError) this.showError('location', locationError);

        return Object.keys(this.errors).length === 0;
    }
}

// ===================================
// FORM HANDLER
// ===================================
class FormHandler {
    constructor(formId) {
        this.form = document.getElementById(formId);
        this.submitBtn = document.getElementById('submitBtn');
        this.statusMessage = document.getElementById('statusMessage');
        this.validator = new FormValidator(this.form);

        this.init();
    }

    init() {
        // Add form submit listener
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));

        // Add real-time validation
        this.addRealtimeValidation();

        // Add input animations
        this.addInputAnimations();
    }

    // Add real-time validation on blur
    addRealtimeValidation() {
        const fields = ['fullName', 'email', 'phone', 'propertyType', 'budget', 'location'];

        fields.forEach(fieldId => {
            const input = document.getElementById(fieldId);
            if (input) {
                input.addEventListener('blur', () => {
                    const value = input.value;
                    let error = null;

                    switch (fieldId) {
                        case 'fullName':
                            error = this.validator.validateFullName(value);
                            break;
                        case 'email':
                            error = this.validator.validateEmail(value);
                            break;
                        case 'phone':
                            error = this.validator.validatePhone(value);
                            break;
                        case 'propertyType':
                            error = this.validator.validateSelect(value, 'property type');
                            break;
                        case 'budget':
                            error = this.validator.validateSelect(value, 'budget range');
                            break;
                        case 'location':
                            error = this.validator.validateRequired(value, 'Location');
                            break;
                    }

                    if (error) {
                        this.validator.showError(fieldId, error);
                    } else {
                        this.validator.clearError(fieldId);
                    }
                });

                // Clear error on input
                input.addEventListener('input', () => {
                    this.validator.clearError(fieldId);
                });
            }
        });
    }

    // Add input focus animations
    addInputAnimations() {
        const inputs = this.form.querySelectorAll('.form-input, .form-select, .form-textarea');

        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });

            input.addEventListener('blur', () => {
                input.parentElement.classList.remove('focused');
            });
        });
    }

    // Get form data
    getFormData() {
        return {
            fullName: document.getElementById('fullName').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            propertyType: document.getElementById('propertyType').value,
            budget: document.getElementById('budget').value,
            location: document.getElementById('location').value.trim(),
            message: document.getElementById('message').value.trim(),
            newsletter: document.getElementById('newsletter').checked,
            timestamp: new Date().toISOString(),
            source: 'Real Estate Lead Form'
        };
    }

    // Show status message
    showStatus(message, type) {
        this.statusMessage.textContent = message;
        this.statusMessage.className = `status-message ${type} show`;

        // Auto-hide after 5 seconds
        setTimeout(() => {
            this.statusMessage.classList.remove('show');
        }, 5000);
    }

    // Set loading state
    setLoading(isLoading) {
        if (isLoading) {
            this.submitBtn.classList.add('loading');
            this.submitBtn.disabled = true;
        } else {
            this.submitBtn.classList.remove('loading');
            this.submitBtn.disabled = false;
        }
    }

    // Send data to webhook
    async sendToWebhook(data) {
        // Check if webhook URL is configured
        if (CONFIG.webhookUrl === 'YOUR_WEBHOOK_URL_HERE') {
            console.warn('Webhook URL not configured. Please update CONFIG.webhookUrl in script.js');
            console.log('Form data that would be sent:', data);

            // Simulate success for demo purposes
            return {
                success: true,
                message: 'Form submitted successfully! (Demo mode - configure webhook to send data)'
            };
        }

        try {
            const response = await fetch(CONFIG.webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return {
                success: true,
                message: 'Your inquiry has been submitted successfully! We\'ll contact you within 24 hours.'
            };
        } catch (error) {
            console.error('Webhook error:', error);
            throw new Error('Failed to submit form. Please try again later.');
        }
    }

    // Handle form submission
    async handleSubmit(e) {
        e.preventDefault();

        // Get form data
        const formData = this.getFormData();

        // Validate
        if (!this.validator.validateAll(formData)) {
            this.showStatus('Please fix the errors above', 'error');

            // Scroll to first error
            const firstError = this.form.querySelector('.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }

        // Set loading state
        this.setLoading(true);

        try {
            // Send to webhook
            const result = await this.sendToWebhook(formData);

            // Show success message
            this.showStatus(result.message, 'success');

            // Reset form
            this.form.reset();

            // Track conversion (optional - add your analytics code here)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'form_submit', {
                    'form_name': 'real_estate_lead_form'
                });
            }

        } catch (error) {
            // Show error message
            this.showStatus(error.message, 'error');
        } finally {
            // Remove loading state
            this.setLoading(false);
        }
    }
}

// ===================================
// INITIALIZATION
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize form handler
    const formHandler = new FormHandler('leadForm');

    // Add smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add entrance animations on scroll (optional)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements (optional feature)
    const animatedElements = document.querySelectorAll('.info-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    console.log('🏠 Real Estate Lead Form initialized successfully!');
    console.log('📝 Configure your webhook URL in script.js to start receiving submissions');
});

// ===================================
// UTILITY FUNCTIONS
// ===================================

// Format phone number as user types (optional enhancement)
function formatPhoneNumber(input) {
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 0) {
                if (value.length <= 3) {
                    value = `(${value}`;
                } else if (value.length <= 6) {
                    value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
                } else {
                    value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
                }
            }
            e.target.value = value;
        });
    }
}

// Initialize phone formatting on load
document.addEventListener('DOMContentLoaded', formatPhoneNumber);
