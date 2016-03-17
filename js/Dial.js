'use strict';

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');
var $ = require('jquery');
require('jquery-knob');

var Dial = React.createClass({
  displayName: 'Dial',

  // return a text box with a controled value
  render: function render() {
    return React.createElement('input', { ref: 'input', value: this.props.value });
  },
  // attach the jquery-knob when the component is mounted
  componentDidMount: function componentDidMount() {
    $(this.refs.input).knob(filterProps(this.props));
  },
  // update the configuration when new props are passed
  componentWillReceiveProps: function componentWillReceiveProps(newProps) {
    $(this.refs.input).trigger('configure', filterProps(this.props));
  }
});

module.exports = Dial;

function filterProps(props) {
  var value = props.value;

  var filtered = _objectWithoutProperties(props, ['value']);

  return filtered;
}