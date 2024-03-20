import React from 'react'
import "./NoteComponent.css"

function NoteComponent({ props }) {
  return (
    <div className='noteDiv'>
        <h3 className='noteId'> Note #{props.id}</h3>
        <p className='noteText'>{props.text}</p>
    </div>
  )
}

export default NoteComponent;