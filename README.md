# Anonymous Online Supplementary Materials

This repository contains the anonymous online supplementary materials for the manuscript “Automatic Speech Recognition for Mandarin Aphasia Discourse: Evaluating Verbatim Transcription Accuracy and the Effect of Context Prompting.”

It publishes four aligned-example tables and the complete appendix. All quantitative results, task-level analyses, paired distributions, and figures remain in the full manuscript.

## Table mapping

The mapping below follows the latest manuscript source:

| Online table | Caption |
| --- | --- |
| Online Table S1 | Examples for each error type |
| Online Table S2 | Q1 retention examples |
| Online Table S3 | Q1 preservation failures |
| Online Table S4 | Representative Q0/Q2 examples |

## Repository structure

```text
.
├── index.html
├── error-examples.html
├── appendix.html
├── assets/
│   ├── styles.css
│   └── site.js
├── data/
│   ├── online-table-s1.csv
│   ├── online-table-s2.csv
│   ├── online-table-s3.csv
│   └── online-table-s4.csv
├── README.md
├── .gitignore
└── .nojekyll
```

## Local preview

From the repository root, run:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000/`.

## GitHub Pages deployment

Only publish from a GitHub account that has been confirmed as suitable for anonymous review. Do not change the global Git user name or email.

1. Create a public repository named `mandarin-aphasia-asr-supplement` under the confirmed anonymous account.
2. Add that repository as the remote and push the `main` branch:

   ```bash
   git remote add origin https://github.com/<ANONYMOUS_ACCOUNT>/mandarin-aphasia-asr-supplement.git
   git push -u origin main
   ```

3. In the GitHub repository, open **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Select the `main` branch and the `/ (root)` folder, then save.
6. After deployment completes, verify the URL shown by GitHub Pages.

## Privacy scope

This website contains no raw audio, full transcripts, or identifiable participant information. Source manuscripts, temporary renders, raw data, and private working files are excluded from the repository.
