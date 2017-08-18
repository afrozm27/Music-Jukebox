var audioFileList = []
var trackCounter = 0

	



function Jukebox(){
	getAudioPlayer()
	nextTrack()

	function getAudioPlayer(){

		document.getElementById("playerBody").innerHTML = "<h3>Click any track on the playlist to begin listening!</h3> <audio type='audio/mp3' controls id='audioPlayer' class='audioElement'></audio>"
		this.audioPlayer = document.getElementById("audioPlayer")
		
		this.playButton = document.createElement("div")
			playButton.setAttribute("id", "playButton")
			playButton.setAttribute("class", "btn btn-primary")
			document.getElementById("playerBody").appendChild(playButton)
			playButton.innerHTML = "<i class='glyphicon glyphicon-play-circle'</i>"
			playButton.addEventListener("click", function(){
				this.nextIndex = audioFileList.findIndex(i => i.tracklocation == audioPlayer.src) + 1
				if (this.nextIndex == 0) {
					audioPlayer.src = audioFileList[0].tracklocation
					audioPlayer.play()
					document.getElementById("track1").classList.add("currentTrack")
				}
				else {
					audioPlayer.play()
				}
			})

		this.pauseButton = document.createElement("div")
			pauseButton.setAttribute("id", "pauseButton")
			pauseButton.setAttribute("class", "btn btn-primary")
			document.getElementById("playerBody").appendChild(pauseButton)
			pauseButton.innerHTML = "<i class= 'glyphicon glyphicon-pause'></i>"
			pauseButton.addEventListener("click", function(){
				audioPlayer.pause()
			})

		this.previousButton = document.createElement("div")
			previousButton.setAttribute("id", "nextButton")
			previousButton.setAttribute("class", "btn btn-primary")
			document.getElementById("playerBody").appendChild(previousButton)
			previousButton.innerHTML = "<i class='glyphicon glyphicon-step-backward'</i>"
			previousButton.addEventListener("click", function(){
				this.nextIndex = audioFileList.findIndex(i => i.tracklocation == audioPlayer.src)
				if (this.nextIndex != -1 && this.nextIndex != 0) {
					audioPlayer.src = audioFileList[this.nextIndex - 1].tracklocation
					audioPlayer.play()
					document.getElementById("track" + (this.nextIndex + 1)).classList.remove("currentTrack")
					document.getElementById("track" + this.nextIndex).classList.add("currentTrack")
				}
				else if (this.nextIndex == 0){
					audioPlayer.src = audioFileList[audioFileList.length - 1].tracklocation
					audioPlayer.play()
					document.getElementById("track" + (this.nextIndex + 1)).classList.remove("currentTrack")
					document.getElementById("track" + audioFileList.length).classList.add("currentTrack")
				}
				else {
					audioPlayer.src = audioFileList[audioFileList.length - 1].tracklocation
					audioPlayer.play()
					document.getElementById("track" + audioFileList.length).classList.add("currentTrack")
				}
			})

		this.nextButton = document.createElement("div")
			nextButton.setAttribute("id", "nextButton")
			nextButton.setAttribute("class", "btn btn-primary")
			document.getElementById("playerBody").appendChild(nextButton)
			nextButton.innerHTML = "<i class='glyphicon glyphicon-step-forward'</i>"
			nextButton.addEventListener("click", function(){
				this.nextIndex = audioFileList.findIndex(i => i.tracklocation == audioPlayer.src) + 1
				if (this.nextIndex != 0 && this.nextIndex != audioFileList.length) {
					audioPlayer.src = audioFileList[this.nextIndex].tracklocation
					audioPlayer.play()
					document.getElementById("track" + this.nextIndex).classList.remove("currentTrack")
					document.getElementById("track" + (this.nextIndex + 1)).classList.add("currentTrack")
				}
				else if (this.nextIndex == audioFileList.length){
					audioPlayer.src = audioFileList[0].tracklocation
					audioPlayer.play()
					document.getElementById("track" + (this.nextIndex)).classList.remove("currentTrack")
					document.getElementById("track1").classList.add("currentTrack")
				}
				else {
					audioPlayer.src = audioFileList[0].tracklocation
					audioPlayer.play()
					document.getElementById("track1").classList.add("currentTrack")
				}
			})

		this.newTrackButton = document.createElement("div")
			newTrackButton.setAttribute("id", "newTrackButton")
			newTrackButton.setAttribute("class", "btn btn-primary")
			document.getElementById("playerBody").appendChild(newTrackButton)
			newTrackButton.innerHTML = "<i class='glyphicon glyphicon-plus-sign'></i>"
			newTrackButton.addEventListener("click", function(){
				newTrack = prompt("Please enter the name of the track you wish to add.")
				newLocation = prompt("Paste the full URL of the track here.")
				newAudioFile(newTrack, newLocation)
			})
		
		this.downloadButton = document.createElement("div")
			downloadButton.setAttribute("id", "downloadButton")
			downloadButton.setAttribute("class", "btn btn-primary")
			document.getElementById("playerBody").appendChild(downloadButton)
			downloadButton.innerHTML = "<i class='glyphicon glyphicon-download-alt'</i>"
			downloadButton.addEventListener("click", function(){
				audioPlayer.download()
			})

		
		

		newAudioFile("Truckin", "https://www.archive.org/download/gd1971-04-25.sbd.matera.113038.sbeok.flac16/gd71-04-25d1t01.mp3")
		newAudioFile("Loser", "https://www.archive.org/download/gd1971-04-25.sbd.matera.113038.sbeok.flac16/gd71-04-25d1t02.mp3")
		newAudioFile("Hard To Handle", "https://www.archive.org/download/gd1971-04-25.sbd.matera.113038.sbeok.flac16/gd71-04-25d1t03.mp3")
		newAudioFile("Me And Bobby McGee", "https://www.archive.org/download/gd1971-04-25.sbd.matera.113038.sbeok.flac16/gd71-04-25d1t04.mp3")
		newAudioFile("Cold Rain And Snow", "https://www.archive.org/download/gd1971-04-25.sbd.matera.113038.sbeok.flac16/gd71-04-25d1t05.mp3")
		newAudioFile("The Rub", "https://www.archive.org/download/gd1971-04-25.sbd.matera.113038.sbeok.flac16/gd71-04-25d1t06.mp3")
		newAudioFile("Playing In The Band", "https://www.archive.org/download/gd1971-04-25.sbd.matera.113038.sbeok.flac16/gd71-04-25d1t07.mp3")
		newAudioFile("Friend Of The Devil", "https://www.archive.org/download/gd1971-04-25.sbd.matera.113038.sbeok.flac16/gd71-04-25d1t08.mp3")
		newAudioFile("I Know You Rider", "https://www.archive.org/download/gd1971-04-25.sbd.matera.113038.sbeok.flac16/gd71-04-25d1t10.mp3")

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

	function newAudioFile(trackname, tracklocation){
		this.audioFile = new AddAudioFile(trackname, tracklocation)
		audioFileList.push(this.audioFile)
	}

	function getIndex(){
		this.index = audioFileList.findIndex(i => i.tracklocation == audioPlayer.src)
		return index
	}

	function nextTrack(){
		document.getElementById("audioPlayer").addEventListener("ended", function(){
		nextIndex = getIndex()	
		if (nextIndex < (audioFileList.length-1)) {
			audioPlayer.src = audioFileList[nextIndex + 1].tracklocation
			document.getElementById("track" + (nextIndex + 1)).classList.remove("currentTrack")
			document.getElementById("track" + (nextIndex + 2)).classList.add("currentTrack")
		}
		else {
			audioPlayer.src = audioFileList[0].tracklocation
			document.getElementById("track" + (nextIndex + 1)).classList.remove("currentTrack")
			document.getElementById("track1").classList.add("currentTrack")
		}
		audioPlayer.play()
		})
	}

}