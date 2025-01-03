import { loadCSS } from "../utils/loadcss";
import { language } from "../utils/language";
export function loadChangePassword() {
  loadCSS("../styles/changePassword.css");
  const languageKey = localStorage.getItem("selectedLanguage");
  const html = `<div class="change-pw-container">
      <h1 class="change-pw-title">${language[languageKey]["ChangePassword"]}</h1>
      <div class="change-pw-content">
        <div class="form-section">
          <form class="change-pw-form">
            <div class="form-group">
              <label class="form-label">${language[languageKey]["CurrentPassword"]}</label>
              <div class="password-input-container">
                <input type="password" id="currentPassword" class="form-input">
                <span class="password-toggle" data-for="currentPassword">
                  <i class="fa-regular fa-eye-slash"></i>
                </span>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">${language[languageKey]["NewPassword"]}</label>
              <div class="password-input-container">
                <input type="password" id="newPassword" class="form-input">
                <span class="password-toggle" data-for="newPassword">
                  <i class="fa-regular fa-eye-slash"></i>
                </span>
              </div>
              <div class="pw-rules-msg">${language[languageKey]["PasswordRule"]}</div>
            </div>
            <div class="form-group">
              <label class="form-label">${language[languageKey]["ConfirmPassword"]}</label>
              <div class="password-input-container">
                <input type="password" id="newPassword_retype" class="form-input">
                <span class="password-toggle" data-for="newPassword_retype">
                  <i class="fa-regular fa-eye-slash"></i>
                </span>
              </div>
              <div id="newPwIncorrectMsg" class="new-pw-incorrect-msg">
              ${language[languageKey]["IncorrectPassword"]}
              </div>
            </div>
          </form>
          <div class="change-pw-form-buttons">
            <button type="button" class="pw-cancel-btn">
                <a href="/dashboard" data-router-link>${language[languageKey]["Back"]}</a>
            </button>
            <button type="submit" class="pw-save-btn">${language[languageKey]["Change"]}</button>
          </div>
        </div>
      </div>
    </div>`;

  document.getElementById("app").innerHTML = html;

  // 모든 비밀번호 입력 필드에 토글 기능 추가
  const toggles = document.querySelectorAll(".password-toggle");
  toggles.forEach((toggle) => {
    toggle.addEventListener("click", function () {
      const targetId = this.getAttribute("data-for");
      const passwordInput = document.getElementById(targetId);
      const icon = this.querySelector("i");

      if (passwordInput.type === "password") {
        passwordInput.type = "text";
        icon.className = "fa-regular fa-eye";
      } else {
        passwordInput.type = "password";
        icon.className = "fa-regular fa-eye-slash";
      }
    });
  });

  // 비밀번호 확인 로직
  const newPassword = document.getElementById("newPassword");
  const newPasswordRetype = document.getElementById("newPassword_retype");
  const newPwIncorrectMsg = document.getElementById("newPwIncorrectMsg");

  function checkPasswords() {
    if (newPassword.value !== newPasswordRetype.value) {
      newPwIncorrectMsg.style.visibility = "visible";
    } else {
      newPwIncorrectMsg.style.visibility = "hidden";
    }
  }

  newPassword.addEventListener("input", checkPasswords);
  newPasswordRetype.addEventListener("input", checkPasswords);

  // 폼 제출 이벤트
  const saveBtn = document.getElementById("saveBtn");
  saveBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (newPassword.value === newPasswordRetype.value) {
      alert(language[languageKey]["SuccessPasswordChange"]);
    } else {
      alert(language[languageKey]["FailPasswordChange"]);
    }
  });
}
