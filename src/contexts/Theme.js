import React from 'react';
const themes = {
  background: '#FAFAFF',
  default: '#EFF4FF',
  secondary: '#ACB8DA',
  primary: '#291554',
};

const ThemeContext = React.createContext(themes);
const ThemeProvider = props => {
  return (
    <ThemeContext.Provider value={themes}>
      {props.children}
    </ThemeContext.Provider>
  );
};
export default ThemeProvider;
export {ThemeContext};
