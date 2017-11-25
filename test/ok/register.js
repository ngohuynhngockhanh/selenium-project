const str_replace = require('locutus/php/strings/str_replace');
const strip_tags = require('locutus/php/strings/strip_tags')
const trim = require('locutus/php/strings/trim')
browser.timeouts('script', 60000);
browser.timeouts('pageLoad', 60000);
var ok = function() {
	(1).should.be.equal(1);
}

var error = function() {
	(1).sholuld.be.equal(2);
}
var testcases = loadjson(__dirname + "/database/register.json")

    
// => 'read-json'
describe('Đăng ký tài khoản:', function() {
	browser.url('/user/register');
	it('Tiêu đề chính xác', function() {       
		
		//Tiêu đề phải chính xác
		browser.getTitle().should.be.equal("Tài khoản người dùng | Cộng đồng Arduino Việt Nam");
		
		
	})
	
	_.map(testcases, function(testcase, index) {
		it(`[#${index}] ${testcase.name}!`, function() {  
			
			//các element
			var username = $('.username');
			var email = $('#edit-mail');
			var password = $(".password-field");
			var password_confirm = $('#edit-pass-pass2');
			
			username.setValue(testcase.args.username);
			email.setValue(testcase.args.email);
			password.setValue(testcase.args.password);
			password_confirm.setValue(testcase.args.password_confirm);
			
			//submit
			$("#edit-submit").click();
			
			//kết quả
			
			var result = browser.getHTML(".notify-container .notify-text", false);
			result = strip_tags(str_replace("\n"+ '<h2 class="element-invisible">Thông báo lỗi</h2>' + "\n", '', result));
			result = str_replace("\n", "", result);
			result = trim(result);
			result = result.replace(/  +/g, ' ');
			result.should.be.equal(testcase.expected_result);
		})
	})
});

