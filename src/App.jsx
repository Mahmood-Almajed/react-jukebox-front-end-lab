// src/App.jsx
import { useState, useEffect } from "react";
import * as trackService from './services/trackService'
import TrackForm from "./components/TrackForm";
import TrackList from "./components/TrackList";
import NowPlaying from "./components/NowPlaying";
const App = () => {


  const [trackList,setTrackList]=useState([])
  const [selected,setSelected]=useState(null);
  const [isFormOpen,setIsFormOpen]=useState(false)

  const handleSelected = (track)=>{

    setSelected(track);
    
  }

  const handleFormView=(track)=>{
    if(!track.name)setSelected(null)
    setIsFormOpen(!isFormOpen);
  } 

  const handleAddTrack =async(formData)=>{
    try {
      const newTrack = await trackService.create(formData);
      

      if(newTrack.error) throw new Error(newTrack.error);

      setTrackList([...trackList,newTrack]);
      setIsFormOpen(false)
    } catch (error) {
      console.log(error)
    }


  }

  const handleEditTrack = (track) => {
    setSelected(track);
    setIsFormOpen(true); 
  };


  const handleRemoveTrack=async(id)=>{

    try {
      const deletedTrack= await trackService.deleteTrack(id);
  
      if(deletedTrack.error) throw new Error(deletedTrack.error)
  
        const newTrackList =trackList.filter((track)=>track._id!==id)
          setTrackList(newTrackList)
          setSelected(null)
  
        
  
    } catch (error) {
      console.log(error)
    }
  
  
  
  
  }


  const handleUpdateTrack =async(id,formData)=>{
    
    try {
      
      const updatedTrack =await trackService.update(id,formData)

      if(updatedTrack.error){
        throw new Error(updatedTrack.error);
      }
      const updatedList =trackList.map((track)=>{

        if(track._id===updatedTrack._id){
          return updatedTrack
        }
        return track

      })


      setSelected(updatedTrack);
      setTrackList(updatedList)
      setIsFormOpen(false);
    } catch (error) {
      console.log(error);
    }


  }

  useEffect(()=>{
const fetchTracks=async()=>{
    try {
      const tracks=await trackService.index();

      if(tracks.error) throw new Error(tracks.error)

        setTrackList(tracks)

    } catch (error) {
      console.log(error)
    }
}
    
 fetchTracks()
   },[])

  return (
    <>
    

      <TrackList trackList={trackList} handleSelected={handleSelected} handleFormView={handleFormView} isFormOpen={isFormOpen} handleEditTrack={handleEditTrack} handleRemoveTrack={handleRemoveTrack} />
      {
        isFormOpen ? (<TrackForm handleAddTrack={handleAddTrack} selected={selected} handleUpdateTrack={handleUpdateTrack} />):(<NowPlaying selected={selected}  />)
      }
      

      </>    
  );
};

export default App;