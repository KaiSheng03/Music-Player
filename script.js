let trackNumber  = document.querySelector(".track-number");
let trackAlbum  = document.querySelector(".track-album");
let trackName  = document.querySelector(".track-name");
let trackArtist = document.querySelector(".track-artist");

let playPauseBtn = document.querySelector(".play-pause");
let previousBtn = document.querySelector(".previous");
let nextBtn = document.querySelector(".next");

let seekSlider = document.querySelector(".seek");
let volumeSlider = document.querySelector(".volume");
let current = document.querySelector(".current");
let duration = document.querySelector(".duration");

let currentTrack = document.createElement('audio');
let trackIndex=0;
let timer;
let trackPlaying = false;
let totalDuration;
let currentProgress;

let trackList = [
    {
        name: "2002",
        artist: "Anne Marie",
        image: "2002.jpg",
        source: "2002.mp3" 
    },
    {
        name: "Perfect",
        artist: "Ed Sheeran",
        image: "perfect.jpg",
        source: "Perfect.mp3"
    },
    {
        name: "Until I Found You",
        artist: "Stephen Sanchez",
        image: "until i found you.jpg",
        source: "Until I Found You.mp3"
    },
]

// Reset to default value
function resetValues(){
    current.innerHTML = "00.00";
    duration.innerHTML = "00.00";
    seekSlider.innerHTML = "00.00";
    seekSlider.value = 0;
    trackPlaying = false;
    playPauseBtn.innerHTML = '<i class="fa-solid fa-circle-play"></i>';
}

// Load the track
function loadTrack(){
    // Reset the track when new track is loaded
    resetValues();
    
    // Load new track
    currentTrack.src = trackList[trackIndex].source;
    currentTrack.load();

    // Update the duration
    currentTrack.addEventListener("loadedmetadata", displayDuration);

    // Update the track number
    trackNumber.innerHTML = "PLAYING " + (trackIndex+1) + " OF " + (trackList.length);

    // Update track art
    newArt = document.getElementById("track-art");
    newArt.src = trackList[trackIndex].image;

    // Update track name
    trackName.innerHTML = trackList[trackIndex].name;

    // Update track artist
    trackArtist.innerHTML = trackList[trackIndex].artist;

    timer = setInterval(seekRunning,1000);
    currentTrack.addEventListener("ended", nextTrack);
}

function random_bg_color(){
    let red = Math.floor(Math.random()*(256-64+1))+64;
    let green = Math.floor(Math.random()*(256-64+1))+64;
    let blue = Math.floor(Math.random()*(256-64+1))+64;

    let bgColor = "rgb(" + red + ", " + green + ", " + blue + ")";
    document.body.style.backgroundColor = bgColor;
}

function playTrack(){
    trackPlaying = true;
    currentTrack.play();
    playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
}

function pauseTrack(){
    trackPlaying = false;
    currentTrack.pause();
    playPauseBtn.innerHTML = '<i class="fa-solid fa-circle-play"></i>';
}

function playPause(){
    if(trackPlaying==true){
        pauseTrack();
    }
    else{
        playTrack();
    }
}

function prevTrack(){
    if(trackIndex==0){
        trackIndex = trackList.length - 1;
    }
    else{
        trackIndex -= 1;
    }
    loadTrack();
    playPause();
    random_bg_color();
}

function nextTrack(){
    if(trackIndex==trackList.length-1){
        trackIndex = 0;
    }
    else{
        trackIndex += 1;
    }
    loadTrack();
    playPause();
    random_bg_color();
}

function seekChange(){
    clearInterval(timer);
    // Changing the progress of the song through the seek slider
    currentProgress = (seekSlider.value/100)*totalDuration;
    currentTrack.currentTime = currentProgress;
    timer = setInterval(seekRunning, 1000);
    
    // Update the current time
    displayCurrent();
}

function displayDuration(){
    totalDuration = currentTrack.duration;
    let durationMinutes = Math.floor(totalDuration / 60);
    let durationSeconds = Math.floor(totalDuration - durationMinutes * 60);

    if (durationSeconds < 10){ 
        durationSeconds = "0" + durationSeconds; 
    }
    
    if (durationMinutes < 10){ 
        durationMinutes = "0" + durationMinutes; 
    }
    duration.innerHTML = durationMinutes + ":" + durationSeconds;
}

function displayCurrent(){
    // Calculate the time left and the total duration
    let currentMinutes = Math.floor(currentTrack.currentTime / 60);
    let currentSeconds = Math.floor(currentTrack.currentTime - currentMinutes * 60);
    
    // Add a zero to the single digit time values
    if (currentSeconds < 10){ 
        currentSeconds = "0" + currentSeconds; 
    }
    
    if (currentMinutes < 10){ 
        currentMinutes = "0" + currentMinutes; 
    }
    
    // Display the updated duration
    current.innerHTML = currentMinutes + ":" + currentSeconds;
}

function seekRunning(){
    let seekPosition = 0;
 
    // Check if the current track duration is a legible number
    seekPosition = currentTrack.currentTime * (100 / currentTrack.duration);
    seekSlider.value = seekPosition;

    displayCurrent();
}

function updateVolume(){
    currentTrack.volume = volumeSlider.value/100;
}

loadTrack();
