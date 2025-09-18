# LMS UI Component Plan

## Page-Level Components
- **LoginPage**: Contains login form, email/password inputs, login button.
- **DashboardPage**: Main dashboard for admin and student users.
- **CoursesPage**: Lists all courses with enrollment options.
- **ProfilePage**: Shows user profile and progress.

## Reusable Components
- **Navbar**: Top navigation bar, shows site name, links, and logout button.
- **Footer**: Bottom footer with copyright.
- **CourseCard**: Card showing course details.
- **Button**: Reusable button component with Tailwind styling.
- **Input**: Reusable input field component with label and error handling.
- **DashboardLayout**: Wrapper layout for dashboard pages, includes Navbar and Footer.

## Layout Structure
- **Responsive Layout**: 
  - Navbar at top
  - Footer at bottom
  - Content area in center
- **Flexbox/Grid** for cards and forms
- **Spacing & Padding** consistent across components
- **Mobile-first styling** using Tailwind CSS breakpoints

## Notes
- All components are built in **JavaScript** (not TypeScript)
- Styling handled with **Tailwind CSS**
- Components are modular and reusable
