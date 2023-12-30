const Note = require('../models/note')

const handleError = (err) => {
    let errors = { title:'', desc: ''};
    
    if(err.message.includes('Title is required')){
        errors.title = 'Title is required';
    }

    if(err.message.includes('Description is required')){
        errors.desc = 'Description is required';
    }
    return errors;
}

module.exports.notes_get = async (req, res) => {
    // const id = req.params.id; // id of user
    // console.log(req.user);
    const id = req.user._id; // id of user
    const email = req.user.email;
    const filter = {id};
    try {
        const notes = await Note.find(filter).sort({ createdAt: -1 });
        res.status(200).json({email, notes});
    } catch (err) {
        res.json(err);
    }  
}

module.exports.note_get = async (req, res) => {
    const _id = req.params.id; // id of note
    const filter = {_id};
    try {
        const note = await Note.findOne(filter);
        res.status(200).json({note});
    } catch (err) {
        res.json(err);
    }  
}

module.exports.note_post = async (req, res) => {
    // const id = req.params.id; // id of user
    const id = req.user._id;
    const { title, desc } = req.body;
    try {
        const notes = await Note.create({id, title, desc});
        res.status(201).json(notes);
    } catch (err) {
        const errors = handleError(err);
        res.status(404).json({errors});
    }
}

module.exports.updateNote_post = async (req, res) => {
    const _id = req.params.id; // id of note
    const { title, desc} = req.body;
    try {
        const note = await Note.updateOne({_id}, {
            title,
            desc
        })
        res.json(note);
    } catch (err) {
        const errors = handleError(err);
        res.status(404).json({errors});
    }
}

module.exports.note_delete = async (req, res) => {
    const _id = req.params.id; // id of note
    try {
        const notes = await Note.deleteOne({_id});
        res.status(201).json(notes);
    } catch (err) {
        const errors = handleError(err);
        res.status(404).json({errors});
    }
}