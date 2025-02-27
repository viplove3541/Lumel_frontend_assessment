# Lumel Assessment

## Overview

This project is a **hierarchical table with allocation and variance calculations** integrated with **Chart.js** for visualization. The table allows users to modify values, allocate percentages/values dynamically, and view the impact in real time.

## Features

✅ **Hierarchical Table** with expandable rows  
✅ **Dynamic Input Handling** with real-time updates  
✅ **Allocation System** (percentage & value-based)  
✅ **Variance Calculation** (absolute & percentage)  
✅ **Pie Chart Integration** using Chart.js  
✅ **Styled with SCSS** for modular and maintainable design

## Tech Stack

- **React.js 19** – UI Development
- **Chart.js** & **React-ChartJS-2** – Data Visualization
- **SCSS Modules** – Styling
- **Vite** – Fast Development Server

## Project Structure

📦 lumel_assessment  
 ┣ 📂 src  
 ┃ ┣ 📂 components  
 ┃ ┃ ┣ 📜 Table.jsx  
 ┃ ┃ ┣ 📜 TableRow.jsx  
 ┃ ┃ ┣ 📜 NumericInput.jsx  
 ┃ ┣ 📂 styles  
 ┃ ┃ ┣ 📜 table.module.scss  
 ┃ ┣ 📂 data  
 ┃ ┃ ┣ 📜 tableData.json  
 ┃ ┣ 📜 App.jsx  
 ┃ ┣ 📜 main.jsx  
 ┣ 📜 package.json  
 ┣ 📜 README.md  
 ┗ 📜 vite.config.js

## Usage

-**Modify Values** – Enter a number in the input fields. -**Allocate Percentage or Value** – Click on allocation buttons. -**View Variance Impact** – Variance values update in real-time. -**Analyze Distribution** – Pie chart updates dynamically.

## Dependencies

- **React 19**
- **Chart.js 4**
- **React-ChartJS-2**
- **SCSS (Sass Embedded)**
