const apiUrl = 'https://the-trivia-api.com/v2/questions'
const questionHeading = document.getElementById("questionHead");
const option1 = document.getElementById("option_1_p");
const option2 = document.getElementById("option_2_p");
const option3 = document.getElementById("option_3_p");
const option4 = document.getElementById("option_4_p");
const freeze = document.getElementById("#optionsLabel")
const getOptions = document.querySelectorAll(".options")
const submitBtn = document.getElementById("submit");
const  nextBtn = document.getElementById("next");
const optionColor = document.getElementsByClassName("p_color")
const startQ = document.getElementById("startButton")
const quizTemp = document.getElementById("quizTemplate")
const quizPlate = document.getElementById("quizBox")
const frm = document.getElementById("form")
const Btn1 = document.querySelector("#b1")
const Btn2 = document.querySelector("#b2")
const Btn3 = document.querySelector("#b3")
const Btn4 = document.querySelector("#b4")
submitBtn.classList.remove("hidden")
quizTemp.classList.add("hidden")
startQ.classList.remove("hidden")
frm.classList.remove("hidden")
let data = []; 
let score = 0;
let indexOfCorrectAnswer;
let questionText;
let categoryOfQuestions;
let inCorAnsArray;
let corAns;

function generateRandom (min, max) {
  // create a set to store the generated numbers
  const generatedNumbers = new Set()
 
  // keep generating a random number until we find one that is not in the set
  while (true) {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min
    if (!generatedNumbers.has(randomNumber)) {
      // add the number to the set and return it
        generatedNumbers.add(randomNumber)
       
      return randomNumber
    }
  }
}
// const question_text_index = generateRandom(0, 9)
// console.log(question_text_index)
// const incorrect_answer_index = generateRandom(0, 2)

let generatedNumbers; 
function indexArr(){
  generatedNumbers = new Set();
  while (generatedNumbers.size <= 3) {
    const randomNumber = Math.floor(Math.random() * (4)) 
    if (!generatedNumbers.has(randomNumber)) {
      // add the number to the set and return it
      generatedNumbers.add(randomNumber)
    }
  }
}
indexArr();
let indexArray = Array.from(generatedNumbers);

let generatedQuestionNumbers = new Set();
function questionIndexArr () {
  while (generatedQuestionNumbers.size <= 9) {
    const randomNumber = Math.floor(Math.random() * 10)
    if (!generatedQuestionNumbers.has(randomNumber)) {
      // add the number to the set and return it
      generatedQuestionNumbers.add(randomNumber)
    }
  }
}

questionIndexArr();
let questionIndexArray = Array.from(generatedQuestionNumbers);

