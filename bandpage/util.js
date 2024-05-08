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


