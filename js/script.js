//selecting all required elements
const start_btn =documnet.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn =info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = documnet.querySelector(".quiz_box");
const result_box = documnet.querySelector(".result_box");
const option_list =documnet.querySelector(".option_list");
const time_line = documnet.querySelector("header. time_line");
const timeText = documnet.querySelector("timer. time_left_txt");
const timeCount = documnet.querySelector("timer .timer_sec");

//if startQuiz button clicked
start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo"); //show info box
}

// if exitQuiz button clicked
exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide info box
}

// if continueQuiz button clicked
continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide info box
    info_box.classList.add("activeQuiz"); //show quiz box
    showQuetions(0); //calling showQuestions function
    queCounter(1); //passing 1 parameter to queCounter
    startTimer(15); //calling startTimer function
    startTimeLine(0); //calling startTimerLine function
}

let timeValue = 15;
let que_count = 0;
let que_numb = 1;
let userScore =0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = result_box. querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

// if restartQuiz button clicked
restart_quiz.onclick = ()=>{
    quiz_box.classlist.add("activeQuiz"); //show quiz box
    result_box.classList.remove("activeResult"); //hide result box
    timeValue = 15;
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue =0;
    showQuestions(que_count); //calling showQuestions function
    queCounter(que_numb); //passing que_numb value to queCounter
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    startTimer(timeValue); //calling startTimer function
    startTimeLine(widthValue); // calling startTimeLine function
    timeText.textContent = "Time Left"; //change the text of timeText to Time Left
    next_btn.ClassList.remove("show"); //hide the next buttton
}

//if quitQuiiz button clicked
quit_quiz.onclick = ()=>{
    window.location.reload(); //reload the current window
}

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

// if Next Que button clicked
next_btn.onclick = ()=>{
    if (que_count < questions.length -1){ //if question count is less then total question length
        que_count++; //increment the que_count value
        que_numb++; //increment the que_numb value
        showQuestions(que_count); //calling showQuestions function
        queCounter(que_numb); //passing que_numb value to queCounter
        clearInterval(counter); //clear counter
        clearInterval(counterLine); 
        startTimer(timeValue); 
        startTimeLine(widthValue);
        timeText.textContent = "Time Left";
        next_btn.classList.remove("show"); //hide the next button
    }else{
        clearInterval(counter);
        clearInterval(counterLine);
        showResult();
    }      
}
// getting question and options from array
function showQuestions(index){
    const que_text = document.querySelector(".que_text");

    let que_tag = '<span>' + questions[index].numb+". " + questions[index].question + '</span>';
    let option_tag = '<div class="option"><span>'+questions[index].question +'</span>';
    + '<div class="option"><span>' + questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>' + questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>' + questions[index].options[3] +'</span></div>'
    que_text.innerHTML = que_tag; 
    option_list.innerHTML = option_tag;

    const option = option_list.querySelectorAll(".option");

    // set onclick attribute to all available options
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}
// creating the new div tags which for icons
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

//if user clicked on option
function optionSelected(answer){
    clearInterval(counter); 
    clearInterval(counterLine);
    let userAns = answer.text.Countent;
    let correctAns = questions[que_count].answer;
    let allOptions = option_list.children.length;

    if(userAns == correctAns){
        userScore += 1;
        answer.classList.add("correct");
        answer.insertAdjacentHTML("beforeend",crossIconTag);
        console.log("Wrong Answer");
        console.log("Your correct answer =" + userScore);
    }else{
        answer.classList.add("incorrect");
        answer.insertAdjacentHTML("beforeend",crossIconTag);
        console.log("Wrong Answer");

        for(i=0; i < allOptions; i++){
             if(option_list.children[i].textContent == correcAnss){
                option_list.children[i].setAttribute("class", "option correct");
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag);
                console.log("Auto selected correct answer.");

             }
         }
     }
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled");
     }
    next_btn.classList.add("show");
}

function showResult(){
    info_box.classList.remove("activeInfo");
    quiz_box.classList.remove("activeQuiz");
    result_box.classList.add("activeResult");
    const scoreText = result_box.querySelector(".score_text");
    if (userScore > 3){
        let scoreTag = '<span>and congrats!🎉, You got <p>'+ userScore+'</p> out of <p>' + question.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else if(userScore > 1){
        let scoreTag = '<span>and nice😎, You got <p>'+ userScore +'</p> out of <p>'+ questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else{
        let scoreTag = '<span>and sorry😔, You got only <p>'+ userScore+'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }

}

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer (){
        timeCount.textContent = time;
        time--;
        if(time < 9){
            let addZero = timeCount.textContent;
            timeCount.textContent = "0"+ addZero;
        }
        if(time <0){
            clearInterva(counter);
            timeText.textContent="Time Off";
            const allOptions=questions[que_count].answer;
            for(i=0; i < allOptions; i++){
                if(option_list.children[i].textContent == correcAns){
                    option_list.children[i].setAttribute("class","option correct");
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag);
                    console.log("Time Off: Auto selected correct answer.");
                }
            }
            for(i=0; i < allOptions; i++){
                option_list.children[i].classlist.add("disabled");
            }
            next_btn.classList.add("show");
        }
    }
}

function startTimeLine(time){
    counterLine = setInterval(timer, 29);
    function timer(){
        time += 1;
        time_line.style.width = time + "px";
        if(time > 549){
            clearInterval(counterLine);
        }
    }
}

function queCounter(index){
    let totalqueCounTag = '<span><p>'+ index +'</p> of <p>'+ questions.length+'<p/> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;
}


    



