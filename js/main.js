(() => {
	console.log('fired');

  const music = document.querySelectorAll(".music .icon img"),
    dropMusic = document.querySelectorAll(".dropMusic");

    setInterval(playTrack, 2000);

    function playTrack() {

    let songs = document.querySelectorAll("audio");
    songs.forEach((track, index) => {
      track.currentTime = 0;
      songs[index].play();
    });
  }

  function startDrag(event) {
    console.log('you picked',(this.id))
    event.dataTransfer.setData("text/plain", this.id);
  }

	music.forEach(icon => icon.addEventListener("dragstart", startDrag));

  function allowDragOver(event) {
    event.preventDefault();
  }

  function songDrop(event) {
    event.preventDefault();

    // *only allow one song per box
    if (this.children.length > 2) {
      return;
    }
    console.log("Analysing Choice");

    // *create audio tag and src
    let currentIcon = event.dataTransfer.getData("text/plain");
    let audio = document.createElement("audio");
    event.target.appendChild(audio);
    event.target.appendChild(document.querySelector(`#${currentIcon}`));
    audio.src = `audio/${currentIcon}.mp3`;
    audio.load()

		console.log(audio);

    // *disallow drags
    this.querySelector("img").draggable = true;
  }


// !Stop this specific Track
  function stopTrack() {
    // *remove the audio
    let track = this.parentNode.querySelector("audio");
    track.parentNode.removeChild(track);

    // *remove loading screen
    let trackBox = this.parentNode;

      // *make draggable again
    let icon = this.parentNode.querySelector("img");
    icon.draggable = true;

    console.log((icon.id), 'stopped');

    // *return to original container
    let iconBox = document.querySelectorAll(".music .icon");
      iconBox[icon.dataset.index].appendChild(icon);
  }


  dropMusic.forEach(zone => zone.addEventListener("dragover", allowDragOver));
  //dropZones.forEach(zone => zone.addEventListener("drop", songDrop)); //arrow function

	// dropZones.forEach(function (zone) {
	// 	zone.addEventListener("drop", songDrop);
	// });

	console.log(dropMusic);

	for (var i = 0; i < dropMusic.length; i++) {
		dropMusic[i].addEventListener("drop", songDrop);
	}

})();
