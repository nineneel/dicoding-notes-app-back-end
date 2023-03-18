const { nanoid } = require("nanoid");
const notes = require("./notes");

const addNoteHandler = (request, h) => {
    const { title, tags, body } = request.payload;

    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newNote = {
        title,
        tags,
        body,
        id,
        createdAt,
        updatedAt,
    };

    notes.push(newNote);

    const isSuccess = notes.filter((note) => note.id === id).length > 0;

    if (isSuccess) {
        const response = h.response({
            status: "success",
            message: "Note berhasil ditambahkan",
            data: {
                id: id,
            },
        });
        response.code(201);
        return response;
    }

    const response = h.response({
        status: "fail",
        message: "Note gagal ditambahkan",
    });
    response.code(500);
    return response;
};

const getAllNotesHandler = (request, h) => {
    return {
        status: "success",
        data: {
            notes,
        },
    };
};

const getNoteHandlerById = (request, h) => {
    const { id } = request.params;
    const note = notes.filter((note) => note.id == id)[0];

    if (note !== undefined) {
        return {
            status: "success",
            data: {
                note,
            },
        };
    }

    const response = h.response({
        status: "fail",
        message: "Note tidak ditemukan",
    });
    response.code(404);
    return response;
};

const updateNoteHanlerById = (request, h) => {
    const { id } = request.params;
    const { title, tags, body } = request.payload;
    const updatedAt = new Date().toISOString();

    const index = notes.findIndex((note) => note.id === id);

    if (index !== 1) {
        // notes[index]["title"] = title;
        // notes[index]["tags"] = tags;
        // notes[index]["body"] = body;
        // notes[index]["updatedAt"] = updatedAt;
        notes[index] = {
            ...notes[index],
            title,
            tags,
            body,
            updatedAt,
        };

        const response = h.response({
            status: "success",
            message: "Note berhasil diupdate",
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: "fail",
        message: "Gagal memperbaharui note, id tidak ditemukan",
    });
    response.code(404);
    return response;
};

const deleteNoteHanlerById = (request, h) => {
    const { id } = request.params;

    const index = notes.findIndex((note) => note.id === id);

    if (index !== -1) {
        notes.splice(index, 1);
        const response = h.response({
            status: "success",
            message: "berhasil menghapus note",
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: "fail",
        message: "note tidak ditemukan",
    });
    response.code(404);
    return response;
};

module.exports = {
    addNoteHandler,
    getAllNotesHandler,
    getNoteHandlerById,
    updateNoteHanlerById,
    deleteNoteHanlerById,
};
