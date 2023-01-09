// const path = require('path');
import path from 'path';

module.exports = (app) => {


  
  app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '../../client/index.html'))
  // res.sendFile(path.join(__dirname, '../client/dist/index.html'))
  );
  
  return app
}