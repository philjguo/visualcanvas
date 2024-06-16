let currentAudio = null;
let currentAudioSrc = '';

// Function to play or pause the audio based on the state and source
function playVoice(audioSrc, imageId) {
    const buttons = document.querySelectorAll('.voice-button');
    const errorMessage = document.getElementById('error-message');

    // Hide the error message when a new audio clip is played
    errorMessage.classList.add('hidden');

    // If the current audio is already playing and the same button is clicked, pause it
    if (currentAudio && !currentAudio.paused && currentAudio.src.includes(audioSrc)) {
        currentAudio.pause();
        buttons.forEach(button => button.classList.remove('playing'));
    } else if (currentAudio && currentAudio.paused && currentAudio.src.includes(audioSrc)) {
        // If the current audio is paused and the same button is clicked, resume it
        currentAudio.play();
        buttons.forEach(button => {
            if (button.getAttribute('onclick').includes(audioSrc)) {
                button.classList.add('playing');
            }
        });
    } else {
        // If a new audio is played, stop any currently playing audio
        if (currentAudio && !currentAudio.paused) {
            currentAudio.pause();
            buttons.forEach(button => button.classList.remove('playing'));
        }

        // Play the new audio
        currentAudio = new Audio(audioSrc);
        currentAudioSrc = audioSrc;
        currentAudio.play();
        currentAudio.onplay = () => {
            buttons.forEach(button => {
                if (button.getAttribute('onclick').includes(audioSrc)) {
                    button.classList.add('playing');
                }
            });
        };
        currentAudio.onended = () => {
            buttons.forEach(button => button.classList.remove('playing'));
        };
    }
}

// Function to generate the image based on the currently playing audio
function generateImage() {
    const generatedImage = document.getElementById('generated-image');
    const errorMessage = document.getElementById('error-message');

    // Stop the audio if it is playing
    if (currentAudio && !currentAudio.paused) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        document.querySelectorAll('.voice-button').forEach(button => button.classList.remove('playing'));
    }

    // Set the image source based on the current audio source
    let imagePath = '';
    switch (currentAudioSrc) {
        case 'audio/voice1.mp3':
            imagePath = '/images/image1.jpg';
            break;
        case 'audio/voice2.mp3':
            imagePath = '/images/image2.jpg';
            break;
        case 'audio/voice3.mp3':
            imagePath = '/images/image3.jpg';
            break;
        case 'audio/voice4.mp3':
            imagePath = '/images/image4.jpg';
            break;
        default:
            generatedImage.src = '';
    }

    if (imagePath) {
        // Show the generated image
        generatedImage.src = imagePath;
        generatedImage.classList.remove('hidden');
        errorMessage.classList.add('hidden');
    } else {
        // Show an error message if no audio has been played
        generatedImage.classList.add('hidden');
        errorMessage.classList.remove('hidden');
    }
}
