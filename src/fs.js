const FileSystem = require('ftp-srv/src/fs');
const { PassThrough } = require('stream')
const transporter = require('./mail-transport')

const { EMAIL_FROM, EMAIL_TO } = process.env

if (!EMAIL_FROM || !EMAIL_TO) throw new Error('Missing email FROM/TO')

class MyFileSystem extends FileSystem {
  constructor() {
    super(...arguments);
  }

  write(fileName, {append = false, start = undefined} = {}) {
    
    const ptStream = new PassThrough()
    transporter.sendMail({
      from: EMAIL_FROM,
      to:  EMAIL_TO,
      subject: "Scan " + fileName,
      text: "",
      // html: "<b>Hello world?</b>",
      attachments: [
        {
          filename: fileName,
          content: ptStream
        }
      ]
    })
    .then(info => console.log(info))
    .catch(error => console.error('ERROR', error))
    // ptStream.on('close', () => stream.end());
    return {
      stream: ptStream,
      clientPath: ''
    };
  }
}
module.exports = MyFileSystem
