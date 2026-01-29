const gridData = [
    ["S","T","O","P","L","O","S","S","Q","W","S"],
    ["C","E","X","P","I","R","Y","B","R","A","C"],
    ["A","F","L","O","A","T","N","A","U","L","A"],
    ["L","D","E","L","T","A","L","L","F","L","L"],
    ["P","I","G","H","E","D","G","E","I","Y","P"],
    ["I","K","V","E","G","A","P","Y","I","U","I"],
    ["N","E","M","K","L","J","I","Z","X","V","N"],
    ["G","D","L","I","Q","U","I","D","I","T","Y"],
    ["C","O","I","L","O","P","S","W","E","E","P"],
    ["T","R","A","D","I","N","G","H","K","L","M"],
    ["S","T","R","I","K","E","B","N","M","J","H"]
  ];
  
  const words = [
    "EXPIRY","STOPLOSS","DELTA","SCALPING","LIQUIDITY",
    "VEGA","RALLY","SWEEP","FLOAT","STRIKE","COIL"
  ];
  
  let isDragging = false;
  let selectedCells = [];
  let foundWords = [];
  let score = 0;
  let time = 60;
  
  function startGame() {
    document.getElementById("formPage").style.display = "none";
    document.getElementById("gamePage").style.display = "block";
    createGrid();
    loadWords();
    startTimer();
  }
  
  function createGrid() {
    const grid = document.getElementById("grid");
    grid.innerHTML = "";
  
    gridData.forEach((row, r) => {
      row.forEach((letter, c) => {
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.innerText = letter;
        cell.dataset.row = r;
        cell.dataset.col = c;
  
        cell.addEventListener("mousedown", startSelect);
        cell.addEventListener("mouseenter", dragSelect);
        cell.addEventListener("mouseup", endSelect);
  
        cell.addEventListener("touchstart", startSelect);
        cell.addEventListener("touchmove", touchMove);
        cell.addEventListener("touchend", endSelect);
  
        grid.appendChild(cell);
      });
    });
  
    document.addEventListener("mouseup", endSelect);
  }
  
  function loadWords() {
    const ul = document.getElementById("wordList");
    ul.innerHTML = "";
    words.forEach(w => {
      const li = document.createElement("li");
      li.innerText = w;
      li.id = "word-" + w;
      ul.appendChild(li);
    });
  }
  
  function startSelect(e) {
    clearSelection();
    isDragging = true;
    addCell(e.target);
  }
  
  function dragSelect(e) {
    if (!isDragging) return;
    addCell(e.target);
  }
  
  function touchMove(e) {
    if (!isDragging) return;
    const touch = e.touches[0];
    const element = document.elementFromPoint(touch.clientX, touch.clientY);
    if (element && element.classList.contains("cell")) {
      addCell(element);
    }
  }
  
  function endSelect() {
    if (!isDragging) return;
    isDragging = false;
    checkWord();
  }
  
  function addCell(cell) {
    if (cell.classList.contains("found")) return;
    if (selectedCells.includes(cell)) return;
  
    cell.classList.add("selected");
    selectedCells.push(cell);
  }
  
  function checkWord() {
    const word = selectedCells.map(c => c.innerText).join("");
  
    if (words.includes(word) && !foundWords.includes(word)) {
      foundWords.push(word);
      score += 10;
      document.getElementById("score").innerText = "Score: " + score;
      document.getElementById("word-" + word).classList.add("found");
  
      selectedCells.forEach(c => {
        c.classList.remove("selected");
        c.classList.add("found");
      });
    } else {
      clearSelection();
    }
  
    selectedCells = [];
  }
  
  function clearSelection() {
    document.querySelectorAll(".cell.selected").forEach(c => {
      c.classList.remove("selected");
    });
    selectedCells = [];
  }
  
  function startTimer() {
    const interval = setInterval(() => {
      time--;
      document.getElementById("timer").innerText = "Time: " + time;
      if (time === 0) {
        clearInterval(interval);
        alert("Time up! Score: " + score);
      }
    }, 1000);
  }
  