import * as path from 'node:path';
// import * as fs from 'node:fs';

// export default defineEventHandler(async (event) => {
//   const url = getRequestURL(event)
//   const fileName =  url.searchParams.getAll('file')
//   // console.log('process = ', process.cwd())
//   const filePath = path.join('public/challenges', `${fileName}.txt`)
//   // const filePath = path.join(process.cwd(), 'public/challenges', `${fileName}.txt`)
//   const data = await fs.promises.readFile(filePath, 'utf-8')
//   return data
// })


import { serveStatic } from "h3"
import { stat, readFile } from "node:fs/promises";
// import { join } from "pathe";

export default defineEventHandler((event) => {
  return serveStatic(event, {
    getContents: (id) => readFile(path.join('public/challenges', 'challenge-1.txt')),
    getMeta: async (id) => {
      const stats = await stat(path.join('public/challenges', 'challenge-1.txt')).catch(() => {});

      if (!stats || !stats.isFile()) {
        console.log('id = ', id)
        return;
      }

      return {
        size: stats.size,
        mtime: stats.mtimeMs,
      };
    },
  });
})