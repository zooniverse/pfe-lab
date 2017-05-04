import React from 'react';
import { connect } from 'react-redux';
import { DragAndDropTarget, Thumbnail, FileButton } from 'zooniverse-react-components';
import toBlob from 'data-uri-to-blob';

class ImageSelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      height: '',
      width: 'auto',
      working: false
    };

    this.updateWidth = this.updateWidth.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    addEventListener('resize', this.updateWidth);
    this.updateWidth()
  }

  componentWillUnmount() {
    removeEventListener('resize', this.updateWidth);
  }

  updateWidth() {
    const img = new Image();
    img.onload = () => {
      const { naturalWidth, naturalHeight } = img;
      this.setState({ height: naturalHeight, width: naturalWidth });
    };
    img.src = this.props.resourceSrc;
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
        this.props.handleMediaChange(toBlob(dataURL), img);
      }
    } catch (e) {
      this.setState({ working: false });

      alert('Error reducing image. Try a smaller one.');
    }
  }

  handleChange(e) {
    console.log('event', event.target)
    if (e.target.files.length !== 0) {
      const [file] = e.target.files;
      this.setState({ working: true });

      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          this.cropImage(img, file);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
    // this.props.handleMediaChange.bind(this, this.props.resourceType);
  }

  render() {
    return (
      <div className="image-selector" ref={(node) => { this.imageSelector = node; }}>
        <label className="image-selector__label">
          {this.props.label}
          <DragAndDropTarget onDrop={this.handleChange.bind(this, this.props.resourceType)} style={{height: this.state.height, width: this.state.width}}>
            {!this.props.resourceSrc &&
              <p className="image-selector__placeholder">Drop an image here</p>}
            {this.props.resourceSrc &&
              <Thumbnail src={this.props.resourceSrc} width={160} />}
            <FileButton onSelect={this.handleChange} />
          </DragAndDropTarget>
        </label>
      </div>
    );
  }
}

ImageSelector.propTypes = {
  baseExpansion: React.PropTypes.number,
  handleMediaChange: React.PropTypes.func.isRequired,
  label: React.PropTypes.string,
  minArea: React.PropTypes.number,
  maxSize: React.PropTypes.number,
  ratio: React.PropTypes.number,
  reductionPerPass: React.PropTypes.number,
  resourceSrc: React.PropTypes.string.isRequired,
  resourceType: React.PropTypes.string
};

ImageSelector.defaultProps = {
  baseExpansion: 3 / 4,
  handleMediaChange: () => {},
  maxSize: Infinity,
  minArea: 300,
  reductionPerPass: 0.05,
  resourceSrc: '',
  ratio: NaN
};

export default ImageSelector;
