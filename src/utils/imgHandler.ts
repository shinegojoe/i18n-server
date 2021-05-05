import fs from 'fs'

const uploadFolder = process.env['UPLOAD_FOLDER']

const saveBase64 = (img64Data: string, itemId: number, name: string): Promise<string> => {
  const base64Image = img64Data.split(';base64,').pop() as string
  const p = new Promise<string>((resolve, reject)=> {
    const imgName = `${itemId}${Math.floor(Math.random()* 999)}_${name}`
    const imgPath = `${uploadFolder}/${imgName}`
    fs.writeFile(imgPath, base64Image, {encoding: 'base64'}, function(err) {
      // console.log('File created')
      resolve(imgName)
    })
  })
  return p
}

export { saveBase64 }