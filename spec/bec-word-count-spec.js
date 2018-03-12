'use babel';

import BecWordCount from '../lib/bec-word-count';
describe('BecWordCount', () => {
  let workspaceElement, activationPromise, editor;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('bec-word-count');

    waitsForPromise(() => (
      atom.workspace.open().then(e => (editor = e))
    ));
  });

  describe('when the bec-word-count:toggle event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.bec-word-count')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'bec-word-count:toggle');

      waitsForPromise(() => activationPromise);

      runs(() => {
        expect(workspaceElement.querySelector('.bec-word-count')).toExist();

        let becWordCountElement = workspaceElement.querySelector('.bec-word-count');
        expect(becWordCountElement).toExist();

        let becWordCountPanel = atom.workspace.panelForItem(becWordCountElement);
        expect(becWordCountPanel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'bec-word-count:toggle');
        expect(becWordCountPanel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.bec-word-count')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'bec-word-count:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let becWordCountElement = workspaceElement.querySelector('.bec-word-count');
        expect(becWordCountElement).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'bec-word-count:toggle');
        expect(becWordCountElement).not.toBeVisible();
      });
    });
  });
});
