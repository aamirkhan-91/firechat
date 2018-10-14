import React, { Component } from 'react'

import ReactAvatarEditor from 'react-avatar-editor';
import Button from '../../components/UI/Button/Button';
import Modal from '../../utilities/Modal/Modal';

import './AvatarEditor.scss';

export class AvatarEditor extends Component {

  state = {
    imgUrl: null,
    showModal: false,
    scale: 1
  }

  fileInputRef = React.createRef();
  editorRef = React.createRef();
  editor;

  photoChangedHandler = (e) => {
    let file = e.target.files[0];
    let fileReader = new FileReader();

    fileReader.onloadend = () => {
      this.setState({ imgUrl: fileReader.result, showModal: true });
    }

    fileReader.readAsDataURL(file);
  }

  dismissEditor = () => {
    this.setState({ showModal: false, imgUrl: null });

    this.fileInputRef.value = '';
  }

  handleScaleChange = (e) => {
    this.setState({ scale: e.target.value });
  }

  handleAcceptedPhoto = () => {
    if (this.editor) {
      const canvas = this.editor.getImage();

      canvas.toBlob((blob) => {
        this.props.onImageReady(blob);
        this.dismissEditor();
      });
    }
  }

  render() {
    return (
      [
        <input ref={ref => this.fileInputRef = ref} onChange={this.photoChangedHandler} id="select-photo" accept={"image/*"} type="file" />,
        <Button block marginBottom accent hasLabel text={<label htmlFor="select-photo">Select a Photo</label>} />,
        <Modal title="Edit your Avatar" show={this.state.showModal} onAccept={this.handleAcceptedPhoto} onClose={this.dismissEditor} showButtons>
          <div className="avatar-editor">
            <ReactAvatarEditor ref={ref => this.editor = ref} scale={this.state.scale} border={2} borderRadius={100} image={this.state.imgUrl} />
            <input min="1" max="3" step="0.01" value={this.state.scale} onChange={this.handleScaleChange} className="avatar-editor__range" type="range" />
          </div>
        </Modal>
      ]
    )
  }
}

export default AvatarEditor;
