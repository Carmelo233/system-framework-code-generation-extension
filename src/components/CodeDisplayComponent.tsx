import React, { useState } from 'react';

interface CodeDisplayComponentProps {
  onPrevious: () => void;
}

const CodeDisplayComponent: React.FC<CodeDisplayComponentProps> = ({ onPrevious }) => {
  const [selectedTab, setSelectedTab] = useState('Tab 1');

  return (
    <div>
      <div>
        <button onClick={() => setSelectedTab('Tab 1')}>Tab 1</button>
        <button onClick={() => setSelectedTab('Tab 2')}>Tab 2</button>
        <button onClick={() => setSelectedTab('Tab 3')}>Tab 3</button>
      </div>
      <div>{selectedTab}</div>
      {/* <VSCodeButton onClick={onPrevious}>上一步</VSCodeButton> */}
    </div>
  );
};

export default CodeDisplayComponent;
