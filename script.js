var notes = []; // array to store the notes
$(document).ready(function () {
    // display the existing notes
    loadNotes(); // automatically load the previous notes

    $('#notesForm').submit((e)=>{
        // prevent the browser from reloading 
        e.preventDefault();
        var title = escapeHtml($('#noteTitle').val());
        var content = escapeHtml($('#noteContent').val());
        // validating the input
        if(title?.length>0 && content?.length>0){
            var note = {title:title, content:content}; // create the note object
            // check if there is any existing note with the same title
            if(!handleSameTitle(title)){
                notes.push(note);
                saveNote(); // save the note to the local storage
                dispalayNotes();
            }
            else alert('Note with the same title already exists');
        }
    });

});

// function to display the existing notes
const dispalayNotes = ()=>{
    // empty the display 
    $('#noteList').empty(); // resets the noteList container
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
        $editButton.click(()=>
        {
            editNote(index);
        });
        // when delete button is clicked it will call deleteNote function
        $deleteButton.click(()=>{
            deleteNote(index);
        });
        $noteActions.append($editButton, $deleteButton);
        $noteItem.append($noteActions);
        $('#noteList').append($noteItem);

    });
}


// function to save notes to the local storage
const saveNote = () =>{
    localStorage.setItem('notes', JSON.stringify(notes));
    $('#noteTitle, #noteContent').val(''); // Clear form fields
}
// function to handle the notes modification
const editNote = (index)=>{
    var note = notes[index];
    // create the dialog using the jquery ui
    // var originalTitle = note.title // store the original title
    $('#editTitle').val(note.title);
    $('#editContent').val(note.content);
    $('#editDialog').dialog({
        title: 'Edit Note',
        modal: true,
        buttons:{
            Save: function(){
                // save value to the respective note
                note.title = escapeHtml($('#editTitle').val());
                note.content = escapeHtml($('#editContent').val());
                // check if there is any existing note with the same title
                if(!handleSameTitle(note.title, index)){
                dispalayNotes();
                saveNote(); // save the note to the local storage
                $(this).dialog('close');
                }
                else alert('Note with the same title already exists');
            },
            Cancel: function(){
                 $(this).dialog('close');
            }
        }
    });

}

// function to handle the deletion of the notes
const deleteNote = (index)=>{
    if(confirm('Are you sure you want to delete the selected note?')){
        notes.splice(index, 1); // removes the particular note from the notes list
        dispalayNotes();
        saveNote();
    }
}

// function to handle the previous notes
const loadNotes = () => {
    var storedNotes = localStorage.getItem('notes');
    if(storedNotes){
        notes = JSON.parse(storedNotes);
        dispalayNotes();
    }
}

// function to handle the notes with same title
const handleSameTitle = (title, indexToRemove)=>{
    var tempNotes = notes;
    if(indexToRemove != null){
        // remove original title from the notes and store temporary
        tempNotes = [...notes.slice(0,indexToRemove), ...notes.slice(indexToRemove + 1)];
    }
    for(var i=0; i<tempNotes.length; i++){
        if(tempNotes[i].title == title){
            return true;
        }
    }
    return false;
}

// Function to escape HTML characters to prevent from XSS attacks
function escapeHtml(text) {
var map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
};

return text.replace(/[&<>"']/g, function(m) { 
    console.log(m)
    return map[m]; 
});
}