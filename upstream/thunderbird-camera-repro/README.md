# Thunderbird WebExtension camera-permission reproduction

## Environment

- Thunderbird 157.0.1
- macOS, Apple Silicon
- Manifest V2 MailExtension

## Steps to reproduce

1. Load the test extension temporarily in Thunderbird.
2. Open camera-test.html in an extension tab.
3. Click Request Camera.
4. Observe whether Thunderbird presents a permission prompt.
5. Observe whether getUserMedia() resolves or rejects.

## Expected

Thunderbird requests user consent and then resolves or rejects
the camera request.

## Actual

The request remains pending indefinitely.
No camera permission prompt appears.

## Additional findings

- The issue reproduces independently of ShellPGP's QR scanner.
- The camera is detected by macOS.
- media.navigator.enabled is true.
- media.navigator.permission.disabled is false.
- media.getusermedia.camera.macavf.enabled is true.
- The installed Thunderbird application has the camera entitlement.
- NSCameraUsageDescription is absent from its Info.plist.

The root cause is not yet established.

## Related Mozilla issue

https://bugzilla.mozilla.org/show_bug.cgi?id=1579489

Firefox previously fixed related WebExtension getUserMedia
permission handling.
