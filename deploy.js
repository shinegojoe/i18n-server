var path = require('path')
const dotenv = require('dotenv')
var axios = require('axios')
const params = dotenv.config({ path: path.resolve(__dirname, `production.env`) }).parsed
console.log(params)
const url = `http://${params.HOST}:${params.PORT}/api/ttt`





var fs = require('fs');
fs.readFile( __dirname + '/dist.tar', function (err, data) {
  if (err) {
    throw err; 
  }
  console.log(data)
  const s = data.toString()

  // const url = 'http://203.204.160.248:5000/api/ttt'
  const xx = axios.post(url, {data: s})
  xx.then(()=> {
    console.log('test done')
  }).catch((e)=> {
    console.log('e')
  })
});

