'use strict';

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');

var Dial = React.createClass({
  displayName: 'Dial',

  getDefaultProps: function getDefaultProps() {
    return {
      min: 0,
      max: 100,
      value: 0,
      angleOffset: 0,
      angleArc: 360,
      readOnly: false,
      rotation: 'clockwise',
      thickness: 1,
      lineCap: 'square',
      width: 200,
      fgColor: "#0fb6ff",
      bgColor: "#eee",
      inputColor: "#0fb6ff",
      font: 'Sans-Serif',
      fontWeight: '400',
      // TODO: auto font size
      onChange: function onChange(v) {}

    };
  },
  // return the dom structure
  render: function render() {

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
      fontSize: this.props.fontSize
    };

    return React.createElement(
      'div',
      { style: divStyles },
      React.createElement('canvas', { style: canvasStyles, width: this.props.width, height: this.props.width, ref: 'canvas' }),
      React.createElement('input', { style: inputStyles, value: this.props.value, onChange: this.handleChange })
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

    // render the dial background (grey arc)
    if (this.props.bgColor !== "none") {
      canvas.beginPath();
      console.log(canvas.strokeStyle);
      canvas.strokeStyle = this.props.bgColor;
      console.log(canvas.strokeStyle);
      canvas.arc(centerxy, centerxy, radius, startAngle, endAngle, anticlockwise);
      canvas.stroke();
    }

    console.log('rendering dial reading');
    canvas.beginPath();
    console.log(canvas.strokeStyle);
    canvas.strokeStyle = this.props.fgColor;
    console.log(canvas.strokeStyle);
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