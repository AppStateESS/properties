'use strict'
import React, {Component} from 'react'
import bindMethods from '../Mixin/Helper/Bind.js'
import Modal from 'react-modal'
import DeleteQuestion from './DeleteQuestion.jsx'

const modalStyle = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(93, 93, 93, 0.75)',
    zIndex : 100
  },
  content: {
    position: 'absolute',
    borderRadius: '8px',
    border: '1px solid #ccc',
    background: '#fff',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    outline: 'none',
    margin: '20% auto 0px auto',
    padding: '20px',
    width: '500px',
    height: '350px'
  }
}

/* global $, deleteProperty, propertyId */

export default class PropertyDelete extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false
    }
    const methods = ['openDelete', 'closeDelete', 'delete', 'deactivate']
    bindMethods(methods, this)
  }

  componentDidMount() {
    deleteProperty.callback = this.openDelete
  }

  deactivate() {
    $.ajax({
      url: './properties/Property/' + propertyId,
      data: {
        varname: 'active',
        value: 0
      },
      dataType: 'json',
      type: 'patch'
    }).done(function () {
      window.location.href='./properties/Property/' + propertyId
    }.bind(this))
  }

  delete() {
    $.ajax({
      url: './properties/Property/' + propertyId,
      dataType: 'json',
      method: 'DELETE',
      success: function () {
        window.location.href = './properties/Property/'
      }.bind(this),
      error: function () {
        this.setMessage('Sorry, something went wrong and the property was not deleted.', 'danger')
        this.closeDelete()
      }.bind(this)
    })
  }

  openDelete() {
    this.setState({isOpen: true})
  }

  closeDelete() {
    this.setState({isOpen: false})
  }

  render() {
    return (
      <Modal
        isOpen={this.state.isOpen}
        onRequestClose={this.closeModal}
        contentLabel="Delete property"
        style={modalStyle}>
        <div>
          <DeleteQuestion deactivate={this.deactivate} close={this.closeDelete} delete={this.delete}/>
        </div>
      </Modal>
    )
  }
}
