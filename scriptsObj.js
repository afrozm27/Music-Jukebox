var audioFileList = []
var trackCounter = 0
var audioPlayer = null

var jukebox = new Jukebox()
var playlist = new Playlist() 

function getAudioPlayer(){

		document.getElementById("playerBody").innerHTML = "<h3>Click any track on the playlist to begin listening!</h3> <audio type='audio/mp3' controls id='audioPlayer' class='audioElement'></audio>"
		audioPlayer = document.getElementById("audioPlayer")

		playlist.nextTrack()

		playlist.newAudioFile("Truckin", "https://www.archive.org/download/gd1971-04-25.sbd.matera.113038.sbeok.flac16/gd71-04-25d1t01.mp3")
		playlist.newAudioFile("Loser", "https://www.archive.org/download/gd1971-04-25.sbd.matera.113038.sbeok.flac16/gd71-04-25d1t02.mp3")
		playlist.newAudioFile("Hard To Handle", "https://www.archive.org/download/gd1971-04-25.sbd.matera.113038.sbeok.flac16/gd71-04-25d1t03.mp3")
		playlist.newAudioFile("Me And Bobby McGee", "https://www.archive.org/download/gd1971-04-25.sbd.matera.113038.sbeok.flac16/gd71-04-25d1t04.mp3")
		playlist.newAudioFile("Cold Rain And Snow", "https://www.archive.org/download/gd1971-04-25.sbd.matera.113038.sbeok.flac16/gd71-04-25d1t05.mp3")
		playlist.newAudioFile("The Rub", "https://www.archive.org/download/gd1971-04-25.sbd.matera.113038.sbeok.flac16/gd71-04-25d1t06.mp3")
		playlist.newAudioFile("Playing In The Band", "https://www.archive.org/download/gd1971-04-25.sbd.matera.113038.sbeok.flac16/gd71-04-25d1t07.mp3")
		playlist.newAudioFile("Friend Of The Devil", "https://www.archive.org/download/gd1971-04-25.sbd.matera.113038.sbeok.flac16/gd71-04-25d1t08.mp3")
		playlist.newAudioFile("I Know You Rider", "https://www.archive.org/download/gd1971-04-25.sbd.matera.113038.sbeok.flac16/gd71-04-25d1t10.mp3")

		playButton = document.createElement("div")
			playButton.setAttribute("id", "playButton")
			playButton.setAttribute("class", "btn btn-primary")
			document.getElementById("playerBody").appendChild(playButton)
			playButton.innerHTML = "<i class='glyphicon glyphicon-play-circle'</i>"
			playButton.addEventListener("click", jukebox.play)

		pauseButton = document.createElement("div")
			pauseButton.setAttribute("id", "pauseButton")
			pauseButton.setAttribute("class", "btn btn-primary")
			document.getElementById("playerBody").appendChild(pauseButton)
			pauseButton.innerHTML = "<i class= 'glyphicon glyphicon-pause'></i>"
			pauseButton.addEventListener("click", jukebox.pause)

		previousButton = document.createElement("div")
			previousButton.setAttribute("id", "nextButton")
			previousButton.setAttribute("class", "btn btn-primary")
			document.getElementById("playerBody").appendChild(previousButton)
			previousButton.innerHTML = "<i class='glyphicon glyphicon-step-backward'</i>"
			previousButton.addEventListener("click", jukebox.back)

		nextButton = document.createElement("div")
			nextButton.setAttribute("id", "nextButton")
			nextButton.setAttribute("class", "btn btn-primary")
			document.getElementById("playerBody").appendChild(nextButton)
			nextButton.innerHTML = "<i class='glyphicon glyphicon-step-forward'</i>"
			nextButton.addEventListener("click", jukebox.next)

		newTrackButton = document.createElement("div")
			newTrackButton.setAttribute("id", "newTrackButton")
			newTrackButton.setAttribute("class", "btn btn-primary")
			document.getElementById("playerBody").appendChild(newTrackButton)
			newTrackButton.innerHTML = "<i class='glyphicon glyphicon-plus-sign'></i>"
			newTrackButton.addEventListener("click", jukebox.addTrack)

		downloadButton = document.createElement("div")
			downloadButton.setAttribute("id", "downloadButton")
			downloadButton.setAttribute("class", "btn btn-primary")
			document.getElementById("playerBody").appendChild(downloadButton)
			downloadButton.innerHTML = "<i class='glyphicon glyphicon-download-alt'</i>"
			downloadButton.addEventListener("click", jukebox.downloadTrack)
}

