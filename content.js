// 1. Your Master Profile (Hardcoded for Version 1)
const myProfile = {
  name: "John Doe",
  email: "John@gmail.com",
  phone: "123456789",
  linkedin: "https://linkedin.com/in/J-D",
  experience: "4 years",
  expectedSalary: "2250000",
};

// 2. Listen for the button click from popup.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "autofill") {
    runAutofill();
  }
});

// 3. The Main Function
function runAutofill() {
  const questionBlocks = document.querySelectorAll('div[role="listitem"]');
  
  questionBlocks.forEach(block => {
    const titleElement = block.querySelector('[role="heading"]');
    const inputElement = block.querySelector('input[type="text"], input[type="email"], textarea');
    
    if (!titleElement || !inputElement) return;

    // Clean question text and make lowercase for easy matching
    const questionText = titleElement.innerText.replace(/\*/g, '').trim().toLowerCase();
    
    // 4. Regex Matching Logic
    let valueToInject = "";

    if (questionText.match(/name|full name|first name/)) {
      valueToInject = myProfile.name;
    } else if (questionText.match(/email/)) {
      valueToInject = myProfile.email;
    } else if (questionText.match(/phone|mobile|contact/)) {
      valueToInject = myProfile.phone;
    } else if (questionText.match(/linkedin|url|profile/)) {
      valueToInject = myProfile.linkedin;
    } else if (questionText.match(/experience|years/)) {
      valueToInject = myProfile.experience;
    } else if (questionText.match(/salary|compensation/)) {
      valueToInject = myProfile.expectedSalary;
    }

    // 5. Inject the data if a match was found
    if (valueToInject !== "") {
      injectValue(inputElement, valueToInject);
    }
  });
}

// 6. The Injection Function (Bypasses Google's protections)
function injectValue(inputElement, value) {
  inputElement.focus();
  inputElement.value = value;
  inputElement.dispatchEvent(new Event('input', { bubbles: true }));
  inputElement.dispatchEvent(new Event('change', { bubbles: true }));
  inputElement.dispatchEvent(new Event('blur', { bubbles: true }));
}
