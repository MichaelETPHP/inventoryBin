# React Inventory Bin Tracking Application

A comprehensive single-page React application for tracking inventory in bar & restaurant settings. Features a clean, professional interface with real-time balance calculations and data persistence.

## Features

### Core Functionality
- **Dynamic Inventory Management**: Add, edit, delete inventory entries with auto-incrementing row numbers
- **Real-time Balance Calculations**: Automatic balance updates as In/Out values change
- **Data Persistence**: Local storage saves all data between sessions
- **Automatic JSON Backups**: Auto-saves data to downloadable JSON files every 5 minutes
- **Manual JSON Save/Load**: Export and import inventory data as JSON files
- **Search & Filter**: Filter by item name, signature, or date range
- **Export & Print**: CSV export and print-friendly formatting

### Business Information
- Business line and department input fields
- Professional header with crown logo branding
- Company information integration in exports

### Advanced Features
- **Summary Statistics**: Real-time totals for In, Out, Balance, and Entry Count
- **Row Operations**: Duplicate rows, delete with confirmation
- **Starting Balance**: Set custom starting balance with recalculation
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Keyboard Navigation**: Tab through inputs, Enter to add rows

## Tech Stack

- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **date-fns** for date formatting
- **Vite** for development and building

## Getting Started

### Prerequisites
- Node.js 16.x or higher
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd inventory-bin-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built application will be in the `dist` folder.

## Usage

### Adding Inventory Entries
1. Click the "Add Row" button to create a new inventory entry
2. Fill in the date, item description, incoming and outgoing quantities
3. Add your signature/initials in the Sign field
4. Balance is automatically calculated based on previous entries

### Managing Data
- **Search**: Use the search bar to find specific items or signatures
- **Date Filter**: Set start and end dates to view entries from specific periods
- **Export**: Click "Export CSV" to download your inventory data
- **JSON Backup**: Use "Save JSON" for manual backups or "Download" for immediate file download
- **Load Data**: Click "Load JSON" to import previously saved inventory data
- **Print**: Use the print button for physical records
- **Clear All**: Remove all data with confirmation dialog

### Setting Starting Balance
1. Click "Set Balance" to define a starting inventory amount
2. All subsequent balances will be calculated from this starting point
3. Useful when beginning inventory tracking mid-period

### Automatic Data Backup
The application automatically saves your data in multiple ways:
1. **Local Storage**: Continuous saving to browser storage
2. **Auto JSON Backup**: Downloads JSON backup files every 5 minutes when data changes
3. **Manual JSON Save**: Click "Save JSON" for immediate backup
4. **Data Recovery**: Use "Load JSON" to restore from backup files
## Component Architecture

```
src/
├── components/
│   ├── Header.tsx              # Business info and branding
│   ├── Summary.tsx             # Statistics dashboard
│   ├── FilterControls.tsx      # Search, filters, and actions
│   ├── JsonControls.tsx        # JSON save/load controls
│   ├── InventoryTable.tsx      # Main data table
│   ├── InventoryRow.tsx        # Individual table rows
│   ├── ConfirmDialog.tsx       # Confirmation modals
│   └── StartingBalanceDialog.tsx # Balance setting modal
├── hooks/
│   └── useInventory.ts         # Main state management
├── utils/
│   ├── storage.ts             # Local storage operations
│   ├── export.ts              # CSV export and print
│   ├── jsonStorage.ts         # JSON file operations and auto-save
│   └── calculations.ts        # Balance calculations
├── types/
│   └── index.ts               # TypeScript definitions
└── App.tsx                    # Main application component
```

## Data Structure

```typescript
interface InventoryEntry {
  id: string;           // Unique identifier
  no: number;           // Row number (auto-increment)
  date: string;         // Entry date (YYYY-MM-DD)
  notes: string;        // Item description
  in: number;           // Incoming quantity
  out: number;          // Outgoing quantity
  balance: number;      // Calculated balance
  sign: string;         // User signature/initials
}
```

## Styling

The application uses a soft pink/peach color scheme (`#FFE8E5`) with:
- Golden/yellow table headers (`#F4D03F`)
- Professional typography and spacing
- Smooth hover animations
- Print-optimized layouts
- Mobile-responsive breakpoints

## Browser Support

- Chrome/Edge 88+
- Firefox 85+
- Safari 14+
- Mobile browsers on iOS 14+ and Android 10+

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and test thoroughly
4. Commit your changes: `git commit -m 'Add feature'`
5. Push to the branch: `git push origin feature-name`
6. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support or questions, please create an issue in the repository or contact the development team.