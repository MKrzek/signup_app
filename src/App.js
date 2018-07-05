import React, { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";

import CommentBox from "./components/CommentBox";
import CommentList from "./components/CommentList";
import { connect } from "react-redux";

import * as actions from "./actions/index";

class App extends Component {
  renderButton() {
    if (this.props.auth) {
      return (
        <button onClick={() => this.props.changeAuth(false)}>Sign Out</button>
      );
    } else {
      return (
        <button onClick={() => this.props.changeAuth(true)}>Sign In </button>
      );
    }
  }
  renderHeader() {
    return (
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/post">Post a comment</Link>
        </li>
        <li>{this.renderButton()}</li>
      </ul>
    );
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          {this.renderHeader()}
          <Route path="/post" component={CommentBox} />
          <Route exact path="/" component={CommentList} />
        </div>
      </BrowserRouter>
    );
  }
}
function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(
  mapStateToProps,
  actions
)(App);
// render(<p>ha</pa>, document.getElementbyId('root'))
