import React, { Component } from 'react';
import axios from 'axios';
import '../App.css';
import './Q.css';

class QueueItem extends Component {
  constructor(props) {
    super(props);

    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  onDeleteClick() {
    axios
      .delete('http://localhost:8082/api/qitems/'+ this.props.item._id)
      .then(res => {
        // this.props.history.push("/");
        this.props.updateInfo();
      })
      .catch(err => {
        console.log(err.message);
        console.log("Error from QueueItem_deleteClick");
      });
  };

  render () {
    const name = this.props.item.name;
    const index = this.props.index;
    const date = new Date(this.props.item.time);

    let nameString = index + ". " + name;
    let minutes = date.getMinutes();
    if (minutes <= 9) minutes = "0" + minutes;
    let hours = (this.props.timeZone + date.getHours()) % 12;
    if (!hours) hours = 12;
    let dateString = hours + ":" + minutes;

    let deleteBlock = (
      <div
          className="Queue-item-delete Clickable"
          onClick={this.onDeleteClick}
      > x </div>
    );

    let emptyBlock = (
      <div className="Queue-item-empty-delete"> ~ </div>
    );

    return(
        <div className={"Queue-item " + this.props.status}>
          <div className="Queue-item-name">
            {nameString}
          </div>
          <div className="Queue-item-tail">
            <div className="Queue-item-date">
              {dateString}
            </div>
            {this.props.canDelete ? deleteBlock : emptyBlock}
          </div>
        </div>
    );
  };
};

export default QueueItem;