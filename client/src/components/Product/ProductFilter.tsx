import { Clear } from '@mui/icons-material';
import { Button, Card, Chip, MenuItem, Select, TextField, Typography } from '@mui/material';
import debounce from 'lodash/debounce';
import React, { useEffect, useState } from 'react';
import {
  selectFilterStats,
  selectUniqueManufacturers,
} from '../../services/selectors/productSelectors';
import { resetFilters, setManufacturer, setSearchQuery } from '../../services/slices/filterSlice';
import { useAppDispatch, useAppSelector } from '../../store';

export const ProductFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const manufacturers = useAppSelector(selectUniqueManufacturers);
  const stats = useAppSelector(selectFilterStats);
  const selectedManufacturer = useAppSelector((state) => state.filter.manufacturer);

  const [localSearch, setLocalSearch] = useState('');

  const debouncedSearch = React.useMemo(
    () =>
      debounce((value: string) => {
        dispatch(setSearchQuery(value));
      }, 300),
    [dispatch]
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setLocalSearch(value);
    debouncedSearch(value);
  };

  const handleManufacturerChange = (event: any) => {
    dispatch(setManufacturer(event.target.value));
  };

  const handleReset = () => {
    setLocalSearch('');
    dispatch(resetFilters());
  };

  const hasActiveFilters = () => {
    return localSearch !== '' || selectedManufacturer !== '';
  };

  return (
    <Card className="flex flex-col p-4 pt-6 gap-4">
      <div className="flex flex-row flex-wrap justify-start gap-4">
        <TextField
          variant="outlined"
          label="Поиск по названию"
          value={localSearch}
          onChange={handleSearchChange}
          placeholder="Введите название товара..."
          className="w-100"
        />
        <Select
          value={selectedManufacturer}
          label="Производитель"
          onChange={handleManufacturerChange}
          className="w-100"
        >
          <MenuItem value="">Все производители</MenuItem>
          {manufacturers.map((manufacturer) => (
            <MenuItem key={manufacturer} value={manufacturer}>
              {manufacturer}
            </MenuItem>
          ))}
        </Select>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleReset}
          startIcon={<Clear />}
          className="w-60"
        >
          Сбросить фильтры
        </Button>
      </div>
      {hasActiveFilters() && (
        <div className="flex flex-row gap-4 align-middle">
          <Chip
            label={`Найдено: ${stats.totalCount}`}
            color="primary"
            size="small"
            sx={{ fontWeight: 500 }}
          />

          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
            Общий остаток
          </Typography>
          <Typography variant="body2" fontWeight={600}>
            {stats.totalQuantity.toLocaleString()} шт.
          </Typography>
        </div>
      )}
    </Card>
  );
};

export default ProductFilter;
