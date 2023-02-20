import Player from "@vimeo/player";
import throttle from "lodash.throttle";

    const iframe = document.querySelector('iframe');
    const player = new Player(iframe);
    const KEY_LOCAL_STORAGE = "videoplayer-current-time";

    player.on('timeupdate', throttle((event) => {
        console.log(event.seconds);
        localStorage.setItem(KEY_LOCAL_STORAGE, event.seconds);
        }, 1000)
    );

    player.setCurrentTime(localStorage.getItem(KEY_LOCAL_STORAGE)).then(function(seconds) {
        // seconds = the actual time that the player seeked to
    }).catch(function(error) {
        switch (error.name) {
            case 'RangeError':
                // the time was less than 0 or greater than the video’s duration
                break;
    
            default:
                // some other error occurred
                break;
        }
    });
