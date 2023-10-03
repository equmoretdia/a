import Player from '@vimeo/player';
var throttle = require('lodash.throttle');

const player = new Player('vimeo-player');

function getItem() {
  const savedTime = localStorage.getItem('videoplayer-current-time');
  if (savedTime) {
    const loadedTime = JSON.parse(savedTime);
    player.setCurrentTime(loadedTime['seconds']);
  }
}

getItem();

const throttledTimeUpdate = throttle(currentTime => {
  localStorage.setItem('videoplayer-current-time', JSON.stringify(currentTime));
}, 1000);

player.on('timeupdate', throttledTimeUpdate);
