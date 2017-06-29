import React, {Component} from 'react'
import moment from 'moment'
import Dollarize from '../Form/Dollarize.jsx'

export default class Base extends Component {

  dollarize(input) {
    return <Dollarize>{input}</Dollarize>
  }

  formatDate(datenum) {
    return String(moment(datenum * 1000).format('YYYY-MM-DD'))
  }

  campusDistance() {
    return [
      {
        value: '0',
        label: 'Less than one'
      },
      {
        value: '1',
        label: '1 to 5'
      },
      {
        value: '5',
        label: '5 to 10'
      }, {
        value: '10',
        label: '10 to 25'
      }, {
        value: '25',
        label: 'More than 25'
      }
    ]
  }

  propertyType() {
    return [
      {
        value: '0',
        label: 'Apartment'
      }, {
        value: '1',
        label: 'Efficiency'
      }, {
        value: '2',
        label: 'House'
      }, {
        value: '3',
        label: 'Condo'
      }, {
        value: '4',
        label: 'Townhouse'
      }, {
        value: '5',
        label: 'Duplex'
      }
    ]
  }

  googleize(address) {
    return 'http://maps.google.com/maps?q=' + address.replace(/[\W]/g, '+').replace(/\+{2,}/g, '+')
  }
}
