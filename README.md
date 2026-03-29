# MD Converter

A command-line tool to convert Markdown files to text, PDF, and DOC formats.

## Installation

```bash
npm install -g @natanimwondwossen/mdconverter
```

## Usage

```bash
mdconverter <input.md> --text <output.txt>
mdconverter <input.md> --pdf <output.pdf>
mdconverter <input.md> --doc <output.docx>
```

### Examples

```bash
mdconverter example.md --text example.txt
mdconverter example.md --pdf example.pdf
mdconverter example.md --doc example.docx
```

## Requirements

- Node.js
- For DOC conversion: Pandoc (install from https://pandoc.org/)

## License

MIT