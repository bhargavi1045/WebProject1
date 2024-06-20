const questions= [
    {
        question : "Which is the longest river in the world?",
        answers : [
            { text : "Amazon", correct : false},
            { text : "Nile", correct : true},
            { text : "Yangtze", correct : false},
            { text : "Mississippi", correct : false},
        ]
    },
    {
        question : "Which is the largest mammal in the world?",
        answers:[
            { text : "Elephant", correct : false},
            { text : "White Rhinoceros", correct : false},
            { text : "Blue whale", correct : true},
            { text : "Giraffe", correct : false},
        ]
    },
    {
        question : "What is the capital of Portugal?",
        answers: [
            { text : "Lisbon", correct : true},
            { text : "Madrid", correct : false},
            { text : "Istanbul", correct : false},
            { text : "Warsaw", correct : false},
        ]
    },
    {
        question : "Which of the following is not the part of the North-American continent?",
        answers : [
            { text : "Canada", correct : false},
            { text : "Mexico", correct : false},
            { text : "USA", correct : false},
            { text : "United Kingdom", correct : true},
        ]
    },
    {
        question: "The tallest mountain in the world is:",
        answers:[
            { text : "Daulagiri", correct : false},
            { text : "K2", correct : false},
            { text : "Mount Everest", correct : true},
            { text : "Lhotse", correct : false},
        ]
    }
]
const queElement= document.getElementById("que");
const ansButton= document.getElementById("ansBtn");
const nextButton= document.getElementById("nextBtn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML= "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    queElement.innerHTML = "Q" + questionNo + "." + currentQuestion.question;

    currentQuestion.answers.forEach(answer=>{
        const button=document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("Btn");
        ansButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct= answer.correct;
        }
        button.addEventListener("click",selectAns);
    });
}
function resetState(){
    nextButton.style.display = "none";
    while(ansButton.firstChild){
        ansButton.removeChild(ansButton.firstChild); 
    }
}

function selectAns(e){
    const selectedBtn= e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct"); 
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(ansButton.children).forEach(button=>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
   nextButton.style.display = "block";
} 

function showScore(){
    resetState();
    queElement.innerHTML=`Your total score is ${score} out of ${questions.length}!`
    nextButton.innerHTML="play again";
    nextButton.style.display="block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}
nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex< questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();