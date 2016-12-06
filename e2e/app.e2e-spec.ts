import { BoardgamesNewPage } from './app.po';

describe('boardgames-new App', function() {
  let page: BoardgamesNewPage;

  beforeEach(() => {
    page = new BoardgamesNewPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
