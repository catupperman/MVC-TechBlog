const express = require('express');
const session = require('express-session');
const path = require('path');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
  };

  app.use(session(sess));

  app.use(express.json());
  app.use(express.urlencoded({ extended: false}));

  app.use(express.static(path.join(__dirname, "public")));

  app.listen(PORT, () => {
      console.log('listening on 3001')
      sequelize.sync({ force: false})
  });
