import * as path from 'node:path';
import * as fs from 'node:fs';

export default defineEventHandler(async (event) => {
  const url = getRequestURL(event)
  console.log('url = ', url)
  const fileName =  url.searchParams.getAll('file')
  console.log('fileName = ', fileName)
  console.log('process = ', process)
  const filePath = path.join(process.cwd(), 'public/challenges', `${fileName}.txt`)
  const data = await fs.promises.readFile(filePath, 'utf-8')
  return data
})
