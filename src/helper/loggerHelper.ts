const winston = require('winston')
const date = new Date()

const x = date.toLocaleTimeString().split(' ')
let y: any = date.toLocaleDateString()
y = y.replace(new RegExp('-',"gm"), "_")
console.log(y)

const fileName = `${y}_${x[0]}`
// console.log(fileName)

const fileLogger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: `log/${fileName}.log` })
  ]
})


export { fileLogger }