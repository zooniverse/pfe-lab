import React from 'react';
import { connect } from 'react-redux';
import { DragAndDropTarget, Thumbnail, FileButton } from 'zooniverse-react-components';
import toBlob from 'data-uri-to-blob';

class ImageSelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      working: false
    };

    this.handleChange = this.handleChange.bind(this);
  }

  cropImage(srcImg, srcFile) {
    const canvas = document.createElement('canvas');
    canvas.width = srcImg.naturalWidth;
    canvas.height = srcImg.naturalHeight;

    if (!isNaN(this.props.ratio)) {
      const naturalRatio = (srcImg.naturalWidth / srcImg.naturalHeight);
      if (naturalRatio - this.props.ratio < 0) {
        canvas.height = (canvas.width / this.props.ratio);
      } else {
        canvas.width = (canvas.height * this.props.ratio);
      }
    }
    const ctx = canvas.getContext('2d');
    ctx.drawImage(srcImg, (srcImg.naturalWidth - canvas.width) / -2, (srcImg.naturalHeight - canvas.height) / -2);
  }

  reduceImage(img, srcFile, _scale = 1) {
    const canvas = document.createElement('canvas');
    canvas.width = (img.naturalWidth * _scale);
    canvas.height = (img.naturalHeight * _scale);

    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, 0, 0, canvas.width, canvas.height);

    const dataURL = canvas.toDataURL(srcFile.type);

    try {
      const size = dataURL.split(';base64,')[1].length * this.props.baseExpansion;

      if (size > this.props.maxSize && canvas.width * canvas.height > this.props.minArea) {
        // Keep trying until it's small enough.
        this.reduceImage(img, srcFile, _scale - this.props.reductionPerPass);
      } else {
        this.setState({ working: false });

        img.title = srcFile.name;
        this.props.onChange(toBlob(dataURL), img);
      }
    } catch (e) {
      this.setState({ working: false });

      alert('Error reducing image. Try a smaller one.');
    }
  }

  handleChange(e) {
    // TODO: why is the proxy event in an array?
    if (e[0].target.files.length !== 0) {
      const [file] = e[0].target.files;
      this.setState({ working: true });

      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          this.cropImage(img, file);
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
    // this.props.handleMediaChange.bind(this, this.props.resourceType);
  }

  render() {
    const uploaderClass = (this.props.resourceSrc) ? 'image-selector__uploader--without-border' : 'image-selector__uploader';

    return (
      <div className="image-selector" ref={(node) => { this.imageSelector = node; }}>
        <p className="image-selector__label">{this.props.label}</p>
        <div className={uploaderClass}>
          <FileButton accept="image/*" onSelect={this.handleChange} rootStyle={{ position: "absolute" }} disabled={this.state.working} />
          {!this.props.resourceSrc && !this.state.working &&
            <p className="image-selector__placeholder">Drop an image here</p>}
          {this.props.resourceSrc &&
            <Thumbnail src={this.props.resourceSrc} width={160} />}
          {this.state.working &&
            <p className="image-selector__loader">
              <i className="fa fa-spinner fa-pulse fa-2x fa-fw" aria-label="Loading" />
            </p>}
        </div>
      </div>
    );
  }
}

ImageSelector.propTypes = {
  baseExpansion: React.PropTypes.number,
  label: React.PropTypes.string,
  minArea: React.PropTypes.number,
  maxSize: React.PropTypes.number,
  onChange: React.PropTypes.func.isRequired,
  ratio: React.PropTypes.number,
  reductionPerPass: React.PropTypes.number,
  resourceSrc: React.PropTypes.string.isRequired,
  resourceType: React.PropTypes.string
};

ImageSelector.defaultProps = {
  baseExpansion: 3 / 4,
  maxSize: Infinity,
  minArea: 300,
  onChange: () => {},
  reductionPerPass: 0.05,
  resourceSrc: '',
  ratio: NaN
};

export default ImageSelector;
