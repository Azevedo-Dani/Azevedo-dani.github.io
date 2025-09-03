
var log = function(message) {
    var container = document.getElementById('logs')
    var containerMessage = document.createElement('div')
    containerMessage.innerText = message
    container.appendChild(containerMessage)
}
log('START PLAY CONTENT')
