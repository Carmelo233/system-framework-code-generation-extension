// import { ExtensionContext, WebviewView, WebviewViewProvider } from 'vscode'
// import { AbstractViewProvider, ControllerOptions } from './abstract_view_provider'
// import { CecServer } from 'cec-client-server'

// export class ViewProviderSidebar extends AbstractViewProvider implements WebviewViewProvider {
//   constructor(context: ExtensionContext, controller: ControllerOptions) {
//     super(context, controller, {
//       distDir: 'out/view-vue',
//       indexPath: 'out/view-vue/index.html'
//     })
//   }

//   async resolveWebviewView(webviewView: WebviewView) {
//     const { webview } = webviewView
//     webview.options = {
//       enableScripts: true,
//       localResourceRoots: [this.context.extensionUri]
//     }
//     this.setControllers(webview)
//     webview.html = __getWebviewHtml__(process.env.VITE_DEV_SERVER_URL)
//   }
// }