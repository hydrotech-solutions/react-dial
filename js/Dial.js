'use strict';

var React = require('react');
var $ = require('jquery');
require('jquery-knob');

var Dial = React.createClass({
  displayName: 'Dial',

  render: function render() {
    return React.createElement('input', { ref: 'input' });
  },
  componentDidMount: function componentDidMount() {
    $(this.refs.input).knob(this.props);
  },
  componentWillReceiveProps: function componentWillReceiveProps(newProps) {
    $(this.refs.input).trigger('configure', newProps);
  }
});

module.exports = Dial;