const Player = (name,symbol,selectedTiles) => {

  const getNameToDisplay =()=> name + ": " +  symbol;
  const getPlayerName =()=> name;
  const clearMoves =()=> selectedTiles = [];
  const getSymbol =()=> symbol;
  const winCombinations = [
    ["1-1","2-1","3-1"],
    ["1-2","2-2","3-2"],
    ["1-3","2-3","3-3"],
    ["1-1","1-2","1-3"],
    ["2-1","2-2","2-3"],
    ["3-1","3-2","3-3"],
    ["1-1","2-2","3-3"],
    ["3-1","2-2","1-3"],
  ];
  
  function addMove(input) {
    selectedTiles.push(input);
  };

  function getMoves() {
    return selectedTiles;
  };

  const win = () =>{     
    let count = 0;
    let result = false;

    winCombinations.forEach(item=>{
      count = 0;

      item.forEach(position=>{  
        if(selectedTiles.includes(position)){
          count++;
        }
      });

      if(count == 3){
        result = true;       
      }

    });

    if(result)
      return true;
    else
      return false;
  }

  return {
    getNameToDisplay,
    getSymbol,
    addMove,
    getMoves,
    getPlayerName,
    win,
    clearMoves
  };

};

const Round = (() => {
  let noOfRound = 0;
  let currentMove = " ";

  const getnoOfRound =()=> noOfRound;
 
  const increaseRoundNo =()=> noOfRound++;
  const startRound =()=> noOfRound = 0;

  function getcurrentMove (){ return this.currentMove};
  function setcurrentMove(input){
    this.currentMove = input;
    increaseRoundNo();
  };

  return {
    getnoOfRound,
    getcurrentMove,
    setcurrentMove,
    startRound
  };

})();

const gameBoard = ((doc) => {

    const startDialog = doc.querySelector(".start-dialog");
    const endDialog = doc.querySelector(".end-dialog");
    let player1 = Player();
    let player2 = Player();
   
    const start = () =>{

      startDialog.style.display = 'block';
      doc.querySelector(".player1name").value = "";
      doc.querySelector(".player2name").value = "";

      const form = doc.querySelector("form");      
      form.addEventListener("submit", e=>{
        e.preventDefault();

        player1 = Player(form.elements['player1name'].value , "X",[]);
        player2 = Player(form.elements['player2name'].value, "O",[]);

        closeStartDialog();
        setupBoard();  
      })
    };

    const closeStartDialog = () =>{
        startDialog.style.display = "none";
    }

    const setupBoard = ()=>{
      
      doc.querySelector(".first-player").innerHTML = player1.getNameToDisplay();
      doc.querySelector(".second-player").innerHTML = player2.getNameToDisplay();

      player1.clearMoves();
      player2.clearMoves();

      Round.startRound();
      Round.setcurrentMove(player1.getSymbol()); 

      const tiles = doc.querySelectorAll(".tile");
      tiles.forEach(item=>{ 
        item.innerHTML= "";
        item.addEventListener("click",e => updateTile(item,item.dataset.position));        
      });

    }

    const updateTile  = (item,position) => {
      
      if(Round.getnoOfRound()<=9 && item.innerHTML ==""){

        if(Round.getcurrentMove() == player1.getSymbol()){

          item.innerHTML = player1.getSymbol();
          player1.addMove(position);
          Round.setcurrentMove(player2.getSymbol());
          
          if(player1.win()){
            endGame(player1.getPlayerName());
          }
  
        }else if(Round.getcurrentMove() == player2.getSymbol()){
  
          item.innerHTML = player2.getSymbol();
          player2.addMove(position);
          Round.setcurrentMove(player1.getSymbol());

          if(player2.win()){
            endGame(player2.getPlayerName());
          }
        }

      }
      else if(Round.getnoOfRound()>9){
        endGame("");
      }
           
    };

    const endGame = (winner)=>{

      endDialog.style.display = "block";
      const displayWinner = doc.querySelector(".end-dialog-content p");

      if(winner==="")
        displayWinner.innerHTML = "Its a tie !!";
      else
        displayWinner.innerHTML = "You win " + winner +" !!";

      endDialog.querySelector(".replayBtn").addEventListener("click",e => {
        endDialog.style.display = "none";
        setupBoard();
      });

      endDialog.querySelector(".newGameBtn").addEventListener("click",e => {
        endDialog.style.display = "none";
        start();
      });
    }

    return {
        start,
    };

  })(document);

  gameBoard.start();

