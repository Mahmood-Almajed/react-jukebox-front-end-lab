import { useState } from "react";

const TrackForm =(props)=>{
    const initialState ={
        title:'',
        artist:''
    
    }

    const [formData,setFormData]=useState(props.selected ? props.selected:initialState);

   const handleChange =(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})

   }
   const handleSubmitForm=(e)=>{
    e.preventDefault();
    if(props.selected){
        props.handleUpdateTrack(props.selected._id, formData);
    }
    else{
        props.handleAddTrack(formData);

    }
    setFormData(initialState)

    props.handleFormView()
   }
return(
    <div>
    <form onSubmit={handleSubmitForm}>
        <label htmlFor="name"> Title: </label>
        <input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
        />
        <label htmlFor="age"> Artist: </label>
        <input
            id="artist"
            name="artist"
            value={formData.artist}
            onChange={handleChange}
        />
        
        <button type="submit">
            {props.selected ?'Update Track': 'Add New Track'}
               
                Submit
        </button>
    </form>
</div>
)
}

export default TrackForm
