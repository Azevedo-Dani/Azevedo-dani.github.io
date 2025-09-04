const listOfRemoteUrls = [
    {url: 'https://phil1618.github.io/event-27788-or-download.mp4', name: 'video3.mp4'},
    {url: 'https://azevedo-dani.github.io/media/video1.mp4', name: 'video1.mp4'},
    {url: 'https://azevedo-dani.github.io/media/video2.mp4', name: 'video2.mp4'}
]
const localUrls = []

const log = (message, type = 'log') => {
    const container = document.getElementById('logs')
    const containerMessage = document.createElement('div')
    containerMessage.classList.add(type)
    containerMessage.innerText = message
    container.appendChild(containerMessage)
}

const clearLogs = () => {
    const container = document.getElementById('logs')
    container.innerHTML = null
}

const logError = (err) => {
    log(err?.message ?? 'error', 'err')
}

const stopVideoIfNeeded = () => {
    const videoTag = document.getElementById('video')
    const container = document.getElementById('containerVideo')
    if (videoTag && container) {
        videoTag.remove()
    }
}

const playVideo = (index)  => {
    stopVideoIfNeeded()
    if (!localUrls[index] || !localUrls[index].url) {
        throw new Error('First download all videos')
    }
    const url = localUrls[index].url
    const container = document.getElementById('containerVideo')
    const videoElement = document.createElement('video')
    container.appendChild(videoElement)
    videoElement.setAttribute('id', 'video')
    videoElement.setAttribute('src', url)
    videoElement.load()
    return videoElement.play()
}

const play =  async (index = 0) => {
    try {
        await playVideo(index -1 )
        log('SUCCESS PLAYING', 'success')
    } catch (err) {
        logError(err)
    }
}

const getBlob =  async (url)=> {
    const resp = await fetch(url, { method: 'GET' })
    if (!resp.ok) {
        throw new Error(`Download failed: ${resp.status}`)
    }
    return resp.blob()
}

const saveVideoToLocalStorage = async (url, fileName, mime = 'video/mp4') => {
    try {
        const blob = await getBlob(url)
        const fd = new FormData()
        const file = new File([blob], fileName, { type: mime })
        fd.append('file', file)
        const resp = await fetch('http://localhost:8080/v1/task/remote_upload_file', {
            method: 'POST',
            body: fd,
        })
        if (!resp.ok) {
            throw new Error(`Download failed: ${resp.status}`)
        }
    } catch (err) {
        logError(err)
        throw err
    }
}

const clearAssets =  async () => {
    try {
        const resp = await fetch('http://localhost:8080/v1/task/remote_delete_file', {
            method: 'POST', headers: {
                'Content-Type': 'application/json'
            },body: JSON.stringify({
                "deleteall": "true"
            })
        })
        if (!resp.ok) {
            throw new Error(`Deletion failed: ${resp.status}`)
        }
        log('Deletion success')
    } catch (err) {
        log(`Error: ${err.message}`, 'error')
    }
}

const reloadApp =  () => {
    window.location.reload(true)
}

const downloadAssets = async () => {
    try {
        log('Starting download')
        await Promise.all(listOfRemoteUrls.map(async (link) => {
            log(`Start download ${link.name}`)
            await saveVideoToLocalStorage(link.url, link.name)
            localUrls.push({
                url: `http://localhost:8080/mnt/internal_storage/remotefiles/${link.name}`,
                name: link.name
            })
        }))
        log('Download done', 'success')
    } catch (err) {
        logError(err)
    }
}

// const getInfo = async() => {
//     try {
//         const resp = await fetch('http://localhost:8080/v1/info')
//         if (!resp.ok) {
//             throw new Error(`Deletion failed: ${resp.status}`)
//         }
//         const json = await resp.json()
//         const info = json.results
//         Object.entries(info).map(([key, value]) => {
//             log(`${key}: ${value}`)
//         })
//     } catch (err) {
//         log(`Error: ${err.message}`, 'error')
//     }
// }
log('INIT')
// getInfo()
