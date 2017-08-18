var audioFileList = []
var trackCounter = 0
var pulledList = []
var currentIndexID = null
var paused = false

var jukebox = new Jukebox()
var playlist = new Playlist() 


SC.get('/tracks', {
	q: "Afroz"
}).then(function(tracks){
	pulledList = [tracks];



	getAudioPlayer()

	function getAudioPlayer(){

		document.getElementById("playerBody").innerHTML = "<h3>Click on track start listening</h3>"

		

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
		playlist.createPlaylist()
	}
});
function Jukebox() {

	this.play = function(){
		this.nextIndex = playlist.getIndex()
		if (this.nextIndex == -1) {
			currentIndexID = audioFileList[0]["tracklocation"]
			playlist.displayInfo(currentIndexID)
			SC.stream('/tracks/' + audioFileList[0]["tracklocation"]).then(function(player){
  				var myPlayer = player
  				player.play()
  				player.on("finish", function(){
					playlist.nextTrack()
					//playlist.displayInfo() <--- need to design this function
				})
  			})

			playlist.highlightTrack(this.nextIndex, "next")

		}

		else {
			this.id = audioFileList[this.nextIndex]["tracklocation"]
			currentIndexID = this.id
			playlist.displayInfo(currentIndexID)
			SC.stream("/tracks/" + this.id).then(function(player){
  					myPlayer = player
  					myPlayer.play()
  					myPlayer.on("finish", function(){
					playlist.nextTrack()
				})
			})
			playlist.highlightTrack(this.nextIndex, "next")
		}
	}

	this.pause = function(){
		this.nextIndex = playlist.getIndex()
		currentIndexID = audioFileList[this.nextIndex]["tracklocation"]
		if (this.nextIndex != -1) {
				myPlayer.pause()
				myPlayer.on("play-resume", function(){
					jukebox.play
				})
				playlist.highlightTrack((this.nextIndex+1), "back")
		} else {
			alert("A track must be loaded first!")
		}
	}

	this.back = function(){
		this.nextIndex = playlist.getIndex()
		if (this.nextIndex != -1 && this.nextIndex != 0) {
			currentIndexID = audioFileList[this.nextIndex - 1]["tracklocation"]
			playlist.displayInfo(currentIndexID)
			SC.stream("/tracks/" + audioFileList[this.nextIndex - 1]["tracklocation"]).then(function(player){
				myPlayer = player
				player.play()
				player.on("finish", function(){
					playlist.nextTrack()
				})
			})
			playlist.highlightTrack(this.nextIndex, "back")
		}
		else if (this.nextIndex == 0){
			currentIndexID = audioFileList[audioFileList.length - 1]["tracklocation"]
			playlist.displayInfo(currentIndexID)
			SC.stream("/tracks/" + audioFileList[audioFileList.length - 1]["tracklocation"]).then(function(player){
				myPlayer = player
				player.play()
				player.on("finish", function(){
					playlist.nextTrack()
				})
			})
			playlist.highlightTrack(this.nextIndex, "back")
		}
		else {
			currentIndexID = audioFileList[audioFileList.length - 1]["tracklocation"]
			playlist.displayInfo(currentIndexID)
			SC.stream("/tracks/" + audioFileList[audioFileList.length - 1]["tracklocation"]).then(function(player){
				myPlayer = player
				player.play()
				player.on("finish", function(){
					playlist.nextTrack()
				})
			})
			playlist.highlightTrack(this.nextIndex, "back")
		}
	}

	this.next = function(){
		this.nextIndex = playlist.getIndex()
		if (this.nextIndex != -1 && this.nextIndex != (audioFileList.length - 1)) {
			currentIndexID = audioFileList[this.nextIndex + 1]["tracklocation"]
			playlist.displayInfo(currentIndexID)
			SC.stream("/tracks/" + audioFileList[this.nextIndex + 1]["tracklocation"]).then(function(player){
				myPlayer = player
				player.play()
				player.on("finish", function(){
					playlist.nextTrack()
				})
			})
			playlist.highlightTrack(this.nextIndex, "next")
		}
		else if (this.nextIndex == (audioFileList.length - 1)){
			currentIndexID = audioFileList[0]["tracklocation"]
			playlist.displayInfo(currentIndexID)
			SC.stream("/tracks/" + audioFileList[0]["tracklocation"]).then(function(player){
				myPlayer = player
				player.play()
				player.on("finish", function(){
					playlist.nextTrack()
				})
			})
			playlist.highlightTrack(this.nextIndex, "next")
		}
		else {
			currentIndexID = audioFileList[0]["tracklocation"]
			playlist.displayInfo(currentIndexID)
			SC.stream("/tracks/" + audioFileList[0]["tracklocation"]).then(function(player){
				myPlayer = player
				player.play()
				player.on("finish", function(){
					playlist.nextTrack()
				})
			})
			playlist.highlightTrack(this.nextIndex, "next")
		}
	}

	this.addTrack = function(){
		newTrack = prompt("Please enter the name of the track you wish to add.")
		newLocation = prompt("Paste the track ID.")
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
		this.divID = newDiv.getAttribute("id")
		newDiv.classList.add("audioFile")
		document.getElementById("playList").appendChild(newDiv)
		newDiv.innerHTML = "<h4>" + trackCounter + ". " + this.trackname + "</h4>"

		makeClickable(this.tracklocation, this.divID)
	
		function makeClickable(place, divID){
			document.getElementById("track"+trackCounter).addEventListener("click", function(){
				this.index = audioFileList.findIndex(i => i.tracklocation == place)
				this.prevTrack = audioFileList.findIndex(i => i.tracklocation == currentIndexID)
				if (this.prevTrack != -1) {
					document.getElementById("track"+(this.prevTrack+1)).classList.remove("currentTrack")
				}
					document.getElementById(divID).classList.add("currentTrack")
					currentIndexID = place
					playlist.displayInfo(currentIndexID)
					SC.stream("/tracks/" + place).then(function(player){
						myPlayer = player
						player.play()
						player.on("finish", function(){
							playlist.nextTrack()
						})
					})
				
			})

		}
	}

	this.nextTrack = function() {
		this.nextIndex = playlist.getIndex()
		if (this.nextIndex != -1 && this.nextIndex < (audioFileList.length - 1)) {
			document.getElementById("track" + (this.nextIndex + 1)).classList.remove("currentTrack")
			document.getElementById("track" + (this.nextIndex + 2)).classList.add("currentTrack")
			currentIndexID = audioFileList[this.nextIndex + 1]["tracklocation"]
			playlist.displayInfo(currentIndexID)
			SC.stream("/tracks/" + audioFileList[this.nextIndex + 1]["tracklocation"]).then(function(player){
				myPlayer = player
				player.on("finish", function(){
					playlist.nextTrack()
				})
				player.play()
			})
			
		}
		else {
			document.getElementById("track" + (this.nextIndex + 1)).classList.remove("currentTrack")
			document.getElementById("track1").classList.add("currentTrack")
			currentIndexID = audioFileList[0]["tracklocation"]
			playlist.displayInfo(currentIndexID)
			SC.stream("/tracks/" + audioFileList[0]["tracklocation"]).then(function(player){
				myPlayer = player
				player.on("finish", function(){
					playlist.nextTrack()
				})
				player.play()	
			})
			
		}
		
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
		this.index = audioFileList.findIndex(i => i.tracklocation == currentIndexID)
		return this.index
	}

	this.createPlaylist = function(){
			var j = 0
			while (j < 15){
				this.track = pulledList[0][j]["title"]
				this.location = pulledList[0][j]["id"]
				playlist.newAudioFile(this.track, this.location)
				j += 1
			}
	}

	 this.displayInfo = function(currentIndexID) {
		this.nextIndex = playlist.getIndex(currentIndexID)
		$("#displayArtist").empty()
		$("#displayArtist").append("<p>Artist: " + "<a href='" + pulledList[0][this.nextIndex]["user"]["permalink_url"] + "' target='_blank' >" + pulledList[0][this.nextIndex]["user"]["username"] + "</a>" +  "</p>")
		$("#displayArtist").append("<p>Title: " + pulledList[0][this.nextIndex]["title"] + "</p>")
		$("#displayArtist").append("<p>Description: " + pulledList[0][this.nextIndex]["description"], "</p>")
		$("#displayArtist").append("<p>Genera: " + pulledList[0][this.nextIndex]["genera"] + "</p>")
		$("#displayArtist").append("<p>Released: " + pulledList[0][this.nextIndex]["created_at"] + "</p>")
		$("#displayArtist").append("<p>Artwork: <img src='" + pulledList[0][this.nextIndex]["user"]["avatar_url"] + "'>" + "</p>")
	}
}



