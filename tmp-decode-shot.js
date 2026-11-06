const fs = require("fs");
const j = JSON.parse(
  fs.readFileSync(
    "C:\\Users\\cleme\\.cursor\\browser-logs\\cdp-response-Page.captureScreenshot-2026-11-06T05-18-05-113Z.json",
    "utf8",
  ),
);
const data = j.data || j.result?.data;
if (!data) {
  console.log(Object.keys(j));
  process.exit(1);
}
fs.writeFileSync(
  "C:\\Users\\cleme\\AppData\\Local\\Temp\\cursor\\screenshots\\subhead-crop.png",
  Buffer.from(data, "base64"),
);
console.log("wrote", data.length);
