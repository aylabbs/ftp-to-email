require('dotenv').config()
const FtpSrv = require('ftp-srv');
const MyFileSystem = require('./fs');
const path = require('path')

const { PASV_URL, UN, PW } = process.env

if (!PASV_URL || !UN || !PW) throw new Error('Missing PASV_URL, UN or PW')

const ROOT = path.resolve(__dirname, 'scans')
const ftpServer = new FtpSrv({
    url: 'ftp://0.0.0.0:8000',
    pasv_url: PASV_URL
});


ftpServer.on('login', (data, resolve, reject) => {
    const {connection, username, password} = datas
    console.log('USERNAME', username)
    if (username === UN && password === PW) {
        resolve({ root: ROOT, fs: new MyFileSystem(connection, {root: ROOT }) })
    }
});
ftpServer.on('client-error', ({connection, context, error}) => {
    console.log(error)
});


ftpServer.listen()
.then(() => {

});