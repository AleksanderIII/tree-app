import './App.css';
import Popup from './components/popup/Popup';
import Tree from './components/tree/Tree';
import { PopupProvider } from './context/PopupContext';

function App() {
  return (
    <PopupProvider>
      <Tree />
      <Popup />
    </PopupProvider>
  );
}

export default App;
