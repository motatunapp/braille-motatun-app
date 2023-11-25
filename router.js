const route = require('express').Router();
const path = require('path');
const {
  homeApp,
  cssApp,
  jsApp,
  gmailSend,
  jsLogPage,
  formData,
  indexPage,
} = require('./routerHandler');
//const soundPath = path.join(__dirname, '/../src');

route.get('/', indexPage);

route.get('/braille', homeApp);

route.post('/data', formData);

route.post('/post', gmailSend);

module.exports = route; 