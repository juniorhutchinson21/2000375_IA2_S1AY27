document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('ticket-form');
    const dropzone = document.getElementById('dropzone');
    const avatarInput = document.getElementById('avatar-input');
    const dropzoneContent = document.getElementById('dropzone-content');
    const previewContainer = document.getElementById('preview-container');
    const avatarPreview = document.getElementById('avatar-preview');
    const removeAvatarBtn = document.getElementById('remove-avatar');
    const changeAvatarBtn = document.getElementById('change-avatar');

    let uploadedImageSrc = '';

    function handleImageFile(file) {
        const avatarError = document.getElementById('avatar-error');

        if (file.size > 500000) {
            avatarError.textContent = 'File too large. Must be beneath 500KB.';
            avatarInput.value = '';
            return;
        }

        if (!['image/jpeg', 'image/png'].includes(file.type)) {
            avatarError.textContent = 'Only PNG or JPEG formats are supported.';
            avatarInput.value = '';
            return;
        }

        const reader = new FileReader();

        reader.onload = (event) => {
            uploadedImageSrc = event.target.result;
            avatarPreview.src = uploadedImageSrc;
            dropzoneContent.classList.add('hidden');
            previewContainer.classList.remove('hidden');
            avatarError.textContent = '';
        };

        reader.readAsDataURL(file);
    }

    if (dropzone && avatarInput) {
        dropzone.addEventListener('click', (event) => {
            if (!event.target.closest('button')) {
                avatarInput.click();
            }
        });

        dropzone.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                avatarInput.click();
            }
        });

        avatarInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                handleImageFile(file);
            }
        });
    }

    if (removeAvatarBtn) {
        removeAvatarBtn.addEventListener('click', (event) => {
            event.stopPropagation();
            uploadedImageSrc = '';
            avatarInput.value = '';
            avatarPreview.src = '';
            previewContainer.classList.add('hidden');
            dropzoneContent.classList.remove('hidden');
            document.getElementById('avatar-error').textContent = '';
        });
    }

    if (changeAvatarBtn) {
        changeAvatarBtn.addEventListener('click', (event) => {
            event.stopPropagation();
            avatarInput.click();
        });
    }

    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const fullName = document.getElementById('fullname').value.trim();
            const email = document.getElementById('email').value.trim();
            const github = document.getElementById('github').value.trim();

            let isValid = true;

            const nameError = document.getElementById('name-error');
            if (!fullName) {
                nameError.textContent = 'Full name is required.';
                isValid = false;
            } else {
                nameError.textContent = '';
            }

            const emailError = document.getElementById('email-error');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                emailError.textContent = 'Please enter a valid email address (user@domain.com).';
                isValid = false;
            } else {
                emailError.textContent = '';
            }

            const githubError = document.getElementById('github-error');
            if (!github.startsWith('@') || github.length < 2) {
                githubError.textContent = 'GitHub username must start with @ and include a username.';
                isValid = false;
            } else {
                githubError.textContent = '';
            }

            const avatarError = document.getElementById('avatar-error');
            if (!uploadedImageSrc) {
                avatarError.textContent = 'Please upload an avatar graphic.';
                isValid = false;
            } else {
                avatarError.textContent = '';
            }

            if (!isValid) return;

            sessionStorage.setItem('conf_name', fullName);
            sessionStorage.setItem('conf_email', email);
            sessionStorage.setItem('conf_github', github);
            sessionStorage.setItem('conf_avatar', uploadedImageSrc);

            const serialTracker = '#' + Math.floor(10000 + Math.random() * 90000);
            sessionStorage.setItem('conf_serial', serialTracker);

            window.location.href = 'ticket.html';
        });
    }
});
