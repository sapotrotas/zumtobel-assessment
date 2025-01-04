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


// console.log('process.env = ', process.env) 
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  // Access baseURL universally
  const baseURL = config.app.baseURL
  console.log('baseURL = ', baseURL)

  const apiURL = config.public.apiBase
  console.log('apiURL = ', apiURL)

  const url = getRequestURL(event)
  const fileName =  url.searchParams.getAll('file')
  const fileUrl = `https://zumtobel-assessment.nuxt.dev/challenges/${fileName}.txt`
  const data = await $fetch(fileUrl)
  console.log('data = ', data)
  return data
})