const str_replace = require('locutus/php/strings/str_replace');
const strip_tags = require('locutus/php/strings/strip_tags');
const trim = require('locutus/php/strings/trim');
const loadjson = require('loadjson');
const _ = require("lodash");
const assert = require("assert");
const sleep = require('system-sleep');

browser.timeouts('script', 10000);
browser.timeouts('pageLoad', 10000);
browser.timeouts('implicit', 10000);

var testcases = loadjson(__dirname + "/database/search.json");

describe('Test user login!\n', function() {
	it('Check title must be: Cộng đồng Arduino Việt Nam | Tôi yêu Việt Nam', function() {
		browser.url('/');
		assert.equal(browser.getTitle(), "Cộng đồng Arduino Việt Nam | Tôi yêu Việt Nam"); 
	})
	
	_.map(testcases, function(testcase, index) {
		it(`[#${index}] ${testcase.name}!`, function() {
			// reload page for each test case
			browser.url('/');

			// set value
			browser.waitForVisible('#edit-search-block-form--2', 3000)//chắc ăn
			var search_feild = $('#edit-search-block-form--2');
			search_feild.setValue(testcase.search_text);
			$("#search-block-form > div > div > button").click();

			var error = $(".notify-container .notify-text");
			assert.equal(error.state.toString().trim(), testcase.error_state);

			if (testcase.error_state.toString().trim() == 'success') {
				var result = browser.getHTML(".notify-container .notify-text", false);
				result = strip_tags(str_replace("\n"+ '<h2 class="element-invisible">Thông báo lỗi</h2>' + "\n", '', result));
				result = str_replace("\n", "", result);
				result = trim(result);
				result = result.replace(/  +/g, ' ');
				assert.equal(result, testcase.expected_result_text);
			} else {
				// check result
				var result = browser.getUrl();
				assert.equal(result, testcase.expected_url);
				result = browser.getHTML(".search-result", false)[0];
				var start = result.indexOf('<a');
				var end = result.indexOf('</a>'); 
				result = result.substring(start, end);
				result = result.substring(result.indexOf('>') + 1, result.length);
				//console.log(result);
				assert(result.indexOf(testcase.search_text) >= 0);
			}	
		})
	})
});

