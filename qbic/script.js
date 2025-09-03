var log = function(message) {
    var container = document.getElementById('logs')
    var containerMessage = document.createElement('div')
    containerMessage.innerText = message
    container.appendChild(containerMessage)
}

var startPlay = function (url) {
    var body = {
        pkgname: 'com.qbic.smilplayer',
        classname: 'com.qbic.smilplayer.PlayerActivity',
        action: 'android.intent.action.VIEW',
        flags: ['0x10000000'], // FLAG_ACTIVITY_NEW_TASK
        data: url
    };

    return fetch('http://localhost:8080/v1/task/start_app', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(body),
    }).then(function (start) {
        if (!start.ok) {
            throw new Error(`start_app failed: ${start.status}`)
        }
    })
}

var playFromRemote = function () {
    startPlay('https://phil1618.github.io/event-27788-or-download.mp4').then(function() {
        log('START PLAYING')
    }).catch(function() {
        log('ERROR PLAYING')
    })
}

log('INIT')

playFromRemote()
