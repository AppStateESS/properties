'use strict'

export default class UtilityFunctions {

  static laundryTypes() {
    return [
      {
        value: '0',
        label: 'No laundry'
      }, {
        value: '1',
        label: 'Washer/Dryer in unit'
      }, {
        value: '2',
        label: 'Laundry room on premises'
      }, {
        value: '3',
        label: 'Washer/Dryer hook ups in unit'
      }
    ]
  }

  static trashTypes() {
    return [
      {
        value: '0',
        label: 'No pickup or bins'
      }, {
        value: '1',
        label: 'Curbside pickup'
      }, {
        value: '2',
        label: 'Trash only, no recycling bins'
      }, {
        value: '3',
        label: 'Both bins on site'
      }
    ]
  }

  static televisionTypes() {
    return [
      {
        value: '0',
        label: 'Antenna'
      }, {
        value: '1',
        label: 'Cable'
      }, {
        value: '2',
        label: 'Satellite'
      }, {
        value: '3',
        label: 'Fiber'
      }
    ]
  }

  static internetTypes() {
    return [
      {
        value: '1',
        label: 'Dial up'
      }, {
        value: '2',
        label: 'DSL'
      }, {
        value: '3',
        label: 'Wireless'
      }, {
        value: '4',
        label: 'Satellite'
      }, {
        value: '5',
        label: 'Cable'
      }, {
        value: '6',
        label: 'DSL/Cable'
      }, {
        value: '7',
        label: 'Fiber'
      }
    ]
  }
}
