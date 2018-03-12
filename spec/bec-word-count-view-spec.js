'use babel';

import BecWordCountView from '../lib/bec-word-count-view';

describe('BecWordCountView', () => {
  let view;
  beforeEach(() => {
    view = new BecWordCountView();
  })
  it('is initialized with no text content', () => {
    expect(view.element.children).not.toBeEmpty();
    expect(view.element.children[0].textContent).not.toExist();
  });

  it('updates the message when the word count changes', () => {
    const count = 100;
    view.setCount(count);
    const message = view.element.children[0];
    expect(message.textContent).toBe(`There are ${count} words.`);
  });
});
