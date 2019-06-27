import React from "react"
import styles from "./App.module.css"
import "./flaticon.css"

class App extends React.Component {
  constructor(props) {
    super()

    this.state = {
      stickerizedImages: []
    }
  }

  async handleFilePickerChanged(files) {
    this.props.history.push({ pathname: "/images", state: { files } })
  }

  render() {
    return (
      <div>
        <h3 className={styles.title}>STICKERIZE</h3>
        <section className="mainSection">
          <label htmlFor="imageInput" className={styles.selectImagesButton}>
            <div className={styles.pictureIcon} />
            <p className={styles.selectImagesButtonText}>SELECT IMAGES</p>
          </label>
          <input
            id={"imageInput"}
            type="file"
            multiple={true}
            accept={"image/jpeg,image/png,image/gif"}
            onChange={e => this.handleFilePickerChanged(e.target.files)}
            style={{
              display: "none"
            }}
          />
        </section>
        <section>
          <p>
            Stickerize is the easy way to process hundreds of images to conform
            with the Sticker bot in Telegram
          </p>
        </section>
        <div className={styles.devider} />
        <section className={styles.featureContainer}>
          <div className={styles.feature}>
            <div className={`${styles.featureIcon} ${styles.layers}`} />
            <p>Process hundreds of images at once</p>
          </div>
          <div className={styles.feature}>
            <div className={`${styles.featureIcon} ${styles.stopWatch4}`} />
            <p>No downloads, choose your images and get going right away</p>
          </div>
        </section>
        <footer className={styles.footer}>
          <div>
            Icons made by
            <a
              className={styles.footerLink}
              href="https://www.flaticon.com/authors/smashicons"
              title="Smashicons"
            >
              Smashicons
            </a>
            from
            <a
              className={styles.footerLink}
              href="https://www.flaticon.com/"
              title="Flaticon"
            >
              www.flaticon.com
            </a>
            is licensed by
            <a
              className={styles.footerLink}
              href="http://creativecommons.org/licenses/by/3.0/"
              title="Creative Commons BY 3.0"
              target="_blank"
              rel="noopener noreferrer"
            >
              CC 3.0 BY
            </a>
          </div>
        </footer>
      </div>
    )
  }
}

export default App
