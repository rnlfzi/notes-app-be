const { nanoid } = require('nanoid');
const notes = require('./notes');

const addNoteHandler = (req, h) => {
    const { title, tags, body } = req.payload;

    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updateAt = createdAt;

    const newNote = {
        title, tags, body, id, createdAt, updateAt,
    };

    notes.push(newNote);

    const isSuccess = notes.filter((note) => note.id === id).length > 0;

    if (isSuccess) {
        const res = h.response({
            status: 'success',
            message: 'Catatan berhasil ditambahkan',
            data: {
                noteId: id,
            },
        });
        res.code(201);
        return res;
    }

    const res = h.response({
        status: 'fail',
        message: 'Catatan gagal ditambahkan'
    });
    res.code(500);
    return res;
};

const getAllNotesHandler = () => ({
    status: 'success',
    data: {
        notes,
    },
});

const getNoteByIdHandler = (req, h) => {
    const { id } = req.params;

    const coba = Number(id)
    console.log(coba)
   
    const note = notes.filter((n) => n.id === Number(id))[0];

    if (note !== undefined) {
        return {
            status: 'success',
            data: {
                note,
            },
        };
    }
    const res = h.response({
        status: 'fail',
        message: 'Catatan tidak ditemukan',
    });
    res.code(404);
    return res;
};

module.exports = { addNoteHandler, getAllNotesHandler, getNoteByIdHandler };