import { useState, useEffect } from 'react';
import { vscode } from './utils/vscode';
import UploadComponent from './components/UploadComponent';
import CodeDisplayComponent from './components/CodeDisplayComponent';

import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [state, setState] = useState('');
  const [showUploadComponent, setShowUploadComponent] = useState(true);
  const [response, setResponse] = useState('');

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const message = event.data; // The JSON data our extension sent

      switch (message.command) {
        case 'received-uml-sequence-diagram':
          console.log('received-uml-sequence-diagram');
          break;
        default:
          console.warn(`Unhandled message command: ${message.command}`);
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  const onSetState = () => {
    vscode.setState(state);
  };
  const onGetState = () => {
    setState((vscode.getState() || '') as string);
  };


  function onPostMessage() {
    vscode.postMessage({
      type: 'hello',
      data: `💬: ${message || 'Empty'}`,
    });
  }

  return (
    <main>
      <h1>Hello React!  1111</h1>
      {/* <VSCodeButton onClick={onPostMessage}>Test VSCode Message</VSCodeButton>
      <div>
        <VSCodeTextField value={message} onInput={e => setMessage(e.target.value)}>
          Please enter a message
        </VSCodeTextField>
        <div>Message is: {message}</div>
      </div>
      <div>
        <VSCodeTextField value={state} onInput={e => setState(e.target.value)}>
          Please enter a state
        </VSCodeTextField>
        <div>State is: {state}</div>
        <div>
          <VSCodeButton onClick={onSetState}>setState</VSCodeButton>
          <VSCodeButton style={{ marginLeft: '8px' }} onClick={onGetState}>
            getState
          </VSCodeButton>
        </div>
      </div> */}
      {showUploadComponent ? (
        <UploadComponent onNext={() => setShowUploadComponent(false)} />
      ) : (
        <CodeDisplayComponent onPrevious={() => setShowUploadComponent(true)} />
      )}
    </main>
  );
}

export default App;
