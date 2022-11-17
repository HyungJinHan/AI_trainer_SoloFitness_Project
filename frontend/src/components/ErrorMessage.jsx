import React from 'react';

function ErrorMessage(props) {
  return (
    <p className="has-text-weight-bold has-text-dager">{props.message}</p>
  );
}

export default ErrorMessage;