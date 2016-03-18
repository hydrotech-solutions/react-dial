var React = require('react')

var Dial = require('../../')

var App = React.createClass({
  getInitialState: function() {
    return {
      dialValue: 25
    }
  },
  handleDialChange: function(newValue) {
    this.setState({dialValue: newValue})
  },
  render: function() {
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
})

module.exports = App
