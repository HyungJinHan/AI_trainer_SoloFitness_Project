import React from 'react';

import onlineIcon from '../../static/images/HHJ/icons/onlineIcon.png';
import closeIcon from '../../static/images/HHJ/icons/closeIcon.png';

import '../../styles/Chat/InfoBar.css';

const ChatInfoBar = ({ room }) => (
  <div className="infoBar">
    <div className="leftInnerContainer">
      <img className="onlineIcon" src={onlineIcon} alt="online icon" />
      <h3>{room}</h3>
    </div>
    <div className="rightInnerContainer">
      <a href="/"><img src={closeIcon} alt="close icon" /></a>
    </div>
  </div>
);

export default ChatInfoBar;