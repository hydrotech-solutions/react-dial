import React, { Component } from 'react'

import Dial from '../../'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      dialValue: 25
    }
  }

  handleDialChange = (newValue) => {
    this.setState({dialValue: newValue})
  };

  render() {
    var dialReading = `${this.state.dialValue}lbs`
    return (
      <Dial
        value={dialReading}
        onChange={this.handleDialChange}
        angleOffset={135}
        angleArc={270}
        lineCap="round"
      />
    )
  }
}

export default App
