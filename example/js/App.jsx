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
    return (
      <Dial value={this.state.dialValue} onChange={this.handleDialChange}/>
    )
  }
})

module.exports = App
