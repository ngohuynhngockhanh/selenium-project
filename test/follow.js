const str_replace = require('locutus/php/strings/str_replace');
const strip_tags = require('locutus/php/strings/strip_tags');
const trim = require('locutus/php/strings/trim');
const loadjson = require('loadjson');
const _ = require("lodash");
const assert = require("assert");

browser.timeouts('script', 10000);
browser.timeouts('pageLoad', 10000);
browser.timeouts('implicit', 10000);

var testcases = loadjson(__dirname + "/database/follow.json");

describe('Test user login!\n', function() {
	it('Check title must be: ksp | Cộng đồng Arduino Việt Nam', function() {
		browser.url('http://arduino.vn/users/ksp');
		assert.equal(browser.getTitle(), "ksp | Cộng đồng Arduino Việt Nam"); 
	})
	
	_.map(testcases, function(testcase, index) {
		it(`[#${index}] ${testcase.name}!`, function() {
			// reload page for each test case
			browser.url('http://arduino.vn/users/ksp');

			if (testcase.is_loggin.toString().trim() == "true") {
				// click to show login form
				$('#block-superfish-1 > ul > li:nth-child(1) > div').click();

				// set value
				var name = $('#edit-name');
				name.setValue(testcase.args.username);
				var pass = $('#edit-pass');
				pass.setValue(testcase.args.password);
				$("#edit-submit--2").click();
				
				// check result
				var result = browser.getUrl();
				assert.equal(result, testcase.expected_result_url);

				// get current state (follow or unfollow):
				var follow_state = browser.getHTML('#main > div:nth-child(2) > div > div > div > div > div.padding10.cell.colspan3.rounded.article.full-article > div.profile > ul > li > span > span > a', false);
				
				// click to reverse state
				$('#main > div:nth-child(2) > div > div > div > div > div.padding10.cell.colspan3.rounded.article.full-article > div.profile > ul > li > span > span').click();

				// check new state
				var new_follow_state = browser.getHTML('#main > div:nth-child(2) > div > div > div > div > div.padding10.cell.colspan3.rounded.article.full-article > div.profile > ul > li > span > span > a', false);
				assert(follow_state.toString().trim() != new_follow_state.toString().trim());
			} else {
				// check does follow button exist
				var follow_button = $('#main > div:nth-child(2) > div > div > div > div > div.padding10.cell.colspan3.rounded.article.full-article > div.profile > ul > li > span > span');
				assert.equal(follow_button.state.toString().trim(), testcase.follow_button_state);
			}
		})
	})
});

