import './App.css';

import { Container, AppBar, Typography } from '@material-ui/core';

import CompromiseSearch from './containers/compromise-search';

function App() {
  return (
    <div className="App">
        <AppBar position="static">
            <Typography variant="h6">
              Are you Comprom(👀)'d ?
            </Typography>
        </AppBar>
        <Container maxWidth="lg">
            <CompromiseSearch />
        </Container>
    </div>
  );
}

export default App;
