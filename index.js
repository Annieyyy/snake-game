
	var content = document.getElementById('content');
	var startPage = document.getElementById('startPage');
	var snakeMove;
	var speed = 200;
	var scoreBox = document.getElementById('score');
	var loser = document.getElementById('loser');
	var loserScore = document.getElementById('loserScore');
	var close = document.getElementById('close');
	var startP = document.getElementById('startP');
	var startBtn = document.getElementById('startBtn');
	var startGameBool = true;
	var startPaushBool = true;


	init();
	function init(){
		// map size
		this.mapW = parseInt(getComputedStyle(content).width);
		this.mapH = parseInt(getComputedStyle(content).height);
		this.mapDiv = content;
		// apple
		this.foodW = 20;
		this.foodH = 20;
		this.foodX = 0;
		this.foodY = 0;
	
		// snake
		this.snakeW = 20;
		this.snakeH = 20;
		this.snakeBody = [[2,0,'head'],[1,0,'body'],[0,0,'body']];

		// game direction
		this.direct = 'right';
		this.left = false;
		this.right = false;
		this.up = true;
		this.down = true;

		this.score = 0;

		// startGame();
	
	}
	bindEvent();
	function startGame(){
		startPage.style.display = 'none';
		startP.style.display = 'block';
		food();
		snake();
		scoreBox.innerHTML = '0';
		
	}

// Generate apple randomly
	function food(){
		var food = document.createElement('div');
		food.style.width = this.foodW +'px';
		food.style.height = this.foodH + 'px';
		food.style.position = 'absolute';
		this.foodX = Math.floor(Math.random()*(this.mapW/20));
		this.foodY = Math.floor(Math.random()*(this.mapH/20));
		food.style.left = this.foodX * 20 + 'px';
		food.style.top = this.foodY * 20 + 'px';
		this.mapDiv.appendChild(food).setAttribute('class','food')
	}

	function snake(){
		for(var i = 0; i < this.snakeBody.length; i++){
			var snake = document.createElement('div');
			snake.style.width = this.snakeW + 'px';
			snake.style.height = this.snakeH +'px';
			snake.style.position = 'absolute';
			snake.style.left = this.snakeBody[i][0] * 20 + 'px';
			snake.style.top = this.snakeBody[i][1] * 20 +'px';
			snake.classList.add(this.snakeBody[i][2]);
			this.mapDiv.appendChild(snake).classList.add('snake');
			switch(this.direct){
			case 'right': snake.style.transform = 'rotate(90deg)';
						break;
			case 'up': 
						break;
			case 'left': snake.style.transform = 'rotate(270deg)';
						break;
			case 'down': snake.style.transform = 'rotate(180deg)';
						break;
			default: break;
		}
		}
	}


	function move(){
		for(var i = this.snakeBody.length - 1; i > 0; i--){
			this.snakeBody[i][0] = this.snakeBody[i-1][0];
			this.snakeBody[i][1] = this.snakeBody[i-1][1];
		}
		switch(this.direct){
			case 'right': this.snakeBody[0][0] += 1;
						break;
			case 'up': this.snakeBody[0][1] -= 1;
						break;
			case 'left': this.snakeBody[0][0] -= 1;
						break;
			case 'down': this.snakeBody[0][1] += 1;
						break;
			default: break;
		}
		removeClass('snake');
		snake();

		if(this.snakeBody[0][0] == this.foodX && this.snakeBody[0][1] == this.foodY){
			var snakeEndX = this.snakeBody[this.snakeBody.length-1][0];
			var snakeEndY = this.snakeBody[this.snakeBody.length-1][1];
			switch(this.direct){
			case 'right': this.snakeBody.push([snakeEndX +1, snakeEndY,'body']);
						break;
			case 'up': this.snakeBody.push([snakeEndX, snakeEndY - 1,'body']);
						break;
			case 'left': this.snakeBody.push([snakeEndX -1, snakeEndY,'body']);
						break;
			case 'down': this.snakeBody.push([snakeEndX, snakeEndY + 1,'body']);
						break;
			default: break;
		}

			this.score += 1;
			scoreBox.innerHTML = this.score;
			removeClass('food');
			food();
		}

		if(this.snakeBody[0][0] < 0|| this.snakeBody[0][0] >= this.mapW/20){
			reloadGame();
		}
		if(this.snakeBody[0][1] < 0|| this.snakeBody[0][1] >= this.mapH/20){
			reloadGame();
		}
		var snakeHX = this.snakeBody[0][0];
		var snakeHY = this.snakeBody[0][1];
		for(var i = 1; i < this.snakeBody.length;i++){
			if(snakeHX == snakeBody[i][0] && snakeHY == snakeBody[i][1]){
				reloadGame();
			}
		}
	}

	function reloadGame(){
		removeClass('snake');
		removeClass('food');
		clearInterval(snakeMove);
		this.snakeBody = [[2,0,'head'],[1,0,'body'],[0,0,'body']];
		this.direct = 'right';
		this.left = false;
		this.right = false;
		this.up = true;
		this.down = true;
		loser.style.display='block';
		loserScore.innerHTML = this.score;
		this.score = 0;
		scoreBox.innerHTML = this.score;
		startGameBool = true;
		startPaushBool = true;
		startP.setAttribute('src','./img/start.png');
	}

	function removeClass(className){
		var ele = document.getElementsByClassName(className);
		while(ele.length > 0){
			ele[0].parentNode.removeChild(ele[0]);
		}
	}

	function setDirect(code){
		switch(code){
			case 37: 
					if(this.left){
						this.direct = 'left';
						this.left = false;
						this.right = false;
						this.up = true;
						this.down = true;
					}
					break;
			case 38: 
					if(this.up){
						this.direct = 'up';
						this.left = true;
						this.right = true;
						this.up = false;
						this.down = false;
					}
					break;
			case 39: 
					if(this.right){
						this.direct = 'right';
						this.left = false;
						this.right = false;
						this.up = true;
						this.down = true;
					}
					break;
			case 40: 
					if(this.down){
						this.direct = 'down';
						this.left = true;
						this.right = true;
						this.up = false;
						this.down = false;
					}
					
					break;
			default: break;
		}
	}

	function bindEvent(){
		close.onclick = function(){
			loser.style.display = 'none';
		}

		startBtn.onclick = function(){
			startAndPaush();
		}
		startP.onclick = function(){
			loser.style.display='none';
			startAndPaush();
		}
	}

	function startAndPaush(){
		if(startPaushBool){
			if(startGameBool){
				startGame();
				startGameBool = false;
			}
			startP.setAttribute('src','./img/stop.png');
			document.onkeydown = function(e){
				e.preventDefault();
				var code = e.keyCode;
				setDirect(code);

			}
			snakeMove = setInterval(function(){
				move();
			},speed);
			startPaushBool = false;
		}
		else{
			startP.setAttribute('src','./img/run.png');
			clearInterval(snakeMove);
			document.onkeydown = function(e){

				e.returnValue = false;
				return false;
			}
			startPaushBool = true;
		}
	}























