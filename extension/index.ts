import type { ExtensionContext } from 'vscode';
import * as vscode from 'vscode';
import { MainPanel } from './views/panel';
import { BusinessLogicCodeGenerationProvider } from './views/sidebar';
// import { ViewProviderSidebar } from './views/sidebar_view_provider';
// import { getControllers } from 'cec-client-server/decorator';
// import "reflect-metadata";

export function activate(context: ExtensionContext) {
  // Add command to the extension context
  context.subscriptions.push(
    vscode.commands.registerCommand('hello-world.showHelloWorld', async () => {
      MainPanel.render(context);
    }),
  );

  const businessLogicCodeGenerationProvider1 = new BusinessLogicCodeGenerationProvider(context);
  context.subscriptions.push(
	  vscode.window.registerWebviewViewProvider('blcg-webview', businessLogicCodeGenerationProvider1)
	);

  // const { callables, subscribables } = getControllers()
  // // sibebar view 实例化
  // const viewProvidersidebar = new ViewProviderSidebar(context, { callables, subscribables })
  // // 在 views（ sidebar-view-container 已在 package.json 的 contributes 中声明）中注册
  // const sidebarViewDisposable = vscode.window.registerWebviewViewProvider(
  //   'blcg-webview2',
  //   viewProvidersidebar,
  //   { webviewOptions: { retainContextWhenHidden: true } }
  // )
}

export function deactivate() {}

