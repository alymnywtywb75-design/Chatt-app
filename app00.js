// إعداد Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBa8RFOYIM-qKvE2V96LZjjOzSIuCHy1sY",
  authDomain: "chattt777-657f4.firebaseapp.com",
  projectId: "chattt777-657f4",
  storageBucket: "chattt777-657f4.firebasestorage.app",
  messagingSenderId: "860297035323",
  appId: "1:860297035323:web:83ff25c8b537570710a61e"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// عناصر HTML
const phoneInput = document.getElementById("phone");
const loginBtn = document.getElementById("loginBtn");
const otpSection = document.getElementById("otpSection");
const codeInput = document.getElementById("otpCode");
const verifyBtn = document.getElementById("verifyBtn");

// إنشاء reCAPTCHA
window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(loginBtn, {
  size: "invisible"
});

// إرسال الكود
loginBtn.addEventListener("click", () => {
  const phoneNumber = phoneInput.value;
  const appVerifier = window.recaptchaVerifier;

  auth.signInWithPhoneNumber(phoneNumber, appVerifier)
    .then((confirmationResult) => {
      window.confirmationResult = confirmationResult;
      alert("تم إرسال الكود ✅");
      otpSection.style.display = "block";
    })
    .catch((error) => {
      console.error("خطأ:", error);
      alert("فشل إرسال الكود ❌");
    });
});

// التحقق من الكود
verifyBtn.addEventListener("click", () => {
  const code = codeInput.value;
  window.confirmationResult.confirm(code)
    .then((result) => {
      const user = result.user;
      alert("تم تسجيل الدخول ✅ " + user.phoneNumber);
      // هنا تقدر تحوله لواجهة الشات
      window.location.href = "chat.html";
    })
    .catch((error) => {
      alert("الكود غير صحيح ❌");
    });
});