"use strict";

console.log("[GapPGP] Extension initialized");

browser.composeAction.onClicked.addListener(async (tab) => {
  try {
    const url = browser.runtime.getURL(
      `preview.html?tabId=${encodeURIComponent(tab.id)}`
    );

    await browser.tabs.create({
    url: browser.runtime.getURL(`preview.html?tabId=${tab.id}`),
    active: true
  });

    console.log("[GapPGP] Signing preview opened", {
      tabId: tab.id
    });
  } catch (error) {
    console.error("[GapPGP] Preview failed:", error);
  }
});
