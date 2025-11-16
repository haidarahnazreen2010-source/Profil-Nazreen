// Script interaktif untuk web profil
document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const themeBtn = document.getElementById('toggleTheme');
  const copyBtn = document.getElementById('copyEmail');
  const dlBtn = document.getElementById('downloadCv');
  const sendBtn = document.getElementById('sendBtn');
  const formMsg = document.getElementById('formMsg');

  const name = document.getElementById('name').textContent.trim();
  document.getElementById('displayName').textContent = name;
  document.getElementById('footerName').textContent = name;
  document.getElementById('copyrightYear').textContent = new Date().getFullYear();

  const THEME_KEY = 'profile_theme';
  function setTheme(t) {
    body.setAttribute('data-theme', t);
    localStorage.setItem(THEME_KEY, t);
  }
  const saved = localStorage.getItem(THEME_KEY) || 'dark';
  setTheme(saved);

  themeBtn.addEventListener('click', () => {
    const cur = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    setTheme(cur);
  });

  copyBtn.addEventListener('click', async () => {
    const email = 'haidarahnazreen2010@gmail.com';
    try {
      await navigator.clipboard.writeText(email);
      copyBtn.textContent = 'Tersalin!';
      setTimeout(() => copyBtn.textContent = 'Salin Email', 1600);
    } catch {
      alert('Email: haidarahnazreen2010@gmail.com');
    }
  });

  // ===============================
  // 🚀 Kirim Pesan dengan EmailJS
  // Pastikan sudah menambahkan script EmailJS di index.html:
  // <script src="https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js"></script>
  // ===============================
  emailjs.init("N_TWvT4mX9SfAQmA9"); // Public Key kamu

  sendBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const n = document.getElementById('inputName').value.trim();
    const eMail = document.getElementById('inputEmail').value.trim();
    const m = document.getElementById('inputMessage').value.trim();

    if (!n || !eMail || !m) {
      formMsg.textContent = 'Isi semua field sebelum mengirim.';
      return;
    }

    formMsg.textContent = 'Mengirim...';

    // ⚠️ Perhatikan urutannya: service ID dulu, lalu template ID
    emailjs.send("service_7sjcf2p", "template_y9sg73c", {
      from_name: n,
      from_email: eMail,
      message: m
    }).then(() => {
      formMsg.textContent = 'Pesan terkirim — terima kasih!';
      document.getElementById('contactForm').reset();
    }).catch((error) => {
      console.error('Gagal mengirim:', error);
      formMsg.textContent = 'Terjadi kesalahan. Coba lagi nanti.';
    });
  });

  // ===============================
  // 📄 Tombol Download CV
  // ===============================
  dlBtn.addEventListener("click", function() {
    window.location.href = "CV Nazreen.pdf";
  });
});
