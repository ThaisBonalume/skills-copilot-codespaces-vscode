// Create web server
const express = require('express');
const app = express();
app.use(express.json());

// Data
const comments = [
    { id: 1, comment: "This is a comment" },
    { id: 2, comment: "This is another comment" }
];

// GET: Get all comments
app.get('/comments', (req, res) => {
    res.send(comments);
});

// POST: Add a new comment
app.post('/comments', (req, res) => {
    const comment = {
        id: comments.length + 1,
        comment: req.body.comment
    };
    comments.push(comment);
    res.send(comment);
});

// PUT: Update a comment
app.put('/comments/:id', (req, res) => {
    const comment = comments.find(c => c.id === parseInt(req.params.id));
    if (!comment) return res.status(404).send('The comment with the given ID was not found.');

    comment.comment = req.body.comment;
    res.send(comment);
});

// DELETE: Delete a comment
app.delete('/comments/:id', (req, res) => {
    const comment = comments.find(c => c.id === parseInt(req.params.id));
    if (!comment) return res.status(404).send('The comment with the given ID was not found.');

    const index = comments.indexOf(comment);
    comments.splice(index, 1);

    res.send(comment);
});

// Listen to a port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));