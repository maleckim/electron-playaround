import React from 'react';

export default function TestChat(props) {
  console.log(props);
  return props.messages.map((a) => <p>{a}</p>);
}
