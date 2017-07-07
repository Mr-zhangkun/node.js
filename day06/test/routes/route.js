module.exports = (app) => {
  app.get('/', (req, res) => {
    res.send('hello');
  });
  app.get('/doc', (req, res) => {
    res.send('doc page');
  });
  app.get('/form',(req, res) => {
    res.redirect('/doc');
  });
};
