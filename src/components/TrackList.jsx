const TrackList =(props)=>{
const tracks =props.trackList.map((track)=>(
<div key={track._id}>
    <p >{`${track.title} by ${track.artist}`}</p>
    <button onClick={()=>props.handleSelected(track)}>Play</button>
    <button onClick={()=>props.handleEditTrack(track)}>Edit</button>
    <button onClick={()=>props.handleRemoveTrack(track._id)}>Delete</button>
</div>


));
return(

<> 
        <h3>Track List</h3>
        <button onClick={props.handleFormView}>
        {props.isFormOpen ? 'Close Form' : 'New Pet'}
      </button>
        <div>
        {tracks}

        </div>
</>
    
)

}

export default TrackList