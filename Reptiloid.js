'use strict'

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const reptiloid = new Image();
reptiloid.src = 'Images/Reptiloid.png';
const camel = new Image();
camel.src = 'Images/Camel.png';
const dolphin = new Image();
dolphin.src = 'Images/Dolphin.png';
const characters = [camel, reptiloid, dolphin];

let start = false, trap = false, sumReptiloid = 0, click = 0, score = 0, hit = 0;

canvas.onclick = () => {
	if (trap) {
		score++;
	} else {
		score--;
	}
	click++; 
};

function draw() {
	let choiceCharacter = Math.round(Math.random() * 2);
	let lifetime = (Math.random() * 0.3) * 1000;
	ctx.drawImage(characters[choiceCharacter], 0, 0);
	if (choiceCharacter == 1) {
		sumReptiloid++; 
		trap = true;
		setTimeout(() => trap = false, 500);
	}
    setTimeout(() => ctx.clearRect(0, 0, canvas.width, canvas.height), lifetime);
};

function play() {
	if (start) {
	let timeout = (Math.random() * 3 + 1) * 1000;
	draw();
	setTimeout(play, timeout);
	}
}; 
 
function gameOver() {
	start = false;
	if (click < sumReptiloid) {
		score -= sumReptiloid - click;
	}
	hit = Math.round(score/(sumReptiloid/100));
	if (hit <= 0) hit = 0;
	alert(`Вы прошли test-game на ${hit} баллов из 100`);
	let continueGame = confirm('Играть еще раз?');
	if(continueGame) {
		sumReptiloid = 0, click = 0, score = 0, hit = 0;
		setTimeout(init, 5000);
	}
};

function init() {
	setTimeout(gameOver, 60000); 
	start = true; 
    play();
};

let playGame = confirm(`Пройдите test-game "Reptiloid"
Через несколько секунд на экране будут появляться различные персонажи. Вам необходимо кликнуть мышью в момент появлении рептилоида.
Внимание! Реагировать на других персонажей нельзя!
Если не успеваете вовремя поймать рептилоида, "стреляйте вдогонку", ловушка еще некоторое время работает!
Не реагировать на появление рептилоида тоже нельзя!
Пройти test-game?`);
if (playGame) setTimeout(init, 5000); 