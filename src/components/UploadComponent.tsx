import React from 'react';
import { useState } from 'react';
import { vscode } from '../utils/vscode';


interface UploadComponentProps {
  onNext: () => void;
}

const UploadComponent: React.FC<UploadComponentProps> = ({ onNext }) => {
  const [directoryPath, setDirectoryPath] = useState<string>('');
  
  const handleDirectorySelect = async () => {
    try {
      const directoryHandle = await (window as any).showDirectoryPicker();
      setDirectoryPath(directoryHandle.name);
      vscode.postMessage({
        type: 'selected-directory',
        data: directoryHandle.name,
      });
    } catch (error) {
      console.error('Error selecting directory:', error);
    }
  };

  const isAcceptFile = (file: File, accept: string | string[]): boolean => {
    if (accept && file) {
      const accepts = Array.isArray(accept)
        ? accept
        : accept
            .split(',')
            .map((x) => x.trim())
            .filter((x) => x);
      const fileExtension = file.name.indexOf('.') > -1 ? file.name.split('.').pop() : '';
      return accepts.some((type) => {
        const text = type && type.toLowerCase();
        const fileType = (file.type || '').toLowerCase();
        if (text === fileType) {
          return true;
        }
        if (new RegExp('/\*').test(text)) {
          const regExp = new RegExp('/.*$');
          return fileType.replace(regExp, '') === text.replace(regExp, '');
        }
        if (new RegExp('\..*').test(text)) {
          return text === `.${fileExtension && fileExtension.toLowerCase()}`;
        }
        return false;
      });
    }
    return !!file;
  };

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      console.log('webview: upload-uml-sequence-diagram');
      const base64String = reader.result as string;
      vscode.postMessage({
        type: 'upload-uml-sequence-diagram',
        data: base64String,
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className='flex'>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const files = e.target.files;
          if (files && files[0]) {
            handleFileUpload(files[0]);
          }
        }}
      />
      <br />
      {/* todo webview 里面不支持拿路径 */}
      <vscode-button id="select-directory" onClick={handleDirectorySelect}>选择目录</vscode-button>
      <br />
      {directoryPath && <p>选定的目录: {directoryPath}</p>}
      <vscode-button id="button-1" onClick={onNext}>下一步</vscode-button>
    </div>
  );
};

export default UploadComponent;
