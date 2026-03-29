#!/usr/bin/env node

import { Command } from 'commander';
import fs from 'fs';
import removeMarkdown from 'remove-markdown';
import { marked } from 'marked';
import puppeteer from 'puppeteer';
import { exec } from 'child_process';

const program = new Command();

program
  .name('mdconverter')
  .description('Convert Markdown files to text, PDF, or DOC')
  .version('1.0.0')
  .argument('<input>', 'input markdown file')
  .option('--text <output>', 'convert to text file')
  .option('--pdf <output>', 'convert to PDF file')
  .option('--doc <output>', 'convert to DOC file')
  .action(async (input, options) => {
    const md = fs.readFileSync(input, 'utf8');
    if (options.text) {
      const text = removeMarkdown(md);
      fs.writeFileSync(options.text, text);
      console.log('Converted to text');
    } else if (options.pdf) {
      const html = await marked(md);
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.setContent(html);
      await page.pdf({ path: options.pdf, format: 'A4' });
      await browser.close();
      console.log('Converted to PDF');
    } else if (options.doc) {
      // Use pandoc to convert to docx (assuming pandoc is installed)
      exec(`pandoc ${input} -o ${options.doc}`, (error, stdout, stderr) => {
        if (error) {
          console.error('Error converting to DOC:', error);
          return;
        }
        console.log('Converted to DOC');
      });
    } else {
      console.error('Please specify --text, --pdf, or --doc with output file');
    }
  });

program.parseAsync();
