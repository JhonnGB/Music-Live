// song data
const songList = [
    {
        title: "We Dont Know What Tomorrow Brings - The Smile",
        file: "We Dont Know What Tomorrow Brings.mp3",
        cover: "1.jpeg"
    },
    {
        title: "Beat It - Michell Jackson",
        file: "Beat it.mp3",
        cover: "2.jpeg"
    },
    {
        title: "Unmade Live - Thome York",
        file: "Unmade Live Thome Yorke.mp3",
        cover: "3.jpeg"
    },
]

// Canción actual
let actualSong = null

// Capturar elementos del DOM para trabajar con JS
const songs = document.getElementById("songs")
const audio = document.getElementById("audio")
const cover = document.getElementById("cover")
const title = document.getElementById("title")
const play = document.getElementById("play")
const prev = document.getElementById("prev")
const next = document.getElementById("next")
const progress = document.getElementById("progress")
const progressContainer = document.getElementById("progress-container")
progressContainer.addEventListener("click", setProgress)

// Escuchar el elemento AUDIO
audio.addEventListener("timeupdate", updateProgress)

// Escuchar clicks en los controles
play.addEventListener("click", () => {
    if (audio.paused) {
        playSong()
    } else {
        pauseSong()
    }
})

next.addEventListener("click", () => nextSong())
prev.addEventListener("click", () => prevSong())

// Cargar canciones y mostrar el listado
function loadSongs() {
    songList.forEach((song, index) => {
        // Crear li
        const li = document.createElement("li")
        // Crear a
        const link = document.createElement("a")
        // Hidratar a
        link.textContent = song.title
        link.href = "#"
        // Escuchar Clicks
        link.addEventListener("click", () => loadSong(index))
        // Añadir a li
        li.appendChild(link)
        // Añadir li a ul
        songs.appendChild(li)
    })
}

// Cargar cancion seleccionada
function loadSong(songIndex) {
    if (songIndex !== actualSong) {
        changeActiveClass(actualSong, songIndex)
        actualSong = songIndex
        audio.src = "./audio/" + songList[songIndex].file
        playSong()
        changeCover(songIndex)
    }
}

// Actualizar barra de progreso de la canción
function updateProgress(event) {
    // Total y el actual
    const {duration, currentTime} = event.srcElement     
    const percent = (currentTime / duration) * 100
    progress.style.width = percent + "%"
}

// Hacer la barra de progreso clicable
function setProgress(event) {
    const totalWidth = this.offsetWidth     
    const progressWidth = event.offsetX     
    const current = (progressWidth / totalWidth) * audio.duration
    audio.currentTime = current
}

// Actalizar Controles
function updateControls() {
    if (audio.paused) {
        play.classList.remove("fa-pause")
        play.classList.add("fa-play")
    } else {
        play.classList.add("fa-pause")
        play.classList.remove("fa-play")
    }
}

// Reproducir Canción
function playSong() {
    if (actualSong !== null) {
        audio.play()
        updateControls()
    }
}

// Pausar Canción
function pauseSong() {
    audio.pause()
    updateControls()
}

// Cambiar clase activa
function changeActiveClass(lastIndex, newIndex) {
    const links = document.querySelectorAll("a")
    if (lastIndex !== null) {
        links[lastIndex].classList.remove("active")
    }
    links[newIndex].classList.add("active")
}

// Cambiar el cover de la canción 
function changeCover(songIndex) {
    cover.src = "./img/" + songList[songIndex].cover
}

// Cambiar el titulo de la canción
function changeSongTitle(songIndex) {
    title.innerText = songList[songIndex].title
}

// Anterior canción
function prevSong() {
    if (actualSong > 0){
        loadSong(actualSong - 1)
    } else {
        loadSong(songList.length -1)
    }
}

// Siguiente canción
function nextSong() {
    if (actualSong < songList.length -1) {
        loadSong(actualSong + 1)
    } else {
        loadSong(0)
    }

}

// Lanzar siguiente canción cuando se acabe la actual
audio.addEventListener("ended", () => nextSong())

// GO 
loadSongs()