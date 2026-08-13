let files = FileManager.local()
const iCloudInUse = files.isFileStoredIniCloud(module.filename)

files = iCloudInUse ? FileManager.iCloud() : files

const pathCrypto = files.joinPath(files.documentsDirectory(),"crypto.js")

if (!files.fileExists(pathCrypto)) {
  
  const req = new Request("https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.2.0/crypto-js.min.js")
  const codeString = await req.loadString()
  files.writeString(pathCrypto, codeString)

}

const CryptoJS = importModule("crypto")


const pageReq = new Request("https://ytsave.to/vi2/");
const page = await pageReq.loadString();

// lấy ch
const chMatch = page.match(/data-ch="([^"]+)"/);
const ch = chMatch?.[1];

// lấy url sensor.js
const jsMatch = page.match(/src="([^"]*sensor\.js[^"]*)"/);
const jsUrl = jsMatch?.[1];

const js = await new Request(jsUrl).loadString();

// lấy key
const keyMatch = js.match(/K\s*=\s*['"]([a-f0-9]{32})['"]/i);
const key = keyMatch?.[1];

const answer = CryptoJS.HmacSHA256(ch, key).toString(CryptoJS.enc.Hex).substring(0, 32);

const req = new Request("https://ytsave.to/mint.php");

req.method = "POST";

req.headers = {
  "Content-Type": "application/x-www-form-urlencoded",
  "X-Requested-With": "XMLHttpRequest",
  "origin": "https://ytsave.to"
};

req.body =
  "ch=" + encodeURIComponent(ch) +
  "&answer=" + encodeURIComponent(answer);

const result = await req.loadJSON();

if (files.fileExists(pathCrypto)) {
  files.remove(pathCrypto);
}

Script.setShortcutOutput(result)
Script.complete()
