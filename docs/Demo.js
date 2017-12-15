'use strict';

import React from 'react';
import {Button, Header, Icon, Segment} from 'semantic-ui-react';
import Pagination from '../src/Pagination';

class Demo extends React.Component {

  state = {
    defaultPagination: {
      offset: 0,
      limit: 10,
      total: 1000
    },
    reducedPagination: {
      offset: 0,
      limit: 10,
      total: 1000
    },
    compactPagination: {
      offset: 0,
      limit: 10,
      total: 1000
    },
    coloredAndIconPagination: {
      offset: 0,
      limit: 10,
      total: 1000
    },
    invertedPagination: {
      offset: 0,
      limit: 10,
      total: 1000
    }
  };

  handleClick = (propName) => (e, props, offset) => {
    setTimeout(() => {
      this.setState({
        [propName]: {
          ...this.state[propName],
          offset: offset
        }
      });
    }, 240);
  };

  render() {
    return (
      <Segment>
        <Header as='h1'>Demo of semantic-ui-react-button-pagination</Header>
        <Header as='h3'>Default</Header>
        <Pagination
          offset={this.state.defaultPagination.offset}
          limit={this.state.defaultPagination.limit}
          total={this.state.defaultPagination.total}
          onClick={this.handleClick('defaultPagination')}
        />
        <Header as='h3'>Reduced</Header>
        <Pagination
          offset={this.state.reducedPagination.offset}
          limit={this.state.reducedPagination.limit}
          total={this.state.reducedPagination.total}
          onClick={this.handleClick('reducedPagination')}
          reduced={true}
        />
        <Header as='h3'>Compact</Header>
        <Pagination
          offset={this.state.compactPagination.offset}
          limit={this.state.compactPagination.limit}
          total={this.state.compactPagination.total}
          onClick={this.handleClick('compactPagination')}
          compact={true}
        />
        <Header as='h3'>Colored and Animated Icon</Header>
        <Pagination
          offset={this.state.coloredAndIconPagination.offset}
          limit={this.state.coloredAndIconPagination.limit}
          total={this.state.coloredAndIconPagination.total}
          onClick={this.handleClick('coloredAndIconPagination')}
          currentPageColor={'pink'}
          otherPageColor={'teal'}
          previousPageAnimated={true}
          previousPageChildren={
            <React.Fragment>
              <Button.Content visible><Icon name="chevron left"/></Button.Content>
              <Button.Content hidden>Prev</Button.Content>
            </React.Fragment>
          }
          nextPageAnimated={true}
          nextPageChildren={
            <React.Fragment>
              <Button.Content visible><Icon name="chevron right"/></Button.Content>
              <Button.Content hidden>Next</Button.Content>
            </React.Fragment>
          }
        />
        <Header as='h3'>Inverted</Header>
        <div className="inverted-block">
          <Pagination
            offset={this.state.invertedPagination.offset}
            limit={this.state.invertedPagination.limit}
            total={this.state.invertedPagination.total}
            onClick={this.handleClick('invertedPagination')}
            color={'blue'}
            inverted
          />
        </div>
      </Segment>
    );
  }

}

export default Demo;
