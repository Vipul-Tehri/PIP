document.addEventListener('DOMContentLoaded', (event) => {

    let video = document.getElementById('videoElement');
    let togglePipButton = document.getElementById('togglePipButton');

    togglePipButton.addEventListener('click', async function (event) {
        togglePipButton.disabled = true; //disable toggle button while the event occurs
        try {
            // If there is no element in Picture-in-Picture yet, request for it
            if (video !== document.pictureInPictureElement) {
                await video.requestPictureInPicture();
            }
            // If Picture-in-Picture already exists, exit the mode
            else {
                await document.exitPictureInPicture();
            }

        } catch (error) {
            console.log(`Oh Horror! ${error}`);
        } finally {
            togglePipButton.disabled = false; //enable toggle button after the event
        }
    });

    video.addEventListener('enterpictureinpicture', function (event) {
        alert('Entered PiP');
        pipWindow = event.pictureInPictureWindow;
        alert(`Window size -  \n Width: ${pipWindow.width} \n Height: ${pipWindow.height}`); // get the width and height of PiP window
    });

    video.addEventListener('leavepictureinpicture', function (event) {
        alert('Left PiP');
        togglePipButton.disabled = false;
    });

    if ('pictureInPictureEnabled' in document) {
        showPipButton();

        // loadedmetadata event occurs when meta data for the specified audio/video has been loaded.Meta data might consists of: duration, dimensions etc.
        video.addEventListener('loadedmetadata', showPipButton);

        // emptied event is fired when the media has become empty, e.g. media has already been loaded or partially loaded.
        video.addEventListener('emptied', showPipButton);
    } else {
        console.log('The Picture-in-Picture Web API is not available.');
        togglePipButton.hidden = true;
    }

    // Enable/disable toggle button depending on whether PiP availability.
    function showPipButton() {
        togglePipButton.disabled = (video.readyState === 0) || !document.pictureInPictureEnabled || video.disablePictureInPicture;
    }
});

