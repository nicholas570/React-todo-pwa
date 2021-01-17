const express = require('express');
const { uuid } = require('uuidv4');
const cors = require('cors');

const port = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);

let items = [
  { id: uuid(), item: 'Learn more about React' },
  { id: uuid(), item: 'Learn more about PWA' },
];

app.get('/items', (req, res) => {
  res.json(items);
});

app.post('/items', (req, res) => {
  const { todoItem } = req.body;
  console.log(req.body);
  items.push({ id: uuid(), item: todoItem });
  res.json(items);
});

app.delete('/items/:id', (req, res) => {
  const { id } = req.params;
  console.log(id);
  items = items.filter((item) => item.id !== id);
  res.json(items);
});

app.listen(port, (err) => {
  if (err) {
    throw new Error(err);
  } else {
    // eslint-disable-next-line
    console.log(`server listening on port: ${port}`);
  }
});
