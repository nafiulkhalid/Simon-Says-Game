/**
 * Keypress --> Game Start
 * btnFlash(random) + Level 1 (h)
 * btnPress(listener)? Check --> (input == game) --> Level Up
 *                     (input != game) --> Game Over
 */
document.querySelector("body").style.backgroundColor = "black";
let gameSeq = [];
let userSeq = [];
let btns = ["red", "orange", "green", "violet"];
let started = false;
let level = 0;
let best = 0;

let head3 = document.querySelector("h3");

document.addEventListener("keypress", function(event){
    // Game starts once, cannot be false
    if (started == false){
        started = true;
        levelUp();
    }
});

function btnFlash(btn){
    // btn flash means button get white for a sec and back
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    }, 250);
}

function levelUp(){
    //Empty user sequence - now user has to enter all btns
    userSeq = [];

    // Level up and level heading
    level++;
    head3.innerText = `Level ${level}`;

    // random btn flash (start)
    let randIndex = Math.floor(Math.random()*3); // Random Number
    let randColor = btns[randIndex]; // Color from array
    gameSeq.push(randColor);
    let randBtn = document.querySelector(`.${randColor}`); // button of color
    btnFlash(randBtn);
}

function CheckBtn(idx){
    if(userSeq[idx] === gameSeq[idx]){
        /*Two possible positions - either middle, or last
          If last, then level up and flashBtn
          Else, keep checking         
        */
        if(gameSeq.length == userSeq.length){
            // delay to level up for 1sec
            setTimeout(levelUp, 1000);
        }
    }else{
        head3.innerHTML = `GAME OVER!<br> Your score was <b>${level}</b>.<br>Press any Key to restart!`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "black";
        },100);
        let score = document.getElementById("score");
        if(level > best){
            best = level;
            score.innerText = `Highest Score: ${level}`;
        }
        reMatch();
    }

}

function btnPress(){
    //console.log(this.classList[1]);
    userSeq.push(this.classList[1]);
    btnFlash(this);
    CheckBtn(userSeq.length-1);
}
let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click", btnPress);
}

function reMatch(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