async function fetchData (apiUrl) {
  try {
    const response = await fetch(apiUrl)
   
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}
let idx = 0;
let setVlaue;
let getMark;
let userAnswer;

const allData = async () => {
 
  data = await fetchData(apiUrl);
  console.log(data)
  function loadQuiz() {

         deselectAns();
   
         indexArr();
         indexArray = Array.from(generatedNumbers);
       
         questionText = data[questionIndexArray[idx]].question.text
         categoryOfQuestions = data[questionIndexArray[idx]].category
         inCorAnsArray = data[questionIndexArray[idx]].incorrectAnswers
         corAns = data[questionIndexArray[idx]].correctAnswer
         let allOptionArray = []

        for (let i = 0; i < 4; i++) {
          allOptionArray[i] = inCorAnsArray[indexArray[i]]
        }
        for (let i = 0; i < 4; i++) {
          if (allOptionArray[i] === undefined) {
            allOptionArray[i] = corAns
          }
        }

        const option_1 = allOptionArray[0]
        const option_2 = allOptionArray[1]
        const option_3 = allOptionArray[2]
        const option_4 = allOptionArray[3]
        let que = `\n Category : "${categoryOfQuestions.toUpperCase()}" \n \n Question : ${idx + 1} \n ${questionText} \n`
        
        questionHeading.innerText = que

        option1.innerText = ` ${option_1}`
        option2.innerText = ` ${option_2}`
        option3.innerText = ` ${option_3}`
        option4.innerText = ` ${option_4}`
    
     }

  loadQuiz();
     
  function deselectAns(){
    getOptions.forEach((answer) =>{
        answer.checked = false;

    })
  }
  
  function afterNext(){
    submitBtn.classList.remove("hidden");
    nextBtn.classList.add("hidden");
    indexOfCorrectAnswer = undefined;
    if (corAns === option1.innerText) {
      option1.classList.remove("text-green-500")
      option1.classList.add("p_color")
      Btn1.classList.remove("greenButton")
      Btn1.classList.add("mark")
      
    } else if (corAns === option2.innerText) {
      option2.classList.remove("text-green-500")
      option2.classList.add("p_color")
      Btn2.classList.remove("greenButton")
      Btn2.classList.add("mark")
    } else if (corAns === option3.innerText) {
      option3.classList.remove("text-green-500")
      option3.classList.add("p_color")
      Btn3.classList.remove("greenButton")
      Btn3.classList.add("mark")
    } else if (corAns === option4.innerText) {
      option4.classList.remove("text-green-500")
      option4.classList.add("p_color")
      Btn4.classList.remove("greenButton")
      Btn4.classList.add("mark")
    }  
  }
  function afterNext2(userAnswer){
      if(userAnswer !== getMark){
        if(userAnswer === "opt1"){
          option1.classList.add("p_color")
          option1.classList.add("text-white")
          option1.classList.remove("text-red-500")
          Btn1.classList.remove("redButton")
          Btn1.classList.add("mark")
          
        }
        else if(userAnswer === "opt2"){
          option2.classList.add("text-white")
          option2.classList.add("p_color")
          option2.classList.remove("text-red-500")
          Btn2.classList.remove("redButton")
          Btn2.classList.add("mark")
          
        }
        else if(userAnswer === "opt3"){
          option3.classList.add("text-white")
          option3.classList.add("p_color")
          option3.classList.remove("text-red-500")
          Btn3.classList.remove("redButton")
          Btn3.classList.add("mark")
        }
        else if(userAnswer === "opt4"){
          option4.classList.add("text-white")
          option4.classList.add("p_color")
          option4.classList.remove("text-red-500")
          Btn4.classList.remove("redButton")
          Btn4.classList.add("mark")
        }
      }
      // freeze.classList.remove("pointer-events-none");
  }

  function getTheClickedAnswer() {
    afterSubmit();
    let answer = undefined;
    getOptions.forEach((answera1) => {
      if (answera1.checked) {
        answer = answera1.value
      }
    });
      
      return answer;  
  }
  
  function markRed(){
    if(userAnswer !== setVlaue){
      if(userAnswer === "opt1"){
        option1.classList.remove("text-white")
        option1.classList.add("text-red-500")
        option1.classList.remove("p_color")
        Btn1.classList.remove("mark")
        Btn1.classList.add("redButton")
        
       }
       else if(userAnswer === "opt2"){
        option2.classList.remove("text-white")
        option2.classList.add("text-red-500")
        option2.classList.remove("p_color")
        Btn2.classList.remove("mark")
        Btn2.classList.add("redButton")
       }
       else if(userAnswer === "opt3"){
        option3.classList.remove("text-white")
        option3.classList.add("text-red-500")
        option3.classList.remove("p_color")
        Btn3.classList.remove("mark")
        Btn3.classList.add("redButton")
       }
       else if(userAnswer === "opt4"){
        option4.classList.remove("text-white")
        option4.classList.add("text-red-500")
        option4.classList.remove("p_color")
        Btn4.classList.remove("mark")
        Btn4.classList.add("redButton")
       }
    }
    else{
      return;
    }
  }
   
  
  nextBtn.addEventListener(("click") , (event) =>{
     event.preventDefault();
     afterNext();
     afterNext2(userAnswer);
    
     idx++;
     if (idx < questionIndexArray.length ){
         generatedNumbers = new Set();
         loadQuiz();
     }
     else{
         frm.classList.add("hidden")
         quizTemp.innerHTML = `<h1 id="scor" > Your Score is ${score} / ${questionIndexArray.length}</h1>
         <button class="again" onclick="window.location.reload()">Start Again</button>`

     }

  })
  
  function afterSubmit() {

    if (corAns === option1.innerText) {
      setVlaue = "opt1";
      getMark = "opt1";
      indexOfCorrectAnswer = 0
    } else if (corAns === option2.innerText) {
      indexOfCorrectAnswer = 1
      setVlaue = "opt2"
      getMark = "opt2"
    } else if (corAns === option3.innerText) {
      indexOfCorrectAnswer = 2
      setVlaue = "opt3";
      getMark = "opt3";
    } else if (corAns === option4.innerText) {
      indexOfCorrectAnswer = 3
      setVlaue = "opt4";
      getMark = "opt4";
    } 
    
    // freeze.classList.add("pointer-events-none");

  }
    
  function afterSubmitDisplay(){

    submitBtn.classList.add("hidden");
    nextBtn.classList.remove("hidden");
    
    if (corAns === option1.innerText) {
      option1.classList.remove("text-white")
      option1.classList.add("text-green-500")
      option1.classList.remove("p_color")
      Btn1.classList.remove("mark")
      Btn1.classList.add("greenButton")
     
    } else if (corAns === option2.innerText) {
      option2.classList.remove("text-white")
      option2.classList.add("text-green-500")
      option2.classList.remove("p_color")
      Btn2.classList.add("greenButton")
      Btn2.classList.remove("mark")
   
    } else if (corAns === option3.innerText) {
      option3.classList.remove("text-white")
      option3.classList.add("text-green-500")
      option3.classList.remove("p_color")
      Btn3.classList.remove("mark")
      Btn3.classList.add("greenButton")
  
    } else if (corAns === option4.innerText) {
      option4.classList.remove("text-white")
      option4.classList.add("text-green-500")
      option4.classList.remove("p_color")
      Btn4.classList.remove("mark")
      Btn4.classList.add("greenButton")
    }

  
  }

  submitBtn.addEventListener('click', event => {
    event.preventDefault();

    userAnswer = getTheClickedAnswer();
    markRed(userAnswer);
    if (userAnswer) {
        
      if(userAnswer === setVlaue){
         score++;
      }
      afterSubmitDisplay();    
    }
    
}) 

}
 

let previousSelection = null

function updateSelection(clickedRadio) {
  
  if (previousSelection === clickedRadio) {
    // If the clicked radio is the same as the previous selection, unselect it
    clickedRadio.checked = false
    previousSelection = null
    
  } else {
    // Update the previousSelection variable and proceed with the click
    previousSelection = clickedRadio
  }
}

startQ.addEventListener(("click"), () => {
     startQ.classList.add("hidden");
     quizTemp.classList.remove("hidden")
     quizPlate.classList.remove("top-[25%]")
     quizPlate.classList.add("top-[22%]")
     allData();
})

















