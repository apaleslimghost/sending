const {send, json} = require('micro');
const getUrls = require('get-urls');
const fetch = require('node-fetch');

const {WEBHOOK_URL: webhookUrl} = process.env;

module.exports = async (req, res) => {
	const {subject, body} = await json(req);
	const text = subject.replace(/^\[The Broken Crown\] - /, '');
	const [url = 'http://thebrokencrown.obsidianportal.com'] = getUrls(body);

	const r = await fetch(webhookUrl, {
		method: 'POST',
		headers: {'content-type': 'application/json'},
		body: JSON.stringify({text, url}),
	});

	send(res, r.status, await r.json());
};
