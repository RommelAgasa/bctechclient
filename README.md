# Employee Management System - React TypeScript UI

A modern, clean React TypeScript frontend for managing employees, integrated with a C# Web API backend.

## Features

- ✅ **View Employees** - Display all employees in a clean table format
- ✅ **Create Employees** - Add new employees with form validation
- ✅ **Edit Employees** - Update employee information (hire date is read-only)
- ✅ **Delete Employees** - Remove employees with confirmation dialog
- ✅ **Error Handling** - User-friendly error messages and notifications
- ✅ **Loading States** - Visual feedback during API calls
- ✅ **Date Formatting** - Professional date display (e.g., Dec 09, 2025)
- ✅ **Responsive Design** - Mobile-friendly UI with Tailwind CSS

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Icon library
- **Vite** - Build tool and dev server

## Project Structure

```
src/
├── components/
│   ├── EmployeeTable.tsx          # Employee table display
│   ├── EmployeeFormModal.tsx       # Add/Edit form modal
│   └── DeleteConfirmationModal.tsx # Delete confirmation dialog
├── hooks/
│    └── employee.ts                 # Employee API endpoints
├── services/
│   └── api.ts                      # Base API client
├── App.tsx                         # Main app component
└── main.tsx                        # Entry point
```

## Installation

### Prerequisites

- Node.js 16+ and npm (v22.14.0+ recommended)
- C# Web API backend running on `http://localhost:5128`

### Setup

1. **Clone or navigate to the project:**
   ```bash
   cd your-react-project
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file in the project root:**
   ```
   VITE_API_URL=http://localhost:5128
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

The app will be available at `http://localhost:5173`

## API Integration

### Backend Requirements

Your C# Web API backend must have:

1. **CORS Configured** in `Program.cs`:
   ```csharp
   builder.Services.AddCors(options =>
   {
       options.AddPolicy("AllowReactApp", policy =>
       {
           policy.WithOrigins("http://localhost:5173", "http://localhost:3000")
                 .AllowAnyMethod()
                 .AllowAnyHeader()
                 .AllowCredentials();
       });
   });
   
   app.UseCors("AllowReactApp");
   ```

2. **Employee Controller** with endpoints:
   - `GET /api/employee` - Get all employees
   - `GET /api/employee/{id}` - Get employee by ID
   - `POST /api/employee` - Create new employee
   - `PUT /api/employee/{id}` - Update employee
   - `DELETE /api/employee/{id}` - Delete employee

3. **Employee Model**:
   ```csharp
   public class Employee
   {
       public int Id { get; set; }
       public string FirstName { get; set; }
       public string LastName { get; set; }
       public string Position { get; set; }
       public decimal Salary { get; set; }
       public DateTime HireDate { get; set; }
   }
   ```

## Available Scripts

### Development
```bash
npm run dev
```

## Component Documentation

### EmployeeTable
Displays all employees in a grid format with edit and delete actions.

**Props:**
- `employees: Employee[]` - Array of employee objects
- `onEdit: (employee: Employee) => void` - Edit button callback
- `onDelete: (employee: Employee) => void` - Delete button callback

### EmployeeFormModal
Modal form for creating and editing employees.

**Props:**
- `isOpen: boolean` - Controls modal visibility
- `isEditMode: boolean` - Toggles between add/edit mode
- `isSubmitting: boolean` - Disables form during submission
- `formData: FormData` - Current form values
- `onInputChange: (e: ChangeEvent) => void` - Input change handler
- `onSubmit: (e: FormEvent) => void` - Form submission handler
- `onClose: () => void` - Modal close handler

### DeleteConfirmationModal
Confirmation dialog for deleting employees.

**Props:**
- `isOpen: boolean` - Controls modal visibility
- `employeeName: string` - Name of employee to delete
- `isSubmitting: boolean` - Disables buttons during deletion
- `onConfirm: () => void` - Confirm deletion callback
- `onCancel: () => void` - Cancel deletion callback

## API Service Documentation

### `api.ts`
Base API client with request handling, error handling, and authentication support.

**Methods:**
- `get<T>(endpoint: string): Promise<T>`
- `post<T>(endpoint: string, body: unknown): Promise<T>`
- `put<T>(endpoint: string, body: unknown): Promise<T>`
- `delete<T>(endpoint: string): Promise<T>`

### `employee.ts`
Employee-specific API calls.

**Methods:**
- `getAll(): Promise<Employee[]>` - Fetch all employees
- `getById(id: number): Promise<Employee>` - Fetch employee by ID
- `create(employee: CreateEmployeeDTO): Promise<Employee>` - Create new employee
- `update(id: number, employee: Partial<CreateEmployeeDTO>): Promise<Employee>` - Update employee
- `delete(id: number): Promise<void>` - Delete employee

## Error Handling

Errors are displayed in a dismissible banner at the top of the page. Each operation (create, update, delete) includes try-catch error handling with user-friendly messages.


## Performance Optimization

- Components are lightweight and functional
- API calls are minimized with proper caching
- Tailwind CSS is purged in production builds
- Vite provides fast module hot replacement during development


## Troubleshooting

### "Failed to fetch employees" error
- Ensure the backend is running on `http://localhost:5128`
- Check that CORS is properly configured in `Program.cs`
- Verify the API URL in `.env`

### Date not showing in edit form
- Ensure the backend returns dates in ISO 8601 format
- Check browser console for error messages

### Port 5173 already in use
```bash
npm run dev -- --port 3000
```

## Future Enhancements

- Add pagination
- Implement search/filter functionality
- Add employee role-based permissions
- Export employees to CSV/PDF
- Implement undo/redo functionality
- Add employee photo/avatar support

## Support

For issues or questions, please contact your development team or check the project documentation.

---

**Happy coding!** 🚀
