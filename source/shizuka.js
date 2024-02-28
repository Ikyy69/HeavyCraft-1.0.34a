require('../config')
const {
	BufferJSON,
	WA_DEFAULT_EPHEMERAL,
	generateWAMessageFromContent,
	proto,
	generateWAMessageContent,
	generateWAMessage,
	prepareWAMessageMedia,
	areJidsSameUser,
	getContentType
} = require('@whiskeysockets/baileys')
const fs = require('fs')
const util = require('util')
const chalk = require('chalk')
const {
	exec,
	spawn,
	execSync
} = require("child_process")
const axios = require('axios')
const path = require('path')
const os = require('os')
const moment = require('moment-timezone')
const {
	JSDOM
} = require('jsdom')
const speed = require('performance-now')
const {
	performance
} = require('perf_hooks')
const fetch = require('node-fetch')
const {
	smsg,
	formatp,
	tanggal,
	formatDate,
	getTime,
	isUrl,
	sleep,
	clockString,
	runtime,
	fetchJson,
	getBuffer,
	jsonformat,
	format,
	parseMention,
	getRandom,
	getGroupAdmins
} = require('../lib/myfunc')
const {
	color,
	bgcolor
} = require('../lib/color')
//fake
const rzky = {
	key: {
		remoteJid: '0@s.whatsapp.net',
		fromMe: false,
		id: global.packname,
		participant: '0@s.whatsapp.net'
	},
	message: {
		requestPaymentMessage: {
			currencyCodeIso4217: "USD",
			amount1000: 999999999,
			requestFrom: '0@s.whatsapp.net',
			noteMessage: {
				extendedTextMessage: {
					text: global.packname
				}
			},
			expiryTimestamp: 999999999,
			amount: {
				value: 10000,
				offset: 1000,
				currencyCode: "IDR"
			}
		}
	}
}

