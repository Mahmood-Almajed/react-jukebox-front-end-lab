

const NowPlaying =({selected})=>{
    if(!selected){
        return (
          <div>
            <h1>No Track Selected</h1>
          </div>
        )
      }
      return(
        <>
        <h2>Now Playing</h2>
        <h4>{`title: ${selected.title}`}</h4>
        <h4>{`artist: ${selected.artist}`}</h4>
        </>
      )

}

export default NowPlaying