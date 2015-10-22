var title = "Break Out!";
	var byLine = "By: Nate Baker"
	var pause = "Paused"
	var gameOver = "Game over!"
	var newLevel = "Level: 1"
	var pressEnter = "Press enter to continue"
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	var canvasWidth = canvas.width;
	var canvasHeight = canvas.height;
	var ballX = canvas.width/2;
	var ballY = canvas.height/2;
	var ballRadius = 10;
	var ballSpeed = 1.5;
	var ballAngle = randomIntFromInterval(30, 150);
	var paddleWidth = 75
	var paddleHeight = 10;
	var paddleX = (canvas.width - paddleWidth)/2;
	var rightPressed = false;
	var leftPressed = false;
	var paddleSpeed = 7;
	var bricks;
	var brickRowCount = 2;
	var brickColumnCount = 5;
	var brickWidth = 75;
	var brickHeight = 20;
	var brickPadding = 10;
	var brickOffsetTop = 30;
	var brickOffsetLeft = 30;
	var score = 0;
	var level = 1;
	var lives = 3;
	var bricksCreated = 0;
	var gameStatus = {
		START: 1,
		GAMEOVER: 2,
		PAUSED: 3,
		PLAY: 4,
		VICTORY: 5,
		NEWLIFE: 6,
	}
	var gameState = gameStatus.START;
	
	var powerUps = [];
	var blueGem = new Image();
	blueGem.src = "images/blueGem.png";
	var redGem = new Image();
	redGem.src = "images/redGem.png";
	var greenGem = new Image();
	greenGem.src = "images/greenGem.png";
	var whiteGem = new Image();
	whiteGem.src = "images/whiteGem.png";

	document.addEventListener("keydown", keyDownHandler, false);
	document.addEventListener("keyup", keyUpHandler, false);
	document.addEventListener("keypress", keyPressHandler);
	
	var imageObj = new Image();
    imageObj.src = 'http://www.html5canvastutorials.com/demos/assets/darth-vader.jpg';
	
	gameStart();
//Set up	
	function gameStart (){
		console.log("Game start: "+gameState);
		console.log("Game width:"+canvas.width+" Game Height: "+canvas.height)
		switch(level){
			case 1:
				ballSpeed = 1;
				brickRowCount = 1;
				break;
			case 2:
				ballSpeed = 1.5;
				brickRowCount = 2;
				break;
				
			case 3:
				ballSpeed = 1.5;
				brickRowCount = 3;
				break;
			case 4:
				ballSpeed = 1.5;
				brickRowCount = 3;
				break;
			case 5:
				ballSpeed = 2;
				brickRowCount = 3;
				break;
			case 6:
				ballSpeed = 2;
				brickRowCount = 3;
				break;
			case 7:
				ballSpeed = 2.5;
				brickRowCount = 3;
				break;
			case 8:
				ballSpeed = 2.5;
				brickRowCount = 3;
				break;
			case 9:
				ballSpeed = 3;
				brickRowCount = 3;
				break;
			case 10:
				ballSpeed = 3;
				brickRowCount = 4;
				break;
			case 11:
				ballSpeed = 3;
				brickRowCount = 4;
				break;
			case 12:
				ballSpeed = 3.5;
				brickRowCount = 4;
				break;
			case 13:
				ballSpeed = 3.5;
				brickRowCount = 4;
				break;
			case 14:
				ballSpeed = 3.75;
				brickRowCount = 4;
				break;
			case 15:
				ballSpeed = 3.75;
				brickRowCount = 5;
				break;
			case 16:
				ballSpeed = 3.75;
				brickRowCount = 5;
				break;
			case 17:
				ballSpeed = 4;
				brickRowCount = 5;
				break;
			case 18:
				ballSpeed = 4.5;
				brickRowCount = 5;
				break;
			case 19:
				ballSpeed = 4.5;
				brickRowCount = 6;
				break;
			default:
				ballSpeed = 5;
				brickRowCount = 6;
				break;	
		}
		if(gameState != gameStatus.NEWLIFE){	
			bricks = [];		
			for(c = 0; c < brickColumnCount; c++){
				bricks[c] = [];
			
				for(r = 0; r < brickRowCount; r++){
					var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
					var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
					bricks[c][r] = {x: brickX, y: brickY, color: getRandomColor(), status: 1};
				}
			}
			bricksCreated = brickRowCount*brickColumnCount;
		}
		powerUps = [];
		ballX = canvas.width/2;
		ballY = canvas.height-paddleHeight;
		paddleX = (canvas.width - paddleWidth)/2;
		if(gameState == gameStatus.GAMEOVER){
			console.log("Game over restart");
			level = 0;
			score = 0;
			lives = 3;
			gameState = gameStatus.START;
		}
	}
	
