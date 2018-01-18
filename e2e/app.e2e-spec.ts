import { DJRoomsPage } from './app.po';

describe('dj-rooms App', () => {
  let page: DJRoomsPage;

  beforeEach(() => {
    page = new DJRoomsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
