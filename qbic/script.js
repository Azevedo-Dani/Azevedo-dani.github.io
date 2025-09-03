// async function saveUrlToLocalAndPlay({
//                                          url,
//                                          localFilename = 'event.mp4',
//                                          mime = 'video/mp4'
//                                      }) {
//     // 1) Download the remote file (to memory)
//     const resp = await fetch(url, { method: 'GET' });
//     if (!resp.ok) throw new Error(`Download failed: ${resp.status}`);
//     const blob = await resp.blob();
//
//     const fd = new FormData();
//     const file = new File([blob], localFilename, { type: mime });
//     fd.append('file', file);
//
//     const upload = await fetch('http://localhost:8080/v1/task/remote_upload_file', {
//         method: 'POST',
//         body: fd,
//     });
//     if (!upload.ok) throw new Error(`Upload failed: ${upload.status}`);
//
//     // 3) Launch a player with the local file path
//     const body = {
//         pkgname: 'com.qbic.smilplayer',
//         classname: 'com.qbic.smilplayer.PlayerActivity',
//         action: 'android.intent.action.VIEW',
//         flags: ['0x10000000'], // FLAG_ACTIVITY_NEW_TASK
//         data: `file:///sdcard/remotefiles/${localFilename}`
//     };
//
//     const start = await fetch('http://localhost:8080/v1/task/start_app', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json; charset=utf-8' },
//         body: JSON.stringify(body),
//     });
//     if (!start.ok) throw new Error(`start_app failed: ${start.status}`);
//
//     return { ok: true };
// }

// Usage:
var log = function(message) {
    var container = document.getElementById('logs')
    var containerMessage = document.createElement('div')
    containerMessage.innerText = message
    container.appendChild(containerMessage)
}
// const playContent = async function(urlToPlay) {
//     const body = {
//         pkgname: 'com.qbic.smilplayer',
//         classnamescript: 'com.qbic.smilplayer.PlayerActivity',
//         action: 'android.intent.action.VIEW',
//         flags: ['0x10000000'], // FLAG_ACTIVITY_NEW_TASK
//         data: urlToPlay
//     };
//     const start = await fetch('http://localhost:8080/v1/task/start_app', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json; charset=utf-8' },
//         body: JSON.stringify(body),
//     });
//     if (!start.ok) throw new Error(`start_app failed: ${start.status}`);
//     return { ok: true };
// }

log('START PLAY CONTENT')

// playContent('https://phil1618.github.io/event-27788-or-download.mp4').catch(err => {
//     log('CANNOT PLAY')
// })
// saveUrlToLocalAndPlay({
//     url: 'https://phil1618.github.io/event-27788-or-download.mp4',
//     localFilename: 'event-27788.mp4'
// }).catch(console.error);
