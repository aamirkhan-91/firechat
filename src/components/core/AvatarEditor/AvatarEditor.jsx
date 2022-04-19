import './AvatarEditor.scss';

import { Component } from 'react';
import AvatarEditor from 'react-avatar-editor';

import Button from '../../components/UI/Button/Button';
import Modal from '../Modal/Modal';

class AvatarEditor extends Component {
  state = {
    imgUrl: null,
    showModal: false,
    scale: 1,
  };

  fileInputRef = React.createRef();

  editorRef = React.createRef();

  photoChangedHandler = (e) => {
    const file = e.target.files[0];
    const fileReader = new FileReader();

    fileReader.onloadend = () => {
      this.setState({ imgUrl: fileReader.result, showModal: true });
    };

    fileReader.readAsDataURL(file);
  };

  dismissEditor = () => {
    this.setState({ showModal: false, imgUrl: null });

    this.fileInputRef.value = '';
  };

  handleScaleChange = (e) => {
    this.setState({ scale: e.target.value });
  };

  handleAcceptedPhoto = () => {
    const { onImageReady } = this.props;

    if (this.editor) {
      const canvas = this.editor.getImage();

      canvas.toBlob((blob) => {
        onImageReady(blob);
        this.dismissEditor();
      });
    }
  };

  editor;

  render() {
    const { showModal, scale, imgUrl } = this.state;

    return [
      <input
        ref={(ref) => {
          this.fileInputRef = ref;
        }}
        onChange={this.photoChangedHandler}
        id='select-photo'
        accept='image/*'
        type='file'
      />,
      <Button
        block
        marginBottom
        accent
        hasLabel
        text={<label htmlFor='select-photo'>Select a Photo (required)</label>}
      />,
      <Modal
        title='Edit your Avatar'
        show={showModal}
        onAccept={this.handleAcceptedPhoto}
        onClose={this.dismissEditor}
        showButtons
      >
        <div className='avatar-editor'>
          <ReactAvatarEditor
            ref={(ref) => {
              this.editor = ref;
            }}
            scale={scale}
            border={2}
            borderRadius={100}
            image={imgUrl}
          />
          <input
            min='1'
            max='3'
            step='0.01'
            value={scale}
            onChange={this.handleScaleChange}
            className='avatar-editor__range'
            type='range'
          />
        </div>
      </Modal>,
    ];
  }
}

export default AvatarEditor;
