'use strict'
import React, {Component} from 'react'
import Modal from 'react-modal'
import bindMethods from '../Mixin/Helper/Bind.js'
import InputField from '../Mixin/Form/InputField.jsx'

/* global $, banUser, userId */
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
    width: '400px',
    height: '250px'
  }
}

export default class BanUser extends Component {
  constructor() {
    super()
    this.state = {
      isOpen: false,
      banReason: ''
    }
    bindMethods([
      'openModal', 'closeModal', 'banUser', 'setBanReason'
    ], this)
  }

  componentDidMount() {
    banUser.callback = this.openModal
  }

  openModal() {
    this.setState({isOpen: true})
  }

  closeModal() {
    this.setState({isOpen: false})
  }

  setBanReason(e) {
    this.setState({banReason: e.target.value})
  }

  banUser() {
    if (this.state.banReason.length > 0) {
      $.post('./properties/BanUser/', {
        userId : userId,
        reason: this.state.banReason
      }, null, 'json').done(function () {
        window.location.href = 'properties/BanUser/success'
      }.bind(this)).fail(function () {
        alert('A server error prevented the user ban')
      })
    }
  }

  render() {
    return (
      <div>
        <Modal
          isOpen={this.state.isOpen}
          onRequestClose={this.closeModal}
          contentLabel="Example"
          style={modalStyle}>
          <div>
            <div>
              <p>Banning this user will delete their sublease and roommate entries and prevent
                them from logging into the system.</p>
              <InputField
                name="ban_reason"
                label="Reason for ban"
                type="text"
                required={true}
                value={this.state.banReason}
                placeholder="The user will see this message after trying to log in"
                change={this.setBanReason}/>
              <button className="btn btn-danger" onClick={this.banUser}>
                <i className="fa fa-ban"></i>&nbsp;Ban this user</button>&nbsp;
              <button className="btn btn-outline-dark" onClick={this.closeModal}>
                <i className="fa fa-times"></i>&nbsp;Cancel</button>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}
