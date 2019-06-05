import React from "react"
import "./App.css"
import "./flaticon.css"
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
      finalFile: ""
    }
  }

  handleFilePickerChanged(files) {
    this.setState({
      images: [...this.state.images, ...files],
      mainSectionContent: "imagesList"
    })
  }

  handleDownloadButtonClicked() {
    window.location = this.state.finalFile
  }

  handleRemoveButtonClicked(index) {
    this.setState({ images: this.state.images.filter((_, i) => i !== index) })
  }

  async stickerizeAll() {
    this.setState({
      finalFile: await this.service.stickerizeAll(this.state.images)
    })
  }
  render() {
    return (
      <div className="App">
        <h3>STICKERIZE</h3>
        <section className="main-section">
          <label htmlFor="imageInput">
            <div className="picture-icon" />
            <p>SELECT IMAGES</p>
          </label>
        </section>
        <div className="devider" />
        <section className="feature-container">
          <div className="feature">
            <div className="feature-icon layers" />
            <p>Process hundreds of images at once</p>
          </div>
          <div className="feature">
            <div className="feature-icon stop-watch-4" />
            <p>No downloads, choose your images and get going right away</p>
          </div>
        </section>
        <input
          id={"imageInput"}
          type="file"
          multiple={true}
          accept={"image/jpeg,image/png,image/gif"}
          onChange={e => this.handleFilePickerChanged(e.target.files)}
          style={{
            visibility: "hidden"
          }}
        />
        <footer>
          <div>
            Icons made by
            <a
              href="https://www.flaticon.com/authors/smashicons"
              title="Smashicons"
            >
              Smashicons
            </a>
            from
            <a href="https://www.flaticon.com/" title="Flaticon">
              www.flaticon.com
            </a>
            is licensed by
            <a
              href="http://creativecommons.org/licenses/by/3.0/"
              title="Creative Commons BY 3.0"
              target="_blank"
              rel="noopener noreferrer"
            >
              CC 3.0 BY
            </a>
          </div>
        </footer>
        {/* <button onClick={() => this.stickerizeAll()}>Stickerize</button>
        <button onClick={() => this.handleDownloadButtonClicked()}>
          Download
        </button> */}
      </div>
    )
  }
}

export default App
