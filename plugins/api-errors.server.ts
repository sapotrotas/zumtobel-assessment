//import { MyError } from '~/errors'

export default definePayloadPlugin((nuxtApp) => {
  definePayloadReducer(
    'MyError',
    // we serialize the data we need as an array, object, or any other serializable format
    (data) => {
        console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaa')
        return JSON.stringify(data.toJSON())
    },
  )
  definePayloadReviver(
    'MyError',
    // we revive the data back to an instance of MyError
    ((data) => JSON.parse(data)),
  )
})