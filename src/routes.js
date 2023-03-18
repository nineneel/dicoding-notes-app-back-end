const {
    addNoteHandler,
    getAllNotesHandler,
    getNoteHandlerById,
    updateNoteHanlerById,
    deleteNoteHanlerById,
} = require("./handler");

const routes = [
    {
        method: "POST",
        path: "/notes",
        handler: addNoteHandler,
    },
    {
        method: "GET",
        path: "/notes",
        handler: getAllNotesHandler,
    },
    {
        method: "GET",
        path: "/notes/{id}",
        handler: getNoteHandlerById,
    },
    {
        method: "PUT",
        path: "/notes/{id}",
        handler: updateNoteHanlerById,
    },
    {
        method: "DELETE",
        path: "/notes/{id}",
        handler: deleteNoteHanlerById,
    },
];

module.exports = routes;
