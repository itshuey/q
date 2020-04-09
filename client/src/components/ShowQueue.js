import React, { Component } from 'react';
import QueueItem from './QueueItem';
import '../App.css';
import './Q.css';

class ShowQueue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queue: []
    };
  }

  render() {
    const items = this.props.queueInfo;
    let filtered_items;
    if (items) filtered_items = items
      .filter(item => ["active", "in-progress", "finished"].includes(item.status));

    // console.log("Queue Contents: " + JSON.stringify(items));
    let quickQ = "n/a";
    let normalQ = "n/a";

    // filter based on type of queue, sort
    if(filtered_items) {
      quickQ = filtered_items
        .filter(item => item.type === 'quick')
        .map((item, k) =>
            <QueueItem
              status={item.status}
              canDelete={this.props.isAdmin || item.user_id === this.props.userID}
              index={k+1}
              item={item}
              key={item._id}
              timeZone={this.props.timeZone}
            />
      );

      normalQ = filtered_items
        .filter(item => item.type === 'normal')
        .map((item, k) =>
            <QueueItem
              status={item.status}
              canDelete={this.props.isAdmin || item.user_id === this.props.userID}
              index={k+1}
              item={item}
              key={item._id}
              timeZone={this.props.timeZone}
              updateInfo={this.props.updateInfo}
            />
      );
    }

    return (
      <div className="Queues">
        <div className="Queue">
          <div className="Queue-title">
            QUICK QUEUE
          </div>
          {quickQ}
        </div>
        <div className="Queue">
          <div className="Queue-title">
            NORMAL QUEUE
          </div>
          {normalQ}
        </div>
      </div>
    );
  }
}

export default ShowQueue;