const Player = (name,symbol,selectedTiles) => {

  const getNameToDisplay =()=> name + ": " +  symbol;
  const getSymbol =()=> symbol;
  const winCombinations = [
    ["1-1","2-1","2-1"],
    ["1-2","2-2","3-2"],
    ["1-3","2-3","3-3"],
    ["1-1","1-2","1-3"],
    ["2-1","2-2","2-3"],
    ["3-1","3-2","3-3"],
    ["1-1","2-2","3-3"],
    ["3-1","2-2","1-3"],
  ]
  
  function addMove(input) {
    selectedTiles.push(input);
  };

  function getMoves() {
    return selectedTiles;
  };

  const checkWin = () =>{     
    let count = 0;

    winCombinations.forEach(item=>{
      count = 0;

      item.forEach(position=>{  
        if(selectedTiles.includes(position)){
          count++;
        }
      });

      if(count == 3){
        return true;
      }

    })

    return false;
  }

  return {
    getNameToDisplay,
    getSymbol,
    addMove,
    getMoves,
    checkWin
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
    let player1 = Player();
    let player2 = Player();
   
    const start = () =>{    
      startDialog.style.display = 'block';
      const form = doc.querySelector("form");

      form.addEventListener("submit", e=>{
        e.preventDefault();

        player1 = Player(form.elements['player1name'].value , "X",[]);
        player2 = Player(form.elements['player2name'].value, "O",[]);

        doc.querySelector(".first-player").innerHTML = player1.getNameToDisplay();
        doc.querySelector(".second-player").innerHTML = player2.getNameToDisplay();

        closeStartDialog();

        Round.startRound();
        let x = player1.getSymbol();
        Round.setcurrentMove(x); 
        setupBoard();  
      })
    };

    const closeStartDialog = () =>{
        startDialog.style.display = "none";
    }

    const setupBoard = ()=>{
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
          player1.checkWin();
  
        }else if(Round.getcurrentMove() == player2.getSymbol()){
  
          item.innerHTML = player2.getSymbol();
          player2.addMove(position);
          Round.setcurrentMove(player1.getSymbol());
          player2.checkWin();
        }

      }
     
    };

    return {
        start,
    };

  })(document);

  gameBoard.start();

