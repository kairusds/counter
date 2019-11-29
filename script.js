const songs = ["useless", "terror"];
let songIndex = 0;

function $(selector){
	return document.querySelector(selector);
}

function playBGM(){
	const sound = document.createElement("audio");
	sound.src = "useless.mp3";
	sound.setAttribute("preload", "auto");
	sound.setAttribute("controls", "none");
	sound.style.display = "none";
	document.body.appendChild(sound);
	sound.play();
	
	sound.onended = () => {
		sound.stop();
		songIndex++;
		if(songIndex == songs.length) songIndex = 0;
		sound.src = `${songs[songIndex]}.mp3`;
		sound.load();
		sound.play();
	};
}

$("#why").onclick = () => {
	if($("#content").innerHTML === ""){
		$("#content").innerHTML = `
			<br>so useless i feel nothing but emptiness growing inside me.<br>
			creating this piece of uselessness is trash but i had fun while it lasted.<br>
			site created by kairusds/harveyhans(me), music by <a href="https://twitter.com/BakashiLoli" target="_blank">Bakashi</a>.
		`;
		$("#why").innerHTML = "okay";
	}else{
		$("#content").innerHTML = "";
		$("#why").innerHTML = "why";
	}
};

$("#dark").onchange = (event) => {
	const checked = event.target.checked;
	$("body").style = `background-color: ${checked ? "#212121" : "#ffffff"};color: ${checked ? "#ffffff" : "#000000"}`;
};

$("#quantity").oninput = (event) => {
	let min = Number($("#start").value);
	if(min < 1) $("#start").value = 0;
	const numbers = [];
	for(var i = min; i <= event.target.value; i++){
		numbers.push(i);
	}
	$("#results").value = numbers.join("\n");
};

playBGM();