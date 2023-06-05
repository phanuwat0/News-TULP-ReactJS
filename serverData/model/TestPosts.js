import Post from "./PostDB.js";
import mongooseDbConnect from "../config/dbConnect.js";

mongooseDbConnect();

var posts = [
  {
    name: 'ออกแบบโปสเตอร์โครงการ "ปอดภัยไร้ควัน"',
    img: "https://media.discordapp.net/attachments/1075084713854783568/1098981328751448115/IMG_6674.jpg?width=676&height=676",
    category: "กิจกรรม",
    details:
      "โปสเตอร์เป็นสื่อที่สร้างความตื่นเต้นและแสดงความหมายของเหตุการณ์หรือสิ่งที่ต้องการสื่อสารให้กับผู้ชม และโปสเตอร์ที่ดีจะช่วยเพิ่มความน่าสนใจและเข้าใจในข้อมูล",
    data: "20-05-04",
    time: "00:00",
    faculty: "law",
    id: "1000",
    link: "https://docs.google.com/forms/",
    liked: false,
  },
  {
    name: "Fullmoon Party",
    img: "https://media.discordapp.net/attachments/1075084713854783568/1098981512306765835/A86CEEB7-AACD-4CE9-9E87-60FB6601B4AA.jpg?width=676&height=676",
    category: "กิจกรรม",
    details:
      "การจัดงาน Fullmoon Party เล็ก ๆ น้อย ๆ ขึ้นมาเพื่อเป็นการสร้างสรรค์ประสบการณ์ใหม่",
    data: "20-05-04",
    time: "00:00",
    faculty: "all",
    id: "1001",
    link: false,
    liked: false,
  },
  {
    name: "การเลือกตั้งผ่านระบบออนไลน์",
    img: "https://media.discordapp.net/attachments/1075084713854783568/1098981588496298065/D9DE18F1-762E-42BF-B4C5-FBE1AAC808A1.jpg?width=676&height=676",
    category: "กิจกรรม",
    details:
      "การเลือกตั้งผ่านระบบออนไลน์เป็นหัวข้อที่น่าสนใจในปัจจุบัน อย่าลืมเลือกตั้งกันนะคะ",
    date: "20-05-04",
    time: "00:00",
    faculty: "public",
    id: "1002",
    link: false,
    liked: false,
  },
  {
    name: "กีฬามหาสนุกวันแรงงานต้านยาเสพติด",
    img: "https://media.discordapp.net/attachments/1075084713854783568/1098981670876631110/F869CF5C-FEC2-4E82-A56F-80BB585E1DE0.jpg?width=469&height=676",
    category: "กิจกรรม",
    details:
      "กีฬามหาสนุกวันแรงงานต้านยาเสพติด เป็นกิจกรรมที่มีการจัดขึ้นเพื่อสร้างการตระหนักในการต้านยาเสพติด",
    date: "20-05-04",
    time: "00:00",
    faculty: "college",
    id: "1003",
    link: false,
    liked: false,
  },
];

//console.log(JSON.stringify(posts));
Post.insertMany(posts)
  .then(function (docs) {
    console.log("Successfully insert to DB");
    docs.forEach((e) => console.log(JSON.stringify(e, null, "\t")));
    console.log("done!!");
    process.kill(process.pid, "SIGINT");
  })
  .catch(function (err) {
    console.log(err);
  });