function Jukebox() {

	this.play = function(){
		this.nextIndex = playlist.getIndex()
		if (this.nextIndex == -1) {
			audioPlayer.src = audioFileList[0].tracklocation
			audioPlayer.play()
			playlist.highlightTrack(this.nextIndex, "next")
		}
		else {
			audioPlayer.play()
			playlist.highlightTrack(this.nextIndex, "next")
		}
	}

	this.pause = function(){
		audioPlayer.pause()
	}

	this.back = function(){
		this.nextIndex = playlist.getIndex()
		if (this.nextIndex != -1 && this.nextIndex != 0) {
			audioPlayer.src = audioFileList[this.nextIndex - 1].tracklocation
			audioPlayer.play()
			playlist.highlightTrack(this.nextIndex, "back")
		}
		else if (this.nextIndex == 0){
			audioPlayer.src = audioFileList[audioFileList.length - 1].tracklocation
			audioPlayer.play()
			playlist.highlightTrack(this.nextIndex, "back")
		}
		else {
			audioPlayer.src = audioFileList[audioFileList.length - 1].tracklocation
			audioPlayer.play()
			playlist.highlightTrack(this.nextIndex, "back")
		}
	}

	this.next = function(){
		this.nextIndex = playlist.getIndex()
		if (this.nextIndex != -1 && this.nextIndex != (audioFileList.length - 1)) {
			audioPlayer.src = audioFileList[this.nextIndex + 1].tracklocation
			audioPlayer.play()
			playlist.highlightTrack(this.nextIndex, "next")
		}
		else if (this.nextIndex == (audioFileList.length - 1)){
			audioPlayer.src = audioFileList[0].tracklocation
			audioPlayer.play()
			playlist.highlightTrack(this.nextIndex, "next")
		}
		else {
			audioPlayer.src = audioFileList[0].tracklocation
			audioPlayer.play()
			playlist.highlightTrack(this.nextIndex, "next")
		}
	}

	this.addTrack = function(){
		newTrack = prompt("Please enter the name of the track you wish to add.")
		newLocation = prompt("Paste the full URL of the track here.")
		playlist.newAudioFile(newTrack, newLocation)
	}

	this.downloadTrack = function() {
		
	}

}

function Playlist() {

	this.newAudioFile = function(trackname, tracklocation) {
		this.audioFile = new AddAudioFile(trackname, tracklocation)
		audioFileList.push(this.audioFile)
	}

	function AddAudioFile(trackname, tracklocation) {

		trackCounter += 1
	
		this.trackname = trackname
		this.tracklocation = tracklocation
	
		var newDiv = document.createElement("div")
		newDiv.setAttribute("id", "track"+ trackCounter) 
		trackID = newDiv.getAttribute("id")
		newDiv.classList.add("audioFile")
		document.getElementById("playList").appendChild(newDiv)
		newDiv.innerHTML = "<h4>" + trackCounter + ". " + this.trackname + "</h4>"

		makeClickable(this.tracklocation, this.trackID)
	
		function makeClickable(place, trackID){
			document.getElementById("track"+trackCounter).addEventListener("click", function(){
				this.index = audioFileList.findIndex(i => i.tracklocation == place)
				this.prevTrack = audioFileList.findIndex(i => i.tracklocation == audioPlayer.src)
				if (this.prevTrack != -1) {
					document.getElementById("track"+(this.prevTrack+1)).classList.remove("currentTrack")
				}
				document.getElementById("track"+(this.index+1)).classList.add("currentTrack")
				audioPlayer.src = place
				audioPlayer.play()
			})

		}
	}

	this.nextTrack = function() {
		document.getElementById("audioPlayer").addEventListener("ended", function(){
		this.nextIndex = playlist.getIndex()
		if (this.nextIndex < (audioFileList.length-1)) {
			audioPlayer.src = audioFileList[this.nextIndex + 1].tracklocation
			document.getElementById("track" + (this.nextIndex + 1)).classList.remove("currentTrack")
			document.getElementById("track" + (this.nextIndex + 2)).classList.add("currentTrack")
		}
		else {
			audioPlayer.src = audioFileList[0].tracklocation
			document.getElementById("track" + (this.nextIndex + 1)).classList.remove("currentTrack")
			document.getElementById("track1").classList.add("currentTrack")
		}
		audioPlayer.play()
		})
	}

	this.highlightTrack = function(nextIndex, direction){

		if (nextIndex == -1 && direction == "next") {
			document.getElementById("track1").classList.add("currentTrack")

		} else if (nextIndex == -1 && direction == "back") {
			document.getElementById("track" + audioFileList.length).classList.add("currentTrack")

		} else if (nextIndex != -1 && direction == "next" && nextIndex != (audioFileList.length - 1)) {
			document.getElementById("track" + (nextIndex + 1)).classList.remove("currentTrack")
			document.getElementById("track" + (nextIndex + 2)).classList.add("currentTrack")

		} else if (nextIndex != -1 && direction == "next" && nextIndex == (audioFileList.length - 1)) {
			document.getElementById("track" + (nextIndex + 1)).classList.remove("currentTrack")
			document.getElementById("track1").classList.add("currentTrack")

		} else if (nextIndex != -1 && direction == "back" && nextIndex == 0) {
			document.getElementById("track" + (nextIndex + 1)).classList.remove("currentTrack")
			document.getElementById("track" + (audioFileList.length)).classList.add("currentTrack")

		} else if (nextIndex != -1 && direction == "back" && nextIndex != 0) {
			document.getElementById("track" + (nextIndex + 1)).classList.remove("currentTrack")
			document.getElementById("track" + nextIndex).classList.add("currentTrack")
		} 

	}

	this.getIndex = function() {
		this.index = audioFileList.findIndex(i => i.tracklocation == audioPlayer.src)
		return this.index
	}
}



