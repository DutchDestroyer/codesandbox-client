import React from 'react';
import Dropdown from 'react-dropdown';

const fontStyles = [
  { value: 'Times New Roman', label: 'Times New Roman' },
  { value: 'Arial', label: 'Arial' },
];

class DesignEditor extends React.PureComponent {
  render() {
    return (
      <>
        <label htmlFor="fontSize">
          Name:
          <input id="fontSize" type="text" placeholder="def" />
        </label>
        <div>
          <Dropdown options={fontStyles} placeholder="Select a fontfamily" />
        </div>
      </>
    );
  }
}

export default DesignEditor;
