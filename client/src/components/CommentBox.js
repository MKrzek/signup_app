import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions/index";
import requireAuth from "./requireAuth";
class CommentBox extends React.Component {
  state = { comment: "" };

  handleChange = event => {
    this.setState({ comment: event.target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    this.props.saveComment(this.state.comment);
    this.setState({ comment: "" });
  };
  render() {
    return (
      <div>
        <h1>Enter a comment</h1>
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange} value={this.state.comment} />
          <button>Submit</button>
        </form>
        <button onClick={this.props.fetchComment}>Fetch Comments</button>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(requireAuth(CommentBox));
