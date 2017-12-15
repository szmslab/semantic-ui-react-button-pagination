'use strict';

import PropTypes from 'prop-types';
import React from 'react';
import {Button} from 'semantic-ui-react';
import {computePagination, getOffset} from './core';

const validateNumber = (min) => {
  return (props, propName, componentName) => {
    const value = props[propName];
    const type = typeof value;
    if (type !== 'number') {
      return new Error(
        'Failed prop type: Invalid prop `' + propName + '` of type `' + type +
        '` supplied to `' + componentName + '`, expected `number`.'
      );
    }
    const intValue = parseInt(value, 10);
    if (intValue < min) {
      return new Error(
        'Failed prop value: Invalid prop `' + propName + '` of value `' + value +
        '` supplied to `' + componentName + '`, expected a number greater than or equal to `' + min + '`.'
      );
    }
  };
};

class Pagination extends React.PureComponent {

  static propTypes = {
    offset: validateNumber(0),
    limit: validateNumber(1),
    total: validateNumber(0),
    as: Button.Group.propTypes.as,
    attached: Button.Group.propTypes.attached,
    basic: Button.propTypes.basic,
    className: Button.Group.propTypes.className,
    color: Button.propTypes.color,
    compact: Button.propTypes.compact,
    currentPageColor: Button.propTypes.color,
    currentPageNegative: Button.propTypes.negative,
    currentPagePositive: Button.propTypes.positive,
    currentPagePrimary: Button.propTypes.primary,
    currentPageSecondary: Button.propTypes.secondary,
    currentPageStyle: PropTypes.object,
    disabled: Button.propTypes.disabled,
    floated: Button.Group.propTypes.floated,
    fluid: Button.Group.propTypes.fluid,
    inverted: Button.propTypes.inverted,
    negative: Button.propTypes.negative,
    nextPageAnimated: Button.propTypes.animated,
    nextPageChildren: Button.propTypes.children,
    nextPageContent: Button.propTypes.content,
    nextPageIcon: Button.propTypes.icon,
    nextPageIconPosition: Button.propTypes.labelPosition,
    onClick: Button.propTypes.onClick,
    otherPageColor: Button.propTypes.color,
    otherPageNegative: Button.propTypes.negative,
    otherPagePositive: Button.propTypes.positive,
    otherPagePrimary: Button.propTypes.primary,
    otherPageSecondary: Button.propTypes.secondary,
    otherPageStyle: PropTypes.object,
    positive: Button.propTypes.positive,
    previousPageAnimated: Button.propTypes.animated,
    previousPageChildren: Button.propTypes.children,
    previousPageContent: Button.propTypes.content,
    previousPageIcon: Button.propTypes.icon,
    previousPageIconPosition: Button.propTypes.labelPosition,
    primary: Button.propTypes.primary,
    secondary: Button.propTypes.secondary,
    size: Button.Group.propTypes.size,
    vertical: Button.Group.propTypes.vertical,
    reduced: PropTypes.bool,
    style: PropTypes.object,
    tabIndex: Button.propTypes.tabIndex
  };

