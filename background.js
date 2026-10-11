"use strict";

console.log("[ShellPGP] Extension initialized");

browser.composeAction.onClicked.addListener(async (tab) => {
  try {
    const url = browser.runtime.getURL(
      `preview.html?tabId=${encodeURIComponent(tab.id)}`
    );

    await browser.tabs.create({
    url: browser.runtime.getURL(`preview.html?tabId=${tab.id}`),
    active: true
  });

    console.log("[ShellPGP] Signing preview opened", {
      tabId: tab.id
    });
  } catch (error) {
    console.error("[ShellPGP] Preview failed:", error);
  }
});
