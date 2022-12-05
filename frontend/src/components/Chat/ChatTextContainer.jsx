import React from 'react';

import onlineIcon from '../../static/images/HHJ/icons/onlineIcon.png';

import '../../styles/Chat/TextContainer.css';

const TextContainer = ({ users }) => (
  <div className="textContainer">
    <div>
      <h1>실시간 문의 채팅 방입니다. <span role="img" aria-label="emoji">💬</span></h1>
      <br />
      <br />
    </div>
    {
      users
        ? (
          <div>
            <h1>&lt; 현재 참여 중 &gt;</h1>
            <div className="activeContainer">
              <h2>
                {users.map(({ name }) => (
                  <div key={name} className="activeItem">
                    {name}
                    <img alt="Online Icon" src={onlineIcon} />
                  </div>
                ))}
              </h2>
            </div>
          </div>
        )
        : null
    }
  </div>
);

export default TextContainer;