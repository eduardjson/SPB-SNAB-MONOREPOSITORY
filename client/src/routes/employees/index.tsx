import { createFileRoute } from '@tanstack/react-router';

import { EmployeeList } from '../../components/User';

export const Route = createFileRoute('/employees/')({
  component: EmployeeList,
});
