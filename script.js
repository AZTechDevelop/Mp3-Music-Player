document.addEventListener('DOMContentLoaded', function() {
    var audioPlayer = document.getElementById('audio-player');
    var fileInput = document.getElementById('file-input');
    var playlistElement = document.getElementById('playlist');
    var playButton = document.getElementById('play');
    var pauseButton = document.getElementById('pause');
    var nextButton = document.getElementById('next');
    var createPlaylistButton = document.getElementById('create-playlist');
    var selectPlaylist = document.getElementById('select-playlist');
    var newPlaylistNameInput = document.getElementById('new-playlist-name');

    var currentFiles = []; // Stocarea temporară a fișierelor selectate
    var playlists = {}; // Obiect pentru stocarea playlist-urilor și a melodiilor lor
    var currentPlaylist = ''; // Numele playlist-ului curent selectat
    var currentTrackIndex = -1; // Indexul melodiei curente în playlist

    createPlaylistButton.addEventListener('click', function() {
        var playlistName = newPlaylistNameInput.value.trim();
        if (playlistName && !(playlistName in playlists)) {
            playlists[playlistName] = [];
            var option = new Option(playlistName, playlistName);
            selectPlaylist.add(option);
            newPlaylistNameInput.value = '';
            console.log('Playlist creat:', playlistName);
        } else {
            alert('Introduceți un nume valid și unic pentru playlist.');
        }
    });

    fileInput.addEventListener('change', function(e) {
        currentFiles = Array.from(e.target.files);
        console.log(currentFiles.length + ' fișier(e) selectat(e).');
    });

    selectPlaylist.addEventListener('change', function() {
        currentPlaylist = this.value;
        updatePlaylistUI();
    });

    function updatePlaylistUI() {
        playlistElement.innerHTML = '';
        if (currentPlaylist in playlists) {
            playlists[currentPlaylist].forEach((file, index) => {
                var li = document.createElement('li');
                li.textContent = file.name;
                li.addEventListener('click', function() {
                    currentTrackIndex = index;
                    playTrack(file);
                });
                playlistElement.appendChild(li);
            });
        }
    }

    document.getElementById('add-to-playlist').addEventListener('click', function() {
        if (currentPlaylist && currentFiles.length > 0) {
            playlists[currentPlaylist] = playlists[currentPlaylist].concat(currentFiles);
            updatePlaylistUI();
            currentFiles = []; // Resetează selecția de fișiere
            fileInput.value = ''; // Resetează inputul de fișiere pentru a permite reselectarea acelorași fișiere dacă e necesar
        } else {
            alert('Selectați un playlist și încărcați fișiere.');
        }
    });

    function playTrack(file) {
        audioPlayer.src = URL.createObjectURL(file);
        audioPlayer.play();
    }

    nextButton.addEventListener('click', function() {
        if (currentPlaylist && playlists[currentPlaylist].length > 0) {
            currentTrackIndex = (currentTrackIndex + 1) % playlists[currentPlaylist].length;
            playTrack(playlists[currentPlaylist][currentTrackIndex]);
        }
    });

    audioPlayer.addEventListener('ended', function() {
        nextButton.click(); // Trece automat la următoarea melodie la finalizarea redării
    });

    playButton.addEventListener('click', function() {
        if (!audioPlayer.src) {
            // Încearcă să redea prima melodie din playlist dacă player-ul nu are o sursă
            if (currentPlaylist && playlists[currentPlaylist].length > 0) {
                playTrack(playlists[currentPlaylist][0]);
            }
        } else {
            audioPlayer.play();
        }
    });

    pauseButton.addEventListener('click', function() {
        audioPlayer.pause();
    });
});
