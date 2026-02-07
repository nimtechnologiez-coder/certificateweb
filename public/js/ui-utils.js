/**
 * UI Utilities for Modern Modals
 */

window.showModal = function (options) {
    const {
        title = 'Notification',
        message = '',
        type = 'info', // info, success, warning
        confirmText = 'OK',
        cancelText = null,
        onConfirm = () => { },
        onCancel = () => { }
    } = options;

    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = `modal-overlay modal-${type}`;

    // Icon mapping
    const icons = {
        success: '✅',
        warning: '⚠️',
        info: 'ℹ️'
    };

    overlay.innerHTML = `
        <div class="modal-content">
            <span class="modal-icon">${icons[type] || '🔔'}</span>
            <h3 class="modal-title">${title}</h3>
            <p class="modal-message">${message}</p>
            <div class="modal-actions">
                ${cancelText ? `<button class="btn secondary" id="modalCancel">${cancelText}</button>` : ''}
                <button class="btn primary" id="modalConfirm">${confirmText}</button>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);

    // Trigger animation
    setTimeout(() => overlay.classList.add('active'), 10);

    return new Promise((resolve) => {
        const confirmBtn = overlay.querySelector('#modalConfirm');
        const cancelBtn = overlay.querySelector('#modalCancel');

        const close = (callback) => {
            overlay.classList.remove('active');
            setTimeout(() => {
                overlay.remove();
                if (callback) callback();
                resolve(callback === onConfirm);
            }, 300);
        };

        confirmBtn.onclick = () => close(onConfirm);
        if (cancelBtn) {
            cancelBtn.onclick = () => close(onCancel);
        }
    });
};
