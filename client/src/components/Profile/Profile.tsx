import {
  AdminPanelSettings as AdminIcon,
  Badge as BadgeIcon,
  CalendarToday as CalendarIcon,
  Close as CloseIcon,
  Edit as EditIcon,
  Email as EmailIcon,
  Fingerprint as FingerprintIcon,
  LocationOn as LocationIcon,
  Login,
  ExitToApp as LogoutIcon,
  Person as PersonIcon,
  Phone as PhoneIcon,
} from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  Drawer,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { useNavigate } from '@tanstack/react-router';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { useState } from 'react';
import { ActionModal } from '../../components';
import { useGetCurrentUserQuery, useLogoutMutation } from '../../services';

const InfoRow = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'flex-start',
      py: 1.5,
      px: 3,
      '&:hover': {
        bgcolor: 'rgba(0, 0, 0, 0.02)',
      },
    }}
  >
    <Box
      sx={{
        color: 'text.secondary',
        minWidth: 36,
        display: 'flex',
        justifyContent: 'center',
        mt: 0.5,
      }}
    >
      {icon}
    </Box>
    <Box sx={{ flex: 1 }}>
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ display: 'block', lineHeight: 1.2, mb: 0.5 }}
      >
        {label}
      </Typography>
      <Typography variant="body2" fontWeight={500}>
        {value || '—'}
      </Typography>
    </Box>
  </Box>
);

