import React from 'react';

const Editor = ({ value, onChange }) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      className="editor"
      style={{ width: '600px', height: '300px' }}  // Ensure it has sufficient space
    />
  );
};

export default Editor;




