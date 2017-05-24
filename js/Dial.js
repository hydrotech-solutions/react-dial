'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Dial$propTypes, _Dial$defaultProps;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Dial = function (_Component) {
  _inherits(Dial, _Component);

  function Dial() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Dial);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Dial.__proto__ || Object.getPrototypeOf(Dial)).call.apply(_ref, [this].concat(args))), _this), _this.handleChange = function (e) {
      var value = unUnits(e.target.value); // strip any formatting from the value and convert it to a number
    }, _this.handleKeyDown = function (e) {

      var key = e.key;
      var newValue = unUnits(_this.props.value);

      if (key === 'ArrowUp') _this.triggerUpdate(newValue + 1);else if (key === 'ArrowDown') _this.triggerUpdate(newValue - 1);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Dial, [{
    key: 'render',


    // return the dom structure
    value: function render() {

      // "smart defaults"
      var fontSize = this.props.fontSize || this.props.width * 0.3;
      var textColor = this.props.textColor || this.props.fgColor || "#0fb6ff";

      var divStyles = {
        position: 'relative', // relative positioning to support absolutely positioned children
        width: this.props.width,
        height: this.props.width, // always square
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
        color: textColor,
        backgroundColor: 'transparent'
      };

      return _react2.default.createElement(
        'div',
        { style: divStyles, onKeyDown: this.handleKeyDown },
        _react2.default.createElement('canvas', { style: canvasStyles, width: this.props.width, height: this.props.width, ref: 'canvas' }),
        _react2.default.createElement('input', { style: inputStyles, value: this.props.value, onChange: this.handleChange, readOnly: this.props.readOnly })
      );
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.updateCanvas();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.updateCanvas();
    }
  }, {
    key: 'triggerUpdate',
    value: function triggerUpdate(newValue) {
      //common hook for all sources of change to send new values to
      if (newValue >= this.props.min && newValue <= this.props.max) {
        this.props.onChange(newValue);
      }
    }
  }, {
    key: 'updateCanvas',
    value: function updateCanvas() {

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
      var value = unUnits(this.props.value) - this.props.min; // normalized current value
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
  }]);

  return Dial;
}(_react.Component);

Dial.propTypes = (_Dial$propTypes = {
  min: _propTypes2.default.number,
  max: _propTypes2.default.number,
  value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]), // value may be a string containing units
  angleOffset: _propTypes2.default.number,
  angleArc: _propTypes2.default.number,
  readOnly: _propTypes2.default.bool,
  rotation: _propTypes2.default.string,
  thickness: _propTypes2.default.number,
  lineCap: _propTypes2.default.string,
  width: _propTypes2.default.number,
  fgColor: _propTypes2.default.string,
  bgColor: _propTypes2.default.string,
  inputColor: _propTypes2.default.string,
  fontFamily: _propTypes2.default.string,
  fontWeight: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  fontSize: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
}, _defineProperty(_Dial$propTypes, 'readOnly', _propTypes2.default.bool), _defineProperty(_Dial$propTypes, 'textColor', _propTypes2.default.string), _defineProperty(_Dial$propTypes, 'onChange', _propTypes2.default.func), _Dial$propTypes);
Dial.defaultProps = (_Dial$defaultProps = {
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
  fontSize: null }, _defineProperty(_Dial$defaultProps, 'readOnly', false), _defineProperty(_Dial$defaultProps, 'textColor', null), _defineProperty(_Dial$defaultProps, 'onChange', function onChange(v) {}), _Dial$defaultProps);
exports.default = Dial;


function radians(degrees) {
  return degrees * Math.PI / 180;
}

function degrees(radians) {
  return radians * 180 / Math.PI;
};

function unUnits(s) {
  // possible inputs: 0, 1, "0", "1", undefined, NaN
  if (s) return parseFloat(s); // handle first four cases
  else return 0; // return 0 for falsey inputs
}