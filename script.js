"use strict";

const songs = [
	"useless_2",
	"useless_dnb_future_bass",
	"future_bass_thing_yuudachi_ver",
	"terror"
];
let songIndex = 0;
let songPlaying = false;
let darkMode = false;

const $ = (selector) => document.querySelector(selector);

const sound = document.createElement("audio");
sound.src = `${songs[songIndex]}.mp3`;
sound.setAttribute("preload", "auto");
sound.setAttribute("controls", "none");
sound.style.display = "none";
document.body.appendChild(sound);

sound.onended = () => {
	sound.pause();
	songIndex++;
	if(songIndex == songs.length) songIndex = 0;
	sound.src = `${songs[songIndex]}.mp3`;
	sound.play();
};

/* const playBGM = () => {
	sound.play();
} */

const updateCounter = (event) => {
	let min = Number($("#start").value);
	let max = Number($("#quantity").value);
	const numbers = [];
	
	if(min < Number.MIN_SAFE_INTEGER || min > Number.MAX_SAFE_INTEGER) $("#start").value = min = 0;
	if(max > Number.MAX_SAFE_INTEGER || max < Number.MIN_SAFE_INTEGER) $("#quantity").value = max = 1;
	
	for(var i = min; i <= max; i++){
		numbers.push(i);
	}
	
	$("#results").value = numbers.join("\n");
}

const updateTheme = () => {
	$("body").style = `background-color: ${darkMode ? "#212121" : "#ffffff"};color: ${darkMode ? "#ffffff" : "#000000"}`;
}

$("#why").onclick = () => {
	if($("#content").innerHTML === ""){
		$("#content").innerHTML = `
			<br>so useless i feel nothing but emptiness growing inside me.<br>
			creating this piece of uselessness is trash but i had fun while it lasted.<br>
			site created by kairusds/harveyhans(me), music by <a href="https://twitter.com/ChefBakashi" target="_blank">Bakashi</a>.
		`;
		$("#why").innerHTML = "okay";
	}else{
		$("#content").innerHTML = "";
		$("#why").innerHTML = "why";
	}
};

$("#music").onclick = () => {
	if(!songPlaying){
		sound.play();
		$("#music").innerHTML = "pause music";
		songPlaying = true;
	}else{
		songPlaying = false;
		sound.pause();
		$("#music").innerHTML = "play music";
	}
}

$("#dark").onchange = (event) => {
	darkMode = event.target.checked;
	updateTheme();
};

$("#start").oninput = (event) => {
	updateCounter(event);
};

$("#quantity").oninput = (event) => {
	updateCounter(event);
};

if(window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches){
	darkMode = true;
	$("#dark").checked = true;
	updateTheme();
}

window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", event => {
	darkMode = event.matches;
	$("#dark").checked = event.matches;
	updateTheme();
});

// playBGM();