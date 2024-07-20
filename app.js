const express = require('express');
const path = require('path');
const multer = require('multer');
const predictRouter = require('./api/predict');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

app.use('/', require('./routes/index'));
app.use('/api', upload.single('image'), predictRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
