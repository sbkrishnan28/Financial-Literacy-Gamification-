const validUsers = [
    { username: "sbkcuddalore", password: "12345678" },
    { username: "narainkarthikeyan", password: "12345678" },
    { username: "maruthavanan", password: "12345678" },
    { username: "naveen s", password: "12345678" },
    { username: "purushothaman", password: "12345678" },
    { username: "mathusuthanan", password: "12345678" },
    { username: "rupesh", password: "12345678" },
    { username: "magesh", password: "12345678" },
    { username: "adithya", password: "12345678" }
];

const socialMediaUser = { username: "sbk@gmail.com", password: "123456789" };

const questions = [
    {
        question: "You receive an email claiming your bank account has been compromised and asks you to click a link to verify your details. What should you do?",
        options: ["Click the link and enter your details immediately.", "Forward the email to your friends for advice.", "Contact your bank directly using a known number or website.", "Reply to the email asking for more information."],
        answer: "Contact your bank directly using a known number or website."
    },
    {
        question: "A caller claims to be from tech support, stating your computer has a virus and needs remote access. How do you respond?",
        options: ["Grant them remote access to fix the issue.", "Provide them with your computer's serial number.", "Hang up and contact your legitimate tech support if needed.", "Ask them for their employee ID and verify it online."],
        answer: "Hang up and contact your legitimate tech support if needed."
    },
    {
        question: "You see an online ad for a luxury item at an unbelievably low price. What's the biggest red flag?",
        options: ["The item is popular.", "The price is too good to be true.", "The website looks professional.", "The seller has many positive reviews."],
        answer: "The price is too good to be true."
    },
    {
        question: "A social media friend sends you a message with a link to a 'free gift card.' What's your first reaction?",
        options: ["Click the link and claim the gift card.", "Share the link with your other friends.", "Be suspicious and avoid clicking the link; verify with the friend directly.", "Report the link to the social media platform."],
        answer: "Be suspicious and avoid clicking the link; verify with the friend directly."
    }
];

let currentQuestion = 0;
let score = 0;
let selectedOption = null;
let loggedInUser = null;

const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const feedbackElement = document.getElementById('feedback');
const scoreElement = document.getElementById('score');
const loginForm = document.getElementById('login-form');
const loginErrorElement = document.getElementById('login-error');
const loginIconElement = document.getElementById('login-icon');
const socialLoginButtons = document.querySelectorAll('.social-icon');

loginForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const validUser = validUsers.find(user => user.username === username && user.password === password);

    if (validUser) {
        loggedInUser = validUser.username;
        loginIconElement.textContent = `Logged in as: ${loggedInUser}`;
        openTab('quiz');
    } else {
        loginErrorElement.style.display = 'block';
    }
});

socialLoginButtons.forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault();
        loggedInUser = socialMediaUser.username;
        loginIconElement.textContent = `Logged in as: ${loggedInUser}`;
        openTab('quiz');
    });
});

function openTab(tabName) {
    const tabs = document.getElementsByClassName('tab-content');
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove('active');
    }
    document.getElementById(tabName).classList.add('active');
    if (tabName === 'quiz') {
        loadQuestion();
    }
}

function loadQuestion() {
    const q = questions[currentQuestion];
    questionElement.textContent = q.question;
    optionsElement.innerHTML = '';
    q.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.addEventListener('click', () => {
            selectOption(button, option);
        });
        optionsElement.appendChild(button);
    });
    selectedOption = null;
    feedbackElement.textContent = '';
}

function selectOption(button, option) {
    const buttons = optionsElement.querySelectorAll('button');
    buttons.forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');
    selectedOption = option;
    checkAnswer();
}

function checkAnswer() {
    if (selectedOption === null) return;
    const q = questions[currentQuestion];
    if (selectedOption === q.answer) {
        feedbackElement.textContent = "Protocol Accepted. Access Granted.";
        score += 5;
    } else {
        feedbackElement.textContent = "Protocol Failed. Access Denied.";
    }
    scoreElement.textContent = `Score: ${score}`;
    currentQuestion++;
    if (currentQuestion < questions.length) {
        setTimeout(loadQuestion, 1500);
    } else {
        questionElement.textContent = "Breach Protocol Completed.";
        optionsElement.innerHTML = '';
        feedbackElement.textContent = "";
    }
}

document.addEventListener("DOMContentLoaded", function() {
    openTab('home');
});
