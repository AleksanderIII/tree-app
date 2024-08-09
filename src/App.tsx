import { CssBaseline, Container } from '@mui/material';

import Popup from './components/popup/Popup';
import Tree from './components/tree/Tree';
import { PopupProvider } from './context/PopupContext';

function App() {
  return (
    <PopupProvider>
      <CssBaseline />
      <Container>
        <Tree />
        <Popup />
      </Container>
    </PopupProvider>
  );
}

export default App;
