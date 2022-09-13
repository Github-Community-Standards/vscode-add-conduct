import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import { getPlaceHolders } from '../../getPlaceHolders';
import { replacePlaceHolder } from '../../replacePlaceHolder';
suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Test Sample', () => {
		assert.strictEqual([1, 2, 3].indexOf(5), -1);
		assert.strictEqual([1, 2, 3].indexOf(0), -1);
	});

	test("Test Matching Variables", () => {
		assert.strictEqual(getPlaceHolders("{{NAME}}{{EMAIL_ADDRESS}}{{FOO|BAR}}").size, 3);
	});

	test("Test Replacement", async () => {
		const testReplacement = await replacePlaceHolder("{{NAME}}", "John Doe")
		// TODO: Insert KeyCommand to enter value
		assert.strictEqual(testReplacement.placeholder, "{{NAME}}");
		assert.strictEqual(testReplacement.replacement, "John Doe");
	})
});