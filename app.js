const express = require('express');
const path = require('path');
const usersRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');

const { PORT = 3000, BASE_PATH } = process.env;

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', usersRoutes);
app.use('/', cardsRoutes);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Ссылка на сервер:');
  console.log(BASE_PATH);
});
