/* =========================================================
   SHINA MUSIC
   PLAYER JAVASCRIPT
========================================================= */


/* =========================================================
   SINGERS
========================================================= */

const singers = {

    janAli: {
        name: "Jan Ali",
        description: "Legendary Shina singer from Gilgit-Baltistan",
        image: "images/JA-background.png",
        singerImage: "images/jan-ali.jpg",
        songs: [
            { title: "Aash Suri Pori Gai", file: "songs/janAli/Aash-Suri-Pori-Gai-Shina-Old-Song-Vocal-_Media_O1OvtO3Uf84_006_128k.mp3", writer: "Jan Ali" },
            { title: "Jagot Muto Dut Shura", file: "songs/janAli/Jagot-Muto-Dut-Shura-Shina-New-Song-Voca_Media_kXEl8IzTPHQ_006_128k.mp3", writer: "Jan Ali" },
            { title: "Thai Tanulay Otay", file: "songs/janAli/Thai Tanulay Otay Official Audio.mp3", writer: "Jan Ali" }
        ]
    },

    babarKhan: {
        name: "Babar Khan",
        description: "Traditional Shina music master",
        image: "images/BK-background.png",
        singerImage: "images/babar-khan.jpg",
        songs: [
            { title: "Maga Yaarai Muhbatai", file: "songs/babarKhan/Maga-Yaarai-Muhbatai-Maja-Khuda-Gawa-Han_Media_RyfYhH8HZQI_006_128k.mp3", writer: "Babar Khan" },
            { title: "Mai Sheri Jarar Wayok Han", file: "songs/babarKhan/Mai-Sheri-Jarar-Wayok-Han-Shina-Old-Song_Media_cwkLK0nnUkc_006_128k.mp3", writer: "Babar Khan" },
            { title: "Yousuf Ga Zulaikhai Kisa Tham", file: "songs/babarKhan/Yousuf Ga Zulaikhai kisa Tham __ Shina old Song __ Babar khan babar __ Shina new songs __youtube.mp3", writer: "Babar Khan" }
        ]
    },

    jabirKhan: {
        name: "Jabir Khan",
        description: "Contemporary Shina vocalist",
        image: "images/JK-background.png",
        singerImage: "images/jabir-khan.jpg",
        songs: [
            { title: "Ya To Tu Pagal", file: "songs/jabirKhan/Ya-To-Tu-Pagal-Sur-e-Jabir-Season-1-Jabi_Media_QTxNlHOvdaU_009_128k.mp3", writer: "Jabir Khan" },
            { title: "Yaadi Aanshok", file: "songs/jabirKhan/Yaadi-Aanshok-Be-Thar-Bil-To-Jabir-Khan-_Media_kLzM0ijrdvQ_009_128k.mp3", writer: "Jabir Khan" },
            { title: "Tu Pagel", file: "songs/jabirKhan/Tu_Pagel__Lyrics est Shina Song__GB Songs.mp3", writer: "Zahir Shah Ajiz" }
        ]
    },

    salmanParas: {
        name: "Salman Paras",
        description: "Modern Shina music performer",
        image: "images/SP-background.png",
        singerImage: "images/salman-paras.jpg",
        songs: [
            { title: "Jako Sikim", file: "songs/salmanParas/Jako-Sikim-Shina-Folk-Song-2026-By-Salma_Media_knVbkRt5h5Q_009_128k.mp3", writer: "Zafar Waqar Taj" },
            { title: "Thai Yaadi", file: "songs/salmanParas/Thai-Yaadi-Shina-and-Khowar-Mix-Song-By-_Media_5icBAg80YvA_009_128k.mp3", writer: "Zafar Waqar Taj | Sabir Hayat" },
            { title: "Wafa Darek Ko Ga Nush", file: "songs/salmanParas/WafaDarek-Ko-Ga-Nush-Shina-New-Song-2024_Media_F7a-zYGEJiE_009_128k.mp3", writer: "Zafar Waqar Taj" }
        ]
    }

};

/* =========================================================
   STATE
========================================================= */

let currentSinger =
    singers.janAli;

let currentIndex =
    0;

let isPlaying =
    false;

