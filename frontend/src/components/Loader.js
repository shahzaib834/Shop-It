import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const Loader = () => {
  return (
    <Spinner animation='grow' role='status' size='lg' style={styles.spinner} />
  );
};
const styles = {
  spinner: {
    width: '200px',
    height: '200px',
    display: 'block',
    margin: 'auto',
    marginTop: '18%',
    marginBottom: '18%',
  },
};

export default Loader;
