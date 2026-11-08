
document.addEventListener('DOMContentLoaded', () => {

    // Retrieve registration information
    const fullName = sessionStorage.getItem('conf_name');

    if (!fullName) {
        alert('No registration data found. Redirecting to home page.');
        window.location.href = 'index.html';
        return;
    }

    const email = sessionStorage.getItem('conf_email') || '';
    const github = sessionStorage.getItem('conf_github') || '';
    const avatar = sessionStorage.getItem('conf_avatar');
    const serial = sessionStorage.getItem('conf_serial') || '#01609';

    // Display registration information
    document.getElementById('display-name').textContent = fullName;
    document.getElementById('display-email').textContent = email;
    document.getElementById('ticket-name').textContent = fullName;
    document.getElementById('ticket-github-handle').textContent = github;

    // Display ticket number
    const ticketSerial = document.getElementById('ticket-serial');

    if (ticketSerial) {
        ticketSerial.textContent = serial;
    }

    // Display uploaded avatar
    const ticketAvatar = document.getElementById('ticket-avatar');

    if (avatar && ticketAvatar) {
        ticketAvatar.src = avatar;
    }

});