module.exports = shizuka = async (shizuka, m, chatUpdate, store) => {
	try {
		var body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ''
		var budy = (typeof m.text == 'string' ? m.text : '')
		var prefix = prefa ? /^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi.test(body) ? body.match(/^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi)[0] : "" : prefa ?? global.prefix
		const isCmd = body.startsWith(prefix)
		const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
		const args = body.trim().split(/ +/).slice(1)
		const pushname = m.pushName || "No Name"
		const botNumber = await shizuka.decodeJid(shizuka.user.id)
		const isShizuka = [botNumber, ...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
		const itsMe = m.sender == botNumber ? true : false
		const text = q = args.join(" ")
		const fatkuns = (m.quoted || m)
		const quoted = (fatkuns.mtype == 'buttonsMessage') ? fatkuns[Object.keys(fatkuns)[1]] : (fatkuns.mtype == 'templateMessage') ? fatkuns.hydratedTemplate[Object.keys(fatkuns.hydratedTemplate)[1]] : (fatkuns.mtype == 'product') ? fatkuns[Object.keys(fatkuns)[0]] : m.quoted ? m.quoted : m
		const mime = (quoted.msg || quoted).mimetype || ''
		const qmsg = (quoted.msg || quoted)
		const isMedia = /image|video|sticker|audio/.test(mime)

		// Group
		const groupMetadata = m.isGroup ? await shizuka.groupMetadata(m.chat).catch(e => {}) : ''
		const groupName = m.isGroup ? groupMetadata.subject : ''
		const participants = m.isGroup ? await groupMetadata.participants : ''
		const groupAdmins = m.isGroup ? await getGroupAdmins(participants) : ''
		const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false
		const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
		const isPremium = isShizuka || global.premium.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender) || false
		const hariini = moment.tz('Asia/Jakarta').format('dddd, DD MMMM YYYY')
		const wib = moment.tz('Asia/Jakarta').format('HH:mm:ss')
		const waktu = moment().tz('Asia/Jakarta').format('HH:mm:ss')
		const pingSt = new Date();
		if (waktu < "23:59:00") {
			var ucapanWaktu = 'Selamat Malam 🏙️'
		}
		if (waktu < "19:00:00") {
			var ucapanWaktu = 'Selamat Petang 🌆'
		}
		if (waktu < "18:00:00") {
			var ucapanWaktu = 'Selamat Sore 🌇'
		}
		if (waktu < "15:00:00") {
			var ucapanWaktu = 'Selamat Siang 🌤️'
		}
		if (waktu < "10:00:00") {
			var ucapanWaktu = 'Selamat Pagi 🌄'
		}
		if (waktu < "05:00:00") {
			var ucapanWaktu = 'Selamat Subuh 🌆'
		}
		if (waktu < "03:00:00") {
			var ucapanWaktu = 'Selamat Tengah Malam 🌃'
		}
		const {
			type,
			mentioned,
			now,
			sender,
			fromMe,
			from,
			senderNumber,
			groupId,
			groupMembers,
			groupDesc,
			groupOwner,
			isGroup,
			mentionByTag,
			mentionByReply,
			users,
			content,
		} = m

		const pickRandom = (arr) => {
			return arr[Math.floor(Math.random() * arr.length)]
		}
		//reply
		const reply = (teks) => {
			return shizuka.sendMessage(m.chat, {
				text: teks,
				contextInfo: {
					forwardingScore: 9999999,
					isForwarded: true
				}
			}, {
				quoted: rzky
			})
		}
		//reply2
		async function setReply(teks) {
			let photo = pickRandom(global.fotoRandom)
			const ngel = {
				contextInfo: {
					mentionedJid: [m.sender],
					forwardingScore: 9999999,
					isForwarded: true,
					externalAdReply: {
						showAdAttribution: true,
						title: '© Shizuka Bot',
						body: `Hai  ${ucapanWaktu} kak ${pushname}`,
						previewType: "PHOTO",
						thumbnailUrl: photo,
						sourceUrl: 'https://rzkyms.my.id/'
					}
				},
				text: teks
			};
			return shizuka.sendMessage(m.chat, ngel, {
				quoted: rzky
			});
		};
		if (isCmd) {
			shizuka.sendPresenceUpdate('recording', from)
		} else {
			shizuka.sendPresenceUpdate('recording', from)
		}

		const listcolor = ['red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white']
		const randomcolor = listcolor[Math.floor(Math.random() * listcolor.length)]
		if (isCmd) {
			console.log(chalk.yellow.bgCyan.bold('RzkyDEV'), color(`[ PESAN ]`, `${randomcolor}`), color(`Dari`, `${randomcolor}`), color(`${pushname}`, `${randomcolor}`), color(`Command :`, `${randomcolor}`), color(`${body}`, `white`))
		}
		switch (command) {

			case 'television':
			case 'glasses':
			case 'blackpink2':
			case 'neonbp':
			case 'coverpubg':
			case 'greenbrush':
			case 'neonblue':
			case 'eraser':
			case 'dragonfire':
			case 'incandescent':
			case 'typography':
			case 'letters':
			case 'cloth':
			case 'graffiti':
			case 'metals':
			case 'typography2':
			case 'nightstars':
			case 'cloud':
			case 'caper':
			case 'horror':
			case 'sunlight':
			case 'cake':
			case 'pig':
			case 'hallowen':
			case 'leafgraphy':
			case 'crank':
			case 'puppy':
			case 'pubgavatar':
			case 'foggy':
			case 'tiger':
			case 'american':
			case 'arrow':
			case 'arrow2':
			case 'anonymous':
			case 'aov':
			case 'valorant':
			case 'warface':
			case 'ml':
			case 'freefire':
			case 'freefire2':
				if (args.length == 0) return setReply(`Example: ${prefix + command} Shizuka`)
				setReply(mess.wait)
				shizuka.sendMessage(m.chat, {
					image: {
						url: `https://rzky.my.id/api/ephoto/${command}?apikey=${global.apikey}&text=${args}`
					},
					caption: `❏ Created By : ${global.botname}\n❏ Type: ${command}`
				})
				break

			case 'wood':
			case 'quotestatus':
			case 'writestatus':
			case 'heated':
			case 'buoys':
			case 'heated':
			case 'pencil':
			case 'onepiece':
			case 'dota':
			case 'anime':
				if (args.length == 1) return setReply(`Example: ${prefix + command} Ikyy69 Maulana`)
				setReply(mess.wait)
				shizuka.sendMessage(m.chat, {
					image: {
						url: `https://rzky.my.id/api/ephoto/${command}?apikey=${global.apikey}&text=${args[0]}&text2=${args[1]}`
					},
					caption: `❏ Created By : ${global.botname}\n❏ Type: ${command}`
				})
				break

			case 'pubg':
			case 'glitch':
				if (args.length == 1) return setReply(`Example: ${prefix + command} Ikyy69 Gans`)
				setReply(mess.wait)
				shizuka.sendMessage(m.chat, {
					image: {
						url: `https://rzky.my.id/api/photooxy/${command}?apikey=${global.apikey}&text=${args[0]}&text2=${args[1]}`
					},
					caption: `❏ Created By : ${global.botname}\n❏ Type: ${command}`
				})

				break
			case 'coffee':
			case 'quotewood':
			case 'flaming':
			case 'oceansea':
			case 'shadow':
			case 'rainbow':
			case 'gravity':
			case 'burnpaper':
			case 'smoke':
			case 'romantic':
			case 'lovemessage':
			case 'lovemessage':
			case 'grass':
			case 'doubleheart':
			case 'coffecup':
			case 'lovetext':
			case 'butterfly':
			case 'slidetext':
				if (args.length == 0) return setReply(`Example: ${prefix + command} Shizuka`)
				setReply(mess.wait)
				shizuka.sendMessage(m.chat, {
					image: {
						url: `https://rzky.my.id/api/photooxy/${command}?apikey=${global.apikey}&text=${args}`
					},
					caption: `❏ Created By : ${global.botname}\n❏ Type: ${command}`
				})
				break

			case 'paper':
			case 'embossed':
			case 'broken':
			case 'blackpink':
			case 'carbon':
			case 'gradient':
			case 'glue':
			case 'neon':
			case 'blood':
			case 'firework':
			case 'dropwater':
			case 'imglitch':
			case 'glossy':
			case 'bear':
			case 'devil':
			case 'christmas':
			case 'magma':
			case 'stone':
			case 'light':
			case 'berry':
			case 'transformer':
			case 'fiction':
			case 'greenhorror':
			case 'metallic':
			case 'discovery':
			case 'circuit':
			case 'sketch':
			case 'choror':
			case 'skeleton':
				if (args.length == 0) return setReply(`Example: ${prefix + command} Shizuka`)
				setReply(mess.wait)
				shizuka.sendMessage(m.chat, {
					image: {
						url: `https://rzky.my.id/api/textpro/${command}?apikey=${global.apikey}&text=${args}`
					},
					caption: `❏ Created By : ${global.botname}\n❏ Type: ${command}`
				})
				break

			case 'ttmp3':
			case 'tiktokaudio':
			case 'ttaudio': {
				if (!q) return setReply('where is the link')
				setReply(mess.wait)
				let i = await fetchJson(`https://rzky.my.id/api/download/tiktok?url=${q}c&apikey=${global.apikey}`)
				shizuka.sendMessage(m.chat, {
					audio: {
						url: i.result.music
					},
					mimetype: 'audio/mp4'
				}, {
					quoted: rzky
				})
			}
			break

			case 'tiktok':
			case 'tiktokmp4':
			case 'ttvideo': {
				if (!q) return setReply('where is the link')
				setReply(mess.wait)
				axios.get(`https://rzky.my.id/api/download/tiktok?url=${q}c&apikey=${global.apikey}`)
					.then(({
						data
					}) => {
						shizuka.sendMessage(m.chat, {
							video: {
								url: data.result.nowm
							},
							mimetype: 'video/mp4',
							fileName: `shizuka.mp4`
						}), {
							quoted: rzky
						}
					})
			}
			break

			case 'ytmp4':
			case 'playmp4':
				if (args.length == 0) return setReply(`Example: ${prefix + command} https://www.youtube.com/watch?v=qZIQAk-BUEc`)
				setReply(mess.wait)
				axios.get(`https://rzky.my.id/api/download/ytmp4?url=${args[0]}&apikey=${global.apikey}`)
					.then(({
						data
					}) => {
						var caption = `❏ Title : *${data.result.title}*\n`
						caption += `❏ Size : *${data.result.size}*\n`
						caption += `❏ Duration : *${data.result.duration}*\n`
						caption += `❏ Views : *${data.result.views}*\n`
						caption += `❏ Channel : *${data.result.channel}*\n`
						caption += `❏ UploadDate : *${data.result.uploadDate}*\n`
						caption += `❏ Desc : \n${data.result.desc}`
						shizuka.sendMessage(m.chat, {
							image: {
								url: data.result.thumb
							},
							caption
						}).then(() => {
							shizuka.sendMessage(m.chat, {
								video: {
									url: data.result.result
								},
								mimetype: 'video/mp4',
								fileName: `${data.result.title}.mp4`
							})
						})
					})
				break
			case 'ytmp3':
				if (args.length == 0) return setReply(`Example: ${prefix + command} https://www.youtube.com/watch?v=qZIQAk-BUEc`);

				setReply(mess.wait);

				axios.get(`https://rzky.my.id/api/download/ytmp3?url=${args[0]}&apikey=${global.apikey}`)
					.then(({
						data
					}) => {
						var caption = `❏ Title : *${data.result.title}*\n`;
						caption += `❏ Size : *${data.result.size}*\n`;
						caption += `❏ Duration : *${data.result.duration}*\n`;
						caption += `❏ Views : *${data.result.views}*\n`;
						caption += `❏ Channel : *${data.result.channel}*\n`;
						caption += `❏ UploadDate : *${data.result.uploadDate}*\n`;
						caption += `❏ Desc : \n${data.result.desc}`;

						shizuka.sendMessage(m.chat, {
							image: {
								url: data.result.thumb
							},
							caption
						}).then(() => {
							shizuka.sendMessage(from, {
								audio: {
									url: data.result.result
								},
								mimetype: "audio/mpeg"
							}, {
								quoted: m
							});
						});
					});
				break
			case 'play':
				if (args.length == 0) return shizuka.sendMessage(m.chat, `Example: ${prefix + command} https://www.youtube.com/watch?v=qZIQAk-BUEc`);

				setReply(mess.wait);

				axios.get(`https://rzky.my.id/api/download/playv2?query=${args[0]}&apikey=${global.apikey}`)
					.then(async ({
						data
					}) => {
						const result = data.result;

						var caption = `❏ Title : *${result.title}*\n`;
						caption += `❏ Views : *${result.views}*\n`;
						caption += `❏ Channel : *${result.channel}*\n`;
						caption += `❏ UploadDate : *${result.published}*`;

						// Send thumbnail and caption
						shizuka.sendMessage(m.chat, {
							image: {
								url: result.thumb
							},
							caption
						}).then(() => {
							// Send audio
							shizuka.sendMessage(from, {
								audio: {
									url: result.url
								},
								mimetype: "audio/webm" // Update the mimetype based on the actual result
							}, {
								quoted: m
							}).catch(error => {
								console.error(error);
								shizuka.sendMessage(m.chat, 'Error sending the audio. Please try again.');
							});
						});
					})
					.catch(error => {
						console.error(error);
						const errorMessage = (typeof error === 'object' && error.hasOwnProperty('response') && error.response.hasOwnProperty('data')) ?
							error.response.data :
							'An error occurred while processing your request.';

						shizuka.sendMessage(m.chat, errorMessage);
					});
				break;
			case 'douyin':
				if (args.length == 0) return setReply(`Example: ${prefix + command} https://v.douyin.com/iLf6YH2A/`)
				setReply(mess.wait)
				axios.get(`https://rzky.my.id/api/download/douyin?url=${args[0]}&apikey=${global.apikey}`)
					.then(({
						data
					}) => {
						var caption = `❏ Title : *${data.result.data.title}*\n`
						caption += `❏ Size : *${data.result.data.size}*\n`
						caption += `❏ Author : *${data.result.data.author.nickname}*\n`
						caption += `❏ Avatar : *${data.result.data.author.avatar}*`
						shizuka.sendMessage(m.chat, {
							image: {
								url: data.result.data.origin_cover
							},
							caption
						}).then(() => {
							shizuka.sendMessage(m.chat, {
								video: {
									url: data.result.data.wmplay
								},
								mimetype: 'video/mp4',
								fileName: `${data.result.data.title}.mp4`
							})
						})
					})
				break

			case 'like':
			case 'likedown':
				if (args.length == 0) return setReply(`Example: ${prefix + command} https://l.likee.video/v/6k9C2z `)
				setReply(mess.wait)
				axios.get(`https://rzky.my.id/api/download/like?url=${args[0]}&apikey=${global.apikey}`)
					.then(({
						data
					}) => {
						var caption = `❏ Title : *${data.result.title}*`
						shizuka.sendMessage(m.chat, {
							image: {
								url: data.result.thumbnail
							},
							caption
						}).then(() => {
							shizuka.sendMessage(m.chat, {
								video: {
									url: data.result.no_watermark
								},
								mimetype: 'video/mp4',
								fileName: `${data.result.title}.mp4`
							})
						})
					})
				break

			case 'fb':
			case 'facebook':
			case 'fbdown':
				if (args.length == 0) return setReply(`Example: ${prefix + command} https://www.facebook.com/alanwalkermusic/videos/277641643524720`)
				setReply(mess.wait)
				axios.get(`https://rzky.my.id/api/download/fb2?url=${args[0]}&apikey=${global.apikey}`)
					.then(({
						data
					}) => {
						var caption = `❏ Title : *${data.result.title}*\n`
						caption += `❏ Duration : *${data.result.duration}*`
						shizuka.sendMessage(m.chat, {
							image: {
								url: data.result.thumbnail
							},
							caption
						}).then(() => {
							shizuka.sendMessage(m.chat, {
								video: {
									url: data.result.links.hd
								},
								mimetype: 'video/mp4',
								fileName: `${data.result.title}.mp4`
							})
						})
					})
				break

			case 'cocofun':
				if (args.length == 0) return setReply(`Example: ${prefix + command} https://www.icocofun.com/share/post/qUc04yiC8WapxKtUXRy9dg==`)
				setReply(mess.wait)
				axios.get(`https://rzky.my.id/api/download/cocofun?url=${args[0]}&apikey=${global.apikey}`)
					.then(({
						data
					}) => {
						var caption = `❏ Title : *${data.result.title}*\n`
						caption += `❏ Desc : *${data.result.desc}*\n`
						caption += `❏ Like : *${data.result.like}*\n`
						caption += `❏ Share : *${data.result.shared}*\n`
						caption += `❏ Duration : *${data.result.duration}*\n`
						caption += `❏ Resolution : *${data.result.resolution}*`
						shizuka.sendMessage(m.chat, {
							image: {
								url: data.result.thumbnail
							},
							caption
						}).then(() => {
							shizuka.sendMessage(m.chat, {
								video: {
									url: data.result.url
								},
								mimetype: 'video/mp4',
								fileName: `${data.result.title}.mp4`
							})
						})
					})
				break
			case 'komikulatest': {
				let res = await fetch(`https://rzky.my.id/api/anime/komiku/latest?apikey=${global.apikey}`);
				let datas = await res.json();

				let teks = `*KOMIKU LATEST*\n\n`;

				for (let i of datas.result) {
					teks += `❏ *Title* : ${i.title}\n`;
					teks += `❏ *Chapter* : ${i.chapter.join(', ')}\n`;
					teks += `❏ *Image* : ${i.img}\n`;
					teks += `❏ *Link* : ${i.link}\n\n`;
				}
				setReply(teks);
			}
			break;
			case 'komikusearch': {
				if (!q) return ('Mau cari apa?');
				let res = await fetch(`https://rzky.my.id/api/anime/komiku/search?query=${q}&apikey=${global.apikey}`);
				let datas = await res.json();

				let teks = `*KOMIKU SEARCH*\n\n`;

				for (let i of datas.result) {
					teks += `❏ *Title* : ${i.title}\n`;
					teks += `❏ *Chapter* : ${i.chapter.awal} - ${i.chapter.akhir}\n`;
					teks += `❏ *Image* : ${i.img}\n`;
					teks += `❏ *Link* : ${i.link}\n\n`;
				}
				setReply(teks);
			}
			break;
			case 'komikudetail': {
				if (!q) return ('Mau cari apa?')
				if (!isUrl(args[0]) && !args[0].includes('www.')) return setReply(`Example: ${prefix + command} https://komiku.id/manga/the-reincarnation-of-the-forbidden-archmage/ `)
				let res = await fetch(`https://rzky.my.id/api/anime/komiku/detail?url=${q}&apikey=${global.apikey}`);
				let data = await res.json();

				let teks = `*KOMIKU DETAIL*\n\n`;

				let animeResult = data.result;

				teks += `❏ *Title* : ${animeResult.title}\n`;
				teks += `❏ *Image* : ${animeResult.img}\n`;

				// Metadata
				let metadata = animeResult.metadata;
				teks += `❏ *Indonesian Title* : ${metadata.judul_indonesia}\n`;
				teks += `❏ *Comic Type* : ${metadata.jenis_komik}\n`;
				teks += `❏ *Story Concept* : ${metadata.konsep_cerita}\n`;
				teks += `❏ *Artists* : ${metadata.komikus}\n`;
				teks += `❏ *Status* : ${metadata.status}\n`;
				teks += `❏ *Age Rating* : ${metadata.umur_pembaca}\n`;
				teks += `❏ *Reading Direction* : ${metadata.cara_baca}\n`;
				teks += `❏ *Genres* : ${metadata.genre.join(', ')}\n`;

				// Synopsis
				teks += `❏ *Synopsis* : ${animeResult.sinopsis}\n`;

				// Chapters
				for (let chapter of animeResult.chapters) {
					teks += `❏ *Chapter* : ${chapter.chapter}\n`;
					teks += `   *Title* : ${chapter.title}\n`;
					teks += `   *Upload Date* : ${chapter.upload}\n`;
					teks += `   *URL* : ${chapter.url}\n\n`;
				}
				setReply(teks)
			}
			break;
			case 'nekopoilatest': {
				let res = await fetch(`https://rzky.my.id/api/anime/nekopoi/latest?apikey=${global.apikey}`);
				let datas = await res.json();

				let teks = `*NEKOPOI LATEST*\n\n`;

				for (let i of datas.result) {
					teks += `❏ *Title* : ${i.title}\n`;
					teks += `❏ *Upload* : ${i.upload}\n`;
					teks += `❏ *Image* : ${i.image}\n`;
					teks += `❏ *Link* : ${i.link}\n\n`;
				}
				setReply(teks);
			}
			break;
			case 'nekopoisearch': {
				if (!q) return ('Mau cari apa?')
				let res = await fetch(`https://rzky.my.id/api/anime/nekopoi/search?query=${q}&apikey=${global.apikey}`);
				let datas = await res.json();

				let teks = `*NEKOPOI SEARCH*\n\n`;

				for (let i of datas.result) {
					teks += `❏ *Title* : ${i.title}\n`;
					teks += `❏ *Genre* : ${i.genre}\n`;
					teks += `❏ *Image* : ${i.image}\n`;
					teks += `❏ *Link* : ${i.link}\n\n`;
				}
				setReply(teks);
			}
			break;
			case 'nekopoidetail': {
				if (!q) return ('Mau cari apa?')
				if (!isUrl(args[0]) && !args[0].includes('www.')) return setReply(`Example: ${prefix + command} https://nekopoi.care/l2d-uncensored-aoi-and-inosuke-demon-slayer-xtremetoons/`)
				let res = await fetch(`https://rzky.my.id/api/anime/nekopoi/detail?url=${q}&apikey=${global.apikey}`);
				let data = await res.json();

				let teks = `*NEKOPOI DETAIL*\n\n`;

				let animeResult = data.result;

				teks += `❏ *Title* : ${animeResult.title}\n`;
				teks += `❏ *Info* : ${animeResult.info}\n`;
				teks += `❏ *Image* : ${animeResult.img}\n`;
				teks += `❏ *Genre* : ${animeResult.genre}\n`;
				teks += `❏ *Stream* : ${animeResult.stream}\n`;

				// Download Links
				for (let downloadLink of animeResult.download) {
					teks += `❏ *Download (${downloadLink.type})* : ${downloadLink.title}\n`;
					for (let link of downloadLink.links) {
						teks += `   *${link.name}* : ${link.link}\n`;
					}
				}
				setReply(teks)
			}
			break;
			case 'quotesanime': {
				let res = await fetch(`https://rzky.my.id/api/anime/quotesanime?apikey=${global.apikey}`);
				let datas = await res.json();

				let teks = `*QUOTES ANIME*\n\n`;

				for (let i of datas.result) {
					teks += `❏ *Karakter* : ${i.karakter}\n`;
					teks += `❏ *Anime* : ${i.anime}\n`;
					teks += `❏ *Episode* : ${i.episode}\n`;
					teks += `❏ *Up At* : ${i.up_at}\n`;
					teks += `❏ *Image* : ${i.gambar}\n`;
					teks += `❏ *Link* : ${i.link}\n`;
					teks += `❏ *Quotes* : ${i.quotes}\n\n`;
				}
				setReply(teks);
			}
			break;
			case 'loli': {
				let bufs = await getBuffer(`https://rzky.my.id/api/anime/loli?apikey=${global.apikey}`)
				shizuka.sendMessage(m.chat, {
					image: bufs,
					caption: `Made by ${global.botname}`
				}, {
					quoted: rzky
				}).catch((err) => setReply(mess.error))
			}
			break
			case 'waifu': {
				let bufs = await getBuffer(`https://rzky.my.id/api/anime/waifu?apikey=${global.apikey}`)
				shizuka.sendMessage(m.chat, {
					image: bufs,
					caption: `Made by ${global.botname}`
				}, {
					quoted: rzky
				}).catch((err) => setReply(mess.error))
			}
			break
			case 'husbu': {
				let bufs = await getBuffer(`https://rzky.my.id/api/anime/husbu?apikey=${global.apikey}`)
				shizuka.sendMessage(m.chat, {
					image: bufs,
					caption: `Made by ${global.botname}`
				}, {
					quoted: rzky
				}).catch((err) => setReply(mess.error))
			}
			break
			case 'cerpencinta': {
				let res = await fetch(`https://rzky.my.id/api/random/cerpen/cinta?apikey=${global.apikey}`);
				let data = await res.json();

				let teks = `*CERPEN CINTA*\n\n`;

				let shortStoryResult = data.result;

				teks += `❏ *Title* : ${shortStoryResult.title}\n`;
				teks += `❏ *Author* : ${shortStoryResult.author_name}\n`;
				teks += `❏ *Author URL* : (${shortStoryResult.author_url})\n`;
				teks += `❏ *Story* : ${shortStoryResult.story}\n`;

				setReply(teks);
			}
			break;
			case 'cerpensahabat': {
				let res = await fetch(`https://rzky.my.id/api/random/cerpen/sahabat?apikey=${global.apikey}`);
				let data = await res.json();

				let teks = `*CERPEN SAHABAT*\n\n`;

				let shortStoryResult = data.result;

				teks += `❏ *Title* : ${shortStoryResult.title}\n`;
				teks += `❏ *Author* : ${shortStoryResult.author_name}\n`;
				teks += `❏ *Author URL* : (${shortStoryResult.author_url})\n`;
				teks += `❏ *Story* : ${shortStoryResult.story}\n`;

				setReply(teks);
			}
			break;
			case 'cerpenperjuangan': {
				let res = await fetch(`https://rzky.my.id/api/random/cerpen/perjuangan?apikey=${global.apikey}`);
				let data = await res.json();

				let teks = `*CERPEN PERJUANGAN*\n\n`;

				let shortStoryResult = data.result;

				teks += `❏ *Title* : ${shortStoryResult.title}\n`;
				teks += `❏ *Author* : ${shortStoryResult.author_name}\n`;
				teks += `❏ *Author URL* : (${shortStoryResult.author_url})\n`;
				teks += `❏ *Story* : ${shortStoryResult.story}\n`;

				setReply(teks);
			}
			break;
			case 'cerpenhoror': {
				let res = await fetch(`https://rzky.my.id/api/random/cerpen/horor?apikey=${global.apikey}`);
				let data = await res.json();

				let teks = `*CERPEN HOROR*\n\n`;

				let shortStoryResult = data.result;

				teks += `❏ *Title* : ${shortStoryResult.title}\n`;
				teks += `❏ *Author* : ${shortStoryResult.author_name}\n`;
				teks += `❏ *Author URL* : (${shortStoryResult.author_url})\n`;
				teks += `❏ *Story* : ${shortStoryResult.story}\n`;

				setReply(teks);
			}
			break;
			case 'cerpenlucu': {
				let res = await fetch(`https://rzky.my.id/api/random/cerpen/lucu?apikey=${global.apikey}`);
				let data = await res.json();

				let teks = `*CERPEN LUCU*\n\n`;

				let shortStoryResult = data.result;

				teks += `❏ *Title* : ${shortStoryResult.title}\n`;
				teks += `❏ *Author* : ${shortStoryResult.author_name}\n`;
				teks += `❏ *Author URL* : (${shortStoryResult.author_url})\n`;
				teks += `❏ *Story* : ${shortStoryResult.story}\n`;

				setReply(teks);
			}
			break;
			case 'cerpenjawa': {
				let res = await fetch(`https://rzky.my.id/api/random/cerpen/jawa?apikey=${global.apikey}`);
				let data = await res.json();

				let teks = `*CERPEN BAHASA JAWA*\n\n`;

				let shortStoryResult = data.result;

				teks += `❏ *Title* : ${shortStoryResult.title}\n`;
				teks += `❏ *Author* : ${shortStoryResult.author_name}\n`;
				teks += `❏ *Author URL* : (${shortStoryResult.author_url})\n`;
				teks += `❏ *Story* : ${shortStoryResult.story}\n`;

				setReply(teks);
			}
			break;
			case 'githubstalker':
				if (args.length == 0) return m.reply(`Example: ${prefix + command} Ikyy69`)
				m.reply(mess.wait)
				axios.get(`https://rzky.my.id/api/stalk/github?username=${args[0]}&apikey=${global.apikey}`)
					.then(({
						data
					}) => {
						var github = `Username : ${data.result.username}\n`
						github += `Name : ${data.result.name}\n`
						github += `Blog : ${data.result.blog}\n`
						github += `Company : ${data.result.company}\n`
						github += `Location : ${data.result.location}\n`
						github += `Bio : ${data.result.bio}\n`
						github += `Followers : ${data.result.followers}\n`
						github += `Following : ${data.result.following}\n`
						github += `Repostory : ${data.result.repository_count}\n`
						github += `Created : ${data.result.created_at}\n`
						github += `Update : ${data.result.update_at}`
						shizuka.sendMessage(m.chat, {
							text: github,
							contextInfo: {
								externalAdReply: {
									showAdAttribution: true,
									title: data.result.username,
									thumbnailUrl: data.result.profile_url,
									sourceUrl: '-',
									mediaType: 1,
									renderLargerThumbnail: true
								}
							}
						}, {
							quoted: rzky
						})
					})
					.catch(console.error)
				break
				case 'tiktokviews': {
				try {
					if (!args[0]) return conn.reply(m.chat, `Masukkan Url!\n\ncontoh:\n${usedPrefix + command} https://www.tiktok.com/@przxmamiellio/video/7331202523023346949`, m);
					setReply('Sedang diproses, mohon tunggu...');
					
					const apiEndpoint = `https://rzky.my.id/api/tools/tiktokviews?apikey=${global.apikey}&url=${args[0]}`;
					const get = await fetch(apiEndpoint);
					const js = await get.json();
				
					if (js.result) {
					  const {
						service,
						status,
						quantity,
						data
					  } = js.result;
				
					  if (js.result.msg === "Masih terdapat pesanan pending dengan target yang sama.") {
						setReply(`_*${js.result.msg}*_`);
					  } else {
						let message = `❏ Service : ${service}\n❏ Status : ${status}\n❏ Jumlah : ${quantity}\n❏ Data : ${data}\n`;
						await setReply(message);
					  }
					} else {
						setReply(`_*Tidak ada hasil atau terjadi kesalahan!*_`);
					}
				  } catch (e) {
					console.error(e);
					if (m.sender) {
					  setReply(`_*Terjadi kesalahan!*_`);
					}
				  }
				};
			break
			case 'npmstalker':
				if (!q) return setReply(`Example : ${prefix + command} zhirrr-api|zhirrr`)
				let [query, hostname] = q.split`|`
				axios.get(`https://rzky.my.id/api/stalk/npm?query=${query}&hostname=${hostname}&apikey=${global.apikey}`)
					.then(({
						data
					}) => {
						var npm = `ID : ${data.result._id}\n`
						npm += `Name : ${data.result.name}\n`
						npm += `Created : ${data.result.time.created}\n`
						npm += `Modified : ${data.result.time.modified}\n`
						npm += `Time : ${data.result.time.unpublished.time}`
						setReply(npm)
					})
					.catch(console.error)
				break
			case 'help':
			case 'menu':
				let ef = '```'
				let anu = `乂 𝗜 𝗡 𝗙 𝗢 - 𝗢 𝗪 𝗡 𝗘 𝗥

❏ ${ef}📛 Nama : ${global.ownername}
❏ 🆔 Nomor : @${global.owner} 
${ef}
乂 𝗟 𝗜 𝗦 𝗧 - 𝗠 𝗘 𝗡 𝗨

${ef}❏ ${prefix}downloadermenu${ef}
${ef}❏ ${prefix}searchmenu${ef}
${ef}❏ ${prefix}photooxymenu${ef}
${ef}❏ ${prefix}ephotomenu${ef}
${ef}❏ ${prefix}textpromenu${ef}
${ef}❏ ${prefix}stalkermenu${ef}
${ef}❏ ${prefix}makermenu${ef}
${ef}❏ ${prefix}animemenu${ef}
${ef}❏ ${prefix}cerpenmenu${ef}


\`\`\`©Powered by ${global.ownername}\`\`\``
				await shizuka.sendMessage(m.chat, {
					text: anu,
					contextInfo: {
						externalAdReply: {
							showAdAttribution: true,
							title: `${global.botname}`,
							thumbnailUrl: `${global.menu}`,
							sourceUrl: '-',
							mediaType: 1,
							renderLargerThumbnail: true
						}
					}
				}, {
					quoted: rzky
				})
				break
			case 'ssweb': {
				if (!q) return setReply("Masukan Link")
				if (!isUrl(args[0]) && !args[0].includes('www.')) return setReply(`Example: ${prefix + command} google.com `)
				let bufs = await getBuffer(`https://rzky.my.id/api/maker/ssweb?url=${q}&apikey=${global.apikey}`)
				shizuka.sendMessage(m.chat, {
					image: bufs,
					caption: `Made by ${global.botname}`
				}, {
					quoted: rzky
				}).catch((err) => setReply(mess.error))
			}
			break
			case 'meme': {
				if (!q) return setReply(`Example : ${prefix + command} Kyy|Gans`)
				let [text1, text2] = q.split`|`
				if (!/image/.test(mime)) return setReply(`*Send/Reply Image With Caption* ${prefix + command}`)
				let media = await shizuka.downloadAndSaveMediaMessage(quoted)
				let anu = await TelegraPh(media)
				let buf = await getBuffer(`https://rzky.my.id/api/maker/meme?text=${text1}&text2=${text2}&url=${anu}&apikey=${global.apikey}`)
				shizuka.sendMessage(m.chat, {
					image: buf,
					caption: `Made by ${global.botname}`
				}, {
					quoted: rzky
				}).catch((err) => setReply(mess.error))
			}
			break
			case 'tiktoksearch': {
				if (!text) return setReply(`Example: ${prefix + command} Cosplay`);
				try {
					const response = await axios.get(`https://rzky.my.id/api/search/tiktoksearch?query=${args[0]}&apikey=${global.apikey}`);
					const results = response.data.result;

					if (results.length > 0) {
						const tiktokUrl = results[Math.floor(Math.random() * results.length)];

						shizuka.sendMessage(m.chat, {
							video: {
								url: tiktokUrl
							},
							mimetype: 'video/mp4',
							fileName: `Tiktoks.mp4`,
							caption: 'Nih kak :D'
						}, {
							quoted: rzky
						});
					} else {
						setReply('No TikTok videos found for the given query.');
					}
				} catch (error) {
					console.error('Error fetching TikTok videos:', error);
					setReply('Error fetching TikTok videos. Please try again later.');
				}
				break;
			}
			case 'pinterest': {
				if (!text) return setReply(`Example: ${prefix + command} Cosplay`);

				try {
					const response = await axios.get(`https://rzky.my.id/api/search/pinterest?query=${args[0]}&apikey=${global.apikey}`);
					const results = response.data.result;

					if (results.length > 0) {
						const imageUrl = results[Math.floor(Math.random() * results.length)];

						shizuka.sendMessage(m.chat, {
							image: {
								url: imageUrl
							},
							caption: 'Here you go! :D'
						}, {
							quoted: rzky
						});
					} else {
						setReply('No images found for the given query.');
					}
				} catch (error) {
					console.error('Error fetching images:', error);
					setReply('Error fetching images. Please try again later.');
				}
				break;
			}
			case 'googlesearch': {
				if (!text) return setReply(`Example: ${prefix + command} Cosplay`);

				try {
					const response = await axios.get(`https://rzky.my.id/api/search/image?query=${args[0]}&apikey=${global.apikey}`);
					const results = response.data.result;

					if (results.length > 0) {
						const selectedResult = results[Math.floor(Math.random() * results.length)];

						shizuka.sendMessage(m.chat, {
							image: {
								url: selectedResult.url
							},
							caption: `❏ Title: ${selectedResult.title}\n❏ Size: ${selectedResult.size}\n❏ Width: ${selectedResult.width}\n❏ Height: ${selectedResult.height}`
						}, {
							quoted: rzky
						});
					} else {
						setReply('No images found for the given query.');
					}
				} catch (error) {
					console.error('Error fetching images:', error);
					setReply('Error fetching images. Please try again later.');
				}
				break;
			}
			case 'steam': {
				if (!text) return setReply(`Example: ${prefix + command} Grand Theft Auto V`);

				try {
					const response = await axios.get(`https://rzky.my.id/api/search/steam?query=${args[0]}&apikey=${global.apikey}`);
					const results = response.data.result;

					if (results.length > 0) {
						const selectedResult = results[Math.floor(Math.random() * results.length)];

						shizuka.sendMessage(m.chat, {
							image: {
								url: selectedResult.img
							},
							caption: `❏ Title: ${selectedResult.judul}\n❏ Release Date: ${selectedResult.rilis}\n❏ Price: ${selectedResult.harga}\n❏ Rating: ${selectedResult.rating}`
						}, {
							quoted: rzky
						});
					} else {
						setReply('No game information found for the given query.');
					}
				} catch (error) {
					console.error('Error fetching game information:', error);
					setReply('Error fetching game information. Please try again later.');
				}
				break;
			}
			case 'playstore': {
				if (!text) return setReply(`Example: ${prefix + command} PUBG MOBILE`);

				try {
					const response = await axios.get(`https://rzky.my.id/api/search/playstore?query=${args[0]}&apikey=${global.apikey}`);
					const results = response.data.result;

					if (results.length > 0) {
						let caption = '';

						for (const selectedResult of results) {
							caption += `❏ Nama: ${selectedResult.nama}\n❏ Developer: ${selectedResult.developer}\n❏ Rating: ${selectedResult.rate}\n❏ Download: ${selectedResult.link})\n❏ Developer's Apps: ${selectedResult.link_dev}\n\n`;
						}

						shizuka.sendMessage(m.chat, {
							image: {
								url: results[0].img
							},
							caption: caption
						}, {
							quoted: rzky
						});
					} else {
						setReply('No app information found for the given query.');
					}
				} catch (error) {
					console.error('Error fetching app information:', error);
					setReply('Error fetching app information. Please try again later.');
				}
				break;
			}
			case 'musixmatch': {
				if (!text) return setReply(`Example: ${prefix + command} Senja`);

				try {
					const response = await axios.get(`https://rzky.my.id/api/search/musixmatch?query=${args[0]}&apikey=${global.apikey}`);
					const result = response.data.result;

					if (result) {
						shizuka.sendMessage(m.chat, {
							caption: `❏ Title: ${result.title}\n❏ Listen: ${result.url}\n\n${result.lyrics}`,
							image: {
								url: result.thumb
							}
						}, {
							quoted: rzky
						});
					} else {
						setReply('No music information found for the given query.');
					}
				} catch (error) {
					console.error('Error fetching music information:', error);
					setReply('Error fetching music information. Please try again later.');
				}
				break;
			}
			case 'cersex': {
				if (!text) return setReply(`Example: ${prefix + command} kakak tiri`);

				try {
					const response = await axios.get(`https://rzky.my.id/api/search/cersex?query=${args[0]}&apikey=${global.apikey}`);
					const result = response.data.result;

					if (result) {
						shizuka.sendMessage(m.chat, {
							caption: `❏ Title: ${result.title}\n❏ Author: ${result.author}\n❏ Published: ${result.published}\n❏ Description: ${result.description}\n❏ Url: ${result.url}\n❏ Story: ${result.story}`,
							image: {
								url: result.thumbnail
							}
						}, {
							quoted: rzky
						});
					} else {
						setReply('No music information found for the given query.');
					}
				} catch (error) {
					console.error('Error fetching cersex information:', error);
					setReply('Error fetching cersex information. Please try again later.');
				}
				break;
			}
			case 'sfilesearch': {
				if (!text) return setReply(`Example: ${prefix + command} Whatsapp`);

				try {
					const response = await axios.get(`https://rzky.my.id/api/search/sfile?query=${args[0]}&apikey=${global.apikey}`);
					const results = response.data.result;

					if (results.length > 0) {
						let caption = '';

						for (const selectedResult of results) {
							caption += `❏ Title: ${selectedResult.title}\n❏ URL: ${selectedResult.url}\n❏ Size: ${selectedResult.size}\n\n`;
						}

						shizuka.sendMessage(m.chat, {
							text: caption
						}, {
							quoted: rzky
						});
					} else {
						setReply('No music information found for the given query.');
					}
				} catch (error) {
					console.error('Error fetching sfile information:', error);
					setReply('Error fetching sfile information. Please try again later.');
				}
				break;
			}
			case 'xnxx': {
				if (!text) return setReply(`Example: ${prefix + command} Moms`);

				try {
					const response = await axios.get(`https://rzky.my.id/api/search/xnxx?query=${text}&apikey=${global.apikey}`);
					const results = response.data.result;

					if (results.length > 0) {
						let caption = '';

						for (const selectedResult of results) {
							caption += `❏ Nama: ${selectedResult.title}\n❏ Views: ${selectedResult.views}\n❏ Quality: ${selectedResult.quality}\n❏ Duration: ${selectedResult.duration}\n❏ Link: ${selectedResult.link}\n\n`;
						}

						shizuka.sendMessage(m.chat, {
							text: caption
						}, {
							quoted: rzky
						});
					} else {
						setReply('No result information found for the given query.');
					}
				} catch (error) {
					console.error('Error fetching xnxx information:', error);
					setReply('Error fetching result information. Please try again later.');
				}
				break;
			}
			case 'xvideos': {
				if (!text) return setReply(`Example: ${prefix + command} Moms`);

				try {
					const response = await axios.get(`https://rzky.my.id/api/search/xvideos?query=${text}&apikey=${global.apikey}`);
					const results = response.data.result;

					if (results.length > 0) {
						let caption = '';

						for (const selectedResult of results) {
							caption += `❏ Nama: ${selectedResult.title}\n❏ Image: ${selectedResult.thumb}\n❏ Quality: ${selectedResult.quality}\n❏ Duration: ${selectedResult.duration}\n❏ Link: ${selectedResult.url}\n\n`;
						}

						shizuka.sendMessage(m.chat, {
							text: caption
						}, {
							quoted: rzky
						});
					} else {
						setReply('No result information found for the given query.');
					}
				} catch (error) {
					console.error('Error fetching music information:', error);
					setReply('Error fetching result information. Please try again later.');
				}
				break;
			}
			case 'stickersearch': {
				if (!text) return setReply(`Example: ${prefix + command} patrick`);

				try {
					const response = await axios.get(`https://rzky.my.id/api/search/sticker?query=${text}&apikey=${global.apikey}`);
					const results = response.data.result;

					if (results.length > 0) {
						let caption = '';

						for (const selectedResult of results) {
							caption += `❏ Nama: ${selectedResult.name}\n❏ Image: ${selectedResult.url}\n❏ Creator: ${selectedResult.creator}\n\n`;
						}

						shizuka.sendMessage(m.chat, {
							text: caption
						}, {
							quoted: rzky
						});
					} else {
						setReply('No result information found for the given query.');
					}
				} catch (error) {
					console.error('Error fetching sticker information:', error);
					setReply('Error fetching result information. Please try again later.');
				}
				break;
			}
			case 'stickersearch': {
				if (!text) return setReply(`Example: ${prefix + command} patrick`);

				try {
					const response = await axios.get(`https://rzky.my.id/api/search/sticker?query=${text}&apikey=${global.apikey}`);
					const results = response.data.result;

					if (results.length > 0) {
						let caption = '';

						for (const selectedResult of results) {
							caption += `❏ Nama: ${selectedResult.name}\n❏ Image: ${selectedResult.url}\n❏ Creator: ${selectedResult.creator}\n\n`;
						}

						shizuka.sendMessage(m.chat, {
							text: caption
						}, {
							quoted: rzky
						});
					} else {
						setReply('No result information found for the given query.');
					}
				} catch (error) {
					console.error('Error fetching sticker information:', error);
					setReply('Error fetching result information. Please try again later.');
				}
				break;
			}

			case 'wattpadsearch': {
				if (!text) return setReply(`Example: ${prefix + command} patrick`);

				try {
					const response = await axios.get(`https://rzky.my.id/api/search/wattpad?query=${text}&apikey=${global.apikey}`);
					const results = response.data.result.data;

					if (results.length > 0) {
						let caption = '';

						for (const selectedResult of results) {
							caption += `❏ Creator: ${selectedResult.user.name}\n❏ Title: ${selectedResult.title}\n❏ Cover: ${selectedResult.cover}\n❏ Url: ${selectedResult.url}\n\n`;
						}

						shizuka.sendMessage(m.chat, {
							image: {
								url: results[0].cover
							},
							caption: caption
						}, {
							quoted: rzky
						});
					} else {
						setReply('No result information found for the given query.');
					}
				} catch (error) {
					console.error('Error fetching sticker information:', error);
					setReply('Error fetching result information. Please try again later.');
				}
				break;
			}
			case 'recipes': {
				if (!text) return setReply(`Example: ${prefix + command} Telur`);
				try {
					const response = await axios.get(`https://rzky.my.id/api/search/recipes?query=${text}&apikey=${global.apikey}`);
					const result = response.data.result;

					if (result) {
						shizuka.sendMessage(m.chat, {
							caption: `❏ Title: ${result.title}\n❏ Cooking Time: ${result.timer}\n❏ Portion: ${result.portion}\n❏ Level: ${result.level}\n\n❏ Ingredients:\n${result.ingredient}\n\n❏ Steps:\n${result.step}`,
							image: {
								url: result.thumbnail
							}
						}, {
							quoted: rzky
						});
					} else {
						setReply('No recipe information found for the given query.');
					}
				} catch (error) {
					console.error('Error fetching recipe information:', error);
					setReply('Error fetching recipe information. Please try again later.');
				}
				break;
			}
			case 'apkmirror': {
				if (!text) return setReply(`Example: ${prefix + command} WhatsApp Messenger`);

				try {
					const response = await axios.get(`https://rzky.my.id/api/search/apkmirror?query=${args[0]}&apikey=${global.apikey}`);
					const results = response.data.result;

					if (results.length > 0) {
						let message = '';

						for (const appVersion of results) {
							message += `❏ Title: ${appVersion.title}\n❏ Developer: ${appVersion.developer}\n❏ Version: ${appVersion.version}\n❏ Updated: ${appVersion.updated}\n❏ Downloads: ${appVersion.downloadCount}\n❏ Size: ${appVersion.size}\n❏ Download: ${appVersion.url}\n\n`;
						}

						shizuka.sendMessage(m.chat, {
							text: message
						}, {
							quoted: rzky
						});
					} else {
						setReply('No app version information found for the given query.');
					}
				} catch (error) {
					console.error('Error fetching app version information:', error);
					setReply('Error fetching app version information. Please try again later.');
				}
				break;
			}
			case 'scsearch': {
				if (!text) return setReply(`Example: ${prefix + command} Nanti Kita Seperti Ini`);

				try {
					const response = await axios.get(`https://rzky.my.id/api/search/scsearch?query=${args[0]}&apikey=${global.apikey}`);
					const results = response.data.result;

					if (results.length > 0) {
						let caption = '';

						for (const selectedResult of results) {
							caption += `❏ Judul: ${selectedResult.judul}\n❏ Listen: ${selectedResult.link}\n\n`;
						}

						shizuka.sendMessage(m.chat, {
							text: caption
						}, {
							quoted: rzky
						});
					} else {
						setReply('No music information found for the given query.');
					}
				} catch (error) {
					console.error('Error fetching music information:', error);
					setReply('Error fetching music information. Please try again later.');
				}
				break;
			}
			case 'ephotomenu':
				let ephotos = `乂 𝗘 𝗣 𝗛 𝗢 𝗧 𝗢 - 𝗠 𝗘 𝗡 𝗨
                
❏ ${prefix}television
❏ ${prefix}glasses
❏ ${prefix}blackpink2
❏ ${prefix}neonbp
❏ ${prefix}coverpubg
❏ ${prefix}greenbrush
❏ ${prefix}neonblue
❏ ${prefix}eraser
❏ ${prefix}dragonfire
❏ ${prefix}incandescent
❏ ${prefix}typography
❏ ${prefix}letters
❏ ${prefix}cloth
❏ ${prefix}graffiti
❏ ${prefix}metals
❏ ${prefix}typography2
❏ ${prefix}nightstars
❏ ${prefix}cloud
❏ ${prefix}caper
❏ ${prefix}horror
❏ ${prefix}sunlight
❏ ${prefix}cake
❏ ${prefix}pig
❏ ${prefix}hallowen
❏ ${prefix}leafgraphy
❏ ${prefix}crank
❏ ${prefix}puppy
❏ ${prefix}pubgavatar
❏ ${prefix}foggy
❏ ${prefix}tiger
❏ ${prefix}american
❏ ${prefix}arrow
❏ ${prefix}arrow2
❏ ${prefix}anonymous
❏ ${prefix}aov
❏ ${prefix}valorant
❏ ${prefix}warface
❏ ${prefix}ml
❏ ${prefix}freefire
❏ ${prefix}freefire2
❏ ${prefix}notebook
❏ ${prefix}wood
❏ ${prefix}quotestatus
❏ ${prefix}writestatus
❏ ${prefix}heated
❏ ${prefix}buoys
❏ ${prefix}heated
❏ ${prefix}pencil
❏ ${prefix}onepiece
❏ ${prefix}dota
❏ ${prefix}anime
`
				await shizuka.sendMessage(m.chat, {
					text: ephotos,
					contextInfo: {
						externalAdReply: {
							showAdAttribution: true,
							title: 'EPHOTO MENU',
							body: `Base by Rizkymaulana`,
							thumbnailUrl: `${global.fotoRandom}`,
							sourceUrl: '-',
							mediaType: 1,
							renderLargerThumbnail: true
						}
					}
				}, {
					quoted: rzky
				})

				break
			case 'photooxymenu':
				let photooxy = `乂 𝗣 𝗛 𝗢 𝗧 𝗢 𝗢 𝗫 𝗬 - 𝗠 𝗘 𝗡 𝗨
        
❏ ${prefix}coffee 
❏ ${prefix}quotewood 
❏ ${prefix}flaming 
❏ ${prefix}oceansea 
❏ ${prefix}shadow 
❏ ${prefix}rainbow 
❏ ${prefix}gravity 
❏ ${prefix}burnpaper 
❏ ${prefix}smoke 
❏ ${prefix}romantic 
❏ ${prefix}lovemessage 
❏ ${prefix}grass 
❏ ${prefix}doubleheart 
❏ ${prefix}coffecup 
❏ ${prefix}lovetext 
❏ ${prefix}butterfly 
❏ ${prefix}slidetext
❏ ${prefix}pubg
❏ ${prefix}glitch
`
				await shizuka.sendMessage(m.chat, {
					text: photooxy,
					contextInfo: {
						externalAdReply: {
							showAdAttribution: true,
							title: 'PHOTOOEXY MENU',
							body: `Base by Rizkymaulana`,
							thumbnailUrl: `${global.fotoRandom}`,
							sourceUrl: '-',
							mediaType: 1,
							renderLargerThumbnail: true
						}
					}
				}, {
					quoted: rzky
				})
				break
			case 'textpromenu':
				let textpro = `乂 𝗧 𝗘 𝗫 𝗧 𝗣 𝗥 𝗢 - 𝗠 𝗘 𝗡 𝗨
        
❏ ${prefix}paper
❏ ${prefix}embossed
❏ ${prefix}broken
❏ ${prefix}blackpink
❏ ${prefix}carbon
❏ ${prefix}gradient
❏ ${prefix}glue
❏ ${prefix}neon
❏ ${prefix}blood
❏ ${prefix}firework
❏ ${prefix}dropwater
❏ ${prefix}imglitch
❏ ${prefix}glossy
❏ ${prefix}bear
❏ ${prefix}devil
❏ ${prefix}christmas
❏ ${prefix}magma
❏ ${prefix}stone
❏ ${prefix}light
❏ ${prefix}berry
❏ ${prefix}transformer
❏ ${prefix}fiction
❏ ${prefix}greenhorror
❏ ${prefix}metallic
❏ ${prefix}discovery
❏ ${prefix}circuit
❏ ${prefix}sketch
❏ ${prefix}choror
❏ ${prefix}skeleton
❏ ${prefix}pornhub
❏ ${prefix}layered
❏ ${prefix}captainamerica
❏ ${prefix}spooky
`
				await shizuka.sendMessage(m.chat, {
					text: textpro,
					contextInfo: {
						externalAdReply: {
							showAdAttribution: true,
							title: 'DOWNLOADER MENU',
							body: `Base by Rizkymaulana`,
							thumbnailUrl: `${global.fotoRandom}`,
							sourceUrl: '-',
							mediaType: 1,
							renderLargerThumbnail: true
						}
					}
				}, {
					quoted: rzky
				})
				break

			case 'downloadermenu':
				let downloadc = `乂 𝗗 𝗢 𝗪 𝗡 𝗟 𝗢 𝗔 𝗗 𝗘 𝗥 - 𝗠 𝗘 𝗡 𝗨

❏ ${prefix}tiktokaudio
❏ ${prefix}tiktok
❏ ${prefix}ytmp4
❏ ${prefix}ytmp3
❏ ${prefix}play
❏ ${prefix}douyin
❏ ${prefix}likedown
❏ ${prefix}fbdown
❏ ${prefix}cocofun
`
				await shizuka.sendMessage(m.chat, {
					text: downloadc,
					contextInfo: {
						externalAdReply: {
							showAdAttribution: true,
							title: 'DOWNLOADER MENU',
							body: `Base by Rizkymaulana`,
							thumbnailUrl: `${global.fotoRandom}`,
							sourceUrl: '-',
							mediaType: 1,
							renderLargerThumbnail: true
						}
					}
				}, {
					quoted: rzky
				})
				break
			case 'stalkermenu':
				let stalkers = `乂 𝗦 𝗧 𝗔 𝗟 𝗞 𝗘 𝗥 - 𝗠 𝗘 𝗡 𝗨

❏ ${prefix}githubstalker
❏ ${prefix}npmstalker
`
				await shizuka.sendMessage(m.chat, {
					text: stalkers,
					contextInfo: {
						externalAdReply: {
							showAdAttribution: true,
							title: 'STALKER MENU',
							body: `Base by Rizkymaulana`,
							thumbnailUrl: `${global.fotoRandom}`,
							sourceUrl: '-',
							mediaType: 1,
							renderLargerThumbnail: true
						}
					}
				}, {
					quoted: rzky
				})
				break
			case 'animemenu':
				let animemenu = `乂 𝗔 𝗡 𝗜 𝗠 𝗘 - 𝗠 𝗘 𝗡 𝗨

❏ ${prefix}nekopoilatest
❏ ${prefix}nekopoisearch
❏ ${prefix}nekopoidetail 
❏ ${prefix}komikulatest
❏ ${prefix}komikusearch
❏ ${prefix}komikudetail
❏ ${prefix}quotesanime
❏ ${prefix}loli
❏ ${prefix}waifu
❏ ${prefix}husbu
`
				await shizuka.sendMessage(m.chat, {
					text: animemenu,
					contextInfo: {
						externalAdReply: {
							showAdAttribution: true,
							title: 'ANIME MENU',
							body: `Base by Rizkymaulana`,
							thumbnailUrl: `${global.fotoRandom}`,
							sourceUrl: '-',
							mediaType: 1,
							renderLargerThumbnail: true
						}
					}
				}, {
					quoted: rzky
				})
				break
			case 'cerpenmenu':
				let cerpenmenu = `乂 𝗖 𝗘 𝗥 𝗣 𝗘 𝗡 - 𝗠 𝗘 𝗡 𝗨

❏ ${prefix}cerpencinta
❏ ${prefix}cerpensahabat
❏ ${prefix}cerpenperjuangan
❏ ${prefix}cerpenhoror
❏ ${prefix}cerpenlucu
❏ ${prefix}cerpenjawa
`
				await shizuka.sendMessage(m.chat, {
					text: cerpenmenu,
					contextInfo: {
						externalAdReply: {
							showAdAttribution: true,
							title: 'CERPEN MENU',
							body: `Base by Rizkymaulana`,
							thumbnailUrl: `${global.fotoRandom}`,
							sourceUrl: '-',
							mediaType: 1,
							renderLargerThumbnail: true
						}
					}
				}, {
					quoted: rzky
				})
				break
			case 'searchmenu':
				let searchmenu = `乂 𝗦 𝗘 𝗔 𝗥 𝗖 𝗛 - 𝗠 𝗘 𝗡 𝗨

❏ ${prefix}sfilesearch
❏ ${prefix}musixmatch 
❏ ${prefix}scsearch  
❏ ${prefix}playstore  
❏ ${prefix}steam  
❏ ${prefix}googlesearch  
❏ ${prefix}tiktoksearch   
❏ ${prefix}apkmirror    
❏ ${prefix}recipes    
❏ ${prefix}xnxx    
❏ ${prefix}xvideos    
❏ ${prefix}cersex   
❏ ${prefix}wattpadsearch    
❏ ${prefix}stickersearch    
`
				await shizuka.sendMessage(m.chat, {
					text: searchmenu,
					contextInfo: {
						externalAdReply: {
							showAdAttribution: true,
							title: 'SEARCH MENU',
							body: `Base by Rizkymaulana`,
							thumbnailUrl: `${global.fotoRandom}`,
							sourceUrl: '-',
							mediaType: 1,
							renderLargerThumbnail: true
						}
					}
				}, {
					quoted: rzky
				})
				break
			case 'makermenu':
				let maker = `乂 𝗠 𝗔 𝗞 𝗘 𝗥 - 𝗠 𝗘 𝗡 𝗨

❏ ${prefix}smeme
❏ ${prefix}ssweb
`
				await shizuka.sendMessage(m.chat, {
					text: maker,
					contextInfo: {
						externalAdReply: {
							showAdAttribution: true,
							title: 'MAKER MENU',
							body: `Base by Rizkymaulana`,
							thumbnailUrl: `${global.fotoRandom}`,
							sourceUrl: '-',
							mediaType: 1,
							renderLargerThumbnail: true
						}
					}
				}, {
					quoted: rzky
				})
				break

			default:

				if (isCmd && budy.toLowerCase() != undefined) {
					if (m.chat.endsWith('broadcast')) return
					if (m.isBaileys) return
					let msgs = global.db.data.database
					if (!(budy.toLowerCase() in msgs)) return
					shizuka.copyNForward(m.chat, msgs[budy.toLowerCase()], true)
				}
		}


	} catch (err) {
		m.reply(util.format(err))
	}
}


let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.bgGreen(color("[  UPDATE ]", "black")), chalk.white(`${__filename}`))
	delete require.cache[file]
	require(file)
})
