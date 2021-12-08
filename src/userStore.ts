import { reactive } from 'vue'

export const obj = reactive({
  foo: 'foo',
  two: [
    {
      index: 1
    },
    {
      index: 2
    },
    {
      index: 3
    },
  ]
})

const sleep = async(msc: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, msc)
  })
}


export const callAPI = async () => {
  await sleep (2000)
  obj.two[1] = {  index: 231 }
}
