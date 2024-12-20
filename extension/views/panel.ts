import type { Disposable, ExtensionContext, WebviewPanel } from 'vscode';
import { ViewColumn, window } from 'vscode';
import { WebviewHelper } from './helper';

export class MainPanel {
  public static currentPanel: MainPanel | undefined;
  private readonly _panel: WebviewPanel;
  private _disposables: Disposable[] = [];

  private constructor(panel: WebviewPanel, context: ExtensionContext) {
    this._panel = panel;

    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
    this._panel.webview.html = WebviewHelper.setupHtml(this._panel.webview, context);

    WebviewHelper.setupWebviewHooks(this._panel.webview, this._disposables);
  }

  public static render(context: ExtensionContext) {
    if (MainPanel.currentPanel) {
      // 如果已经存在，则显示在第一个编辑器中
      MainPanel.currentPanel._panel.reveal(ViewColumn.One);
    } else {
      // 创建 panel 并绑定命令
      const panel = window.createWebviewPanel('showHelloWorld', 'Hello World', ViewColumn.One, {
        enableScripts: true,
      });

      // 创建 MainPanel 实例，目前理解为对 WebviewPanel 进行了一层封装
      MainPanel.currentPanel = new MainPanel(panel, context);
    }
    // 向 webview 端发送消息
    MainPanel.currentPanel._panel.webview.postMessage({ type: 'hello', data: 'Hello World!' });
  }

  /**
   * Cleans up and disposes of webview resources when the webview panel is closed.
   */
  public dispose() {
    MainPanel.currentPanel = undefined;

    // Dispose of the current webview panel
    this._panel.dispose();

    // Dispose of all disposables (i.e. commands) for the current webview panel
    while (this._disposables.length) {
      const disposable = this._disposables.pop();
      if (disposable) {
        disposable.dispose();
      }
    }
  }
}
