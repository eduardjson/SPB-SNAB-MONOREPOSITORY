import { Search as SearchIcon } from '@mui/icons-material';
import {
  Box,
  Card,
  Chip,
  InputAdornment,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { format } from 'date-fns';
import React, { useMemo, useState } from 'react';
import { useGetAllPriceListsQuery } from '../../services';

export const PriceListTable: React.FC = () => {
  const { data, isLoading, error } = useGetAllPriceListsQuery();
  const [filters, setFilters] = useState({
    warehouse: '',
    category: '',
    manufacturer: '',
    search: '',
  });

  // Фильтрация
  const filteredItems = useMemo(() => {
    if (!data?.items) return [];

    return data.items.filter((item) => {
      const matchWarehouse = !filters.warehouse || item.warehouseName === filters.warehouse;
      const matchCategory = !filters.category || item.category === filters.category;
      const matchManufacturer = !filters.manufacturer || item.manufacturer === filters.manufacturer;
      const matchSearch =
        !filters.search || item.productName.toLowerCase().includes(filters.search.toLowerCase());

      return matchWarehouse && matchCategory && matchManufacturer && matchSearch;
    });
  }, [data, filters]);

  // Уникальные значения для фильтров
  const warehouses = [...new Set(data?.items.map((i) => i.warehouseName) || [])];
  const categories = [...new Set(data?.items.map((i) => i.category) || [])];
  const manufacturers = [...new Set(data?.items.map((i) => i.manufacturer) || [])];

  const formatPrice = (price?: number) => (price ? price.toLocaleString('ru-RU') + ' ₽' : '—');

  if (isLoading) return <Typography sx={{ p: 2 }}>Загрузка...</Typography>;
  if (error)
    return (
      <Typography sx={{ p: 2 }} color="error">
        Ошибка загрузки
      </Typography>
    );

  return (
    <Box className="flex flex-col gap-4">
      <div className="flex flex-row justify-between h-9">
        <Typography variant="h5">Прайс листы</Typography>
      </div>
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
        <TextField
          size="small"
          placeholder="Поиск по товару"
          value={filters.search}
          onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
          sx={{ width: 200 }}
        />

        <Select
          size="small"
          value={filters.warehouse}
          onChange={(e) => setFilters((f) => ({ ...f, warehouse: e.target.value }))}
          displayEmpty
          sx={{ minWidth: 120 }}
        >
          <MenuItem value="">Все склады</MenuItem>
          {warehouses.map((w) => (
            <MenuItem key={w} value={w}>
              {w}
            </MenuItem>
          ))}
        </Select>

        <Select
          size="small"
          value={filters.category}
          onChange={(e) => setFilters((f) => ({ ...f, category: e.target.value }))}
          displayEmpty
          sx={{ minWidth: 120 }}
        >
          <MenuItem value="">Все категории</MenuItem>
          {categories.map((c) => (
            <MenuItem key={c} value={c}>
              {c}
            </MenuItem>
          ))}
        </Select>

        <Select
          size="small"
          value={filters.manufacturer}
          onChange={(e) => setFilters((f) => ({ ...f, manufacturer: e.target.value }))}
          displayEmpty
          sx={{ minWidth: 120 }}
        >
          <MenuItem value="">Все производители</MenuItem>
          {manufacturers.map((m) => (
            <MenuItem key={m} value={m}>
              {m}
            </MenuItem>
          ))}
        </Select>
      </Box>

      <Card>
        <TableContainer component={Paper} variant="outlined">
          <Table size="small">
            <TableHead>
              <TableRow sx={{ '& th': { fontWeight: 600, fontSize: '0.875rem' } }}>
                <TableCell>Склад</TableCell>
                <TableCell>Товар</TableCell>
                <TableCell>Производитель</TableCell>
                <TableCell>Категория</TableCell>
                <TableCell align="right">Цена</TableCell>
                <TableCell align="right">Остаток</TableCell>
                <TableCell>Поступление</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredItems.map((item, i) => (
                <TableRow key={i} hover sx={{ '&:last-child td': { border: 0 } }}>
                  <TableCell>
                    <Chip label={item.warehouseName} size="small" variant="outlined" />
                  </TableCell>
                  <TableCell>{item.productName}</TableCell>
                  <TableCell>{item.manufacturer}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell align="right">{formatPrice(item.salePrice)}</TableCell>
                  <TableCell align="right">
                    <Chip
                      label={`${item.quantity} ${item.unit}`}
                      size="small"
                      color={item.quantity > 0 ? 'success' : 'default'}
                      variant={item.quantity > 0 ? 'filled' : 'outlined'}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="caption" color="textSecondary">
                      {format(new Date(item.firstArrivalDate), 'dd.MM.yyyy')}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Итого */}
      <Typography variant="caption" color="textSecondary" sx={{ mt: 1, display: 'block' }}>
        Всего: {filteredItems.length} позиций
      </Typography>
    </Box>
  );
};
