
document.getElementById('file-input').addEventListener('change', function() {
    var fileList = this.files;
    var fileNames = [];
    for(var i = 0; i < fileList.length; i++) {
        fileNames.push(fileList[i].name);
    }

    alert("File upload: " + fileNames.join(', '));
});


document.getElementById('file-input').addEventListener('change', function(e) {
    var fileListContainer = document.getElementById('file-list');
    fileListContainer.innerHTML = ''; // Curăță lista înainte de a adăuga noi fișiere

    var files = e.target.files; // Obține fișierele selectate de utilizator

    if(files.length > 0) {
        var list = document.createElement('ul');
        fileListContainer.appendChild(list);

        for(let i = 0; i < files.length; i++) {
            let li = document.createElement('li');
            li.textContent = files[i].name; // Adaugă numele fișierului la elementul de listă
            list.appendChild(li);

            // Adaugă un event listener pentru click pe fiecare melodie
            li.addEventListener('click', function() {
                var audioPlayer = document.getElementById('audio-player');
                audioPlayer.src = URL.createObjectURL(files[i]); // Setează sursa audio la fișierul selectat
                audioPlayer.play(); // Începe redarea
            });
        }
    } else {
        fileListContainer.textContent = 'Niciun fișier selectat.';
    }
});
