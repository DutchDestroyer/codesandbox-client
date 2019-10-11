import React from 'react';

import getTemplateDefinition from '@codesandbox/common/lib/templates';

import DesignEditor from '../DesignEditor';
import { CodeEditor } from '../CodeEditor';

const settings = store => ({
  fontFamily: store.preferences.settings.fontFamily,
  fontSize: store.preferences.settings.fontSize,
  lineHeight: store.preferences.settings.lineHeight,
  autoCompleteEnabled: store.preferences.settings.autoCompleteEnabled,
  autoDownloadTypes: store.preferences.settings.autoDownloadTypes,
  vimMode: store.preferences.settings.vimMode,
  lintEnabled: store.preferences.settings.lintEnabled,
  codeMirror: store.preferences.settings.codeMirror,
  tabWidth: store.preferences.settings.prettierConfig
    ? store.preferences.settings.prettierConfig.tabWidth || 2
    : 2,
  enableLigatures: store.preferences.settings.enableLigatures,
  experimentVSCode: store.preferences.settings.experimentVSCode,
  prettierConfig: store.preferences.settings.prettierConfig,
  forceRefresh: store.preferences.settings.forceRefresh,
});

export default class EditorType extends React.Component {
  render() {
    const { signals } = this.props;
    const { store } = this.props;

    const { currentModule } = store.editor;
    const sandbox = store.editor.currentSandbox;
    const { currentTab } = store.editor;

    const template = getTemplateDefinition(sandbox.template);

    const isReadOnly = () => {
      if (store.live.isLive) {
        if (
          !store.live.isCurrentEditor ||
          (store.live.roomInfo && store.live.roomInfo.ownerIds.length === 0)
        ) {
          return true;
        }
      }

      if (template.isServer) {
        if (!store.isLoggedIn || store.server.status !== 'connected') {
          return true;
        }
      }
      return false;
    };

    if (this.props.isCodeEditor) {
      return (
        <CodeEditor
          style={{
            top: store.preferences.settings.experimentVSCode ? 0 : 35,
          }}
          onInitialized={this.onInitialized}
          sandbox={sandbox}
          currentTab={currentTab}
          currentModule={currentModule}
          isModuleSynced={shortId =>
            !store.editor.changedModuleShortids.includes(shortId)
          }
          width={this.props.height}
          height={this.props.width}
          settings={settings(store)}
          sendTransforms={this.sendTransforms}
          readOnly={isReadOnly()}
          isLive={store.live.isLive}
          onCodeReceived={signals.live.onCodeReceived}
          onSelectionChanged={signals.live.onSelectionChanged}
          onNpmDependencyAdded={name => {
            if (sandbox.owned) {
              signals.editor.addNpmDependency({ name, isDev: true });
            }
          }}
          onChange={(code, moduleShortid) =>
            signals.editor.codeChanged({
              code,
              moduleShortid: moduleShortid || currentModule.shortid,
              noLive: true,
            })
          }
          onModuleChange={moduleId =>
            signals.editor.moduleSelected({ id: moduleId })
          }
          onModuleStateMismatch={signals.live.onModuleStateMismatch}
          onSave={code =>
            signals.editor.codeSaved({
              code,
              moduleShortid: currentModule.shortid,
            })
          }
          tsconfig={
            store.editor.parsedConfigurations.typescript &&
            store.editor.parsedConfigurations.typescript.parsed
          }
        />
      );
    }

    return <DesignEditor />;
  }
}
