import User from "./UserDB.js";
import mongooseDbConnect from "../config/dbConnect.js";

mongooseDbConnect();

var users = [
  {
    id: 1,
    email: "jane@oneMail.com",
    name: "Jane",
    password: "$2b$10$B3ixQFc4o28LYsbuHjgftO138kI.g92uvmzYwnUt0qWGzpMWimtXu", // Jane123
    roles: { User: 2001, Editor: 1984, Admin: 5150 },
    refreshToken:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImphbmVAb25lTWFpbC5jb20iLCJpYXQiOjE2Nzk4NDM5NjcsImV4cCI6MTY3OTg0NTE2N30.mfR10zbLdP-VNf114ym5T4k7vvv5cDEDwzs3IMlB6ZY",
  },
  {
    id: 2,
    email: "harry@twoMail.com",
    name: "Harry",
    password: "$2b$10$ljWMwr5zPzh/Ryv4KuUj9uM7SPrX.iIf3WdoTdaSHOPo/C4n4EKU6", // Harry123
    roles: { User: 2001 },
    refreshToken:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhhcnJ5QHR3b01haWwuY29tIiwiaWF0IjoxNjc5ODM4NzI3LCJleHAiOjE2Nzk4Mzk5Mjd9.mHHv3HovevdyOAVePOsS5XCvYOWPbNr2IUwI633sykU",
  },
  {
    id: 3,
    email: "susan@oneMail.com",
    name: "Susan",
    password: "$2b$10$MwVTUtW92afJ6Cgbf2lTw.k6K76j0bSyzJWRQajD4y2Zx0lzr2l7i", // Susan123
    roles: { User: 2001, Editor: 1984 },
    refreshToken:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN1c2FuQG9uZU1haWwuY29tIiwiaWF0IjoxNjc5ODM4ODgxLCJleHAiOjE2Nzk4NDAwODF9.ZwfQezARdef5c0QMabx-OZSRXFjagr3FrW8sTYWhfC0",
  },
];

//console.log(JSON.stringify(posts));
User.insertMany(users)
  .then(function (docs) {
    console.log("Successfully insert to DB");
    docs.forEach((e) => console.log(JSON.stringify(e, null, "\t")));
    console.log("done!!");
    process.kill(process.pid, "SIGINT");
  })
  .catch(function (err) {
    console.log(err);
  });
