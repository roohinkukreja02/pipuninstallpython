const nextButton = document.querySelector('.btn-next')
const prevButton = document.querySelector('.btn-prev')
const steps = document.querySelectorAll('.step')
const form_steps = document.querySelectorAll('.form-step')
let active = 1;

nextButton.addEventListener('click', (e) => {
    e.preventDefault();
    active++
    if(active > steps.length){
        active = steps.length
    }
    updateProgress();
})

prevButton.addEventListener('click', (e) => {
    e.preventDefault();
    active--
    if(active < 1){
        active = 1
    }
    updateProgress();
})

const updateProgress = () =>{
    console.log('steps.length => ' + steps.length)
    console.log('active => ' + active)

    //toggle 
    steps.forEach((step, i) => {
        if (i === (active-1)) {
          step.classList.add('active');
          form_steps[i].classList.add('active');
          console.log('i =>' + i);
        } else {
          step.classList.remove('active');
          form_steps[i].classList.remove('active');
        }
    })

    //enable disable 
    if (active === 1){
        prevButton.disabled = true
    }
    else if(active === steps.length){
        nextButton.disabled = true
    }
    else{
        prevButton.disabled = false
        nextButton.disabled = false
    }
}
const skillsContainer = document.querySelector('.skills-input-container');
const skillsInput = document.getElementById('skillsInput');

// Add skill when user presses 'Enter' or ',' key
function addSkill(event) {
    const inputValue = skillsInput.value.trim();

    if ((event.key === 'Enter' || event.key === ',') && inputValue !== '') {
        event.preventDefault(); // Prevent form submission

        // Create a skill box element
        const skillBox = document.createElement('div');
        skillBox.classList.add('skill-box');
        skillBox.innerHTML = `
            <span>${inputValue}</span>
            <button class="remove-skill-btn" onclick="removeSkill(this)">x</button>
        `;

        // Add skill box to the container and clear input
        skillsContainer.insertBefore(skillBox, skillsInput);
        skillsInput.value = '';
    }
}

// Remove skill box
function removeSkill(button) {
    const skillBox = button.parentElement;
    skillsContainer.removeChild(skillBox);
}
const urlsContainer = document.querySelector('.urls-input-container');
const urlsInput = document.getElementById('urlsInput');

// Add URL when user presses 'Enter' or ',' key
function addUrl(event) {
    const urlValue = urlsInput.value.trim();

    if ((event.key === 'Enter' || event.key === ',') && urlValue !== '') {
        event.preventDefault(); // Prevent form submission

        // Create a URL box element
        const urlBox = document.createElement('div');
        urlBox.classList.add('skill-box');  // Reuse the same styling as skills
        urlBox.innerHTML = `
            <span>${urlValue}</span>
            <button class="remove-skill-btn" onclick="removeUrl(this)">x</button>
        `;

        // Add URL box to the container and clear input
        urlsContainer.insertBefore(urlBox, urlsInput);
        urlsInput.value = '';
    }
}

// Remove URL box
function removeUrl(button) {
    const urlBox = button.parentElement;
    urlsContainer.removeChild(urlBox);
}
