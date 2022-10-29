const express = require('express')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const app = express()
const PORT = 3000
const staticPath = path.join(__dirname, '/public')
app.use(express.static(staticPath))
app.use('/style', express.static(path.join(staticPath, '/style.css')))
app.use('/script', express.static(path.join(staticPath, '/script.js')))

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, callback) {
      if (!fs.existsSync('uploads')) {
        fs.mkdirSync('uploads', { recursive: true })
      }
      callback(null, 'uploads')
    },
    filename: function (req, file, callback) {
      callback(null, '_' + Date.now() + file.originalname)
    },
  }),
}).single('file_data')

app.get('/', (req, res) => {
  res.status(200).send('Welcome to the File Uploaded Server ❤️ -> Go Ahead and Show Your Skills on our Codebase ')
})


const cheerio = require('cheerio');
app.get('/listfile', (req, res) => {
  if (fs.existsSync("./uploads")) {
    const dirpath = path.join(__dirname, "uploads");
    const $ = cheerio.load(fs.readFileSync(__dirname + '/public/files.html'));
    fs.readdir(dirpath, (err, files) => {
      if (files.length > 0) {
        for (i in files) {
          $('#filesList').append("<tr><td>" + files[i] + "</td></tr>")
        }
        // res.send(files);
        res.send($.html())
      }
      else {
        res.send("There are no files in the uploads folder");
      }

    })

  }
  else {
    res.send("There is no uploads folder");
  }
})

app.post('/upload', upload, (req, res) => {
  console.log('File ' + req.file.originalname + ' Uploaded')
  res.status(200).send({ status: 'File uploaded' })
})

app.listen(PORT, () => {
  console.log(`Running on PORT http://localhost:${PORT}`)
})
