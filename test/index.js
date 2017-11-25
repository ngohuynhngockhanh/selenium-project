browser.timeouts('script', 60000);
describe('my awesome website', function() {
    it('should do some chai assertions', function() {
        browser.url('/');
        browser.getTitle().should.be.equal('Cộng đồng Arduino Việt Nam | Tôi yêu Việt Nam');
    });
});