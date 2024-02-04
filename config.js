const fs = require('fs')
const chalk = require('chalk')

// Other
global.owner = ['6281281872699']
global.premium = ['6281281872699']
global.packname = 'Heavy Craft'
global.botname = 'Heavy Craft'
global.ownername = 'Rzkymlna'
global.author = 'Heavy Craft'
global.sessionName = 'Shizuka'
global.prefa = ['','!','.','🐦','🐤','🗿']
global.apikey = 'xxxxxxxxx' //ambil dari web ini https://rzky.my.id/
global.sp = '⭔'
global.mess = {
    success: '✓ Success',
    admin: 'Fitur Khusus Admin Group!',
    botAdmin: 'Bot Harus Menjadi Admin Terlebih Dahulu!',
    owner: 'Fitur Khusus Owner Bot',
    group: 'Fitur Digunakan Hanya Untuk Group!',
    private: 'Fitur Digunakan Hanya Untuk Private Chat!',
    bot: 'Fitur Khusus Pengguna Nomor Bot',
    wait: 'Loading...',
    endLimit: 'Limit Harian Anda Telah Habis, Limit Akan Direset Setiap Jam 12',
}

global.fotoRandom = [
    "https://h.top4top.io/p_29287tnhy3.jpeg",
]
global.thumb = fs.readFileSync('./media/shiz.jpeg')
global.visoka = { url: 'https://telegra.ph/file/15209657f9d4f59c7ca1e.mp4' }

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update'${__filename}'`))
	delete require.cache[file]
	require(file)
})
