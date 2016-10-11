'use strict'
import React from 'react'
import BooleanButton from '../Mixin/BooleanButton.jsx'

class PropertyFeatures extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const property = this.props.property
    return (
      <div>
        <h3>Features</h3>
        <div className="row">
          <div className="col-sm-6">
            <table className="table">
              <tbody>
                <tr>
                  <td>Utilities included</td>
                  <td className="text-right">
                    <BooleanButton
                      current={property.utilities_inc}
                      handleClick={this.props.setValue.bind(this, 'utilities_inc')}/>
                  </td>
                </tr>
                <tr>
                  <td>Efficiency</td>
                  <td className="text-right">
                    <BooleanButton
                      current={property.efficiency}
                      handleClick={this.props.setValue.bind(this, 'efficiency')}/>
                  </td>
                </tr>
                <tr>
                  <td>Subleasing permitted</td>
                  <td className="text-right">
                    <BooleanButton
                      current={property.sublease}
                      handleClick={this.props.setValue.bind(this, 'sublease')}/>
                  </td>
                </tr>
                <tr>
                  <td>Furnished</td>
                  <td className="text-right">
                    <BooleanButton
                      current={property.furnished}
                      handleClick={this.props.setValue.bind(this, 'furnished')}/>
                  </td>
                </tr>
                <tr>
                  <td>Dishwasher</td>
                  <td className="text-right">
                    <BooleanButton
                      current={property.dishwasher}
                      handleClick={this.props.setValue.bind(this, 'dishwasher')}/>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-sm-6">
            <table className="table">
              <tbody>
                <tr>
                  <td>Windows (i.e. not in basement)</td>
                  <td className="text-right">
                    <BooleanButton
                      current={property.window_number}
                      handleClick={this.props.setValue.bind(this, 'window_number')}/>
                  </td>
                </tr>
                <tr>
                  <td>Air Conditioning</td>
                  <td className="text-right">
                    <BooleanButton
                      current={property.airconditioning}
                      handleClick={this.props.setValue.bind(this, 'airconditioning')}/>
                  </td>
                </tr>
                <tr>
                  <td>Appalcart route</td>
                  <td className="text-right">
                    <BooleanButton
                      current={property.appalcart}
                      handleClick={this.props.setValue.bind(this, 'appalcart')}/>
                  </td>
                </tr>
                <tr>
                  <td>Clubhouse</td>
                  <td className="text-right">
                    <BooleanButton
                      current={property.clubhouse}
                      handleClick={this.props.setValue.bind(this, 'clubhouse')}/>
                  </td>
                </tr>
                <tr>
                  <td>Workout room</td>
                  <td className="text-right">
                    <BooleanButton
                      current={property.workout_room}
                      handleClick={this.props.setValue.bind(this, 'workout_room')}/>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

PropertyFeatures.propTypes = {
  property: React.PropTypes.object,
  setValue: React.PropTypes.func
}

export default PropertyFeatures
