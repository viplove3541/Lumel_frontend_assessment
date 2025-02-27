Lumel Assessment

Overview

This project is a hierarchical table visualization tool with interactive data allocation and a pie chart representation. It is built using React.js and Chart.js, powered by Vite for fast development and build processes.

Features

Hierarchical table with expandable rows

Numeric input for modifying row values

Allocation options for percentage and absolute values

Real-time variance calculation and percentage display

Pie chart visualization of data distribution

Technologies Used

React.js 19 - Frontend library

Chart.js & react-chartjs-2 - Chart visualization

Vite - Development and build tool

SASS - Styling with SCSS modules

ESLint - Code quality enforcement

Installation

Clone the repository:

git clone https://github.com/yourusername/lumel_assessment.git
cd lumel_assessment

Install dependencies:

npm install

Run the development server:

npm run dev

Build for production:

npm run build

Preview the production build:

npm run preview

Project Structure

📦 lumel_assessment
├── 📂 src
│   ├── 📂 components
│   │   ├── Table.jsx
│   │   ├── TableRow.jsx
│   │   ├── NumericInput.jsx
│   ├── 📂 data
│   │   ├── tableData.json
│   ├── 📂 styles
│   │   ├── table.module.scss
│   ├── 📜 main.jsx
│   ├── 📜 App.jsx
├── 📜 package.json
├── 📜 README.md

Usage

Modify row values using the numeric input fields.

Click "Allocate %" or "Allocate Val" to apply modifications.

Observe real-time variance calculations.

View the pie chart reflecting value distribution.

License
