const Player = (name,symbol) => {

  const getNameToDisplay =()=> name + ": " +  symbol;
  const getSymbol =()=> symbol;

  return {
    getNameToDisplay,
    getSymbol
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

        player1 = Player(form.elements['player1name'].value , "X");
        player2 = Player(form.elements['player2name'].value, "O");

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
        item.addEventListener("click",e => updateTile(item));        
      });
    }

    const updateTile  = (item) => {
      
      if(Round.getnoOfRound()<=9 && item.innerHTML ==""){

        if(Round.getcurrentMove() == player1.getSymbol()){

          item.innerHTML = player1.getSymbol();
          Round.setcurrentMove(player2.getSymbol());
  
        }else if(Round.getcurrentMove() == player2.getSymbol()){
  
          item.innerHTML = player2.getSymbol();
          Round.setcurrentMove(player1.getSymbol());
  
        }

      }

      
    };

    return {
        start,
    };

  })(document);

  gameBoard.start();

