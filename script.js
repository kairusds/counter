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
let newline = false;
let separator = false;
let separatorChar = "";

const $ = (selector) => document.querySelector(selector);

const audio = new Audio(`${songs[songIndex]}.mp3`);
audio.volume = 0.6;

audio.onended = () => {
	audio.pause();
	songIndex++;
	if(songIndex == songs.length) songIndex = 0;
	let songSrc = `${songs[songIndex]}.mp3`;
	audio.src = songSrc;
	$("#now-playing").innerHTML = `now playing: ${songSrc}`;
	audio.play();
};

const updateCounter = (event) => {
	let min = Number($("#start").value);
	let max = Number($("#quantity").value);
	let output = "";
	const numbers = [];
	
	if(min < Number.MIN_SAFE_INTEGER || min > Number.MAX_SAFE_INTEGER) $("#start").value = min = 0;
	if(max > Number.MAX_SAFE_INTEGER || max < Number.MIN_SAFE_INTEGER) $("#quantity").value = max = 1;
	
	for(let i = min; i <= max; i++){
		numbers.push(i);
	}
	
	if(separator){
		for(let i = 0; i < numbers.length - 1; i++){
			numbers[i] += separatorChar;
		}
	}
	
	if(newline){
		$("#results").value = numbers.join("\n");
		return;
	}
	
	$("#results").value = numbers.join("");
};

const updateTheme = () => $("body").style = `background-color: ${darkMode ? "#212121" : "#ffffff"};color: ${darkMode ? "#ffffff" : "#000000"}`;

$("#why").onclick = () => {
	if($("#content").innerHTML === ""){
		$("#content").innerHTML = `
			<br>so useless i feel nothing but emptiness growing inside me.<br>
			creating this piece of uselessness is trash but i had fun while it lasted.<br>
			site created by kairusds/harveyhans(me), music by <a href="https://twitter.com/ChefBakashi" target="_blank">Bakashi</a>.
			btw clicking the rolling hamster gif changes the volume to 70% or 100%
		`;
		$("#why").innerHTML = "okay";
	}else{
		$("#content").innerHTML = "";
		$("#why").innerHTML = "why";
	}
};

$("#music").onclick = () => {
	if(!songPlaying){
		audio.play();
		$("#now-playing").innerHTML = `now playing: ${songs[songIndex]}.mp3`;
		$("#music").innerHTML = "pause music";
		songPlaying = true;
	}else{
		songPlaying = false;
		audio.pause();
		$("#now-playing").innerHTML = "";
		$("#music").innerHTML = "play music";
	}
};

$("img").onclick = () => {
	if(audio.volume == 0.6){
		audio.volume = 1.0;
	}else{
		audio.volume = 0.6;
	}
};

$("#dark").onchange = (event) => {
	darkMode = event.target.checked;
	updateTheme();
};

$("#newline").onchange = (event) => {
	if(separator){
		separator = false;
		$("#separator").checked = false;
	}
	newline = event.target.checked;
};

$("#separator").onchange = (event) => {
	if(newline){
		newline = false;
		$("#newline").checked = false;
	}
	separator = event.target.checked;
};

$("#separator-char").oninput = (event) => {
	separatorChar = event.target.value;
	if(separator) updateCounter(event);
}

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