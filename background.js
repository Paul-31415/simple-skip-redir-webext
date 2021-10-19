browser.contextMenus.create({
    id: "copy-url-url-parameter",
	title: "Copy 'url' url parameter",
    contexts: ["link"],
});
browser.contextMenus.onClicked.addListener((info, tab) => {
	if (info.menuItemId === "copy-url-url-parameter" ){
	    // Examples: text and HTML to be copied.
	    const url = new URL(info.linkUrl);
	    const params = new URLSearchParams(url.search);
		const text = params.has("url")?params.get("url"):info.linkUrl;
		// Always HTML-escape external input to avoid XSS.
		const safeUrl = escapeHTML(text);
		const html = `<a href="${safeUrl}">${safeUrl}</a>`;
		
		// The example will show how data can be copied, but since background
		// pages cannot directly write to the clipboard, we will run a content
		// script that copies the actual content.
		
		// clipboard-helper.js defines function copyToClipboard.
		const code = "copyToClipboard(" +
		      JSON.stringify(text) + "," +
		      JSON.stringify(html) + ");";
		
		browser.tabs.executeScript({
			code: "typeof copyToClipboard === 'function';",
		}).then((results) => {
			// The content script's last expression will be true if the function
			// has been defined. If this is not the case, then we need to run
			// clipboard-helper.js to define function copyToClipboard.
			if (!results || results[0] !== true) {
				return browser.tabs.executeScript(tab.id, {
					file: "clipboard-helper.js",
				});
			}
		}).then(() => {
			return browser.tabs.executeScript(tab.id, {
				code,
			});
		}).catch((error) => {
			// This could happen if the extension is not allowed to run code in
			// the page, for example if the tab is a privileged page.
			console.error("Failed to copy text: " + error);
		});
	}
});

// https://gist.github.com/Rob--W/ec23b9d6db9e56b7e4563f1544e0d546
function escapeHTML(str) {
    // Note: string cast using String; may throw if `str` is non-serializable, e.g. a Symbol.
    // Most often this is not the case though.
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;").replace(/'/g, "&#39;")
        .replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
