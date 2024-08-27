import {Component} from 'react'

import './index.css'

import {v4 as uuidv4} from 'uuid'

import CommentItem from '../CommentItem'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

// Write your code here
class Comments extends Component {
  state = {nameInput: '', commentsInput: '', commentsList: []}

  commentsListItems = () => {
    const {commentsList} = this.state

    return commentsList.map(eachComment => (
      <CommentItem
        key={eachComment.id}
        commentIteminfo={eachComment}
        toggleIsLiked={this.toggleIsLiked}
        deletebtn={this.deletebtn}
      />
    ))
  }

  toggleIsLiked = id => {
    this.setState(prvState => ({
      commentsList: prvState.commentsList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return {eachComment}
      }),
    }))
  }

  deletebtn = commentId => {
    const {commentsList} = this.state
    this.setState({
      commentsList: commentsList.filter(eachItem => eachItem.id !== commentId),
    })
  }

  onchangeComment = event => {
    this.setState({commentsInput: event.target.value})
  }

  onchangeName = event => {
    this.setState({nameInput: event.target.value})
  }

  onSubmitevent = event => {
    event.preventDefault()
    const {nameInput, commentsInput} = this.state
    const initialBackgroundClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`

    const newComment = {
      id: uuidv4(),
      name: nameInput,
      comment: commentsInput,
      date: new Date(),
      isLiked: false,
      initialClassName: initialBackgroundClassName,
    }

    this.setState(prvState => ({
      commentsList: [...prvState.commentsList, newComment],
      nameInput: '',
      commentsInput: '',
    }))
  }

  render() {
    const {nameInput, commentsInput, commentsList} = this.state
    return (
      <div className="main-container">
        <h1 className="heding">Comments</h1>
        <div className="form-comment-container">
          <div className="from-container">
            <form className="from-input" onSubmit={this.onSubmitevent}>
              <p className="para">Say something about 4.0 Technologies</p>
              <input
                type="text"
                placeholder="Your Name"
                className="input-value"
                onChange={this.onchangeName}
                value={nameInput}
              />
              <textarea
                placeholder="Your Comment"
                className="textarea-value"
                onChange={this.onchangeComment}
                value={commentsInput}
                rows="7"
              />
              <button type="submit" className="btn-Comments">
                Add Comment
              </button>
            </form>
          </div>
          <div className="img-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
              className="comments-img"
            />
          </div>
        </div>
        <hr className="hr-line" />
        <p className="comments-count">
          <span className="span-count">{commentsList.length}</span>
          Comments
        </p>
        <ul className="unorder-list">{this.commentsListItems()}</ul>
      </div>
    )
  }
}
export default Comments
