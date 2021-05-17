var path = require('path')
const dotenv = require('dotenv')
var axios = require('axios')
var fs = require('fs');

const params = dotenv.config({ path: path.resolve(__dirname, `production.env`) }).parsed
// const params = dotenv.config({ path: path.resolve(__dirname, `development.env`) }).parsed

// console.log(params)


const deployServer = () => {
  // const url = `http://${params.HOST}:${params.PORT}/api/deploy`
  const url = `http://203.204.160.248:3002/api/deployServer`

  // 
  fs.readFile( __dirname + '/dist.tar.gz', function (err, data) {
    if (err) {
      throw err; 
    }
    // console.log(data)
    const dataString = data.toString('binary')
  
    // const deploy = axios.post(url, {data: dataString})
    const deploy = axios({
      method: 'POST',
      url: url,
      data: {data: dataString},
      params: { name: 'i18n-server' }
    })

    deploy.then(()=> {
      console.log('deploy done')
    }).catch((e)=> {
      console.log('e')
    })
  });
}

deployServer()

