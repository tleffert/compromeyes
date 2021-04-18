import './App.css';

import { AppBar, Typography } from '@material-ui/core';

import CompromiseSearch from './containers/compromise-search';

function App() {
  return (
    <div className="App">
        <AppBar position="static">
            <Typography variant="h6">
              Are you Comprom(👀)'d ?
            </Typography>
        </AppBar>
        <CompromiseSearch />
    </div>
  );
}

export default App;
