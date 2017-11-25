browser.timeouts('script', 60000);

var ok = function() {
	(1).should.be.equal(1);
}

var error = function() {
	(1).should.be.equal(2);
}

describe('Kiểm tra tiêu đề trang web - Testcase thử nghiệm', function() {
    it('Nó phải là một chuỗi chính xác bắt đầu bằng chữ "Cộng đồng Arduino Việt Nam"', function() {
        browser.url('/');
        var title = browser.getTitle();
		console.log(title);
		if (title.indexOf("Cộng đồng Arduino Việt Nam") > -1)
			ok();
		else
			error();
    });
});