let playlistSearchQuery =
    "";


/* =========================================================
   ELEMENTS
========================================================= */

const audio =
    document.getElementById("audio");

const clock =
    document.getElementById("clock");

const singersBtn =
    document.getElementById("singersBtn");

const installBtn =
    document.getElementById("installBtn");

const songsPanel =
    document.getElementById("songsPanel");

const songsList =
    document.getElementById("songsList");

const playlistArtist =
    document.getElementById("playlistArtist");

const playlistClose =
    document.getElementById("playlistClose");

const playlistSearchButton =
    document.getElementById("playlistSearchButton");

const playlistSearch =
    document.getElementById("playlistSearch");

const playlistSearchInput =
    document.getElementById("playlistSearchInput");

const singersPanel =
    document.getElementById("singersPanel");

const singersList =
    document.getElementById("singersList");

const singersClose =
    document.getElementById("singersClose");

const artistName =
    document.getElementById("artistName");

const artistDescription =
    document.getElementById("artistDescription");

const songCount =
    document.getElementById("songCount");

const previousBtn =
    document.getElementById("previous");

const nextBtn =
    document.getElementById("next");

const playPauseBtn =
    document.getElementById("playPause");

const queueButton =
    document.getElementById("queueButton");

const currentTitle =
    document.getElementById("currentTitle");

const currentArtist =
    document.getElementById("currentArtist");

const albumImage =
    document.getElementById("albumImage");

const progress =
    document.getElementById("progress");

const progressContainer =
    document.getElementById(
        "progressContainer"
    );

const volume =
    document.getElementById("volume");

const onlineCount =
    document.getElementById("onlineCount");


/* =========================================================
   ONLINE LISTENERS TRACKING
========================================================= */

function updateOnlineCount() {

    // Generate a realistic active listener count between 12-156
    const baseCount = 48;
    const variation = Math.floor(Math.random() * 108);
    const activeListeners = baseCount + variation;

    if (onlineCount) {
        onlineCount.textContent = `${activeListeners} online`;
    }

}

// Update online count every 5-15 seconds for realistic variation
function startOnlineCounterUpdate() {

    updateOnlineCount();

    setInterval(() => {
        updateOnlineCount();
    }, 5000 + Math.random() * 10000);

}


/* =========================================================
   INITIALIZE
========================================================= */

function initialize() {

    updateClock();

    setInterval(
        updateClock,
        1000
    );


    audio.volume =
        parseFloat(
            volume.value
        );


    /*
       Load a random song from a random singer
       every time the page is visited.
    */

    loadRandomSong();

}


/* =========================================================
   CLOCK
========================================================= */

function updateClock() {

    const now =
        new Date();

    let hours =
        now.getHours();

    const minutes =
        String(
            now.getMinutes()
        ).padStart(2, "0");

    const period =
        hours >= 12
            ? "PM"
            : "AM";


    hours =
        hours % 12 || 12;


    clock.textContent =
        `${hours}:${minutes} ${period}`;

}


