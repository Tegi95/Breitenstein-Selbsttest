// Test Questions and Configuration
const testQuestions = [
    {
        question: "Wie gut ist Ihr Unternehmen auf disruptive Veränderungen vorbereitet?",
        answers: [
            { text: "Wir haben robuste Change-Management-Prozesse und sind sehr agil", points: 3 },
            { text: "Wir reagieren auf Veränderungen, aber nicht immer proaktiv", points: 2 },
            { text: "Wir sind eher traditionell und zögerlich bei Veränderungen", points: 1 }
        ]
    },
    {
        question: "Wie stark ist die Führungskultur in Ihrem Unternehmen ausgeprägt?",
        answers: [
            { text: "Alle Führungskräfte leben eine klare Vision und inspirieren ihre Teams", points: 3 },
            { text: "Einige Führungskräfte sind vorbildlich, andere weniger", points: 2 },
            { text: "Führungskultur ist schwach oder nicht definiert", points: 1 }
        ]
    },
    {
        question: "Wie bewerten Sie Ihre geopolitische Risikobewertung?",
        answers: [
            { text: "Wir haben systematische Prozesse zur Überwachung geopolitischer Risiken", points: 3 },
            { text: "Wir beobachten Entwicklungen, aber ohne strukturierte Analyse", points: 2 },
            { text: "Geopolitische Risiken werden kaum berücksichtigt", points: 1 }
        ]
    },
    {
        question: "Wie schnell können Sie strategische Entscheidungen treffen und umsetzen?",
        answers: [
            { text: "Sehr schnell - wir haben flache Hierarchien und klare Entscheidungsprozesse", points: 3 },
            { text: "Mittelmäßig - Entscheidungen dauern manchmal zu lange", points: 2 },
            { text: "Langsam - viele Entscheidungsebenen und Bürokratie", points: 1 }
        ]
    },
    {
        question: "Wie gut ist Ihr Unternehmen auf Lieferketten-Risiken vorbereitet?",
        answers: [
            { text: "Wir haben diversifizierte Lieferketten und Backup-Strategien", points: 3 },
            { text: "Wir haben einige Alternativen, aber nicht systematisch", points: 2 },
            { text: "Wir sind stark von wenigen Lieferanten abhängig", points: 1 }
        ]
    },
    {
        question: "Wie stark fördern Sie Innovation und kontinuierliche Verbesserung?",
        answers: [
            { text: "Innovation ist Teil unserer DNA - wir experimentieren aktiv", points: 3 },
            { text: "Wir verbessern uns, aber Innovation ist nicht Priorität", points: 2 },
            { text: "Wir halten uns an bewährte Methoden und sind konservativ", points: 1 }
        ]
    },
    {
        question: "Wie gut können Sie auf Marktveränderungen und neue Technologien reagieren?",
        answers: [
            { text: "Wir sind Vorreiter und prägen Markttrends aktiv mit", points: 3 },
            { text: "Wir folgen Trends, aber nicht immer als Erste", points: 2 },
            { text: "Wir reagieren spät oder gar nicht auf Marktveränderungen", points: 1 }
        ]
    },
    {
        question: "Wie resilient ist Ihre Organisationskultur in Krisenzeiten?",
        answers: [
            { text: "Unsere Teams sind sehr resilient und wachsen an Herausforderungen", points: 3 },
            { text: "Wir bewältigen Krisen, aber mit erheblichem Stress", points: 2 },
            { text: "Krisen überfordern uns oft und führen zu Chaos", points: 1 }
        ]
    }
];

// Result categories
const resultCategories = [
    {
        minScore: 0,
        maxScore: 14,
        title: "Kritischer Handlungsbedarf",
        description: "Ihr Unternehmen zeigt deutlichen Verbesserungsbedarf in Change Management, Leadership und geopolitische Resilienz. Die aktuelle VUCA-Welt erfordert eine grundlegende Transformation Ihrer Organisationsstruktur und Führungskultur. Wir empfehlen, mit der Entwicklung einer robusten Change-Management-Strategie zu beginnen."
    },
    {
        minScore: 15,
        maxScore: 19,
        title: "Gute Ansätze, aber Entwicklungspotenzial",
        description: "Sie haben bereits solide Grundlagen in Leadership und Change Management geschaffen. Mit gezielten Verbesserungen in der geopolitischen Risikobewertung und der Stärkung Ihrer Organisationsresilienz können Sie Ihr Unternehmen deutlich zukunftsfähiger machen. Fokus auf agile Führung und strategische Anpassungsfähigkeit wird empfohlen."
    },
    {
        minScore: 20,
        maxScore: 24,
        title: "Ihr Unternehmen ist auf einem sehr guten Weg",
        description: "Herzlichen Glückwunsch! Ihr Unternehmen zeigt bereits eine hohe Resilienz und Anpassungsfähigkeit. Mit gezielten Optimierungen können Sie sich weiterhin als Vorreiter in Change Management und Leadership positionieren und auch in turbulenten geopolitischen Zeiten erfolgreich agieren."
    }
];

// Global variables
let currentQuestionIndex = 0;
let userAnswers = [];
let totalScore = 0;

// DOM elements
const screens = {
    welcome: document.getElementById('welcome-screen'),
    question: document.getElementById('question-screen'),
    results: document.getElementById('results-screen'),
    leadForm: document.getElementById('lead-form-screen')
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadStyleguide();
    initializeEventListeners();
});

