const { icon_music, icon_video, icon_image, url } = args.shortcutParameter;

const req = new Request("https://snapvideotools.com/vi/api/snap");
req.method = "POST";
req.headers = { "Content-Type": "application/json" };
req.body = JSON.stringify({ text: url });

const data = await req.loadJSON();

if (data.code) {
  Script.setShortcutOutput(data);
  Script.complete();
  return;
}

const template = `BEGIN:VCARD
VERSION:3.0
EMAIL:{type}
N:{name};;;;
URL:{url}
PHOTO;ENCODING=b:{image}
END:VCARD`;

const fill = (d) =>
  template.replace(/\{(\w+)\}/g, (_, k) => d[k] ?? "");

const icons = { video: icon_video, audio: icon_music, image: icon_image };
const TYPES = ["video", "audio", "image"];

const fmtSize = (b) => {
  if (!b) return "";
  const mb = b / 1048576;
  return mb >= 1 ? `${mb.toFixed(1)}MB` : `${(b / 1024).toFixed(0)}KB`;
};

// Đuôi file thật: ưu tiên mime trong URL, fallback suffix
const realExt = (m) => {
  const mime = decodeURIComponent(m.url.match(/[?&]mime=([^&]+)/)?.[1] ?? "");
  if (mime === "audio/mp4") return "m4a";
  if (mime === "audio/webm") return "webm";
  if (mime === "video/mp4") return "mp4";
  if (mime === "video/webm") return "webm";
  return (m.suffix ?? "").toLowerCase();
};

const isPlaylist = (u) => /\.m3u8|\/manifest\//i.test(u);
const isStoryboard = (m) => m.type === "audio" && (m.width || m.height);

const medias = data.data;

const result = {
  title: medias.title ?? "",
  originalUrl: medias.orignalUrl ?? "",
  cover: medias.cover ?? "",
  platform: medias.platform ?? medias.platformKey ?? "",
  select: [],
  video: [],
  audio: [],
  image: "",
};

// Gom + lọc
const groups = { video: [], audio: [], image: [] };
for (const m of medias.mediaUrls ?? []) {
  if (!m.url || isPlaylist(m.url) || isStoryboard(m)) continue;
  const t = (m.type || "").toLowerCase();
  if (!groups[t]) continue;
  // Bỏ webm (iOS không phát), giữ mp4/m4a
  if (t !== "image" && realExt(m) === "webm") continue;
  groups[t].push(m);
}

// Khử trùng: video theo height, audio theo size
const dedupe = (list, keyFn) => {
  const seen = new Set();
  return list.filter((m) => {
    const k = keyFn(m);
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
};
groups.video = dedupe(groups.video, (m) => m.height ?? m.url);
groups.audio = dedupe(groups.audio, (m) => m.sizeBytes ?? m.url);

const itemName = (type, m, i) => {
  const parts = [type];
  if (type === "video") parts.push(m.height ? `${m.height}P` : `${i + 1}`);
  else parts.push(realExt(m) || `${i + 1}`);
  const s = fmtSize(m.sizeBytes);
  if (s) parts.push(s);
  return parts.join(" ").toUpperCase();
};

for (const type of TYPES) {
  const list = groups[type];
  if (!list.length) continue;

  result.select.push(
    fill({
      type,
      name: `${type} (${list.length})`.toUpperCase(),
      url: medias.orignalUrl ?? "",
      image: icons[type],
    })
  );

  if (type === "image") {
    result.image = list.map((m) => `<img src="${m.url}">`).join("\n");
    continue;
  }

  result[type] = list.map((m, i) =>
    fill({
      type,
      name: itemName(type, m, i),
      url: m.url,
      image: icons[type],
    })
  );
}

Script.setShortcutOutput(result);
Script.complete();
