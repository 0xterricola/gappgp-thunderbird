# Privacy

ShellPGP is an experimental local Thunderbird extension.

## Current Behavior

- Signing requests are generated locally.
- QR codes are rendered locally.
- The experimental camera scanner processes frames locally.
- The scanner requests camera access only after user interaction.
- Camera tracks are stopped after capture or when the page closes.
- The extension does not intentionally upload camera frames
  or signing requests to a remote service.

## Limitations

The project has not undergone an independent privacy review.

Thunderbird and macOS may maintain their own diagnostic logs
and camera-permission records.
