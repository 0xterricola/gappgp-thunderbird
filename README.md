# GapPGP

Experimental Thunderbird MailExtension for hardware-backed OpenPGP signing using Keycard Shell.

## Status

**Experimental proof of concept. Not audited or production-ready.**

GapPGP v0.5 demonstrates interoperability between Keycard Shell hardware-generated OpenPGP signatures and Thunderbird's native OpenPGP verification.

The published v0.5 checkpoint uses a fixed 73-byte MIME fixture. The merged v0.6 milestone additionally signs newly composed, short plain-text Thunderbird messages.

## Verified Milestones

- Thunderbird generates CBOR / UR:BYTES signing requests.
- Browser signing requests match the Node.js reference implementation byte for byte.
- Signing QR codes render directly inside Thunderbird.
- Physical Keycard Shell recognizes and approves the signing request.
- The hardware-generated signature is transported as a UR:BYTES response.
- GapPGP decodes the response into an OpenPGP signature packet.
- OpenPGP.js cryptographically verifies the signature inside Thunderbird.
- Modified messages and modified signatures fail verification.
- GapPGP exports a signed PGP/MIME `.eml` test message.
- Thunderbird independently reports **Good Digital Signature** for the exported message.

## Demonstrated Workflow

Thunderbird -> GapPGP signing QR -> Keycard Shell hardware approval -> response QR -> paste UR:BYTES response into GapPGP -> verify -> export signed `.eml` -> Thunderbird native OpenPGP verification.

The return path currently uses manual paste because live camera access is blocked in the tested Thunderbird environment.

The v0.5 exporter remains fixture-only. The separate v0.6 workflow signs the actual draft's MIME body, verifies its hardware signature, checks for draft changes, and exports a signed email without sending it.

## v0.6 Development Checkpoint

Branch: `feat/shellpgp-v06-compose-signing`

- Reads an actual Thunderbird plain-text compose draft.
- Serializes the MIME body with canonical CRLF line endings.
- Generates a Keycard Shell signing QR from the draft bytes.
- Verifies a fresh physical Keycard Shell signature using OpenPGP.js.
- Requires the draft to remain unchanged between QR generation and export.
- Rejects modified messages, invalid signatures, and timestamp mismatches.
- Exports the newly signed draft as a PGP/MIME `.eml`.
- Preserves a second hardware test vector with a 72-byte signed message.
- Passes 21 automated regression tests.

**Manual interoperability demonstration:** A newly authored Thunderbird
message was signed on physical Keycard Shell hardware, verified locally,
and exported successfully.

Thunderbird recognized the OpenPGP signature but reported
**Uncertain Digital Signature** because the Gmail sender address did not
match the public test certificate's email identity.

Only the MIME body is signed. The From, To, Subject, and Date headers
are not cryptographically covered.

The return QR is currently decoded using an external camera workflow
and pasted into the extension because Thunderbird camera access remains
blocked in the tested environment.

This is an experimental development checkpoint, not a production release
or native Thunderbird sending implementation.


## v0.7 — Sender Identity Integration

**Status:** Experimental hardware-tested development checkpoint.

GapPGP v0.7 extends real Thunderbird compose signing with
sender-aware OpenPGP certificate selection.

Demonstrated capabilities:

- Provision a self-certified OpenPGP identity using Keycard Shell.
- Independently verify the certificate with GnuPG.
- Select a public certificate in Thunderbird's GapPGP preview.
- Require an explicitly approved certificate fingerprint.
- Verify that the certified email matches the Thunderbird sender.
- Derive the signing-key creation timestamp from the certificate.
- Generate a fresh signing QR for the current Thunderbird draft.
- Approve signing using physical Keycard Shell hardware.
- Verify the returned detached OpenPGP signature.
- Reject unapproved certificates and sender mismatches.
- Invalidate pending signing requests when identity selection changes.
- Export a signed PGP/MIME email.

**Physical hardware result:** A newly composed 76-byte MIME
message was signed using Keycard Shell hardware and exported.

Thunderbird independently displayed **Good Digital Signature**
with the expected sender-matched signing key.

Thunderbird indicated that the signing key was accepted, but
its real-world ownership had not been independently verified.

The message was signed, not encrypted, and was exported
locally rather than sent.

The personal certificate and hardware-response QR used for
this demonstration are intentionally excluded from the repository.
The public regression suite uses the existing test certificate.

Current constraints include the 104-byte MIME signing limit,
ASCII plain-text only, manual QR-response transfer, and no
native Thunderbird sending integration.

This milestone is not an independent security audit or
production release.

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

- v0.6 supports short ASCII plain-text drafts only; general HTML, attachment, and long-message signing remain unsupported.
- No attachment signing.
- No native Thunderbird sending integration.
- No live camera capture in the tested Thunderbird/macOS configuration.
- Current physical signing demonstration supports messages up to 104 bytes.
- v0.5 export remains fixture-only; the v0.6 development branch supports short real-draft export.
- Signed messages are not encrypted.
- No independent security audit.

See `LIMITATIONS.md` for additional details.

## Security and Privacy

Private signing keys remain on Keycard hardware during the demonstrated workflow.

GapPGP uses OpenPGP.js for verification and pins the expected public test certificate fingerprint for the fixture workflow.

A cryptographically valid signature does not independently establish the real-world identity of the signer.

See `SECURITY.md`, `SECURITY_REVIEW.md`, `PRIVACY.md`, and `LIMITATIONS.md`.

## Upstream Issue

Thunderbird camera-permission bug:

https://bugzilla.mozilla.org/show_bug.cgi?id=2080573

Standalone reproduction: `upstream/thunderbird-camera-repro/`

## Related Project

https://github.com/0xterricola/keycard-openpgp
