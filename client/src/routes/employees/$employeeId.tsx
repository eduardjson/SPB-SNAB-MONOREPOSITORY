import { createFileRoute } from '@tanstack/react-router';

import { EmployeeDetails } from '../../components/User';

export const Route = createFileRoute('/employees/$employeeId')({
  component: EmployeeDetails,
});
