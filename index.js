const config = require('config');
const App = require('./src/App');

const app = new App(config);

app.start().catch(err => {
  console.error('Should never happen', err);
});
