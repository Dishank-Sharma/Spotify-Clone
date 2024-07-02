document.addEventListener('DOMContentLoaded', () => {
    
    // Responsie Gear Icon
    const xmark = document.querySelector(".mainNav .fa-xmark")
    const gearIcon = document.querySelector(".main_header_3 .fa-gear")
    const mainNav = document.querySelector(".mainNav")

    gearIcon.addEventListener("click", () => {
        mainNav.style.transform = "translateX(0%)";
        mainNav.style.opacity = "1";
        
    })

    xmark.addEventListener("click", () => {
        mainNav.style.transform = "translateX(100%)";
        mainNav.style.opacity = "0";
    })














    
    let trendingCards = document.querySelectorAll(".trending_cards");
    let innerTrack = document.querySelector("#innerTrack")
    let newPlayerInnerTrack = document.querySelector("#newPlayerInnerTrack")
    let newPlayerInnerThumb = document.querySelector("#newPlayerInnerThumb")
    let track = document.querySelector("#track")
    let newPlayerTrack = document.querySelector("#newPlayerTrack")
    let playIcon = document.querySelector(".music_icon3")
    let playingCard = document.querySelector(".playingCard")
    let music_title = document.querySelector(".music_title")
    let trackText = document.querySelector(".trackText")
    let trackImg = document.querySelector(".trackImg")
    let playIcons = document.querySelectorAll(".music_icon3");
    let bottomPlayer = document.querySelector("#bottom-player");
    let newPlayer = document.querySelector("#newPlayer");
    let newPlayerImg = document.querySelector(".newPlayerImg");
    let newPlayerTexts = document.querySelector(".newPlayerTexts");
    let currentlyPlayingAudio = null;
    let currentlyPlayingImage = null;
    
    
        trendingCards.forEach(card => {
            card.addEventListener("click", () => {

                changeGradientBackground()

                // =======>Overlay Music PLayer<======

                if (window.matchMedia("(max-width: 600px)").matches) {
                    bottomPlayer.style.display = "flex";
                }

                bottomPlayer.firstElementChild.addEventListener("click", () => {
                    newPlayer.style.transform = "translateY(0%)"
                })

                newPlayer.firstElementChild.firstElementChild.addEventListener("click", () => {
                    newPlayer.style.transform = "translateY(100%)"
                })

                // =============><===============

                // New Player Random Background color changer

                function getRandomColor() {
                    const r = Math.floor(Math.random() * 256);
                    const g = Math.floor(Math.random() * 256);
                    const b = Math.floor(Math.random() * 256);
                    return `rgb(${r}, ${g}, ${b})`;
                }
        
                function changeGradientBackground() {
                    const color1 = getRandomColor();
                    const color2 = getRandomColor();
                    newPlayer.style.background = `linear-gradient(135deg, ${color1}, ${color2})`;
                    bottomPlayer.style.background = `linear-gradient(135deg, ${color1}, ${color2})`;
                }
                



                // =============><===============

                let cardImg = card.firstElementChild.getAttribute("src")
                playingCard.setAttribute("src", cardImg)
                trackImg.setAttribute("src", cardImg)
                newPlayerImg.setAttribute("src", cardImg)
    
                let cardTitle = card.firstElementChild.nextElementSibling.nextElementSibling.innerText;
                music_title.firstElementChild.innerText = cardTitle;
                trackText.firstElementChild.innerText = cardTitle;
                newPlayerTexts.firstElementChild.innerText = cardTitle;
                newPlayer.firstElementChild.firstElementChild.nextElementSibling.innerText = cardTitle;
    
                let cardDescription = card.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.innerText;
                music_title.firstElementChild.nextElementSibling.innerText = cardDescription;
                trackText.firstElementChild.nextElementSibling.innerText = cardDescription;
                newPlayerTexts.firstElementChild.nextElementSibling.innerText = cardDescription;

                const parent = card.parentElement;
                parent.insertBefore(card, parent.firstChild);
    
                trendingCards.forEach(trend => {
                    trend.classList.remove("selected");
                })
                card.classList.add("selected");
    
                document.querySelectorAll("audio").forEach(audio => {
                    audio.pause();
                    audio.currentTime = 0;
                })
    
                const audio = card.querySelector("audio");
                const playImg = card.querySelector('.play_img');
    
                const playAudio = () => {
                    if (currentlyPlayingAudio && currentlyPlayingAudio !== audio) {
                        currentlyPlayingAudio.pause();
                    }
                    audio.play();
                    currentlyPlayingAudio = audio;
                    updatePlayIcons(true);
                };
    
                const updatePlayIcons = (isPlaying) => {
                    playIcons.forEach(icon => {
                        icon.src = isPlaying ? "./assets/pause.png" : "./assets/play.png";
                    });
                    playImg.src = isPlaying ? "./assets/pause.png" : "./assets/play.png";
                };
    
                playImg.addEventListener('click', (event) => {
                    event.stopPropagation();
                    if (audio.paused) {
                        playAudio();
                    } else {
                        audio.pause();
                        updatePlayIcons(false);
                    }
                });
    
                let volumeTrack = document.querySelector("#volumeTrack")
                let volumeThumb = document.querySelector("#volumeThumb")
                let innerThumb = document.querySelector("#innerThumb")
                let volumeIcon = document.querySelector("#volumeIcon")

                let playerStartDuration = document.querySelector(".start");
                let newPlayerStart = document.querySelector(".newPlayerStart");
                let playerEndDuration = document.querySelector(".end");
                let newPlayerEnd = document.querySelector(".newPlayerEnd");
                
    
                function totalDurationCal(duration) {
                    let totalMin = Math.floor(duration / 60);
                    let totalSec = Math.floor(duration % 60);
                    playerEndDuration.innerText = `${totalMin}:${totalSec}`;
                    newPlayerEnd.innerText = `${totalMin}:${totalSec}`;
                    if (playerEndDuration.innerText.length == "3") {
                        playerEndDuration.innerText = `${totalMin}:0${totalSec}`;
                        newPlayerEnd.innerText = `${totalMin}:0${totalSec}`;
                    }
                }
    
                function currentDurationCal(currentDuration) {
                    let totalMin = Math.floor(currentDuration / 60);
                    let totalSec = Math.floor(currentDuration % 60);
                    playerStartDuration.innerText = `${totalMin}:${totalSec}`;
                    newPlayerStart.innerText = `${totalMin}:${totalSec}`;
                    if (playerStartDuration.innerText.length == "3") {
                        playerStartDuration.innerText = `${totalMin}:0${totalSec}`;
                        newPlayerStart.innerText = `${totalMin}:0${totalSec}`;
                    }
                    
                }
    
                totalDurationCal(audio.duration);
    
                audio.addEventListener("timeupdate", () => {
                    currentDurationCal(audio.currentTime)
                    let currentTime = audio.currentTime / audio.duration * 100
                    innerTrack.style.width = `${currentTime}%`;
                    newPlayerInnerTrack.style.width = `${currentTime}%`;
                    innerThumb.style.left = `0%`;
                    newPlayerInnerThumb.style.left = `0%`;
                    if (currentTime >= 97) {
                        innerThumb.style.left = `calc(100% - 13px)`;
                        newPlayerInnerThumb.style.left = `calc(100% - 13px)`;
                    } else {
                        innerThumb.style.left = `${currentTime}%`;
                        newPlayerInnerThumb.style.left = `${currentTime}%`;
                    }
    
                    let volume = audio.volume / 1 * 100
                    volumeTrack.style.width = `${volume}%`;
                    volumeThumb.style.left = `${volume}%`;
    
                    if (audio.volume <= 0.5 && audio.volume >= 0.1) {
                        volumeIcon.setAttribute("src", "./assets/volume2.png")
                    } else if (audio.volume >= 0.5) {
                        volumeIcon.setAttribute("src", "./assets/volume1.png")
                    }
                });
    
                volumeIcon.onclick = () => {
                    audio.volume = 0;
                    volumeIcon.setAttribute("src", "./assets/volume3.png")
                }
    
                audio.volume = 0.9;
                volume.onclick = (e) => {
                    audio.volume = e.offsetX / volume.offsetWidth * 1;
                }
    
                track.onclick = (e) => {
                    audio.currentTime = e.offsetX / track.offsetWidth * audio.duration;
                }
                newPlayerTrack.onclick = (e) => {
                    audio.currentTime = e.offsetX / newPlayerTrack.offsetWidth * audio.duration;
                }
    
                playAudio();
            })
        })
    
        playIcons.forEach(icon => {
            icon.addEventListener('click', () => {
                if (currentlyPlayingAudio) {
                    if (currentlyPlayingAudio.paused) {
                        currentlyPlayingAudio.play();
                        updatePlayIcons(true);
                    } else {
                        currentlyPlayingAudio.pause();
                        updatePlayIcons(false);
                    }
                }
            });
        });
    
        const updatePlayIcons = (isPlaying) => {
            playIcons.forEach(icon => {
                icon.src = isPlaying ? "./assets/pause.png" : "./assets/play.png";
            });
        };
    });

