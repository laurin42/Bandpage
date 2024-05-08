import './reset.css'
import './style.css'
const indikatoren = document.getElementsByClassName("indikator");
indikatoren[0].classList.add("aktiv");
const slide = document.getElementsByClassName("slide");
slide[0].classList.add("aktiv");

let aktuellerIndex = 0;

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
function stopVideo() {
    const activeSlide = document.querySelector(".slide.aktiv");
    const video = activeSlide.querySelector("video.slide-video");
    if (video) {
        video.pause();
    }
}

function springeZuEintrag(neuerIndex) {
    stopVideo();
    indikatoren[aktuellerIndex].classList.remove("aktiv");
    slide[aktuellerIndex].classList.remove("aktiv");

    indikatoren[neuerIndex].classList.add("aktiv");
    slide[neuerIndex].classList.add("aktiv");

    aktuellerIndex = neuerIndex;
}