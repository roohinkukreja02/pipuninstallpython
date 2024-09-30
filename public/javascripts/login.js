document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('container');
    const sendOtpButton = document.getElementById('sendOtpButton');
    const verifyOtpButton = document.getElementById('verifyOtpButton');
    const signInForm = document.getElementById('signInForm');
    const otpForm = document.getElementById('otpForm');


    // Toggle between sign up and sign in forms
    const registerbtn = document.getElementById('register');
    const loginbtn = document.getElementById('login');

    registerbtn.addEventListener('click', () => {
        container.classList.add("active");
    });

    loginbtn.addEventListener('click', () => {
        container.classList.remove("active");
    });


    // Agar tuje click ke baad appear karna ho toh neeche wala part ka comment nikal dena and #otpform ke display ko none kar dena css file mein
    // sendOtpButton.addEventListener('click', function (event) {
    //     event.preventDefault();
    //     otpForm.style.display = 'block';
    // });
   /*
    verifyOtpButton.addEventListener('click', function (event) {
        event.preventDefault();
        console.log('OTP verified');
    });
*/
    // Toggle password visibility
    document.querySelectorAll('.toggle-password').forEach(item => {
        item.addEventListener('click', function () {
            const passwordField = this.previousElementSibling;
            if (passwordField.type === "password") {
                passwordField.type = "text";
                this.classList.remove("fa-eye-slash");
                this.classList.add("fa-eye");
            } else {
                passwordField.type = "password";
                this.classList.remove("fa-eye");
                this.classList.add("fa-eye-slash");
            }
        });
    });



    /*
    // Handle userType query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const userType = urlParams.get('usertype');

    if (userType === 'freelancer') {
        console.log('Freelancer logging in');
    } else if (userType === 'client') {
        console.log('Client logging in');
    } else {
        console.log('Unknown user type');
    }
        */
});
