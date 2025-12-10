# Aitho Job Bot

## Description
This project is an automated job application analysis and reporting tool, designed to streamline the process of reviewing job postings. It extracts key information, analyzes job requirements against user-defined rules, and generates comprehensive reports.

## Features
- **Job Posting Analysis**: Extracts and analyzes key data points from job descriptions.
- **Rule-Based Analysis**: Applies custom rules to identify potential issues in job postings.
- **Report Generation**: Creates detailed JSON and PDF reports summarizing the analysis findings.
- **Interactive Dashboard**: Provides a web interface for visualizing job analysis data.

## Installation

### Prerequisites
- Node.js (v18 or higher recommended)
- npm

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/jdt0ny/aitho-job-bot.git
   cd aitho-job-bot
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Create a `.env` file in the root directory based on `.env.example` and fill in the necessary values.

## Usage

### Running the Analysis
To build and run the job analysis:
```bash
npm run dev
```
Alternatively, you can build and run separately:
```bash
npm run build
npm start
```
The generated reports will be saved in the `output` directory.

### Accessing the Dashboard
After running the analysis, you can view the dashboard by opening `dashboard/index.html` in your web browser.

## Project Structure

```
.
├───.env.example
├───README.md
├───tsconfig.json
├───package.json
├───dashboard/
│   ├───index.html
│   └───styles.css
├───dist/
└───src/
    ├───config.ts
    ├───index.ts
    ├───analysis/
    │   ├───analyzer.ts
    │   ├───extractors.ts
    │   ├───rules.ts
    │   └───types.ts
    ├───core/
    │   ├───env.ts
    │   ├───http.ts
    │   └───logger.ts
    ├───image/
    │   └───imageGenerator.ts
    └───report/
        ├───reportBuilder.ts
        └───reportFormatter.ts
```
