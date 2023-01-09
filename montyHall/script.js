//only 3 possible scenarios 
let sets = [
    ["imgs/car.png", "imgs/goat.png", "imgs/goat.png"],
    ["imgs/goat.png", "imgs/car.png", "imgs/goat.png"],
    ["imgs/goat.png", "imgs/goat.png", "imgs/car.png"]
]

//accessor variables
let switchBtn = document.querySelector("#switchButton");
let stayBtn = document.querySelector("#stayButton");
let resetBtn = document.querySelector("#resetButton");
 
let resultOne = document.querySelector("#result1");
let resultTwo = document.querySelector("#result2");
let resultThree = document.querySelector("#result3");
 
let doorOne = document.querySelector("#door1");
let doorTwo = document.querySelector("#door2");
let doorThree = document.querySelector("#door3");
 
let gameText = document.querySelector("#gameText");
 
let switchWR = document.querySelector("#switchWR");
let stayWR = document.querySelector("#stayWR");

//event listeners for clickable elements
doorOne.addEventListener("click", doorSelected);
doorTwo.addEventListener("click", doorSelected);
doorThree.addEventListener("click", doorSelected);

switchBtn.addEventListener("click", reveal);
stayBtn.addEventListener("click", reveal);
resetBtn.addEventListener("click", newGame);


//global variables
let state = "start";
let answer;
let montyOpen;
let prizes = [resultOne, resultTwo, resultThree];
let timesSwitch = 0;
let switchWon = 0;
let timesStayed = 0;
let stayWon = 0;

newGame();

function getRandInt(num){
    return Math.floor(Math.random()*num);
}

function newGame(){
    //setting elements to invisible
    switchBtn.style.display = "none";
    stayBtn.style.display = "none";
    resetBtn.style.display = "none";
    resultOne.style.display = "none";
    resultTwo.style.display = "none";
    resultThree.style.display = "none";
    gameText.style.display = "none";

    //giving prizes random srcs
    let randSet = sets[getRandInt(sets.length)];
    resultOne.src = randSet[0];
    resultTwo.src = randSet[1];
    resultThree.src = randSet[2];
}

function doorSelected(){
    console.log(this);
    if(state == "start"){
        //options Monty can open
        let options = [];
        if(this.id == "door1"){
            answer = resultOne;
            gameText.innerHTML = "Door 1 is selected"
            //if prize is not car, make it a option
            if(!resultTwo.src.includes("car.png")){
                options.push(resultTwo);
            }
            if(!resultThree.src.includes("car.png")){
                options.push(resultThree);
            }
        }
        if(this.id == "door2"){
            answer = resultTwo;
            gameText.innerHTML = "Door 2 is selected"
            //if prize is not car, make it a option
            if(!resultOne.src.includes("car.png")){
                options.push(resultOne);
            }
            if(!resultThree.src.includes("car.png")){
                options.push(resultThree);
            }
        }
        if(this.id == "door3"){
            answer = resultThree;
            gameText.innerHTML = "Door 3 is selected"
            //if prize is not car, make it a option
            if(!resultTwo.src.includes("car.png")){
                options.push(resultTwo);
            }
            if(!resultOne.src.includes("car.png")){
                options.push(resultOne);
            }
        }
        montyOpen = options[getRandInt(options.length)];
        montyOpen.style.display = "inline";
        gameText.style.display = "block";
        switchBtn.style.display = "inline";
        stayBtn.style.display = "inline";
    }
    state = "picked"
}

function reveal(){
    if(state == "picked"){
        //reveal answer immediately
        if(this.id == "stayButton"){
            answer.style.display = "inline";
            timesStayed++;
            //check for car
            if(answer.src.includes("car.png")){
                stayWon++;
                gameText.innerHTML = "you won!"
            }else{
                gameText.innerHTML = "you lost! :("
            }
        }
        if(this.id == "switchButton"){
            for(let i = 0; i < prizes.length; i++){
                if(prizes[i] != answer && prizes[i] != montyOpen) {
                    answer = prizes[i];
                    break;
                }
            }
            answer.style.display = "inline";
            timesSwitch++;
            //check for car
            if(answer.src.includes("car.png")){
                switchWon++;
                gameText.innerHTML = "you won!"
            }else{
                gameText.innerHTML = "you lost! :("
            }
        }
        switchWR.innerHTML = `Times Switched: ${timesSwitch} Times Won: ${switchWon} Probability: ${switchWon/timesSwitch}`;
        stayWR.innerHTML = `Times Stayed: ${timesStayed} Times Won: ${stayWon} Probability: ${stayWon/timesStayed}`;
        resetBtn.style.display = "inline";
        state = "start";
    }
    // gameText.style.display = "block";
}