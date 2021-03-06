import SanityClient from '@sanity/client'
import ImageUrlBuilder from '@sanity/image-url'

const EXHIBITION = '87753637-5cea-434e-ba28-7fc3456e433d'
const TIMEOUT = 6000
const slide = document.getElementById('slide')

const client = new SanityClient({
  projectId: 'mx0t3s2w',
  dataset: 'production',
  useCdn: true
})

const builder = new ImageUrlBuilder(client)

let images = []
let index = 0
let timer = null

client.getDocument(EXHIBITION)
  .then(exhibition => {
    images = exhibition.images
    timer = setInterval(displaySlide, TIMEOUT)
  })
  .catch(error => console.error(error))

function displaySlide() {
  slide.src = builder.image(images[index])
  index++
  if (index > images.length) {
    clearInterval(timer)
    location.reload()
  }
}