  static defaultProps = {
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

  handleClick = (targetPage) => (e, props) => {
    this.props.onClick && this.props.onClick(e, props, getOffset(targetPage, this.props.limit));
  };

  renderButtons() {
    const {
      offset,
      limit,
      total,
      reduced,
      previousPageAnimated,
      previousPageChildren,
      previousPageContent,
      previousPageIcon,
      previousPageIconPosition,
      nextPageAnimated,
      nextPageChildren,
      nextPageContent,
      nextPageIcon,
      nextPageIconPosition
    } = this.props;

    return computePagination(offset, limit, total, reduced ? 1 : 2).map(o => {
      if (o.isCurrent) {
        return this.renderCurrentButton(o.page);
      } else if (o.isEnd) {
        if (o.isLowSide) {
          return this.renderEndButton(o.page, 'pr', {
            animated: previousPageAnimated,
            children: previousPageChildren,
            content: previousPageContent,
            defaultChildren: '<',
            icon: previousPageIcon,
            iconPosition: previousPageIconPosition
          });
        } else {
          return this.renderEndButton(o.page, 'nx', {
            animated: nextPageAnimated,
            children: nextPageChildren,
            content: nextPageContent,
            defaultChildren: '>',
            icon: nextPageIcon,
            iconPosition: nextPageIconPosition
          });
        }
      } else if (o.isEllipsis) {
        return this.renderEllipsisButton(o.isLowSide ? 'le' : 'he');
      }
      return this.renderOtherButton(o.page);
    });
  }

  renderCurrentButton(targetPage) {
    const disabled = this.props.disabled || this.props.total <= 0;
    return (
      <Button
        active={true}
        basic={this.props.basic}
        children={'' + targetPage}
        className="currentPage"
        color={this.props.currentPageColor || this.props.color}
        compact={this.props.compact}
        disabled={disabled}
        inverted={this.props.inverted}
        key={'cr' + targetPage}
        negative={this.props.currentPageNegative || this.props.negative}
        positive={this.props.currentPagePositive || this.props.positive}
        primary={this.props.currentPagePrimary || this.props.primary}
        secondary={this.props.currentPageSecondary || this.props.secondary}
        style={this.props.currentPageStyle}
        tabIndex={disabled ? null : this.props.tabIndex}
      />
    );
  }

  renderOtherButton(targetPage) {
    const children = '' + targetPage;
    const disabled = this.props.disabled || this.props.total <= 0;
    return (
      <Button
        basic={this.props.basic}
        children={children}
        className="otherPage"
        color={this.props.otherPageColor || this.props.color}
        compact={this.props.compact}
        disabled={disabled}
        inverted={this.props.inverted}
        key={children}
        negative={this.props.otherPageNegative || this.props.negative}
        onClick={this.handleClick(targetPage)}
        positive={this.props.otherPagePositive || this.props.positive}
        primary={this.props.otherPagePrimary || this.props.primary}
        secondary={this.props.otherPageSecondary || this.props.secondary}
        style={this.props.otherPageStyle}
        tabIndex={disabled ? null : this.props.tabIndex}
      />
    );
  }

  renderEllipsisButton(key) {
    return (
      <Button
        basic={this.props.basic}
        disabled={true}
        children={'...'}
        className="otherPage"
        color={this.props.otherPageColor || this.props.color}
        compact={this.props.compact}
        inverted={this.props.inverted}
        key={key}
        negative={this.props.otherPageNegative || this.props.negative}
        positive={this.props.otherPagePositive || this.props.positive}
        primary={this.props.otherPagePrimary || this.props.primary}
        secondary={this.props.otherPageSecondary || this.props.secondary}
        style={this.props.otherPageStyle}
      />
    );
  }

  renderEndButton(targetPage, key, props) {
    const disabled = this.props.disabled || this.props.total <= 0 || targetPage <= 0;
    const hasChildren = !(props.children == null || (Array.isArray(props.children) && props.children.length === 0));
    const defaultChildren = !props.children && !props.content && !props.icon ? props.defaultChildren : null;
    return (
      <Button
        animated={props.animated}
        basic={this.props.basic}
        children={defaultChildren || (hasChildren ? props.children : null)}
        className="otherPage"
        color={this.props.otherPageColor || this.props.color}
        compact={this.props.compact}
        content={hasChildren ? null : props.content}
        disabled={disabled}
        icon={hasChildren ? null : props.icon}
        inverted={this.props.inverted}
        key={key}
        labelPosition={props.iconPosition}
        negative={this.props.otherPageNegative || this.props.negative}
        onClick={this.handleClick(targetPage)}
        positive={this.props.otherPagePositive || this.props.positive}
        primary={this.props.otherPagePrimary || this.props.primary}
        secondary={this.props.otherPageSecondary || this.props.secondary}
        style={this.props.otherPageStyle}
        tabIndex={disabled ? null : this.props.tabIndex}
      />
    );
  }

  render() {
    const {
      as,
      attached,
      basic,
      className,
      compact,
      floated,
      fluid,
      inverted,
      size,
      vertical,
      style
    } = this.props;
    return (
      <Button.Group
        as={as}
        attached={attached}
        basic={basic}
        className={'semantic-ui-react-button-pagination' + (className ? ' ' + className : '')}
        compact={compact}
        floated={floated}
        fluid={fluid}
        inverted={inverted}
        size={size}
        vertical={vertical}
        style={style}
      >
        {this.renderButtons()}
      </Button.Group>
    );
  }

}

export default Pagination;
