# ShellPGP

Experimental Thunderbird MailExtension for hardware-backed OpenPGP signing using Keycard Shell.

## Status

**Experimental proof of concept. Not audited or production-ready.**

## Verified Milestones

- Thunderbird generates CBOR / UR:BYTES signing requests.
- Browser requests match the Node.js reference implementation byte for byte.
- Signing QR codes render directly inside Thunderbird.
- Physical Keycard Shell recognizes and approves signing requests.
- Hardware-generated OpenPGP v4 ECDSA signatures verify with GnuPG.

## Current Workflow

Thunderbird → ShellPGP → QR → Keycard Shell → Response QR → Reference CLI → GnuPG

The demonstrated workflow signs a controlled 73-byte MIME fixture, not arbitrary Thunderbird compose content.

## Development

Install dependencies using `npm install`.

Load `manifest.json` as a temporary extension through Thunderbird's add-on debugger.

## Limitations

- No arbitrary email or attachment signing.
- QR response scanning is experimental.
- No integrated signature verification or signed email export.
- No native Thunderbird sending integration.
- Current physical demonstration supports messages up to 104 bytes.

## Security and Privacy

Private signing keys remain on Keycard hardware during the demonstrated workflow.

The project has not undergone a security audit.

See SECURITY.md, SECURITY_REVIEW.md, PRIVACY.md, and LIMITATIONS.md.

## Upstream Issue

Thunderbird camera permission bug:
https://bugzilla.mozilla.org/show_bug.cgi?id=2080573

Standalone reproduction:
`upstream/thunderbird-camera-repro/`

## Related Project

https://github.com/0xterricola/keycard-openpgp
