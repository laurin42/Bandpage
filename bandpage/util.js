let aktuellerIndex = 0;
const indikatoren = document.getElementsByClassName("indikator");
indikatoren[aktuellerIndex].classList.add("aktiv");
const slide = document.getElementsByClassName("slide");
slide[aktuellerIndex].classList.add("aktiv");


function umschalten(anzahl) {
    let neuerIndex = aktuellerIndex + anzahl;
    if(neuerIndex < 0) {
        neuerIndex = slide.length -1;
    }
    if(neuerIndex > slide.length -1) {
        neuerIndex = 0;
    }
    springeZuEintrag(neuerIndex);
}
function springeZuEintrag(neuerIndex) {
    indikatoren[aktuellerIndex].classList.remove("aktiv");
    slide[aktuellerIndex].classList.remove("aktiv");
    console.log(slide[aktuellerIndex]);


    const videos = document.querySelectorAll("video");
    if (slide[aktuellerIndex].children[0].classList.contains('slide-video-container')) {
        slide[aktuellerIndex].children[0].children[0].pause()
    } else {
        slide[aktuellerIndex].children[0].remove();
    }

    indikatoren[neuerIndex].classList.add("aktiv");
    slide[neuerIndex].classList.add("aktiv");

    aktuellerIndex = neuerIndex;
}
const dialog = document.querySelector("dialog");
const showButton = document.querySelector("dialog + button");
const closeButton = document.querySelector("dialog button");

// "Show the dialog" button opens the dialog modally
showButton.addEventListener("click", () => {
  dialog.showModal();
});

// "Close" button closes the dialog
closeButton.addEventListener("click", () => {
  dialog.close();
});

const audioPlayer = document.getElementById('audioPlayer');
const audioFiles = ["./public/Still Rock.mp3","./public/Witches.mp3"]; // Füge hier die Pfade zu deinen Audiodateien hinzu
let currentTrackIndex = 0;

function playTrack(index) {
    audioPlayer.src = audioFiles[index];
    // audioPlayer.play();
    currentTrackIndex = index;
}

function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % audioFiles.length;
    playTrack(currentTrackIndex);
}

function previousTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + audioFiles.length) % audioFiles.length;
    playTrack(currentTrackIndex);
}



playTrack(currentTrackIndex);


function appendShit() {
    console.log(audioPlayer.src);
    document.getElementById('song-title').innerHTML = audioFiles[0].split('/')[2].split(".")[0]
    
}


appendShit();

function rotateElement() {
    const headerImage = document.getElementById("logo-image");

        headerImage.classList.add('rotate');
        setTimeout(() => {
            headerImage.classList.remove('rotate'); 
        }, 2000);
}