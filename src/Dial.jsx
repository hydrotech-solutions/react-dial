var React = require('react')
var $     = require('jquery')
require('jquery-knob')

var Dial = React.createClass({
  render: function() {
    return (
      <input ref="input"/>
    )
  },
  componentDidMount: function() {
    $(this.refs.input).knob(this.props)
  },
  componentWillReceiveProps: function(newProps) {
    $(this.refs.input).trigger('configure', newProps)
  }
})

module.exports = Dial
