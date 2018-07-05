import React from "react";
import { connect } from "react-redux";
class CommentList extends React.Component {
  renderComments() {
    return this.props.comments.map(comment => {
      return <li key={comment}>{comment}</li>;
    });
  }
  render() {
    return (
      <div>
        <h1>Comment List</h1>
        <ul>{this.renderComments()}</ul>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    comments: state.fetchComments
  };
}

export default connect(
  mapStateToProps,
  null
)(CommentList);
