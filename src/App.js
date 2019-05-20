import React from "react"
import "./App.css"
import Service from "./Service/Service"

class App extends React.Component {
  constructor(props) {
    super()
    this.service = new Service()
    this.canvas = document.createElement("canvas")
    this.ctx = this.canvas.getContext("2d")
    this.imageContainer = new Image()
    this.fileReader = new FileReader()
    this.state = {
      images: [],
      stickerizedImages: [],
      finalFile: ''
    }
  }

  handleFilePickerChanged(files) {
    this.setState({ images: [...this.state.images, ...files] })
  }

  handleDownloadButtonClicked() {
    window.location = this.state.finalFile
  }

  async stickerizeAll() {
    this.setState({
      finalFile: await this.service.stickerizeAll(this.state.images)
    })
  }
  render() {
    return (
      <div className="App">
        <input
          type="file"
          multiple={true}
          accept={"image/jpeg,image/png,image/gif"}
          onChange={e => this.handleFilePickerChanged(e.target.files)}
        />
        <button onClick={() => this.stickerizeAll()}>Stickerize</button>
        <button onClick={() => this.handleDownloadButtonClicked()}>
          Download
        </button>
      </div>
    )
  }
}

export default App
