import JSZip from "jszip"

export default class Service {
  constructor() {
    this.imageContainer = new Image()
    this.canvas = document.createElement("canvas")
    this.ctx = this.canvas.getContext("2d")

    this.stickerizeAll = this.stickerizeAll.bind(this)
  }

  async stickerizeAll(images) {
    var stickerizedImages = []
    for (const image of images) {
      var imgBlob = await new Response(image).blob()
      var objUrl = URL.createObjectURL(imgBlob)
      this.imageContainer.src = objUrl
      await this.loadImage()
      this.resizeImage()
      if (this.compressionRequired()) {
        stickerizedImages.push(await this.compressImgBlob(imgBlob))
      } else {
        stickerizedImages.push(await this.canvasToBlob())
      }
    }

    var result = ""
    if (stickerizedImages.length > 1) {
      // zip
      // render download btn
      var imagesZip = new JSZip()
      for (let i = 0; i < images.length; i++) {
        imagesZip.file(images[i].name, stickerizedImages[i])
      }
      var b64Zip = await imagesZip.generateAsync({ type: "base64" })
      result = "data:application/zip;base64," + b64Zip
    } else {
      result =
        "data:application/png;base64," +
        (await this.blobToBase64(stickerizedImages[0])).replace(
          "data:image/jpeg;base64,",
          ""
        )
    }
    return result
  }

  loadImage() {
    return new Promise((resolve, reject) => {
      this.imageContainer.onload = () => {
        this.canvas.width = this.imageContainer.width
        this.canvas.height = this.imageContainer.height
        this.ctx.drawImage(
          this.imageContainer,
          0,
          0,
          this.imageContainer.width,
          this.imageContainer.height
        )
        resolve()
      }
    })
  }

  resizeImage() {
    this.imageContainer.width =
      this.imageContainer.width > 512 ? 512 : this.imageContainer.width
    this.imageContainer.height =
      this.imageContainer.height > 512 ? 512 : this.imageContainer.height
    this.canvas.width = this.imageContainer.width
    this.canvas.height = this.imageContainer.height
    this.ctx.drawImage(
      this.imageContainer,
      0,
      0,
      this.imageContainer.width,
      this.imageContainer.height
    )
  }

  canvasToBlob() {
    return new Promise((resolve, reject) => {
      this.canvas.toBlob(
        blob => {
          resolve(blob)
        },
        "image/jpeg",
        "0.7"
      )
    })
  }

  async blobToBase64(blob) {
    const reader = new FileReader()
    return new Promise((resolve, reject) => {
      reader.onloadend = result => resolve(reader.result)
      reader.onerror = error => reject(error)

      reader.readAsDataURL(blob)
    })
  }

  async compressImgBlob(imgBlob) {
    for (let i = 0; i < 15; i++) {
      var objUrl = URL.createObjectURL(imgBlob)
      this.imageContainer.src = objUrl
      await this.loadImage(this.imageContainer)
      this.ctx.drawImage(this.imageContainer, 0, 0, 512, 512)
      var newBlob = await this.canvasToBlob()
      if (newBlob.size < imgBlob.size) {
        imgBlob = newBlob
      }
    }
    URL.revokeObjectURL(objUrl)
    return imgBlob
  }

  compressionRequired() {
    return (
      ((this.canvas.toDataURL().length - "data:image/jpeg;base64,".length) *
        3) /
        4 >=
      358400
    )
  }
}
