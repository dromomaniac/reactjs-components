import React from 'react';
import classNames from 'classnames';

import ListItem from './ListItem';
import ListItemGroup from './ListItemGroup';

export default class List extends React.Component {

  defaultProps: {
    className: '',
  }

  propTypes: {
    className: React.PropTypes.string,
    items: React.PropTypes.array.isRequired,
    tag: React.PropTypes.string,
  }

  getListItems(list, childIndex) {
    var that = this;
    childIndex = childIndex || 0;

    var items = list.map(function(item, parentIndex) {
      var key = parentIndex + '.' + childIndex;
      childIndex++;

      if (item.items) {
        return (
          <ListItemGroup key={key} tag={item.tag} attributes={item.attributes}>
            {that.getListItems(item.items, childIndex)}
          </ListItemGroup>
        );
      } else {
        return (
          <ListItem key={key} tag={item.tag} attributes={item.attributes}>
            {item.value}
          </ListItem>
        );
      }

    });

    return items;
  }

  render() {
    var Tag = this.props.tag || 'div';

    var defaultClasses = [
      'list',
      'list-unstyled'
    ];

    var passedClasses = this.props.className.split(' ');

    var classes = classNames(defaultClasses.concat(passedClasses));

    return (
      <Tag {...this.props} className={classes}>
        {this.getListItems(this.props.items)}
      </Tag>
    );
  }

}
