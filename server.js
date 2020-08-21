const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      cors = require('cors'),
      port = process.env.PORT || 4000,
      userRouter = require('./routes/users'),
      quoteRouter = require('./routes/quotes'),
      path = require('path');
;

require('dotenv').config();

mongoose.connect(`mongodb+srv://harman11:${process.env.MONGOPASS}@cluster0.zlfvs.mongodb.net/test?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
mongoose.connection.on('connected', () => {
  console.log("Mongoose connected");
});

app.use(cors());
app.use(express.json());
app.use('/users', userRouter)
app.use('/quotes', quoteRouter);

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

