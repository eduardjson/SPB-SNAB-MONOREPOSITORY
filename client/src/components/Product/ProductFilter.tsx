import { Clear, Search } from '@mui/icons-material';
import {
  Box,
  Button,
  Chip,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
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
    <Box className="flex flex-col gap-4">
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
        <TextField
          size="small"
          placeholder="Поиск по названию..."
          value={localSearch}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search fontSize="small" />
              </InputAdornment>
            ),
          }}
          sx={{ width: 250 }}
        />

        <Select
          size="small"
          value={selectedManufacturer}
          onChange={handleManufacturerChange}
          displayEmpty
          sx={{ minWidth: 160 }}
        >
          <MenuItem value="">Все производители</MenuItem>
          {manufacturers.map((manufacturer) => (
            <MenuItem key={manufacturer} value={manufacturer}>
              {manufacturer}
            </MenuItem>
          ))}
        </Select>

        <Button
          size="small"
          variant="outlined"
          color="inherit"
          onClick={handleReset}
          startIcon={<Clear />}
          sx={{
            minWidth: 130,
            color: 'text.secondary',
            borderColor: 'divider',
            '&:hover': {
              borderColor: 'text.primary',
              bgcolor: 'transparent',
            },
          }}
        >
          Сбросить
        </Button>
      </Box>
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
    </Box>
  );
};

export default ProductFilter;
