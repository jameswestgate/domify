module('basic tests');

test('noscript tag content', function() {

	$(document).ready(function() {

		$('#qunit-fixture1 noscript').each(function() {
			ok(this.textContent, 'textContent does not exist for noscript tag')
			ok($.trim(this.textContent) === '<span>test markup</span>', 'textContent not correct for noscript tag ');
		});
	});
});

module('plug-in tests');

test('noscript tag replacement', function() {

	$(document).ready(function() {

		ok($.fn.domify, 'domify plug-in not found.');
		$('#qunit-fixture1 noscript').domify();

		ok($('#qunit-fixture1 span').length, 'fixture 1 added to dom');
	});
});

