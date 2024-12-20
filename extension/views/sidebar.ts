import * as vscode from 'vscode';
import { ImageStorageService } from '../service/ImageStorageService';

export class BusinessLogicCodeGenerationProvider implements vscode.WebviewViewProvider {
  constructor(protected context: vscode.ExtensionContext) {}

  public static currentWebviewView: vscode.WebviewView | undefined;
  private _webview: vscode.Webview | undefined;
  private _disposables: vscode.Disposable[] = [];

  public resolveWebviewView(webviewView: vscode.WebviewView) {
    BusinessLogicCodeGenerationProvider.currentWebviewView = webviewView;
    this._webview = webviewView.webview;

    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this.context.extensionUri],
    };

    webviewView.webview.html = __getWebviewHtml__(process.env.VITE_DEV_SERVER_URL)
    webviewView.webview.onDidReceiveMessage(async (message) => {
        const type = message.type;
        const data = message.data;
        console.log(`type: ${type}`);
        switch (type) {
          case 'hello':
            vscode.window.showInformationMessage(data);
            return;
          case 'upload-uml-sequence-diagram':
            try {
              const imagrUrl = await ImageStorageService.uploadImage(data);
              vscode.window.showInformationMessage('upload-uml-sequence-diagram success');
            } catch (error) {
              vscode.window.showErrorMessage('upload-uml-sequence-diagram failed');
            }
            // console.log('upload-uml-sequence-diagram');
            // console.log('image data:', data);
            webviewView.webview.postMessage({command: 'received-uml-sequence-diagram', data: data});
            return ;
        }
    },
    undefined,
    this._disposables);

    // todo check 这样操作是否合理
    BusinessLogicCodeGenerationProvider.currentWebviewView.onDidDispose(() => {
      BusinessLogicCodeGenerationProvider.currentWebviewView = undefined;
      this.dispose();
    })
  }

  // todo check 这样操作是否合理
  public dispose() {
    this._webview = undefined;
    this._disposables.forEach((d) => d.dispose());
    this._disposables = [];
  }
}
