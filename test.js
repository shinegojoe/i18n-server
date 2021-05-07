// import axios from 'axios'
var axios = require('axios')


const url = 'http://203.204.160.248:5001'
const xx = axios.get(url)
xx.then(()=> {
  console.log('test done')
}).catch((e)=> {
  console.log('e', e)
})

