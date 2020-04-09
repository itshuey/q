import React from 'react';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import socketIOClient from "socket.io-client";

import q from './q.png';
import './App.css';
import axios from 'axios';

import ShowQueue from './components/ShowQueue';
import Stopwatch from './components/Stopwatch';

class App extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);
    const { cookies } = props;

    this.state = {
      showLandingPage: true,
      showSettingsPanel: false,
      showInformationPanel: false,
      isAdmin: false,
      inQueue: false,
      processing: false,
      timeZone: 0,
      name: cookies.get('name') || '',
      userID: cookies.get('user_id') || '',
      // socket: socketIOClient('https://huey-q.herokuapp.com/'),
      socket: socketIOClient('http://localhost:8080')
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNewName = this.handleNewName.bind(this);
    this.handleDQ = this.handleDQ.bind(this);
    this.handleFinish = this.handleFinish.bind(this);
    this.enterQueue = this.enterQueue.bind(this);
    this.renderIntro = this.renderIntro.bind(this);
    this.renderMain = this.renderMain.bind(this);
    this.updateQueueInfo = this.updateQueueInfo.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
  };

  componentDidMount() {
    this.updateQueueInfo();

    // handle cookies
    const { cookies } = this.props;
    if (!cookies.get('user_id')) {
      let uniq_id = [...Array(10)].map(_=>(Math.random()*36|0).toString(36)).join``;
      cookies.set('user_id', uniq_id, { path: '/' });
      this.setState({ userID: uniq_id});
    }

    this.state.socket.on('outgoing data', (data) => {
      console.log("Recieved express socket ping.")
      // console.log(data);
      this.setState({ queueInfo: data.info });
      if (!data.info.find(
        item => item.user_id === this.state.userID &&
        item.status !== "done"))
        this.setState({ inQueue: false });
      if (data.info.find(
        item => item.user_id === this.state.userID &&
        (item.status === "in-progress" || item.status === "finished"))) {

      }
    });
  };

  enterQueue() {
    const { cookies } = this.props;
    const data = {
      name: this.state.name,
      user_id: cookies.get('user_id') || 888,
    };

    axios
      .post('/api/qitems', data)
      .then(res => {
        // this.props.history.push('/');
        this.updateQueueInfo();
        this.setState({inQueue: true});
      })
      .catch(err => {
        console.log(err.message);
        console.log("Error in create!");
      })
  };

  updateQueueInfo() {
    axios
      .get('/api/qitems')
      .then(res => {
        this.setState({ queueInfo: res.data });
        this.state.socket.emit('incoming data', res.data);
        if (!res.data.find(
          item => item.user_id === this.state.userID &&
          item.status === "active"))
          this.setState({ inQueue: false });
      })
      .catch(err =>{
        console.log(err.message);
        console.log('Error from updateQueueInfo');
      });
  };

  handleChange(event) {
    this.setState({name: event.target.value});
  };

  handleNewName(user_id) {
    if (!this.state.queueInfo) return;
    this.state.queueInfo
      .filter(item => item.user_id === user_id)
      .forEach((item, i) => {
        const data = {
          name: this.state.name,
          user_id: item.user_id,
          type: item.type,
          status: item.status,
        };
        axios
          .put('/api/qitems/'+item._id, data)
          .then(res => {
            console.log('Updated!');
            this.updateQueueInfo();
          })
          .catch(err => {
            console.log("Error in handleNewName!");
          })
      });
  }

  updateStatus(item, newStatus) {
    const data = {
      name: item.name,
      user_id: item.user_id,
      type: item.type,
      status: newStatus,
    }
    axios
      .put('/api/qitems/'+item._id, data)
      .then(res => {
        console.log('Updated!');
        this.updateQueueInfo();
      })
      .catch(err => {
        console.log("Error in updateStatus!");
      });
  };

  handleDQ() {
    if (this.state.queueInfo) {
      let item = this.state.queueInfo.find(item => item.status === "active");
      if (item) this.updateStatus(item, "in-progress");
    }
  }

  handleFinish() {
    if (this.state.queueInfo) {
      let item = this.state.queueInfo.find(item => item.status === "in-progress");
      if (item) {
        this.updateStatus(item, "finished");
        setTimeout(() => this.updateStatus(item, "done"), 500);
      };
    };
  };

  handleSubmit(event) {
    const { cookies } = this.props;
    this.setState({showLandingPage: false});

    if (this.state.name === "q-admin" && !this.state.isAdmin) {
      this.setState({ isAdmin: true });
    } else if ( this.state.isAdmin ){
      this.setState({ isAdmin: false });
    };

    // Only set as anon if there is no stored name
    if (!this.state.name)
      this.setState({name: cookies.get('name') || "Anonymous"});
    // If there is need to update, handle potential queue updates
    if (this.state.name !== cookies.get('name')) {
      this.handleNewName(cookies.get('user_id'));
      cookies.set('name', this.state.name, { path: '/' });
    }
    event.preventDefault();
  };

  renderIntro() {
    let form = (
      <form className="Name-form" onSubmit={this.handleSubmit}>
        <label>
        Hi, I'm
          <input
            className="Landing-name-text"
            type="text"
            placeholder={this.state.name}
            value={this.state.value}
            onChange={this.handleChange}
          />
        </label>
        <input className="Landing-name-submit" type="submit" value="<Enter>" />
      </form>
    );

    return (
      <div className="Entry">
        <div className="Welcome">
          WELCOME TO THE QUEUE.
        </div>
        {form}
      </div>
    );
  };

  renderMain() {
    let sidePanel;

    if (this.state.isAdmin) {
      sidePanel = (
        <div className="Side-panel">
          {this.state.queueInfo.find(item => item.status !== "done") &&
          (this.state.processing ? <Stopwatch /> :
            <div className="Dequeue" onClick={
              () => {
                this.setState({ processing : true });
                this.handleDQ();
              }
            }>
              DQ Next Student
            </div>)
        }
          {this.state.processing &&
            <div className="Finish" onClick={
              () => {
                this.setState({ processing : false });
                this.handleFinish();
              }
            }>
            Finish current student
          </div>}
          <div className="Manage-settings Clickable" onClick={
            () => this.setState({ showSettingsPanel: true, showInformationPanel: false })
          }>
            Manage Settings
          </div>
          <div className="Help Clickable" onClick={
            () => this.setState({ showInformationPanel: true, showSettingsPanel: false })
          }>
            More Information
          </div>
        </div>
      );
    } else {
      sidePanel = (
        <div className="Side-panel">
          {
            this.state.inQueue ? <Stopwatch /> :
              <div className="Enter-queue Clickable" onClick={this.enterQueue}>
                Enter The Queue
              </div>
          }
          <div className="Manage-settings Clickable" onClick={
            () => this.setState({ showSettingsPanel: true, showInformationPanel: false })
          }>
            Manage Settings
          </div>
          <div className="Help Clickable" onClick={
            () => this.setState({ showInformationPanel: true, showSettingsPanel: false })
          }>
            More Information
          </div>
        </div>
      );
    };

    let contentPanel = null;
    if (this.state.showSettingsPanel) {
      contentPanel = (
        <div className="Side-panel">
          <div className="Settings">
            <form className="Settings-name-form" onSubmit={this.handleSubmit}>
              <label>
              Name:
                <input
                  className="Settings-name-text"
                  placeholder={this.state.name}
                  type="text"
                  value={this.state.value}
                  onChange={this.handleChange}
                />
              </label>
              <input className="Settings-name-submit" type="submit" value="<Save>" />
            </form>
            <div className="Back Clickable"
              onClick={() => this.setState({showSettingsPanel: false})}
            >
            Back
            </div>
          </div>
        </div>
      );
    } else if (this.state.showInformationPanel) {
      contentPanel = (
        <div className="Side-panel">
          <div>
            Q is a queueing app made by Huey. <br />
            Created with a <b>MERN</b> stack.
          </div>
          <div className="Back Clickable"
            onClick={() => this.setState({showInformationPanel: false})}>
          Back
          </div>
        </div>
      );
    }

    return (
      <div className="Main">
        <ShowQueue
          isAdmin={this.state.isAdmin}
          userID={this.state.userID}
          queueInfo={this.state.queueInfo}
          timeZone={this.state.timeZone}
          updateInfo={this.updateQueueInfo}
        />
        {sidePanel}
        {contentPanel}
      </div>
    );
  };

  render() {
    let header = (
      <header className="App-header">
        <img
          src={q}
          className="App-logo Clickable"
          alt="logo"
          onClick={() => this.setState({ showLandingPage: true })}
        />
        <div className="Session-details">
          <div className="Session-details-instructor">
            Huey Sun
          </div>
          <div className="Session-details-time">
            CS62 6-8PM
          </div>
          { this.state.isAdmin &&
          <div className="Session-details-admin">
            ADMIN MODE
          </div>
          }
        </div>
      </header>
    );

    let logo = (
      <div className="Welcome-logo">
        <img src={q} className="App-logo-main" alt="logo" />
      </div>
    );

    return (
      <div className="App">
        {this.state.showLandingPage ? logo: header}
        <div className="Content">
          {this.state.showLandingPage ? this.renderIntro() : this.renderMain()}
        </div>
      </div>
    );
  };
}

export default withCookies(App);