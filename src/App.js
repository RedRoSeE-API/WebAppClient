import React, { useEffect, useState } from 'react'
import NoteComponent from './NoteComponent';
import axios from 'axios';
import "./App.css";

function App() {

    const [noteIdUpdate, setNoteIdUpdate] = useState('');
    const [noteIdDelete, setNoteIdDelete] = useState('');
    const [noteIdGet, setNoteIdGet] = useState('');

    const [textCreate, setTextCreate] = useState('');
    const [textUpdate, setTextUpdate] = useState('');

    const [allNotes, setAllNotes] = useState();
    const [oneNote, setOneNote] = useState();

    

    useEffect(() => {
        getAllNotesFormServer();
    }, [])


    const handleSubmitCreate = async () => {
        try{
            const res = await axios.post("http://localhost:3001/createNote", {text: textCreate});
            setTextCreate("");            
        }catch(err){
            if(err.response.status == 400){
                alert("Please fill  the text field!")
            }
        }
    }

    const handleSubmitUpdate = async () => {
        try{
            const res = await axios.post("http://localhost:3001/updateNote", {id: noteIdUpdate, text: textUpdate});
            console.log(res);
            setNoteIdUpdate("");
            setTextUpdate("");

        }catch(err){
            if(err.response.status == 400){
                alert("Invalid ID or blank text!")
            }
            
        }
    }

    const handleSubmitDelete = async () => {
        try{
            const res = await axios.post("http://localhost:3001/deleteNote", {id: noteIdDelete});
            setNoteIdDelete("");
            console.log(res);
        }catch(err){
            if(err.response.status == 400){
                alert("Invalid ID!")
            }
        }
    }

    const handleSubmitGetOne = async (event) => {
        
        event.preventDefault(); //Prevent the window from reloading and keeping the note that the http request returned

        try{
            const res = await axios.post("http://localhost:3001/getOneNote", {id: noteIdGet});
            console.log(res);
            setNoteIdGet('');
            setOneNote(res.data);
        }catch(err){
            if(err.response.status == 400){
                alert("Invalid ID!")
            }
        }
    }

    const getAllNotesFormServer = async () => {

        try{
            const res = await axios.get('http://localhost:3001/getAllNotes');
            setAllNotes(res.data)
        }catch(err){
            alert(err.response);
        }
    
    
      }


    const handleChangeTextCreate = (e) => {

        setTextCreate(e.target.value)
    }

    const handleChangeTextUpdate = (e) => {

        setTextUpdate(e.target.value)
    }

    const handleChangeNoteIdUpdate = (e) => {

        setNoteIdUpdate(e.target.value)
    }

    const handleChangeNoteIdDelete = (e) => {

        setNoteIdDelete(e.target.value)
    }

    const handleChangeNoteIdGet = (e) => {

        setNoteIdGet(e.target.value)
    }


  return (
    <div className='mainDiv'>

        <div className='getAllDiv'>
            <h2>All Notes</h2>
            {allNotes?.map((note) => 
          
                <NoteComponent props={note} key={note.id}/>
            )}
        </div>

        <div className='grid-div-1080px'>

        <div className='getOneDiv'>
            <h2>Get Note By Id</h2>
            <form className='form-get-one' onSubmit={handleSubmitGetOne}>
                 <div className='form-get-one-data'>
                    <label className='form-get-one-id-lable'>Note Id:</label>
                    <input type="text" name='text' className='form-get-one-id-input' value={noteIdGet} onChange={handleChangeNoteIdGet}></input>
                </div>
                <button type="submit" className='form-get-one-button'>Get</button>
            </form>

            {/* Display specific note or doesn't display nothing */}
            {oneNote ? 
                <div>
                    <h3 className='noteId'> Note #{oneNote.id}</h3>
                    <p className='noteText'>{oneNote.text}</p>
                </div>
            :
                null
            } 
        </div>


        <div className= "createDiv">
            <h2>Crete new Note</h2>
            <form className='form-create' onSubmit={handleSubmitCreate}>
                <div className='form-create-data'>
                    <label className='form-create-text-lable'>Note Content:</label>
                    <input type="text" name='text' className='form-create-text-input' value={textCreate} onChange={handleChangeTextCreate}></input>
                </div>
                <button type="submit" className='form-create-button'>Create</button>
            </form>
        </div>

        <div className='updateDiv'>
            <h2>Update a Note</h2>
            <form className='form-update' onSubmit={handleSubmitUpdate}>
                 <div className='form-update-data-id'>
                    <label className='form-update-id-lable'>Note Id:</label>
                    <input type="text" name='text' className='form-update-id-input' value={noteIdUpdate} onChange={handleChangeNoteIdUpdate}></input>
                </div>
                <div className=' form-update-data'>
                    <label className='form-update-text-lable'>Note Content:</label>
                    <input type="text" name='text' className='form-update-text-input' value={textUpdate} onChange={handleChangeTextUpdate}></input>
                </div>
                <button type="submit" className='form-update-button'>Update</button>
            </form>
        </div>

        <div className='deleteDiv'>
            <h2>Delete a Note</h2>
            <form className='form-delete' onSubmit={handleSubmitDelete}>
                 <div className='form-delete-data'>
                    <label className='form-delete-id-lable'>Note Id:</label>
                    <input type="text" name='text' className='form-delete-id-input' value={noteIdDelete} onChange={handleChangeNoteIdDelete}></input>
                </div>
                <button type="submit" className='form-delete-button'>Delete</button>
            </form>
        </div>

        </div>



    </div>
  )
}

export default App;