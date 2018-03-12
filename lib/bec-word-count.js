'use babel';

import BecWordCountView from './bec-word-count-view';
import { CompositeDisposable } from 'atom';

export default {

  becWordCountView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.becWordCountView = new BecWordCountView(state.becWordCountViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.becWordCountView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'bec-word-count:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.becWordCountView.destroy();
  },

  serialize() {
    return {
      becWordCountViewState: this.becWordCountView.serialize()
    };
  },

  toggle() {
    if (this.modalPanel.isVisible()) {
      this.modalPanel.hide();
    } else {
      const editor = atom.workspace.getActiveTextEditor();
      const words = editor.getText().split(/\s+/).length;
      this.becWordCountView.setCount(words);
      this.modalPanel.show();
    }
  }

};
