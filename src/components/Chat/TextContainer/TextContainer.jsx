import React from 'react';

import onlineIcon from '../../../icons/onlineIcon.png';

import './TextContainer.css';

const TextContainer = ({ users }) => (
  <div className='textContainer'>
    <div>
      <h1>
        Tictactoe
        <br />
        Application
      </h1>
      <br />
    </div>
    {users ? (
      <div>
        <h3>Users chatting</h3>
        <div className='activeContainer'>
          <h5>
            {users.map(({ name }) => (
              <div key={name} className='activeItem'>
                {name}
                <img alt='Online Icon' src={onlineIcon} />
              </div>
            ))}
          </h5>
        </div>
      </div>
    ) : null}
  </div>
);

export default TextContainer;
