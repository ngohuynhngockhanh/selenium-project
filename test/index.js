const assert = require("assert")

browser.timeouts('loading', 30000);
browser.timeouts('script', 30000);

describe('Check website\'s title\n', function() {
    it('It should have the right title is: Cộng đồng Arduino Việt Nam | Tôi yêu Việt Nam', function() {
        browser.url('/');
        var title = browser.getTitle();
	    console.log(title);
        assert.equal(title, "Cộng đồng Arduino Việt Nam | Tôi yêu Việt Nam");	
    });
});
