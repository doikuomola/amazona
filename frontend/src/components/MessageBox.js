import React from 'react';
import Alert from 'react-bootstrap/Alert';

export default function MessageBox(props) {
  const { variant } = props;
  return <Alert variant={variant || 'info'}>{props.children}</Alert>;
}
