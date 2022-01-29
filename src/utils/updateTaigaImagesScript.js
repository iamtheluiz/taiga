const fs = require('fs')
const path = require('path')

const assetsFolder = fs.readdirSync(path.join(__dirname, '..', 'assets'))
let fileString = 'export const taigaImages: any = {\n'

for (let index = 0; index < assetsFolder.length; index++) {
  const asset = assetsFolder[index]

  fileString += `"${path.parse(asset).name}": require("../assets/${asset}"),\n`
}

fileString += '}'

fs.writeFileSync(path.join(__dirname, 'taigaImages.tsx'), fileString)

console.log('Complete!')
