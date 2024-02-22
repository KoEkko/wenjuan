const test = require("./test");
const quesion = require("./question");
const user = require("./user")
const stat = require("./stat")
const answer = require("./answer")
const MockList = [
  ...test,
  ...quesion,
  ...user,
  ...stat,
  ...answer
]

module.exports = MockList