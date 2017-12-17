'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = require('semantic-ui-react');

var _core = require('./core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var validateNumber = function validateNumber(min) {
  return function (props, propName, componentName) {
    var value = props[propName];
    var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
    if (type !== 'number') {
      return new Error('Failed prop type: Invalid prop `' + propName + '` of type `' + type + '` supplied to `' + componentName + '`, expected `number`.');
    }
    var intValue = parseInt(value, 10);
    if (intValue < min) {
      return new Error('Failed prop value: Invalid prop `' + propName + '` of value `' + value + '` supplied to `' + componentName + '`, expected a number greater than or equal to `' + min + '`.');
    }
  };
};

var Pagination = function (_React$PureComponent) {
  _inherits(Pagination, _React$PureComponent);

  function Pagination() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Pagination);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Pagination.__proto__ || Object.getPrototypeOf(Pagination)).call.apply(_ref, [this].concat(args))), _this), _this.handleClick = function (targetPage) {
      return function (e, props) {
        _this.props.onClick && _this.props.onClick(e, props, (0, _core.getOffset)(targetPage, _this.props.limit));
      };
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Pagination, [{
    key: 'renderButtons',
    value: function renderButtons() {
      var _this2 = this;

      var _props = this.props,
          offset = _props.offset,
          limit = _props.limit,
          total = _props.total,
          reduced = _props.reduced,
          previousPageAnimated = _props.previousPageAnimated,
          previousPageChildren = _props.previousPageChildren,
          previousPageContent = _props.previousPageContent,
          previousPageIcon = _props.previousPageIcon,
          previousPageIconPosition = _props.previousPageIconPosition,
          nextPageAnimated = _props.nextPageAnimated,
          nextPageChildren = _props.nextPageChildren,
          nextPageContent = _props.nextPageContent,
          nextPageIcon = _props.nextPageIcon,
          nextPageIconPosition = _props.nextPageIconPosition;


      return (0, _core.computePagination)(offset, limit, total, reduced ? 1 : 2).map(function (o) {
        if (o.isCurrent) {
          return _this2.renderCurrentButton(o.page);
        } else if (o.isEnd) {
          if (o.isLowSide) {
            return _this2.renderEndButton(o.page, 'pr', {
              animated: previousPageAnimated,
              children: previousPageChildren,
              content: previousPageContent,
              defaultChildren: '<',
              icon: previousPageIcon,
              iconPosition: previousPageIconPosition
            });
          } else {
            return _this2.renderEndButton(o.page, 'nx', {
              animated: nextPageAnimated,
              children: nextPageChildren,
              content: nextPageContent,
              defaultChildren: '>',
              icon: nextPageIcon,
              iconPosition: nextPageIconPosition
            });
          }
        } else if (o.isEllipsis) {
          return _this2.renderEllipsisButton(o.isLowSide ? 'le' : 'he');
        }
        return _this2.renderOtherButton(o.page);
      });
    }
  }, {
    key: 'renderCurrentButton',
    value: function renderCurrentButton(targetPage) {
      var disabled = this.props.disabled || this.props.total <= 0;
      return _react2.default.createElement(_semanticUiReact.Button, {
        active: true,
        basic: this.props.basic,
        children: '' + targetPage,
        className: 'currentPage',
        color: this.props.currentPageColor || this.props.color,
        compact: this.props.compact,
        disabled: disabled,
        inverted: this.props.inverted,
        key: 'cr' + targetPage,
        negative: this.props.currentPageNegative || this.props.negative,
        positive: this.props.currentPagePositive || this.props.positive,
        primary: this.props.currentPagePrimary || this.props.primary,
        secondary: this.props.currentPageSecondary || this.props.secondary,
        style: this.props.currentPageStyle,
        tabIndex: disabled ? null : this.props.tabIndex
      });
    }
  }, {
    key: 'renderOtherButton',
    value: function renderOtherButton(targetPage) {
      var children = '' + targetPage;
      var disabled = this.props.disabled || this.props.total <= 0;
      return _react2.default.createElement(_semanticUiReact.Button, {
        basic: this.props.basic,
        children: children,
        className: 'otherPage',
        color: this.props.otherPageColor || this.props.color,
        compact: this.props.compact,
        disabled: disabled,
        inverted: this.props.inverted,
        key: children,
        negative: this.props.otherPageNegative || this.props.negative,
        onClick: this.handleClick(targetPage),
        positive: this.props.otherPagePositive || this.props.positive,
        primary: this.props.otherPagePrimary || this.props.primary,
        secondary: this.props.otherPageSecondary || this.props.secondary,
        style: this.props.otherPageStyle,
        tabIndex: disabled ? null : this.props.tabIndex
      });
    }
  }, {
    key: 'renderEllipsisButton',
    value: function renderEllipsisButton(key) {
      return _react2.default.createElement(_semanticUiReact.Button, {
        basic: this.props.basic,
        disabled: true,
        children: '...',
        className: 'otherPage',
        color: this.props.otherPageColor || this.props.color,
        compact: this.props.compact,
        inverted: this.props.inverted,
        key: key,
        negative: this.props.otherPageNegative || this.props.negative,
        positive: this.props.otherPagePositive || this.props.positive,
        primary: this.props.otherPagePrimary || this.props.primary,
        secondary: this.props.otherPageSecondary || this.props.secondary,
        style: this.props.otherPageStyle
      });
    }
  }, {
    key: 'renderEndButton',
    value: function renderEndButton(targetPage, key, props) {
      var disabled = this.props.disabled || this.props.total <= 0 || targetPage <= 0;
      var hasChildren = !(props.children == null || Array.isArray(props.children) && props.children.length === 0);
      var defaultChildren = !props.children && !props.content && !props.icon ? props.defaultChildren : null;
      return _react2.default.createElement(_semanticUiReact.Button, {
        animated: props.animated,
        basic: this.props.basic,
        children: defaultChildren || (hasChildren ? props.children : null),
        className: 'otherPage',
        color: this.props.otherPageColor || this.props.color,
        compact: this.props.compact,
        content: hasChildren ? null : props.content,
        disabled: disabled,
        icon: hasChildren ? null : props.icon,
        inverted: this.props.inverted,
        key: key,
        labelPosition: props.iconPosition,
        negative: this.props.otherPageNegative || this.props.negative,
        onClick: this.handleClick(targetPage),
        positive: this.props.otherPagePositive || this.props.positive,
        primary: this.props.otherPagePrimary || this.props.primary,
        secondary: this.props.otherPageSecondary || this.props.secondary,
        style: this.props.otherPageStyle,
        tabIndex: disabled ? null : this.props.tabIndex
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          as = _props2.as,
          attached = _props2.attached,
          basic = _props2.basic,
          className = _props2.className,
          compact = _props2.compact,
          floated = _props2.floated,
          fluid = _props2.fluid,
          inverted = _props2.inverted,
          size = _props2.size,
          vertical = _props2.vertical,
          style = _props2.style;

      return _react2.default.createElement(
        _semanticUiReact.Button.Group,
        {
          as: as,
          attached: attached,
          basic: basic,
          className: 'semantic-ui-react-button-pagination' + (className ? ' ' + className : ''),
          compact: compact,
          floated: floated,
          fluid: fluid,
          inverted: inverted,
          size: size,
          vertical: vertical,
          style: style
        },
        this.renderButtons()
      );
    }
  }]);

  return Pagination;
}(_react2.default.PureComponent);

Pagination.propTypes = {
  offset: validateNumber(0),
  limit: validateNumber(1),
  total: validateNumber(0),
  as: _semanticUiReact.Button.Group.propTypes.as,
  attached: _semanticUiReact.Button.Group.propTypes.attached,
  basic: _semanticUiReact.Button.propTypes.basic,
  className: _semanticUiReact.Button.Group.propTypes.className,
  color: _semanticUiReact.Button.propTypes.color,
  compact: _semanticUiReact.Button.propTypes.compact,
  currentPageColor: _semanticUiReact.Button.propTypes.color,
  currentPageNegative: _semanticUiReact.Button.propTypes.negative,
  currentPagePositive: _semanticUiReact.Button.propTypes.positive,
  currentPagePrimary: _semanticUiReact.Button.propTypes.primary,
  currentPageSecondary: _semanticUiReact.Button.propTypes.secondary,
  currentPageStyle: _propTypes2.default.object,
  disabled: _semanticUiReact.Button.propTypes.disabled,
  floated: _semanticUiReact.Button.Group.propTypes.floated,
  fluid: _semanticUiReact.Button.Group.propTypes.fluid,
  inverted: _semanticUiReact.Button.propTypes.inverted,
  negative: _semanticUiReact.Button.propTypes.negative,
  nextPageAnimated: _semanticUiReact.Button.propTypes.animated,
  nextPageChildren: _semanticUiReact.Button.propTypes.children,
  nextPageContent: _semanticUiReact.Button.propTypes.content,
  nextPageIcon: _semanticUiReact.Button.propTypes.icon,
  nextPageIconPosition: _semanticUiReact.Button.propTypes.labelPosition,
  onClick: _semanticUiReact.Button.propTypes.onClick,
  otherPageColor: _semanticUiReact.Button.propTypes.color,
  otherPageNegative: _semanticUiReact.Button.propTypes.negative,
  otherPagePositive: _semanticUiReact.Button.propTypes.positive,
  otherPagePrimary: _semanticUiReact.Button.propTypes.primary,
  otherPageSecondary: _semanticUiReact.Button.propTypes.secondary,
  otherPageStyle: _propTypes2.default.object,
  positive: _semanticUiReact.Button.propTypes.positive,
  previousPageAnimated: _semanticUiReact.Button.propTypes.animated,
  previousPageChildren: _semanticUiReact.Button.propTypes.children,
  previousPageContent: _semanticUiReact.Button.propTypes.content,
  previousPageIcon: _semanticUiReact.Button.propTypes.icon,
  previousPageIconPosition: _semanticUiReact.Button.propTypes.labelPosition,
  primary: _semanticUiReact.Button.propTypes.primary,
  secondary: _semanticUiReact.Button.propTypes.secondary,
  size: _semanticUiReact.Button.Group.propTypes.size,
  vertical: _semanticUiReact.Button.Group.propTypes.vertical,
  reduced: _propTypes2.default.bool,
  style: _propTypes2.default.object,
  tabIndex: _semanticUiReact.Button.propTypes.tabIndex
};
Pagination.defaultProps = {
  basic: false,
  compact: false,
  currentPageNegative: false,
  currentPagePositive: false,
  currentPagePrimary: false,
  currentPageSecondary: false,
  disabled: false,
  fluid: false,
  inverted: false,
  negative: false,
  otherPageNegative: false,
  otherPagePositive: false,
  otherPagePrimary: false,
  otherPageSecondary: false,
  positive: false,
  primary: false,
  secondary: false,
  vertical: false,
  reduced: false
};
exports.default = Pagination;