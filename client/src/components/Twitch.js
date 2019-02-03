import React, { Component } from 'react';
import '../App.css';

class Twitch extends Component {
    render(){
        let chatUrl;
        let streamUrl;
        if (this.props.isLive && this.props.sessionData.streamInfo) {
            chatUrl = `https://www.twitch.tv/embed/${this.props.sessionData.streamInfo.streamQueue[this.props.streamIndex].stream.streamName}/chat`;
            streamUrl = `https://player.twitch.tv/?channel=${this.props.sessionData.streamInfo.streamQueue[this.props.streamIndex].stream.streamName}&muted=true`;
            return(
                <div className="twitch">
                    <div>
                    <iframe
                        id="video"
                        src={streamUrl}
                        height="200"
                        width="350"
                        frameBorder="0"
                        scrolling="no"
                        allowFullScreen={true}>
                    </iframe>
                    </div>
                    <iframe frameBorder="0"
                        id="chat"
                        scrolling="yes"
                        id="chat_embed"
                        src={chatUrl}
                        height="450"
                        width="350">
                    </iframe>
                </div>
            )
        } else {
            return(
                <div className="twitch">
                    {this.props.isLive ? "No stream information" : "Go live to see twitch"}
                </div>
            )
        }
    }
}

export default Twitch;