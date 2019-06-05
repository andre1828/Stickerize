import React from "react"

export default class ImageList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      images: [{},{}]
    }
  }

  render() {
    return (
      <React.Fragment>
        <h3>Your Images</h3>
        <div className="imageList">
          {this.state.images.map((img, index) => (
            <div className="image">
              <img src={require("./dont_panic.png")} alt=" " />
              <div className="devider-vertical" />
              <span className="image-name">dont panic.png</span>
              <div
                className="image-remove-icon"
                onClick={() => this.handleRemoveButtonClicked(index)}
              />
            </div>
          ))}
        </div>
      </React.Fragment>
    )
  }
}
