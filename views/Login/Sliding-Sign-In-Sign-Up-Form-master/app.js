const sign_in_btn = document.querySelector("#sign-in-btn");


const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});




document.addEventListener("DOMContentLoaded", function () {
  const getOtpBtn = document.getElementById("get-otp-btn");
  const otpSection = document.getElementById("otp-section");

  getOtpBtn.addEventListener("click", function () {
    // Check if the OTP input already exists
    if (!document.getElementById("otp-input")) {
      // Create the OTP input field dynamically
      const otpField = document.createElement("div");
    
      otpField.classList.add("input-field");

      otpField.innerHTML = `
        <i class="fas fa-key"></i>
        <input type="text" id="otp-input" placeholder="Enter OTP" maxlength="6" />
      `;
    
     
      getOtpBtn.textContent = "OTP Sent";
      getOtpBtn.disabled = true;
     
      otpSection.appendChild(otpField);
      

    }
  });
});
