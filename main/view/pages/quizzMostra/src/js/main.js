const submitButton = document.querySelector('.buttonRootBase');
submitButton.addEventListener('click', checkAnswers);

const refazerButton = document.getElementById('refazerButton');
refazerButton.addEventListener('click', refazerQuiz);

const divQuestions = document.querySelector('#divQuestions');
const parabens = document.getElementById('parabens');
const mainTittleTexts = document.querySelector('.mainTittleTexts');
const generalQuestions = document.querySelector('.generalQuestions');
const buttonDiv = document.querySelector('.button');
const button = document.querySelector('.buttonRootBase');
const mainTittle = document.querySelector('.mainTittle');
const mainContainer = document.querySelector('.mainContainer');



function shuffleOptions() {
    const questions = document.querySelectorAll('.answersOptions');
    questions.forEach(question => {
        const options = Array.from(question.querySelectorAll('div'));
        options.sort(() => Math.random() - 0.5);
        options.forEach(option => {
            question.appendChild(option);
        });
    });
}


function noneElements(){
    mainTittleTexts.style.display = 'none';
    generalQuestions.style.display = 'none';
    buttonDiv.style.display = 'none';
    divQuestions.style.display = 'none';
    button.style.display = 'none';
}

function showElements(){
    mainTittleTexts.style.display = 'flex';
    generalQuestions.style.display = 'flex';
    buttonDiv.style.display = 'flex';
    divQuestions.style.display = 'flex';
    button.style.display = '';
}

function checkAnswers() {
    const correctAnswers = {
        firstOne: 'Johanesburgo',
        secondOne: 'Elefante Africano',
        thirdOne: 'Geleia de Damasco'
    };

    let allCorrect = true;
    let numCorrect = 0;

    for (const key in correctAnswers) {
        const selectedAnswer = document.querySelector(`input[name="${key}"]:checked + label`);
        if (!selectedAnswer || selectedAnswer.textContent !== correctAnswers[key]) {
            allCorrect = false;
            break;
        } else {
            numCorrect++;
        }
    }

    if (allCorrect) {
       
        const questions = document.querySelectorAll('.quetions');
        questions.forEach(question => {
            question.style.display = 'none';
        });

        noneElements();
     
        parabens.style.display = 'flex';

        parabens.classList.add("congrats");

        
        const mainTittle = document.querySelector('.mainTittle');
        mainTittle.textContent = 'Baie geluk';

        const numAcertos = document.getElementById('numAcertos');
        numAcertos.textContent = numCorrect;

        mainContainer.style.height = '100vh'

        localStorage.setItem('quizResult', 'pass');
    } else {
        
        const questions = document.querySelectorAll('.quetions');
        questions.forEach(question => {
            question.style.display = 'none';
        });

        noneElements();
        const tenteNovamente = document.getElementById('tenteNovamente');
        tenteNovamente.style.display = 'block';
        mainContainer.style.height = '100vh'

        localStorage.setItem('quizResult', 'fail');
        
    }
}

function refazerQuiz() {
    
    const questions = document.querySelectorAll('.quetions');
    questions.forEach(question => {
        question.style.display = 'block';
    });

    showElements();
    
    const tenteNovamente = document.getElementById('tenteNovamente');
    tenteNovamente.style.display = 'none';

    
    const mainTittle = document.querySelector('.mainTittle');
    mainTittle.textContent = 'AFROvrae';

    const selectedAnswers = document.querySelectorAll('input[type="radio"]:checked');
    selectedAnswers.forEach(answer => {
        answer.checked = false;
    });

    localStorage.removeItem('quizResult');
    mainContainer.style.height = '120vh';
    
    shuffleOptions();
}


window.addEventListener('load', () => {
    const quizResult = localStorage.getItem('quizResult');

    if (quizResult === 'pass') {
        
        const questions = document.querySelectorAll('.quetions');
        questions.forEach(question => {
            question.style.display = 'none';
        });
        
        noneElements();

        mainContainer.style.height = '100vh'

        parabens.style.display = 'flex';
        parabens.classList.add("congrats");
        
        mainTittle.textContent = 'Baie geluk';

        const numAcertos = document.getElementById('numAcertos');
        numAcertos.textContent = 3; 

        
        const successMessage = document.createElement('div');
        successMessage.classList.add('success-message');
        successMessage.textContent = 'Você já acertou todas as respostas anteriormente. Não é necessário responder novamente.';
        parabens.appendChild(successMessage);

    } else if (quizResult === 'fail') {
        noneElements();

        mainContainer.style.height = '100vh'

        const tenteNovamente = document.getElementById('tenteNovamente');
        tenteNovamente.style.display = 'flex';

        tenteNovamente.classList.add("congrats");
        
    }
    
    shuffleOptions();
});