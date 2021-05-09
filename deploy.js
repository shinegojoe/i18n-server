var path = require('path')
const dotenv = require('dotenv')
var axios = require('axios')
var fs = require('fs');

const params = dotenv.config({ path: path.resolve(__dirname, `production.env`) }).parsed
// console.log(params)
const url = `http://${params.HOST}:${params.PORT}/api/ttt`
// 
fs.readFile( __dirname + '/dist.tar', function (err, data) {
  if (err) {
    throw err; 
  }
  // console.log(data)
  const dataString = data.toString()

  const deploy = axios.post(url, {data: dataString})
  deploy.then(()=> {
    console.log('deploy done')
  }).catch((e)=> {
    console.log('e')
  })
});

