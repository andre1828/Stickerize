import React from "react"
import uuidv1 from "uuid/v1"
import Service from "./../Service/Service"
import { withRouter, Link } from "react-router-dom"
import "./ImageList.css"

class ImageList extends React.Component {
  constructor(props) {
    super(props)

    this.service = new Service()
    this.canvas = document.createElement("canvas")
    this.ctx = this.canvas.getContext("2d")
    this.imageContainer = new Image()
    this.fileReader = new FileReader()
    this.state = {
      images: [],
      finalFile: ""
    }
  }

  async componentDidMount() {
    let files = this.props.location.state.files
    let images = []
    for (let i = 0; i < files.length; i++) {
      let blob = await new Response(files[i]).blob()
      images.push({
        id: null,
        name: files[i].name,
        src: URL.createObjectURL(blob),
        blob: blob
      })
    }
    images.forEach(img => (img.id = uuidv1()))

    this.setState({ images: images })
  }

  handleDownloadButtonClicked() {
    window.location = this.state.finalFile
  }

  handleRemoveButtonClicked(id) {
    this.setState({ images: this.state.images.filter(img => img.id !== id) })
  }

  async handleStickerizeButtonClicked() {
    this.state.images.forEach(img => URL.revokeObjectURL(img.url))

    this.setState({
      finalFile: await this.service.stickerizeAll(this.state.images)
    })
  }

  render() {
    return (
      <React.Fragment>
        <div className="header">
          <Link to="/">
            <i className="home-icon" />
          </Link>
          <h3>YOUR IMAGES</h3>
          <i
            className="add-image-icon"
            onClick={this.handleAddImageButtonClicked}
          />
        </div>
        <div className="imageList">
          {this.state.images.map((img, index) => (
            <div className="image" key={img.id}>
              <i
                className="image-remove-icon"
                onClick={() => this.handleRemoveButtonClicked(img.id)}
              />
              <img src={img.src} alt={img.name} />
              <div className="devider-vertical" />
              <span className="image-name">{img.name}</span>
            </div>
          ))}
        </div>
        <button
          className={"stickerize-button"}
          onClick={() => this.handleStickerizeButtonClicked()}
        >
          STICKERIZE!
        </button>
      </React.Fragment>
    )
  }
}

export default withRouter(ImageList)
