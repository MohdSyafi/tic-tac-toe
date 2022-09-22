const game = ((doc) => {

    let player1name = doc.querySelector(".first-player");
    let player2name = doc.querySelector(".second-player");
    const startDialog = doc.querySelector(".start-dialog");
    const tileGrid = doc.querySelector(".tile-grid");

    const start = () =>{    
      startDialog.style.display = 'block';
      const form = doc.querySelector("form");

      form.addEventListener("submit", e=>{
        e.preventDefault();
        player1name.textContent =  form.elements['player1name'].value;
        player2name.textContent =  form.elements['player2name'].value;
        closeStartDialog();
      })

      setupBoard();
    };

    const setupBoard = ()=>{
        const tiles = doc.querySelectorAll(".tile");
        tiles.forEach(item=>{ item.innerHTML= ""});
    }

    const closeStartDialog = () =>{
        startDialog.style.display = "none";
    }

    return {
        start
    };

  })(document);


  game.start();

