# ShellPGP

Experimental Thunderbird MailExtension for hardware-backed OpenPGP signing using Keycard Shell.

## Status

**Experimental proof of concept. Not audited or production-ready.**

ShellPGP v0.5 demonstrates interoperability between Keycard Shell hardware-generated OpenPGP signatures and Thunderbird's native OpenPGP verification.

The current demonstration uses a fixed 73-byte MIME test fixture. It does not sign arbitrary Thunderbird compose messages.

## Verified Milestones

- Thunderbird generates CBOR / UR:BYTES signing requests.
- Browser signing requests match the Node.js reference implementation byte for byte.
- Signing QR codes render directly inside Thunderbird.
- Physical Keycard Shell recognizes and approves the signing request.
- The hardware-generated signature is transported as a UR:BYTES response.
- ShellPGP decodes the response into an OpenPGP signature packet.
- OpenPGP.js cryptographically verifies the signature inside Thunderbird.
- Modified messages and modified signatures fail verification.
- ShellPGP exports a signed PGP/MIME `.eml` test message.
- Thunderbird independently reports **Good Digital Signature** for the exported message.

## Demonstrated Workflow

Thunderbird -> ShellPGP signing QR -> Keycard Shell hardware approval -> response QR -> paste UR:BYTES response into ShellPGP -> verify -> export signed `.eml` -> Thunderbird native OpenPGP verification.

The return path currently uses manual paste because live camera access is blocked in the tested Thunderbird environment.

The exported message is a controlled historical signing fixture, not the user's current compose draft.

## Development

Install dependencies:

- `npm install`
- `npm test`

Load `manifest.json` as a temporary extension through Thunderbird's add-on debugger.

The repository includes public hardware test vectors under `fixtures/`:

- `hardware-message.txt`: exact signed MIME bytes.
- `hardware-response.ur`: hardware signature transported as UR:BYTES.
- `hardware-signature.sig`: detached OpenPGP signature.
- `keycard-test-cert.pgp`: public signing certificate.

No private signing key is included in these fixtures.

The regression suite tests decoding, cryptographic verification, tamper rejection, and signed MIME construction.

## Current Limitations

- No arbitrary Thunderbird compose-message signing.
- No attachment signing.
- No native Thunderbird sending integration.
- No live camera capture in the tested Thunderbird/macOS configuration.
- Current physical signing demonstration supports messages up to 104 bytes.
- Fixed-fixture export only.
- Signed messages are not encrypted.
- No independent security audit.

See `LIMITATIONS.md` for additional details.

## Security and Privacy

Private signing keys remain on Keycard hardware during the demonstrated workflow.

ShellPGP uses OpenPGP.js for verification and pins the expected public test certificate fingerprint for the fixture workflow.

A cryptographically valid signature does not independently establish the real-world identity of the signer.

See `SECURITY.md`, `SECURITY_REVIEW.md`, `PRIVACY.md`, and `LIMITATIONS.md`.

## Upstream Issue

Thunderbird camera-permission bug:

https://bugzilla.mozilla.org/show_bug.cgi?id=2080573

Standalone reproduction: `upstream/thunderbird-camera-repro/`

## Related Project

https://github.com/0xterricola/keycard-openpgp