//Controlls	
	function  keyDownHandler(e){
		if(e.keyCode == 39){
			rightPressed = true;
		}
		else if(e.keyCode == 37){
			leftPressed = true;
		}
	}

	function keyUpHandler(e){
		if(e.keyCode == 39){
			rightPressed = false;
		}
		else if(e.keyCode == 37){
			leftPressed = false;
		}
	}
	function keyPressHandler(e){
		if(e.keyCode == 13){
			if(gameState == gameStatus.START || gameState == gameStatus.PAUSED ||
			gameState == gameStatus.VICTORY || gameState == gameStatus.NEWLIFE){
				gameState = gameStatus.PLAY
			}
			else if(gameState == gameStatus.GAMEOVER){
				gameStart();
			}
			else{
				gameState = gameStatus.PAUSED;
			}
		}
	}
//Rendering		
	function drawBall(){
		ctx.beginPath()
		ctx.arc(ballX, ballY, ballRadius, 0, Math.PI*2);
		ctx.fillStyle = "#0095DD"
		ctx.fill();
		ctx.closePath();
	}
	function drawPaddle(){
		ctx.beginPath();
		ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
		ctx.fillStyle = "0095DD";
		ctx.fill();
		ctx.closePath;
	}
	function drawBricks(){
		for(c = 0; c < brickColumnCount; c++){
			for(r = 0; r < brickRowCount; r++){
				if(bricks[c][r].status == 1){
					ctx.beginPath();
					ctx.rect(bricks[c][r].x, bricks[c][r].y, brickWidth, brickHeight);
					ctx.fillStyle = bricks[c][r].color;
					ctx.fill();
					ctx.closePath();
				}
			}
		}
	}
	function createPowerUps(xStart, yStart){
		var chance = randomIntFromInterval(0, 999)
		var newPowerUp;
		if(chance < 1){
			newPowerUp = {image: whiteGem, score: 100, oneUp: 1, x: xStart, y: yStart, width: whiteGem.width, height: whiteGem.height};
		}
		else if (chance > 1 && chance < 11){
			newPowerUp = {image: blueGem, score: 75, oneUp: 0, x: xStart, y: yStart, width: blueGem.width, height: blueGem.height};
		}
		else if (chance > 11 && chance < 50){
			newPowerUp = {image: greenGem, score: 25, oneUp: 0, x: xStart, y: yStart, width: greenGem.width, height: greenGem.height};
		}
		else if (chance > 50 && chance < 150){
			newPowerUp = {image: redGem, score: 10, oneUp: 0, x: xStart, y: yStart, width: redGem.width, height: redGem.height};
		}
		if( newPowerUp != null){
			powerUps.push(newPowerUp);
		}

	}
	function drawPowerUps(){
		for(var i = 0; i < powerUps.length; i++){
			ctx.drawImage(powerUps[i].image, powerUps[i].x, powerUps[i].y);
		}
	}
//Menus
	function drawTitles(){
		ctx.font = "16px Arial";
		ctx.fillStyle = "#0095DD";
		ctx.fillText("Score: "+score, 8, 20);
		ctx.fillText("Lives: "+lives, canvas.width-64, 20);
		if(gameState == gameStatus.START){
			ctx.font = "46px Arial";
			ctx.fillStyle = "#0095DD";
			ctx.fillText(title, canvas.width/2- ctx.measureText(title).width/2, canvas.height/2);
			ctx.font = "16px Arial";
			ctx.fillText(byLine, canvas.width/2- ctx.measureText(byLine).width/2, canvas.height/2+18);
			ctx.fillText(pressEnter, canvas.width/2- ctx.measureText(pressEnter).width/2, canvas.height/2+34);
		}
		else if(gameState == gameStatus.GAMEOVER){
			ctx.font = "46px Arial";
			ctx.fillStyle = "#0095DD";
			ctx.fillText(gameOver, canvas.width/2- ctx.measureText(gameOver).width/2, canvas.height/2);
			ctx.font = "16px Arial";
			ctx.fillStyle = "#0095DD";
			ctx.fillText(pressEnter, canvas.width/2- ctx.measureText(pressEnter).width/2, canvas.height/2+16);
		}
		else if(gameState == gameStatus.PAUSED){
			ctx.font = "46px Arial";
			ctx.fillStyle = "#0095DD";
			ctx.fillText(pause, canvas.width/2- ctx.measureText(pause).width/2, canvas.height/2);
			ctx.font = "16px Arial";
			ctx.fillStyle = "#0095DD";
			ctx.fillText(pressEnter, canvas.width/2- ctx.measureText(pressEnter).width/2, canvas.height/2+16);
		}
		else if(gameState == gameStatus.VICTORY || gameState == gameStatus.NEWLIFE){
			newLevel = "Level: "+level;
			ctx.font = "46px Arial";
			ctx.fillStyle = "#0095DD";
			ctx.fillText(newLevel, canvas.width/2- ctx.measureText(newLevel).width/2, canvas.height/2);
			ctx.font = "16px Arial";
			ctx.fillStyle = "#0095DD";
			ctx.fillText(pressEnter, canvas.width/2- ctx.measureText(pressEnter).width/2, canvas.height/2+16);
		}
	}
