'use babel';

import Test001View from './test001-view';
import { CompositeDisposable } from 'atom';

export default {

  test001View: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.test001View = new Test001View(state.test001ViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.test001View.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'test001:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.test001View.destroy();
  },

  serialize() {
    return {
      test001ViewState: this.test001View.serialize()
    };
  },

  toggle() {
    console.log('Test001 was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
