import React from 'react';

const Header = (props) => {
    return (
        <div className="App-header">
          {props.titulo}
        </div>
    );
};

export default Header;