export const Profile = () => {
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { data } = useGetCurrentUserQuery();
  const [logout, { isLoading }] = useLogoutMutation();
  const navigate = useNavigate();

  const handleOpenConfirm = () => setConfirmOpen(true);
  const handleCloseConfirm = () => setConfirmOpen(false);

  const handleLogout = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    try {
      await logout(refreshToken).unwrap();
      navigate({ to: '/auth/login' });
    } catch (err) {
      console.error('Ошибка выхода:', err);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {data?.username ? (
        <>
          <div onClick={() => setOpen(true)} className="no-underline cursor-pointer">
            <Avatar
              alt={data?.username || ''}
              src={data?.avatar}
              className="scale-90 opacity-95 hover:opacity-100"
            />
          </div>
        </>
      ) : (
        <Button color="primary" href="/auth/login">
          <Login />
        </Button>
      )}

      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        anchor="right"
        className="max-w-full min-w-200"
      >
        {!data ? (
          <Box sx={{ width: 400, p: 3 }}>
            <Typography>Загрузка профиля...</Typography>
          </Box>
        ) : (
          <Box
            sx={{
              width: { xs: '100%', sm: 400 },
              maxWidth: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Шапка с кнопкой закрытия */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                p: 2,
                borderBottom: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Typography variant="h6" fontWeight={600}>
                Профиль
              </Typography>
              <IconButton onClick={() => setOpen(false)} size="small" edge="end">
                <CloseIcon />
              </IconButton>
            </Box>

            {/* Контент с прокруткой */}
            <Box
              sx={{
                flex: 1,
                overflowY: 'auto',
                '&::-webkit-scrollbar': {
                  width: 6,
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: 'rgba(0,0,0,0.2)',
                  borderRadius: 3,
                },
              }}
            >
              {/* Секция профиля */}
              <Box sx={{ p: 3 }}>
                <Box
                  sx={{
                    position: 'relative',
                    display: 'inline-block',
                    width: '100%',
                  }}
                >
                  <Avatar
                    src={data.avatar}
                    alt={`${data.firstName || ''} ${data.lastName || ''}`.trim() || 'Пользователь'}
                    sx={{
                      width: 120,
                      height: 120,
                      mx: 'auto',
                      mb: 2,
                      border: '4px solid',
                      borderColor: 'primary.light',
                      boxShadow: 2,
                      fontSize: 40,
                      bgcolor: data.role?.includes('ADMIN') ? 'amber.100' : 'grey.100',
                      color: data.role?.includes('ADMIN') ? 'amber.800' : 'grey.700',
                    }}
                  >
                    {`${data.firstName?.[0] || ''}${data.lastName?.[0] || ''}`.toUpperCase() || 'U'}
                  </Avatar>
                  {data.role?.includes('ADMIN') && (
                    <Tooltip title="Администратор">
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: 16,
                          right: 'calc(50% - 60px)',
                          bgcolor: 'amber.500',
                          borderRadius: '50%',
                          width: 32,
                          height: 32,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: '2px solid white',
                        }}
                      >
                        <AdminIcon sx={{ fontSize: 18, color: 'white' }} />
                      </Box>
                    </Tooltip>
                  )}
                </Box>

                <Typography variant="h5" fontWeight={600} align="center" gutterBottom>
                  {`${data.firstName || ''} ${data.lastName || ''}`.trim() || 'Пользователь'}
                </Typography>

                <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 2 }}>
                  @{data.username}
                </Typography>

                <Stack direction="row" spacing={1} justifyContent="center" sx={{ mt: 1 }}>
                  {!data.role?.includes('ADMIN') && data.role?.includes('USER') && (
                    <Chip
                      label="Пользователь"
                      size="small"
                      icon={<PersonIcon />}
                      sx={{
                        bgcolor: 'success.50',
                        color: 'success.700',
                        borderColor: 'success.200',
                      }}
                      variant="outlined"
                    />
                  )}
                  <Chip
                    label="Редактировать"
                    size="small"
                    icon={<EditIcon />}
                    onClick={() => navigate({ to: '/profile/edit' })}
                    sx={{
                      bgcolor: 'primary.50',
                      color: 'primary.700',
                      borderColor: 'primary.200',
                      cursor: 'pointer',
                      '&:hover': {
                        bgcolor: 'primary.100',
                      },
                    }}
                  />
                </Stack>
              </Box>

              <Divider />

              {/* Контактная информация */}
              <Box sx={{ py: 2 }}>
                <Typography
                  variant="overline"
                  color="text.secondary"
                  sx={{ px: 3, display: 'block' }}
                >
                  Контактная информация
                </Typography>

                <InfoRow
                  icon={<EmailIcon fontSize="small" />}
                  label="Электронная почта"
                  value={data.email}
                />

                <InfoRow icon={<PhoneIcon fontSize="small" />} label="Телефон" value={data.phone} />
              </Box>

              <Divider />

              {/* Личная информация */}
              <Box sx={{ py: 2 }}>
                <Typography
                  variant="overline"
                  color="text.secondary"
                  sx={{ px: 3, display: 'block' }}
                >
                  Личная информация
                </Typography>

                <InfoRow
                  icon={<PersonIcon fontSize="small" />}
                  label="Имя"
                  value={data.firstName}
                />

                <InfoRow
                  icon={<PersonIcon fontSize="small" />}
                  label="Фамилия"
                  value={data.lastName}
                />

                <InfoRow
                  icon={<BadgeIcon fontSize="small" />}
                  label="Username"
                  value={data.username}
                />

                <InfoRow
                  icon={<CalendarIcon fontSize="small" />}
                  label="Дата регистрации"
                  value={
                    data.createdAt
                      ? format(new Date(data.createdAt), 'd MMMM yyyy', {
                          locale: ru,
                        })
                      : '—'
                  }
                />

                <InfoRow
                  icon={<LocationIcon fontSize="small" />}
                  label="Адрес"
                  value={data.address || '—'}
                />
              </Box>

              {/* Био */}
              {data.bio && (
                <>
                  <Divider />
                  <Box sx={{ p: 3 }}>
                    <Typography
                      variant="overline"
                      color="text.secondary"
                      sx={{ display: 'block', mb: 1 }}
                    >
                      О себе
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                      {data.bio}
                    </Typography>
                  </Box>
                </>
              )}
            </Box>

            {/* Футер */}
            <Box
              sx={{
                p: 3,
                borderTop: '1px solid',
                borderColor: 'divider',
                bgcolor: 'background.paper',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  mb: 2,
                }}
              >
                <Tooltip title="ID пользователя">
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <FingerprintIcon sx={{ fontSize: 18, color: 'text.disabled' }} />
                    <Typography
                      variant="caption"
                      color="text.disabled"
                      sx={{ fontFamily: 'monospace' }}
                    >
                      {data.id.slice(0, 8)}...{data.id.slice(-4)}
                    </Typography>
                  </Box>
                </Tooltip>

                <Typography variant="caption" color="text.disabled">
                  Возраст: {data.age || '—'} лет
                </Typography>
              </Box>

              <Button
                fullWidth
                variant="outlined"
                color="error"
                startIcon={<LogoutIcon />}
                onClick={handleOpenConfirm}
                disabled={isLoading}
                sx={{
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '0.95rem',
                  borderColor: 'error.200',
                  '&:hover': {
                    borderColor: 'error.400',
                    bgcolor: 'error.50',
                  },
                }}
              >
                {isLoading ? 'Выход из системы...' : 'Выйти из аккаунта'}
              </Button>
            </Box>
          </Box>
        )}
      </Drawer>

      <ActionModal
        title="Выход из системы"
        actionName="Выйти"
        cancelName="Отмена"
        content="Вы действительно хотите выйти из аккаунта?"
        open={confirmOpen}
        onClose={handleCloseConfirm}
        onSubmitAction={handleLogout}
      />
    </div>
  );
};
