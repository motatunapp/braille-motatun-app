const path = require('path');
const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
const { EMAIL, PASSWORD } = require('./env');

let data = [];

const homeApp = (req, res) => {
  res.sendFile(path.join(__dirname, './public/app.html'));
  
}

const indexPage = (req, res) => {
  res.code(200).send('success');
}

const cssApp = (req, res) => {
  res.sendFile(path.join(__dirname, '../css/app.css'));
}

const jsApp = (req, res) => {
  res.sendFile(path.join(__dirname, '../', 'js', 'app.js'));
}

const jsLogPage = (req, res) => {
  res.sendFile(path.join(__dirname, '../', 'js', 'log-page.js'));
}

const formData = (req, res) => {
  let { userEmail, nama, nim, matkul } = req.body;

  data.push(userEmail, nama, nim, matkul);
  console.log(data);
}

const gmailSend = (req, res) => {

  const { obj } = req.body;
  [email, namaMahasiswa, nimMahasiswa, mataKuliah] = data;
    
  let config = {
    service: 'gmail',
    auth: {
      user: EMAIL,
      pass: PASSWORD
    }
  }

  let transporter = nodemailer.createTransport(config);

  let MailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Braille to Text",
      link: 'https://mailgen.js'
    }
  });

  let response = {
    body: {
      greeting: "Selamat Pagi Bapak/Ibu Dosen",
      intro: "Berikut hasil lembar kerja atas nama :",
      table: [
        {
          title: 'Data Mahasiswa',
          data : 
            [{
              Nama : namaMahasiswa,
              Nim : nimMahasiswa,
              Mata_Kuliah : mataKuliah,
            }],
        },
        {
          title: 'Hasil Lembar Kerja',
          data : [{
            hasil : obj,
          }],
        }
      ],
      outro: 'Terimakasih atas perhatiannya.',
      signature: `Hormat Saya, ${namaMahasiswa}`
    }
  }

  let mail = MailGenerator.generate(response);

  let message = {
    from: EMAIL,
    to: email,
    subject: "Pengumpulan Lembar Kerja",
    html: mail,
  }

  transporter.sendMail(message).then(() => {
    console.log('success');
    res.sendFile(path.join(__dirname, './public/index.html'));
    return data = [];
  })

}

module.exports = { 
  homeApp,
  cssApp,
  jsApp,
  gmailSend,
  indexPage,
  jsLogPage,
  formData,
}