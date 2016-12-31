import React from 'react';
import $ from 'jquery';

class Tweets extends React.Component {
  constructor(props) {
    super(props);
    this.getTweets = this.getTweets.bind(this);
    this.tweet = this.tweet.bind(this);
    this.state = { tweets: [] }
  }

  tweet(e) {
    e.preventDefault();
    $.ajax({
      url: '/tweets',
      type: 'POST',
      data: { tweet: this.refs.tweet.value }
    }).done( tweet => {
      console.log(tweet.text);
      this.refs.tweet.value = null;
    });
  }

  getTweets(e) {
    e.preventDefault();
    $.ajax({
      url: `/tweets/${this.refs.handle.value}`,
      type: 'GET'
    }).done( tweets => {
      this.setState({ tweets });
      this.refs.handle.value = null;
    });
  }

  render() {
    let tweets = this.state.tweets.map( tweet => {
      return (<li className="collection-item" key={tweet.id}>{tweet.text}</li>)
    });

    return (
      <div>
        <h3 className="center">Tweets</h3>
        <form onSubmit={this.tweet}>
          <input ref="tweet" placeholder="Don't be bully" />
        </form>
        <form onSubmit={this.getTweets}>
          <input ref="handle" placeholder="handle" />
        </form>
        <ul className="collection">
          {tweets}
        </ul>
      </div>
    )
  }
}

export default Tweets;













