'use strict';

var _propTypes;

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var React = require('react');
var pt = React.PropTypes;

var Dial = React.createClass({
  displayName: 'Dial',

  propTypes: (_propTypes = {
    min: pt.number,
    max: pt.number,
    value: pt.number,
    angleOffset: pt.number,
    angleArc: pt.number,
    readOnly: pt.bool,
    rotation: pt.string,
    thickness: pt.number,
    lineCap: pt.string,
    width: pt.number,
    fgColor: pt.string,
    bgColor: pt.string,
    inputColor: pt.string,
    fontFamily: pt.string,
    fontWeight: pt.oneOfType([pt.string, pt.number]),
    fontSize: pt.oneOfType([pt.string, pt.number])
  }, _defineProperty(_propTypes, 'readOnly', pt.bool), _defineProperty(_propTypes, 'textColor', pt.string), _defineProperty(_propTypes, 'onChange', pt.func), _propTypes),
  getDefaultProps: function getDefaultProps() {
    var _ref;

    return _ref = {
      min: 0,
      max: 100,
      value: 0,
      angleOffset: 0,
      angleArc: 360,
      readOnly: false,
      rotation: 'clockwise',
      thickness: 1,
      lineCap: 'butt',
      width: 200,
      fgColor: "#0fb6ff",
      bgColor: "#eee",
      inputColor: "#0fb6ff",
      font: 'Sans-Serif',
      fontWeight: '400',
      fontSize: null }, _defineProperty(_ref, 'readOnly', false), _defineProperty(_ref, 'textColor', null), _defineProperty(_ref, 'onChange', function onChange(v) {}), _ref;
  },
  // return the dom structure
  render: function render() {

    // "smart defaults"
    var fontSize = this.props.fontSize || this.props.width * 0.3;
    var textColor = this.props.textColor || this.props.fgColor || "#0fb6ff";

    var divStyles = {
      position: 'relative', // relative positioning to support absolutely positioned children
      width: '' + this.props.width,
      height: '' + this.props.width, // always square
      display: 'flex' // allow for textbox to be easily centered
    };

    var canvasStyles = {
      position: 'absolute' // remove canvas from "flow" so input can be centered
    };

    var inputStyles = {
      margin: 'auto',
      textAlign: 'center',
      zIndex: '1', // allow textbox to get focus
      fontFamily: this.props.font, // pass through font settings
      fontWeight: this.props.fontWeight,
      borderStyle: 'none', // "invisible text box"
      fontSize: fontSize,
      width: String(this.props.value).length + 'ch',
      color: textColor
    };

    return React.createElement(
      'div',
      { style: divStyles, onKeyDown: this.handleKeyDown },
      React.createElement('canvas', { style: canvasStyles, width: this.props.width, height: this.props.width, ref: 'canvas' }),
      React.createElement('input', { style: inputStyles, value: this.props.value, onChange: this.handleChange, readOnly: this.props.readOnly })
    );
  },
  componentDidMount: function componentDidMount() {
    this.updateCanvas();
  },
  componentDidUpdate: function componentDidUpdate() {
    this.updateCanvas();
  },
  handleChange: function handleChange(e) {
    var value = parseFloat(e.target.value) || 0; // strip any formatting from the value
    if (value >= this.props.min && value <= this.props.max) {
      this.props.onChange(value);
    }
  },
  handleKeyDown: function handleKeyDown(e) {
    var key = e.key;
    if (key === 'ArrowUp') {
      this.props.onChange(this.props.value + 1);
    }
    if (key === 'ArrowDown') {
      this.props.onChange(this.props.value - 1);
    }
  },
  updateCanvas: function updateCanvas() {

    // get a reference to the canvas context
    var canvas = this.refs.canvas.getContext('2d');

    // calculate values we'll need later
    var lineWidth = this.props.width * this.props.thickness / 10;
    var centerxy = this.props.width / 2;
    var radius = this.props.width / 2 - lineWidth / 2;
    var anticlockwise = this.props.rotation !== 'clockwise';

    // calculate arc angles
    var offset = this.props.angleOffset;
    var arc = this.props.angleArc;
    var scale = this.props.max - this.props.min; //max value normalized to be starting-value agnostic
    var value = this.props.value - this.props.min; // normalized current value
    var fillFraction = value / scale;

    var startAngle = radians(offset);
    var endAngle = radians(offset + arc);
    var readingAngle = radians(offset + arc * fillFraction);

    // canvas settings
    canvas.lineWidth = lineWidth;
    canvas.lineCap = this.props.lineCap;

    // clear the canvas
    canvas.clearRect(0, 0, this.props.width, this.props.width);

    // render the dial background (grey arc)
    if (this.props.bgColor !== "none") {
      canvas.beginPath();
      canvas.strokeStyle = this.props.bgColor;
      canvas.arc(centerxy, centerxy, radius, startAngle, endAngle, anticlockwise);
      canvas.stroke();
    }

    canvas.beginPath();
    canvas.strokeStyle = this.props.fgColor;
    canvas.arc(centerxy, centerxy, radius, startAngle, readingAngle, anticlockwise);
    canvas.stroke();
  }
});

module.exports = Dial;

function filterProps(props) {
  var value = props.value;
  var change = props.change;

  var filtered = _objectWithoutProperties(props, ['value', 'change']);

  return filtered;
}

function radians(degrees) {
  return degrees * Math.PI / 180;
}

function degrees(radians) {
  return radians * 180 / Math.PI;
};