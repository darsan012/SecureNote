$(document).ready(function () {
    var notes = []; // array to store the notes
    // display the existing notes
    dispalayNotes();
    // add new notes
});

// function to display the existing notes
const dispalayNotes = ()=>{
    // empty the display 
    $('noteList').empty(); // resets the noteList container
    // iterate over the notes and display them 
    notes.forEach((note, index) => {
        // create div with note-item classname
        var $noteItem = $('<div class="note-item">')
        // append the notes title and content
        $noteItem.append(`<div class="note-title">${note.title}</div>`);
        $noteItem.append(`<div class="note-content">${note.content}</div>`);

        var $noteActions = $('<div class="note-actions">');
        // editButton edits the notes
        var $editButton = $('<button class="edit-button">Edit</button>');
        // delete button deletes the notes
        var $deleteButton = $('<button class="delete-button">Delete</button>');
        // when edit button is clicked it will call editNote function
        $editButton.click(()=>editNote(index));

    });
}

// function to handle the notes modification
const editNote = (index)=>{
    var note = notes[index];
    // create the dialog using the jquery ui
    $('#editTitle').val(note.title);
    $('#editContent').val(note.content);
    $('#editDialog').dialog({
        title: 'Edit Note',
        modal: true,
        buttons:{
            Save: ()=>{
                // save value to the respective note
                note.title = $('#editTitle').val();
                note.content = $('#editContent').val();
                // display the notes after saving
                dispalayNotes();
                // close dialouge after saving 
                this.dialog('close');
            },
            Cancel: ()=>{
                this.dialog('close');
            }
        }
    });
}