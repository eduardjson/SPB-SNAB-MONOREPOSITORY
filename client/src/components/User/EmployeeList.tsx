import {
  Card,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useNavigate } from '@tanstack/react-router';
import { useGetAllUsersQuery } from '../../services';

export const EmployeeList = () => {
  const { data, isLoading } = useGetAllUsersQuery();
  const navigate = useNavigate();

  const getRoleColor = (role: string) => {
    if (!role) return 'default';
    if (role.includes('ADMIN')) return 'error';
    if (role.includes('MANAGER')) return 'warning';
    if (role.includes('USER')) return 'success';
    return 'primary';
  };

  const rows =
    data?.map((user) => ({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      createdAt: user.createdAt,
    })) || [];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row">
        <Typography variant="h5">Сотрудники</Typography>
      </div>
      <Card>
        <TableContainer component={Paper} className="shadow-none">
          <Table>
            <TableHead>
              <TableRow className="bg-gray-50">
                <TableCell className="text-gray-600 font-medium">Сотрудник</TableCell>
                <TableCell className="text-gray-600 font-medium">Должность</TableCell>
                <TableCell className="text-gray-600 font-medium">Дата регистрации</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-8">
                    Загрузка...
                  </TableCell>
                </TableRow>
              ) : rows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-8">
                    Нет данных
                  </TableCell>
                </TableRow>
              ) : (
                rows.map((row) => (
                  <TableRow
                    key={row.id}
                    onClick={() => navigate({ to: `/employees/${row.id}` })}
                    className="cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <TableCell className="py-2">
                      <span className="text-sm font-medium">
                        {row.firstName || ''} {row.lastName || ''}
                      </span>
                    </TableCell>
                    <TableCell className="py-2">
                      <div className="flex gap-1 flex-wrap items-center">
                        {(Array.isArray(row.role) ? row.role : [row.role]).map(
                          (role: string, index: number) => (
                            <Chip
                              key={index}
                              label={role}
                              size="small"
                              color={getRoleColor(role) as any}
                              variant="outlined"
                              className="h-6"
                            />
                          )
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="py-2 text-gray-600">
                      {new Date(row.createdAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  );
};
