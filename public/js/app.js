const regForm = document.getElementById('registrationForm');

const API_URL = 'http://localhost:5000/api';

if (regForm) {
    regForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = regForm.querySelector('button');
        const msg = document.getElementById('regMsg');

        const data = {
            name: document.getElementById('regName').value,
            email: document.getElementById('regEmail').value,
            studentId: document.getElementById('regStudentId').value
        };

        try {
            btn.disabled = true;
            btn.textContent = 'Processing...';

            const res = await fetch(`${API_URL}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const result = await res.json();
            if (result.success) {
                regForm.reset();
                showModal({
                    title: 'Registration Successful!',
                    message: 'Welcome to the Webinar! Your registration is complete. We will send your certificate after the event.',
                    type: 'success',
                    confirmText: 'Awesome!',
                    onConfirm: () => {
                        window.location.href = 'index.html';
                    }
                });
            } else {
                msg.textContent = result.message;
                msg.style.color = '#f87171';
            }

        } catch (err) {
            msg.textContent = 'Connection error. Please try again.';
            msg.style.color = '#f87171';
        } finally {
            btn.disabled = false;
            btn.textContent = 'Complete Registration';
        }
    });
}