// Load and apply styleguide
async function loadStyleguide() {
    try {
        const response = await fetch('Styleguide.json');
        const styleguide = await response.json();
        applyStyleguide(styleguide);
    } catch (error) {
        console.log('Styleguide konnte nicht geladen werden, verwende Standard-Styles');
    }
}

function applyStyleguide(styleguide) {
    // Apply brand colors if needed
    const root = document.documentElement;
    
    // You can add dynamic style application here if needed
    // For now, the CSS variables are already set in the CSS file
    console.log('Styleguide geladen:', styleguide.brand.name);
}

// Initialize event listeners
function initializeEventListeners() {
    // Start test button
    document.getElementById('start-test').addEventListener('click', startTest);
    
    // Navigation buttons
    document.getElementById('retake-test').addEventListener('click', resetTest);
    document.getElementById('show-lead-form').addEventListener('click', showLeadForm);
    
    // Lead form submission
    document.getElementById('lead-form').addEventListener('submit', handleLeadFormSubmission);
}

// Start the test
function startTest() {
    currentQuestionIndex = 0;
    userAnswers = [];
    totalScore = 0;
    showScreen('question');
    displayQuestion();
}

// Display current question
function displayQuestion() {
    const question = testQuestions[currentQuestionIndex];
    const questionText = document.getElementById('question-text');
    const answersContainer = document.getElementById('answers-container');
    const progressFill = document.getElementById('progress-fill');
    
    // Update question text
    questionText.textContent = question.question;
    
    // Update progress bar
    const progress = ((currentQuestionIndex + 1) / testQuestions.length) * 100;
    progressFill.style.width = progress + '%';
    
    // Clear previous answers
    answersContainer.innerHTML = '';
    
    // Create answer options
    question.answers.forEach((answer, index) => {
        const answerElement = document.createElement('div');
        answerElement.className = 'answer-option';
        answerElement.textContent = answer.text;
        answerElement.dataset.points = answer.points;
        
        answerElement.addEventListener('click', () => selectAnswer(answer.points));
        
        answersContainer.appendChild(answerElement);
    });
}

// Handle answer selection
function selectAnswer(points) {
    // Store the answer
    userAnswers[currentQuestionIndex] = points;
    
    // Visual feedback
    const selectedOption = event.target;
    const allOptions = selectedOption.parentNode.querySelectorAll('.answer-option');
    
    allOptions.forEach(option => option.classList.remove('selected'));
    selectedOption.classList.add('selected');
    
    // Wait a moment for visual feedback, then proceed
    setTimeout(() => {
        if (currentQuestionIndex < testQuestions.length - 1) {
            currentQuestionIndex++;
            displayQuestion();
        } else {
            calculateResults();
        }
    }, 500);
}

// Calculate and display results
function calculateResults() {
    totalScore = userAnswers.reduce((sum, points) => sum + points, 0);
    
    // Find result category
    const result = resultCategories.find(category => 
        totalScore >= category.minScore && totalScore <= category.maxScore
    );
    
    // Update results display
    document.getElementById('score-number').textContent = totalScore;
    document.getElementById('score-category').textContent = result.title;
    document.getElementById('result-description').textContent = result.description;
    
    showScreen('results');
}

// Show specific screen
function showScreen(screenName) {
    // Hide all screens
    Object.values(screens).forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Show requested screen
    screens[screenName].classList.add('active');
}

// Reset test
function resetTest() {
    currentQuestionIndex = 0;
    userAnswers = [];
    totalScore = 0;
    showScreen('welcome');
}

// Show lead form
function showLeadForm() {
    showScreen('leadForm');
}

// Handle lead form submission
function handleLeadFormSubmission(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const company = formData.get('company');
    const newsletter = formData.get('newsletter');
    
    // In a real application, you would send this data to your server
    console.log('Lead form submitted:', {
        name,
        email,
        company,
        newsletter: newsletter === 'on',
        score: totalScore,
        result: resultCategories.find(category => 
            totalScore >= category.minScore && totalScore <= category.maxScore
        ).title
    });
    
    // Show success message
    showSuccessMessage();
}

// Show success message
function showSuccessMessage() {
    const leadFormContent = document.querySelector('.lead-form-content');
    const form = document.getElementById('lead-form');
    
    // Hide form
    form.style.display = 'none';
    
    // Create success message
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
        <div style="text-align: center; padding: 2rem;">
            <h3 style="color: var(--color-forest); margin-bottom: 1rem;">Vielen Dank!</h3>
            <p style="color: var(--color-solid); margin-bottom: 1.5rem;">
                Ihre Anfrage wurde erfolgreich übermittelt. Wir werden Ihnen innerhalb der nächsten 24 Stunden 
                eine detaillierte Analyse Ihrer Ergebnisse und konkrete Handlungsempfehlungen zusenden.
            </p>
            <button onclick="resetTest()" class="btn btn-primary">Neuen Test starten</button>
        </div>
    `;
    
    leadFormContent.appendChild(successMessage);
}

// Utility function to get result category by score
function getResultCategory(score) {
    return resultCategories.find(category => 
        score >= category.minScore && score <= category.maxScore
    );
}

// Export functions for potential external use
window.SelfTest = {
    startTest,
    resetTest,
    getResultCategory,
    testQuestions,
    resultCategories
}; 