var log = function(message) {
    var container = document.getElementById('logs')
    var containerMessage = document.createElement('div')
    containerMessage.innerText = message
    container.appendChild(containerMessage)
}

var startPlay = function (url) {
    var body = {
        "pkgname":"com.qbic.smilplayer",
        "classname":"com.qbic.smilplayer.PlayerActivity",
        "data":"https://www.google.com",
        "flag":["0x10000000", "0x00010000", "0x40000000"],
        "action":"android.intent.action.MAIN",
        "categories":["android.intent.category.DEFAULT",
            "android.intent.category.LAUNCHER"],
        "extras":
            [
                {
                    "name":"extra_1",
                    "type":"int",
                    "data":["1", "3", "7", "0"]
                },
                {
                    "name":"extra_2",
                    "type":"float",
                    "data":["23.555"]
                }
            ]};

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
