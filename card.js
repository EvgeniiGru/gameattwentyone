
//Создание колоды карт
let deck={};
let massiveHighCard = ['V','D','K','T'];
let massiveSuit = ['♠','♣','♥','🔷'];
let btDollarup = document.getElementById("dollarUserbt");
let stake = {
    dollarUser: 9900,
    dollarComp: 9900,
    dollarCon: 200,
    Up:false,
    workStake(){
        let KeyStake = Object.keys(this);
        KeyStake.splice(3,KeyStake.length-3);
        KeyStake.forEach(items => {
        let x = document.getElementById(items);
        x.innerHTML = this[items];}
        );
    },
    upRateComp(){
        procent = Math.floor(Math.random()*100);
        if(compScore <= 14){
            if(procent > 30){
                this.dollarComp = this.dollarComp - 100;
                this.dollarCon = this.dollarCon + 100;
                alert("Отвечаю")
            }else{
                alert("пасс")}
                btDollarup.onclick="";
        }else{
            this.dollarComp = this.dollarComp - 100;
            this.dollarCon = this.dollarCon + 100;
            alert("Отвечаю");
            btDollarup.onclick="";
        };
        if(procent > fidelity[compScore] + 30){
            this.dollarComp = this.dollarComp - 100;
            this.dollarCon = this.dollarCon + 100;
            alert("повышаю");
            btDollarup.onclick = stake.upRate;
            this.Up = true;
            disableBt("btEnd");
        };
    },
    upRate:()=>{
        stake.dollarUser = stake.dollarUser - 100;
        stake.dollarCon = stake.dollarCon + 100;
        enableBt("btEnd");
        if(stake.Up == false){
            stake.upRateComp();
        }else{
            stake.Up = false;}
        stake.workStake();
    },
    noMoney(){
        this.dollarUser += this.dollarCon/2;
        this.dollarComp += this.dollarCon/2;
        this.dollarCon = 0;
        stake.workStake();
    },
    takeMoney(win){
        this[win] = this[win] + this.dollarCon;
        this.dollarCon = 0;
        stake.workStake();
    },
    newStake(){
        this.dollarCon = 200;
        this.dollarComp -= 100;
        this.dollarUser -= 100;
        stake.workStake();
    }
};

stake.workStake();
 

function startNewGame(){
    userScore = 0;
    compScore = 0;
    let allCardInTabel = document.getElementsByClassName('card');
    while (allCardInTabel.length != 0) {allCardInTabel[0].remove()};
    stake.newStake();
}


function NewDeckCard(){
    massiveSuit.forEach(
    suit => {
        for(i = 2; i < 11; i++) deck[suit + i] = i;
        massiveHighCard.forEach(items => {
            items != "T" ? deck[suit + items] = 10:deck[suit + items] = 11;
        });
    });
}

NewDeckCard();
//Набор карт пользователем
var massiveDeck = Object.keys(deck);
var Scope = document.getElementById("userS")
var userScore = 0;

function disableBt(idBt){
    let bt = document.getElementById(idBt);
    bt.style.boxShadow = "1px 2px 15px 0px #ff020247, 5px 2px 0px 0px #000000";
    bt.onclick = "";
    let idBtText =  idBt + 'Text';
    let btText = document.getElementById(idBtText);
    btText.style.color = "red";
    btText.style.textShadow = "0px 0px 7px red";
}

disableBt("btEnd");

function enableBt(idBt){
    let bt = document.getElementById(idBt);
    bt.style.boxShadow = "1px 2px 15px 0px #01ef3447, 5px 2px 0px 0px #000000";
    if (idBt == "btOK"){
        bt.onclick = compTakeCard;
    }else if (idBt == "btAdd"){
        bt.onclick = showCard;
    }else if(idBt == "btEnd"){
        bt.onclick = endGame;
    };
    let idBtText =  idBt + 'Text';
    let btText = document.getElementById(idBtText);
    btText.style.color = "lime";
    btText.style.textShadow = "0px 0px 7px rgb(14, 255, 14)"; 
}

function showCard(){
    cardF = massiveDeck[Math.floor(Math.random()*massiveDeck.length)];
    let LineDivCard = document.getElementById("lineUser");
    let divCard = document.createElement("div");
    let TextCard = document.createElement("p");  
    divCard.className = "user card";
    setTimeout( () => {
        divCard.className = "user card reverse";
        userScore += deck[cardF];
        delCard(cardF);
        TextCard.className = 'visible';
        if(userScore > 21){
            alert("перебор");
            compScore = 100;
            endGame();
        }
    },1000);
    TextCard.innerHTML = cardF;
    divCard.appendChild(TextCard);
    LineDivCard.appendChild(divCard);
};

function delCard(card){
    delete deck[card];
    massiveDeck = Object.keys(deck);
    if (massiveDeck.length == 0) NewDeckCard();
}
//Набор карт компом
var compScore=0;
var ml = 0;
var fidelity = {
    14:90,
    15:75,
    16:60,
    17:30,
    18:10,
    19:3,
    20:1,
    21:0
};



function compTakeCard(){
    btDollarup.onclick = stake.upRate;
    disableBt("btAdd");
    disableBt("btOK");
    var interval = setInterval(() => {
        let lineDivComp = document.getElementById("lineComp");
        let div1 = document.createElement("div");
        let p1 = document.createElement('p');
        div1.className ="card comp";
        cardF = massiveDeck[Math.floor(Math.random()*massiveDeck.length)];
        p1.innerHTML = cardF;
        div1.appendChild(p1);
        compScore += deck[cardF];
        delCard(cardF);
        procent = Math.floor(Math.random()*100);
        if(compScore >= 14 && compScore <= 21){
            if(procent > fidelity[compScore]){
                clearInterval(interval);
                enableBt("btEnd");
        };
        }else if(compScore >21){
            clearInterval(interval);
            alert("чет я перебрал");
            userScore = 100;
        }
        lineDivComp.insertBefore(div1, lineDivComp.firstElementChild);
        if(compScore>21) {endGame();}
    },2000)
};

//Работка со ставками


function endGame(win = 0){
    let cardR = document.getElementsByClassName("card comp");
    for(i=0; i < cardR.length; i++)
    {
        cardR[i].className="card comp reverse";
        let p = cardR[i].getElementsByTagName('p');
        p[0].className = "visible";
    }
    setTimeout(()=>{
        enableBt("btAdd");
        enableBt("btOK");
        disableBt("btEnd");
        btDollarup.onclick = "";
        if(compScore > userScore){
            stake.takeMoney("dollarComp");
            alert("Я выйграл, гони мои бабки Лебовский");
        }else if(compScore < userScore){
            stake.takeMoney("dollarUser");
            alert("Тебе просто повезло");
        }else if(compScore == userScore){
            alert("Мы сражались на равных, подаван");
            stake.noMoney();
        };
        startNewGame();
        },3000);
}

