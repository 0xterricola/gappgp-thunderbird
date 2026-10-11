"use strict";

var composeProbe = class extends ExtensionCommon.ExtensionAPI {
  getAPI(context) {
    return {
      composeProbe: {
        async inspectSigningIdentity() {
          const results = [];
          const enumerator = Services.wm.getEnumerator("msgcompose");

          while (enumerator.hasMoreElements()) {
            const win = enumerator.getNext();
            const identity = win.gCurrentIdentity;

            results.push({
              hasIdentity: !!identity,
              hasOpenPgpKey:
                !!identity?.getUnicharAttribute("openpgp_key_id"),
              usesExternalGnuPG:
                identity?.getBoolAttribute("is_gnupg_key_id") ?? false,
              hasComposeSecure:
                !!win.gMsgCompose?.compFields?.composeSecure
            });
          }

          return results;
        },

        async inspectSecurityIdentity() {
          const results = [];
          const enumerator = Services.wm.getEnumerator("msgcompose");

          while (enumerator.hasMoreElements()) {
            const win = enumerator.getNext();
            const securityInfo = win.gMsgCompose?.compFields?.composeSecure;

            if (!securityInfo) {
              results.push({ hasSecurityInfo: false });
              continue;
            }

            let classID = null;
            let contractID = null;

            try {
              classID = securityInfo.classID?.toString() ?? null;
            } catch (_) {}

            try {
              contractID = securityInfo.contractID ?? null;
            } catch (_) {}

            results.push({
              hasSecurityInfo: true,
              classID,
              contractID,
              matchesOpenPgpClass:
                classID?.toLowerCase() ===
                "{96fe88f9-d2cd-466f-93e0-3a351df4c6d2}"
            });
          }

          return results;
        },

        async inspectSecurityHandlers() {
          const sessions = [];
          const enumerator = Services.wm.getEnumerator("msgcompose");

          while (enumerator.hasMoreElements()) {
            const win = enumerator.getNext();
            const securityInfo = win.gMsgCompose?.compFields?.composeSecure;

            let supportsComposeSecure = false;

            if (securityInfo) {
              try {
                securityInfo.QueryInterface(Ci.nsIMsgComposeSecure);
                supportsComposeSecure = true;
              } catch (_) {}
            }

            const handler = securityInfo?.wrappedJSObject ?? null;

            sessions.push({
              hasSecurityInfo: !!securityInfo,
              supportsComposeSecure,
              hasWrappedJSObject: !!handler,
              hasGetInputForCrypto:
                typeof handler?.getInputForCrypto === "function",
              hasAddCryptoOutput:
                typeof handler?.addCryptoOutput === "function",
              handlerName: handler?.constructor?.name ?? null
            });
          }

          return sessions;
        },

        async inspectWindows() {
          const windows = [];
          const enumerator = Services.wm.getEnumerator(null);

          while (enumerator.hasMoreElements()) {
            const win = enumerator.getNext();

            windows.push({
              windowType: win.document?.documentElement
                ?.getAttribute("windowtype") ?? null,
              location: win.location?.href?.split("?")[0] ?? null,
              hasCompose: !!win.gMsgCompose,
              hasComposeFields: !!win.gMsgCompose?.compFields
            });
          }

          return windows;
        },

        async inspectComposeSessions() {
          const enumerator = Services.wm.getEnumerator(
            "msgcompose"
          );

          const sessions = [];

          while (enumerator.hasMoreElements()) {
            const win = enumerator.getNext();
            const compose = win.gMsgCompose;
            const fields = compose?.compFields;
            const securityInfo = fields?.composeSecure;

            sessions.push({
              windowType: win.document.documentElement
                .getAttribute("windowtype"),
              hasCompose: !!compose,
              hasComposeFields: !!fields,
              hasSecurityInfo: !!securityInfo,
              securityHandlerType:
                securityInfo?.wrappedJSObject?.constructor?.name ??
                null
            });
          }

          return sessions;
        },

        async inspectMimeFactory() {
          const { EnigmailMimeEncrypt } =
            ChromeUtils.importESModule(
              "chrome://openpgp/content/modules/mimeEncrypt.sys.mjs"
            );

          return {
            factoryAvailable:
              typeof EnigmailMimeEncrypt?.createMimeEncrypt === "function",
            handlerAvailable:
              typeof EnigmailMimeEncrypt?.Handler === "function",
            handlerImplements: "nsIMsgComposeSecure",
            researchOnly: true
          };
        },

        async getEnvironment() {
          return {
            experimentActive: true,
            application: "Thunderbird",
            version: Services.appinfo.version,
            purpose: "Read-only compose integration research"
          };
        }
      }
    };
  }
};
