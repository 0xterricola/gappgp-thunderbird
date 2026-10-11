# Limitations

ShellPGP is an experimental proof of concept.

## Signing

- Currently signs a controlled 73-byte ASCII MIME fixture.
- Does not yet sign arbitrary Thunderbird compose content.
- Current physical demonstration uses a 104-byte message limit.
- Does not support attachment signing.
- Does not implement native Thunderbird send integration.

## Response Handling

- QR response scanning is experimental.
- Thunderbird 157.0.1 on macOS currently leaves camera requests
  pending in our reproduction environment.
- Captured responses are not yet decoded and cryptographically
  verified inside the extension.
- Signed PGP/MIME export is not implemented.

## OpenPGP

- The test certificate supports signing and certification.
- Encryption is not supported by this signing workflow.
- The implementation has not undergone a security audit.

## Upstream Issue

Thunderbird camera-permission bug:
https://bugzilla.mozilla.org/show_bug.cgi?id=2080573
