const FileSystem = require('ftp-srv/src/fs');
const { PassThrough } = require('stream')
const transporter = require('./mail-transport')

class MyFileSystem extends FileSystem {
  constructor() {
    super(...arguments);
  }

  write(fileName, {append = false, start = undefined} = {}) {
    console.log(fileName)
    const ptStream = new PassThrough()
      // send mail with defined transport object
    transporter.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: "aylabbs@gmail.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
      attachments: [
        { // stream as an attachment
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
