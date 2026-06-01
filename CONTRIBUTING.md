# Contributing

## Pull request draft notes

This site keeps photos and logos under `assets/images/`. Those files are binary media assets, so some pull request draft tools cannot show or summarize their contents and may display an error such as `Binary files are not supported`.

To avoid that issue:

- Keep image changes separate from HTML, CSS, and JavaScript changes when possible.
- Do not paste image data into source files; add the image under `assets/images/` and reference it by path.
- Let Git use `.gitattributes` to treat images and other media as binary files, which prevents text diff tools from trying to parse them.
- If a draft tool still cannot process a PR that contains image updates, create the draft with the text changes first and add the binary assets in a follow-up commit or PR.
