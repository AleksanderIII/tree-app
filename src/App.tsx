import { CssBaseline, Container } from '@mui/material';

import Popup from './components/popup/Popup';
import Tree from './components/tree/Tree';

function App() {
  return (
    <>
      <CssBaseline />
      <Container>
        <Tree />
        <Popup />
      </Container>
    </>
  );
}

export default App;
