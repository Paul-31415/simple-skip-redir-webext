# Context menu: Copy link 'url' url parameter with types

This example adds a context menu item to every link that copies the 'url'
url parameter to the clipboard, or, if it doesn't exist, the URL itself.
It copies it as plain text and as rich HTML.
It's a simple modification to the "Context menu: Copy link with types"
webextension example.

## Why?

Sometimes google's search result redirect pages are unusually slow.
This lets you skip them or copy the link without having to visit the page.

## What it does

This extension includes:

* a background script that:
  - Registers a context menu item for every link.
  - Upon click, it invokes the function to copy text and HTML to the clipboard.
* a helper script, "clipboard-helper.js" that provides the copy-to-clipboard functionality.
  In the example, this script is run as a content script, but the actual functionality can also
  be used in visible extension pages such as extension button popups or extension tabs.
* a page, "preview.html" for testing the effect of copying to the clipboard.
  This page does not need to be part of the extension, and can directly be opened in the browser.

To test the extension, right-click on any link to open a context menu, and choose the
"Copy 'url' url parameter" option. Then open preview.html and paste the clipboard content
in the two displayed boxes. The first box will display the text link and the second
box will display the html link

Note: since the add-on relies on a content script for copying the text, the copy operation
will only succeed if the add-on is allowed to run scripts in the current page.
If you wish to successfully copy the text even if the current page cannot be scripted, then
you can open an (extension) page in a new tab as a fallback.

## What it shows

* how to put data on the [clipboard](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Interact_with_the_clipboard)
  with custom types ("text/plain" and "text/html" in the example).
* how to safely construct HTML from given text.
* how to safely create JavaScript code to run as a dynamic content script.
* how to dynamically run a static content script only once.