//Updates
	function updatePowerUps(){
		for(var i = 0; i < powerUps.length; i++){
			powerUps[i].y++;
			if(powerUps[i].y > canvas.height - powerUps[i].height){
				if(powerUps[i].x > paddleX && powerUps[i].x < paddleX + paddleWidth){
					score += powerUps[i].score;
					lives += powerUps[i].oneUp;
				}
				powerUps.splice(i, 1);
			}	
		}
	}
	function updateBricks(){
		for(c=0; c<brickColumnCount; c++) {
			for(r=0; r<brickRowCount; r++) {
				if(level > 5){
					bricks[c][r].x -= 0.5;
					if(bricks[c][r].x <= -brickWidth){
						bricks[c][r].x = canvasWidth;
					}
				}
				if(bricks[c][r].status == 1){
					if(ballX > bricks[c][r].x && ballX < bricks[c][r].x+brickWidth && ballY > bricks[c][r].y && ballY < bricks[c][r].y+brickHeight) {
						ballAngle = findInversAngle(ballAngle);
						bricks[c][r].status = 0;
						score += 10;
						bricksCreated--;
						createPowerUps(bricks[c][r].x+38, bricks[c][r].y);
						console.log("5");
						if(bricksCreated <= 0){
							console.log("balls")
							gameState = gameStatus.VICTORY;
							level++;
							gameStart()
						}
					}
				}
			}
        }		
	}	
	function updateBall(){
			ballX += ballSpeed * Math.sin(ballAngle);
			ballY += ballSpeed * Math.cos(ballAngle);
//Ball movement
			if(ballX < 0){
				ballAngle = findInversAngle(ballAngle);
				ballX = 0;
			}
			else if( ballX > canvas.width - ballRadius){
				ballAngle = findInversAngle(ballAngle);
				ballX = canvasWidth-ballRadius;
			}
			if(ballY < 0){
				ballY = 0;
				ballAngle = findInversAngle(ballAngle);
			}
			else if(ballY > canvas.height - ballRadius){
				if(ballX > paddleX && ballX < paddleX + paddleWidth){
					ballAngle = randomIntFromInterval(30, 150)
					ballY = canvasHeight-paddleHeight;
				}
				else{
					if(lives > 0){
						gameState = gameStatus.NEWLIFE;
						lives--;
						gameStart();
					}
					else{
						gameState = gameStatus.GAMEOVER;
					}
				}
			}
	}
	function updatePaddle(){
		if(rightPressed && paddleX < canvas.width-paddleWidth) {
			paddleX += paddleSpeed;
		}
		else if(leftPressed && paddleX > 0) {
			paddleX -= paddleSpeed;
		}
	}
//Utills	
	function getRandomColor() {
		var letters = '0123456789ABCDEF'.split('');
		var color = '#';
		for (var i = 0; i < 6; i++ ) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	}
	function randomIntFromInterval(min,max)
	{
		return Math.floor(Math.random()*(max-min+1)+min);
	}
	function findInversAngle(angle){
		angle += 90;
		if(angle > 360){
			angle = angle - 360;
		}
		return angle;
	}
//Main loop	
	function draw(){
		if(gameState == gameStatus.PLAY){
			updatePaddle();
			updateBall();
			updatePowerUps();
			updateBricks();
		}
//Begin render
		ctx.clearRect(0, 0, canvas.width, canvas.height);
//Draw Sprites
		if(gameState == gameStatus.PLAY){
			drawPowerUps();
			drawBall();
		}
		drawPaddle();
		drawBricks();
		drawTitles();

	}
	setInterval(draw, 10);
