# CSV Runner Dashboard

A modern, accessible Next.js dashboard application for analyzing running data from CSV files. Upload a CSV file with running records and visualize metrics, trends, and statistics in an intuitive interface.

## 🎯 Overview

The CSV Runner Dashboard allows users to:
- Upload CSV files containing running data
- Validate CSV structure and data integrity
- View comprehensive metrics (total runs, averages, min/max values)
- Analyze per-person statistics
- Visualize data with interactive charts (bar and line charts)
- Access a clean, responsive, and accessible user interface

## ✨ Features

### Core Functionality
- **CSV Upload & Validation**: Strict validation ensures CSV files have exactly the required headers: `date`, `person`, `miles run`
- **Data Parsing**: Robust CSV parsing using PapaParse with error handling
- **Overall Metrics**: 
  - Total number of runs
  - Average miles run
  - Minimum and maximum miles
- **Per-Person Metrics**: Individual statistics for each runner including average, min, max, and total runs
- **Data Visualization**: 
  - Bar chart showing miles run per person by date
  - Line chart displaying running trends over time
- **Data Table**: Complete tabular view of all running records

### User Experience
- **Loading States**: Visual feedback during file processing
- **Error Handling**: Clear error messages for invalid files, missing data, or parsing issues
- **Empty States**: Helpful messages when no data is available
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Accessibility**: ARIA labels, keyboard navigation, proper color contrast, and semantic HTML

## 🚀 Setup and Installation

### Prerequisites
- Node.js 18+ and npm (or yarn/pnpm)

### Installation Steps

1. **Clone or navigate to the project directory**
   ```bash
   cd csv-runner-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 📊 Sample CSV Format

The application expects CSV files with exactly three columns in this order:

```csv
date,person,miles run
2024-01-01,Alice,5.2
2024-01-01,Bob,3.8
2024-01-02,Alice,4.5
```

### CSV Requirements
- **Headers**: Must be exactly `date`, `person`, `miles run` (case-insensitive, but order matters)
- **Date**: Any string format (displayed as-is)
- **Person**: Runner's name (any string)
- **Miles Run**: Numeric value (must be non-negative)

### Sample CSV File
A sample CSV file is included at `public/sample.csv` for testing purposes. You can download it or use it as a template.

## 🧪 Testing Instructions

1. **Start the development server** (see Setup above)

2. **Test with sample file**:
   - Use the provided `public/sample.csv` file
   - Click "Upload CSV File" button
   - Select the sample CSV file
   - Verify metrics, charts, and table display correctly

3. **Test validation**:
   - Try uploading a CSV with wrong headers (e.g., `date,person,miles`)
   - Try uploading a CSV with missing columns
   - Try uploading a non-CSV file
   - Verify appropriate error messages appear

4. **Test edge cases**:
   - Upload an empty CSV file
   - Upload a CSV with invalid numeric values in "miles run"
   - Upload a CSV with missing data in some rows

5. **Test accessibility**:
   - Navigate using only keyboard (Tab, Enter, Space)
   - Use a screen reader to verify ARIA labels
   - Check color contrast meets WCAG standards

## 🏗️ Architecture

### Project Structure

```
app/
├── page.tsx                 # Main dashboard page
├── layout.tsx              # Root layout with metadata
├── globals.css             # Global styles and Tailwind setup
├── components/
│   ├── FileUploader.tsx    # CSV file upload component
│   ├── DataTable.tsx       # Tabular data display
│   ├── ChartView.tsx       # Recharts visualization components
│   └── MetricsCard.tsx     # Overall and per-person metrics
└── utils/
    ├── csvParser.ts        # CSV parsing and validation logic
    └── metrics.ts          # Metrics calculation functions

components/
└── ui/                     # shadcn/ui base components
    ├── button.tsx
    ├── card.tsx
    ├── alert.tsx
    └── table.tsx

lib/
└── utils.ts                # Utility functions (cn helper)

public/
└── sample.csv              # Sample CSV file for testing
```

### Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **CSV Parsing**: PapaParse
- **Charts**: Recharts
- **Icons**: Lucide React

### Component Architecture

#### FileUploader.tsx
- Handles file selection and validation
- Integrates with PapaParse for CSV parsing
- Manages loading and error states
- Provides accessible file input

#### DataTable.tsx
- Displays parsed CSV data in a table format
- Uses shadcn/ui Table components
- Responsive design with horizontal scrolling

#### ChartView.tsx
- Renders bar and line charts using Recharts
- Groups data by date and person
- Responsive chart containers
- Accessible chart labels and tooltips

#### MetricsCard.tsx
- Calculates and displays overall statistics
- Shows per-person metrics in a grid layout
- Uses icons for visual enhancement

### Utility Functions

#### csvParser.ts
- `validateHeaders()`: Validates CSV headers match requirements
- `parseCSV()`: Parses CSV file and returns structured data
- Handles errors and validation messages

#### metrics.ts
- `calculateOverallMetrics()`: Computes aggregate statistics
- `calculatePersonMetrics()`: Calculates per-person statistics
- Type-safe interfaces for all metrics

## ♿ Accessibility

The application follows WCAG 2.1 Level AA guidelines:

- **ARIA Labels**: All interactive elements have proper ARIA labels
- **Keyboard Navigation**: Full keyboard support (Tab, Enter, Space)
- **Color Contrast**: Meets WCAG contrast requirements
- **Semantic HTML**: Proper use of headings, sections, and landmarks
- **Screen Reader Support**: Descriptive labels and announcements
- **Focus Indicators**: Visible focus states for keyboard users

### Accessibility Features
- Hidden headings for screen readers (`sr-only` class)
- `role="alert"` for error messages
- Proper form labels and descriptions
- Alt text and aria-hidden for decorative icons

## ⚠️ Limitations

1. **File Size**: Large CSV files (>10MB) may cause performance issues
2. **Date Format**: Dates are displayed as-is from CSV (no date parsing/formatting)
3. **Browser Support**: Modern browsers only (Chrome, Firefox, Safari, Edge)
4. **Data Persistence**: Uploaded data is not saved; refreshing the page clears all data
5. **Chart Performance**: Very large datasets (>1000 rows) may slow down chart rendering
6. **CSV Encoding**: Assumes UTF-8 encoding

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Code Style
- TypeScript strict mode enabled
- ESLint with Next.js configuration
- Consistent component structure
- Modular utility functions

## 📝 License

This project is open source and available for use.

## 🤝 Contributing

Contributions are welcome! Please ensure:
- Code follows TypeScript best practices
- Components are accessible
- Tests are added for new features
- Documentation is updated

---

Built with ❤️ using Next.js, TypeScript, and shadcn/ui

