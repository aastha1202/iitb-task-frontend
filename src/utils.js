
export function handleTogglePlay(audioUrl, currentAudio,setCurrentAudio,audioRef, setIsPlaying,isPlaying){
    var audio = audioRef.current
    if(currentAudio!== audioUrl){
        if(currentAudio){
            audio.pause()            
        }
        setCurrentAudio(audioUrl)
        audio.src= audioUrl
        audio.play()
        setIsPlaying(true)
    }
    else{
        if(isPlaying){
           audio.pause()
           setIsPlaying(false)
        }
        else{
            audio.play()
            setIsPlaying(true)
        }
    }
}

export function formatDate(date){
    const createdAt = new Date(date)
    const formatedDate = `${createdAt.getDate().toString().padStart(2,'0')}-${(createdAt.getMonth()+1).toString().padStart(2,'0')}-${createdAt.getFullYear()} ${createdAt.getHours().toString().padStart(2,'0')}:${createdAt.getMinutes().toString().padStart(2,'0')}:${createdAt.getSeconds().toString().padStart(2,'0')}`
    return formatedDate
}

export function convertMillisecondToSecond(time){
    const ms = time/100
    return ms
}