function applyBackgroundForSinger(singer) {
    const safeBackground = singer?.image || "background.png";
    document.body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.20)), url("${safeBackground}")`;
}


/* =========================================================
   LOAD SINGER
========================================================= */

function loadSinger(
    singer,
    autoplay = true
) {

    currentSinger =
        singer;

    currentIndex =
        0;

    isPlaying =
        false;


    artistName.textContent =
        singer.name;


    artistDescription.textContent =
        singer.description;


    songCount.textContent =
        `${singer.songs.length} SONGS`;


    playlistArtist.textContent =
        singer.name;


    albumImage.src =
        singer.singerImage || singer.image;

    applyBackgroundForSinger(singer);

    currentArtist.textContent =
        singer.name;

    clearPlaylistSearch();


    renderSongs();


    loadSong();


    closePlaylist();


    if (autoplay) {

        playSong();

    }

}


/* =========================================================
   RENDER SONG LIST
========================================================= */

function renderSongs() {

    songsList.innerHTML = "";

    const filteredSongs =
        currentSinger.songs
            .map((song, originalIndex) => ({
                ...song,
                originalIndex
            }))
            .filter(song =>
                song.title
                    .toLowerCase()
                    .includes(
                        playlistSearchQuery
                    )
            );

    if (filteredSongs.length === 0) {

        const emptyElement =
            document.createElement("div");

        emptyElement.className =
            "song-empty";

        emptyElement.textContent =
            "No matching songs found.";

        songsList.appendChild(
            emptyElement
        );

        return;

    }


    filteredSongs.forEach(
        (song, index) => {

            const realIndex =
                song.originalIndex;


            const songElement =
                document.createElement(
                    "div"
                );


            songElement.className =
                "song";


            if (
                realIndex === currentIndex
            ) {

                songElement.classList.add(
                    "active"
                );

            }


            const songNumber = document.createElement("div");
            songNumber.className = "song-number";
            songNumber.textContent = String(index + 1).padStart(2, "0");

            const songTitle = document.createElement("div");
            songTitle.className = "song-title";
            songTitle.textContent = song.title;

            const songDuration = document.createElement("div");
            songDuration.className = "song-duration";
            songDuration.id = `duration-${realIndex}`;
            songDuration.textContent = "--";

            const menuWrap = document.createElement("div");
            menuWrap.className = "song-menu-wrap";

            const menuButton = document.createElement("button");
            menuButton.type = "button";
            menuButton.className = "song-menu";
            menuButton.setAttribute("aria-label", `More options for ${song.title}`);
            menuButton.textContent = "⋮";

            const downloadLink = document.createElement("a");
            downloadLink.href = song.file;
            downloadLink.className = "song-download";
            downloadLink.innerHTML = `<span class="download-icon" aria-hidden="true">↓</span><span>Download</span>`;
            downloadLink.setAttribute("download", song.title);

            menuButton.addEventListener("click", (event) => {
                event.preventDefault();
                event.stopPropagation();

                const isOpen = menuWrap.classList.contains("open");

                document.querySelectorAll(".song-menu-wrap.open").forEach((item) => {
                    item.classList.remove("open");
                });

                if (!isOpen) {
                    menuWrap.classList.add("open");
                }
            });

            downloadLink.addEventListener("click", (event) => {
                event.stopPropagation();
            });

            menuWrap.appendChild(menuButton);
            menuWrap.appendChild(downloadLink);

            songElement.appendChild(songNumber);
            songElement.appendChild(songTitle);
            songElement.appendChild(songDuration);
            songElement.appendChild(menuWrap);


            songElement.addEventListener(
                "click",
                () => {

                    currentIndex =
                        realIndex;


                    loadSong();


                    playSong();


                    /*
                       Close playlist after
                       selecting a song.
                    */

                    closePlaylist();

                }
            );


            songsList.appendChild(
                songElement
            );


            getSongDuration(
                song.file,
                realIndex
            );

        }
    );

}


function clearPlaylistSearch() {

    playlistSearchQuery = "";

    if (playlistSearchInput) {
        playlistSearchInput.value = "";
    }

    if (playlistSearch) {
        playlistSearch.classList.remove("show");
    }

    if (playlistSearchButton) {
        playlistSearchButton.classList.remove("active");
    }

}


/* =========================================================
   GET SONG DURATION
========================================================= */

function getSongDuration(
    file,
    index
) {

    const tempAudio =
        new Audio();


    tempAudio.preload =
        "metadata";


    tempAudio.src =
        file;


    tempAudio.addEventListener(
        "loadedmetadata",
        () => {

            const durationElement =
                document.getElementById(
                    `duration-${index}`
                );


            if (!durationElement) {

                return;

            }


            durationElement.textContent =
                formatTime(
                    tempAudio.duration
                );

        }
    );

}


/* =========================================================
   LOAD CURRENT SONG
========================================================= */

function loadSong() {

    const song =
        currentSinger.songs[
            currentIndex
        ];


    if (!song) {

        return;

    }


    audio.src =
        song.file;


    audio.load();


    currentTitle.textContent =
        song.title;


    currentArtist.textContent =
        `Lyrics: ${song.writer}`;


    albumImage.src =
        currentSinger.singerImage || currentSinger.image;


    updateActiveSong();


    progress.style.width =
        "0%";

}


/* =========================================================
   UPDATE ACTIVE SONG
========================================================= */

function updateActiveSong() {

    document
        .querySelectorAll(".song")
        .forEach(
            element => {

                element.classList.remove(
                    "active"
                );

            }
        );


    const songs =
        document.querySelectorAll(
            ".song"
        );


    if (songs[currentIndex]) {

        songs[currentIndex]
            .classList.add("active");

    }

}


/* =========================================================
   PLAY SONG
========================================================= */

function playSong() {

    if (!audio.src) {

        loadSong();

    }


    // Ensure manual playback from controls is audible.
    if (parseFloat(volume.value) > 0) {
        audio.muted = false;
    }


    audio.play()
        .then(() => {

            isPlaying =
                true;


            playPauseBtn.textContent =
                "❚❚";

        })
        .catch(() => {

            /*
               Browser blocked autoplay.

               User can press Play.
            */

            isPlaying =
                false;


            playPauseBtn.textContent =
                "▶";

        });

}


/* =========================================================
   PAUSE
========================================================= */

function pauseSong() {

    audio.pause();

    isPlaying =
        false;

    playPauseBtn.textContent =
        "▶";

}


/* =========================================================
   PLAY / PAUSE
========================================================= */

playPauseBtn.addEventListener(
    "click",
    () => {

        if (
            audio.paused
        ) {

            playSong();

        } else {

            pauseSong();

        }

    }
);


/* =========================================================
   NEXT
========================================================= */

function nextSong() {

    if (
        currentSinger.songs.length === 0
    ) {

        return;

    }


    currentIndex++;


    if (
        currentIndex >=
        currentSinger.songs.length
    ) {

        currentIndex = 0;

    }


    loadSong();

    playSong();

}


/* =========================================================
   PREVIOUS
========================================================= */

function previousSong() {

    if (
        currentSinger.songs.length === 0
    ) {

        return;

    }


    currentIndex--;


    if (
        currentIndex < 0
    ) {

        currentIndex =
            currentSinger.songs.length - 1;

    }


    loadSong();

    playSong();

}


/* =========================================================
   NEXT BUTTON
========================================================= */

nextBtn.addEventListener(
    "click",
    nextSong
);


/* =========================================================
   PREVIOUS BUTTON
========================================================= */

previousBtn.addEventListener(
    "click",
    previousSong
);


/* =========================================================
   AUTOMATIC NEXT SONG
========================================================= */

audio.addEventListener(
    "ended",
    () => {

        nextSong();

    }
);


/* =========================================================
   PROGRESS
========================================================= */

audio.addEventListener(
    "timeupdate",
    () => {

        if (
            !audio.duration ||
            isNaN(audio.duration)
        ) {

            return;

        }


        const percentage =
            (
                audio.currentTime /
                audio.duration
            ) * 100;


        progress.style.width =
            `${percentage}%`;

    }
);


/* =========================================================
   SEEK
========================================================= */

progressContainer.addEventListener(
    "click",
    event => {

        if (
            !audio.duration ||
            isNaN(audio.duration)
        ) {

            return;

        }


        const rect =
            progressContainer
                .getBoundingClientRect();


        const position =
            event.clientX -
            rect.left;


        const percentage =
            position /
            rect.width;


        audio.currentTime =
            percentage *
            audio.duration;

    }
);


/* =========================================================
   VOLUME
========================================================= */

volume.addEventListener(
    "input",
    () => {

        audio.volume =
            parseFloat(
                volume.value
            );

        if (audio.volume > 0) {
            audio.muted = false;
        }

    }
);


/* =========================================================
   OPEN PLAYLIST
========================================================= */

function openPlaylist() {

    songsPanel.classList.add(
        "show"
    );


    queueButton.classList.add(
        "active"
    );

}


/* =========================================================
   CLOSE PLAYLIST
========================================================= */

function closePlaylist() {

    songsPanel.classList.remove(
        "show"
    );


    queueButton.classList.remove(
        "active"
    );

}


/* =========================================================
   PLAYLIST BUTTON
========================================================= */

queueButton.addEventListener(
    "click",
    event => {

        event.stopPropagation();

        closeSingers();

        if (
            songsPanel.classList.contains(
                "show"
            )
        ) {

            closePlaylist();

        } else {

            openPlaylist();

        }

    }
);


/* =========================================================
   CLOSE BUTTON
========================================================= */

playlistClose.addEventListener(
    "click",
    event => {

        event.stopPropagation();

        closePlaylist();

    }
);


playlistSearchButton.addEventListener(
    "click",
    event => {

        event.stopPropagation();

        const willShow =
            !playlistSearch.classList.contains("show");

        playlistSearch.classList.toggle(
            "show"
        );

        playlistSearchButton.classList.toggle(
            "active"
        );

        if (willShow) {

            requestAnimationFrame(() => {
                playlistSearchInput.focus();
            });

        } else {

            playlistSearchQuery = "";
            playlistSearchInput.value = "";
            renderSongs();

        }

    }
);


playlistSearchInput.addEventListener(
    "input",
    () => {

        playlistSearchQuery =
            playlistSearchInput.value
                .trim()
                .toLowerCase();

        renderSongs();

    }
);


/* =========================================================
   DON'T CLOSE WHEN CLICKING INSIDE
========================================================= */

songsPanel.addEventListener(
    "click",
    event => {

        event.stopPropagation();

    }
);


/* =========================================================
   OPEN SINGERS
========================================================= */

function openSingers() {

    singersPanel.classList.add(
        "show"
    );

    singersBtn.classList.add(
        "active"
    );

    renderSingers();

}


/* =========================================================
   CLOSE SINGERS
========================================================= */

function closeSingers() {

    singersPanel.classList.remove(
        "show"
    );

    singersBtn.classList.remove(
        "active"
    );

}


/* =========================================================
   RENDER SINGERS LIST
========================================================= */

function renderSingers() {

    singersList.innerHTML = "";

    const singerEntries = Object.entries(singers);

    singerEntries.forEach(
        ([key, singer]) => {

            const singerElement =
                document.createElement(
                    "div"
                );

            singerElement.className =
                "singer";

            if (
                singer === currentSinger
            ) {

                singerElement.classList.add(
                    "active"
                );

            }

            singerElement.innerHTML = `

                <div class="singer-name">
                    ${escapeHTML(singer.name)}
                </div>

                <div class="singer-description">
                    ${escapeHTML(singer.description)}
                </div>

            `;

            singerElement.addEventListener(
                "click",
                () => {

                    loadSinger(
                        singer,
                        true
                    );

                    closeSingers();

                }
            );

            singersList.appendChild(
                singerElement
            );

        }
    );

}


/* =========================================================
   SINGERS BUTTON
========================================================= */

singersBtn.addEventListener(
    "click",
    event => {

        event.stopPropagation();

        closePlaylist();

        if (
            singersPanel.classList.contains(
                "show"
            )
        ) {

            closeSingers();

        } else {

            openSingers();

        }

    }
);


/* =========================================================
   SINGERS CLOSE BUTTON
========================================================= */

singersClose.addEventListener(
    "click",
    event => {

        event.stopPropagation();

        closeSingers();

    }
);


/* =========================================================
   DON'T CLOSE WHEN CLICKING INSIDE SINGERS PANEL
========================================================= */

singersPanel.addEventListener(
    "click",
    event => {

        event.stopPropagation();

    }
);


/* =========================================================
   CLOSE ALL MENUS WHEN CLICKING OUTSIDE
========================================================= */

document.addEventListener(
    "click",
    event => {

        const target = event.target;

        if (
            songsPanel.contains(target) ||
            singersPanel.contains(target) ||
            queueButton.contains(target) ||
            singersBtn.contains(target)
        ) {
            return;
        }

        closePlaylist();

        closeSingers();

    }
);


/* =========================================================
   INSTALL
========================================================= */

let deferredPrompt =
    null;


window.addEventListener(
    "beforeinstallprompt",
    event => {

        event.preventDefault();

        deferredPrompt =
            event;

    }
);


installBtn.addEventListener(
    "click",
    async () => {

        if (!deferredPrompt) {

            alert(
                "Use your browser's Install App option to install Shina Music."
            );

            return;

        }


        deferredPrompt.prompt();


        await deferredPrompt.userChoice;


        deferredPrompt =
            null;

    }
);


/* =========================================================
   AUTOPLAY ATTEMPT
========================================================= */

function attemptAutoplay() {

    audio.muted = false;


    audio.play()
        .then(() => {

            isPlaying =
                true;

            playPauseBtn.textContent =
                "❚❚";

        })
        .catch(() => {

            // Fallback for strict autoplay policies.
            audio.muted = true;

            audio.play()
                .then(() => {

                    isPlaying =
                        true;

                    playPauseBtn.textContent =
                        "❚❚";

                    setTimeout(() => {
                        audio.muted = false;
                    }, 200);

                })
                .catch(() => {

                    audio.muted = false;

                    isPlaying =
                        false;

                    playPauseBtn.textContent =
                        "▶";

                });

        });

}


/* =========================================================
   FIRST USER INTERACTION

   If browser blocked autoplay,
   start music when user first interacts.
========================================================= */

let firstInteraction =
    false;


function startAfterInteraction() {

    if (firstInteraction) {

        return;

    }


    firstInteraction =
        true;


    if (parseFloat(volume.value) > 0) {
        audio.muted = false;
    }


    if (
        audio.paused
    ) {

        playSong();

    }

}


document.addEventListener(
    "click",
    startAfterInteraction,
    {
        once: true
    }
);


/* =========================================================
   KEYBOARD CONTROLS
========================================================= */

document.addEventListener(
    "keydown",
    event => {


        /* SPACE */

        if (
            event.code === "Space" &&
            event.target.tagName !== "INPUT"
        ) {

            event.preventDefault();


            if (
                audio.paused
            ) {

                playSong();

            } else {

                pauseSong();

            }

        }


        /* NEXT */

        if (
            event.code === "ArrowRight"
        ) {

            nextSong();

        }


        /* PREVIOUS */

        if (
            event.code === "ArrowLeft"
        ) {

            previousSong();

        }

    }
);


/* =========================================================
   HTML ESCAPE
========================================================= */

function escapeHTML(text) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        text;


    return div.innerHTML;

}


/* =========================================================
   FORMAT TIME
========================================================= */

function formatTime(seconds) {

    if (
        !seconds ||
        isNaN(seconds)
    ) {

        return "--";

    }


    const minutes =
        Math.floor(
            seconds / 60
        );


    const remainingSeconds =
        Math.floor(
            seconds % 60
        );


    return `${minutes}:${String(
        remainingSeconds
    ).padStart(2, "0")}`;

}


/* =========================================================
   START
========================================================= */

// Add event listeners for footer artist buttons
document.querySelectorAll('.artist-name').forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault();
        const artistId = button.getAttribute('data-artist-id');
        if (singers[artistId]) {
            loadSinger(singers[artistId], true);
        }
    });
});

initialize();

// Start tracking online listeners
startOnlineCounterUpdate();


/* =========================================================
   RANDOM SONG LOADER
========================================================= */

function loadRandomSong() {

    // Get all singers as an array
    const singerArray = Object.values(singers);

    // Select a random singer
    const randomSinger = singerArray[
        Math.floor(
            Math.random() * singerArray.length
        )
    ];

    // Select a random song index from that singer
    const randomSongIndex = Math.floor(
        Math.random() * randomSinger.songs.length
    );

    // Set the current singer and song index
    currentSinger = randomSinger;
    currentIndex = randomSongIndex;

    // Now load and play
    currentSinger = randomSinger;
    currentIndex = 0;

    isPlaying = false;

    artistName.textContent =
        randomSinger.name;

    artistDescription.textContent =
        randomSinger.description;

    songCount.textContent =
        `${randomSinger.songs.length} SONGS`;

    playlistArtist.textContent =
        randomSinger.name;

    albumImage.src =
        randomSinger.singerImage || randomSinger.image;

    applyBackgroundForSinger(randomSinger);

    currentArtist.textContent =
        randomSinger.name;

    clearPlaylistSearch();

    renderSongs();

    // Set to the random song index
    currentIndex = randomSongIndex;

    loadSong();

    closePlaylist();

    playSong();

}