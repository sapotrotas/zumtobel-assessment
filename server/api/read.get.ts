import * as path from 'node:path';
import * as fs from 'node:fs';

export default defineEventHandler(async (event) => {
  const url = getRequestURL(event)
  const fileName =  url.searchParams.getAll('file')
  const filePath = path.join(process.cwd(), 'public', `${fileName}.txt`)
  const data = await fs.promises.readFile(filePath, 'utf-8')
  return data
})
