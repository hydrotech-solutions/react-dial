var React = require('react')
var $     = require('jquery')
require('jquery-knob')

var Dial = React.createClass({
  // return a text box with a controled value
  render: function() {
    return (
      <input ref="input" value={this.props.value}/>
    )
  },
  // attach the jquery-knob when the component is mounted
  componentDidMount: function() {
    $(this.refs.input).knob(filterProps(this.props))
  },
  // update the configuration when new props are passed
  componentWillReceiveProps: function(newProps) {
    $(this.refs.input).trigger('configure', filterProps(this.props))
  }
})

module.exports = Dial

function filterProps(props) {
  var {value, ...filtered} = props
  return filtered
}
