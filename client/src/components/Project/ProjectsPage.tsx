import {
  Delete,
  Description as DocumentIcon,
  Edit,
  Image as ImageIcon,
  Visibility,
} from '@mui/icons-material';
import {
  Alert,
  Button,
  Chip,
  CircularProgress,
  IconButton,
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
import React, { useEffect, useState } from 'react';

import {
  useDeleteProjectMutation,
  useGetProjectsQuery,
  useLazyGetImageBlobQuery,
} from '../../services';

export const ProjectsPage: React.FC = () => {
  const navigate = useNavigate();
  const [imageUrls, setImageUrls] = useState<Map<string, string>>(new Map());
  const [loadingImages, setLoadingImages] = useState<Set<string>>(new Set());

  const { data: projects = [], isLoading, error } = useGetProjectsQuery();
  const [deleteProject, { isLoading: isDeleting }] = useDeleteProjectMutation();
  const [fetchImageBlob] = useLazyGetImageBlobQuery();

  const loadImageForProject = async (projectId: string, imageId: string) => {
    if (imageUrls.has(imageId) || loadingImages.has(imageId)) return;

    setLoadingImages((prev) => new Set(prev).add(imageId));

    try {
      const blob = await fetchImageBlob(imageId).unwrap();
      const url = URL.createObjectURL(blob);
      setImageUrls((prev) => new Map(prev).set(imageId, url));
    } catch (error) {
      console.error(`Ошибка загрузки изображения для проекта ${projectId}:`, error);
    } finally {
      setLoadingImages((prev) => {
        const newSet = new Set(prev);
        newSet.delete(imageId);
        return newSet;
      });
    }
  };

  useEffect(() => {
    projects.forEach((project) => {
      if (project.images?.[0]) {
        loadImageForProject(project.id, project.images[0].id);
      }
    });
  }, [projects]);

  useEffect(() => {
    return () => imageUrls.forEach((url) => URL.revokeObjectURL(url));
  }, []);

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm('Вы уверены, что хотите удалить проект?')) return;

    try {
      await deleteProject(id).unwrap();
      const project = projects.find((p) => p.id === id);
      const imageId = project?.images?.[0]?.id;
      if (imageId) {
        const url = imageUrls.get(imageId);
        if (url) URL.revokeObjectURL(url);
        setImageUrls((prev) => {
          const newMap = new Map(prev);
          newMap.delete(imageId);
          return newMap;
        });
      }
    } catch (error) {
      console.error('Ошибка удаления:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center mt-8">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <Alert severity="error">Ошибка загрузки проектов: {JSON.stringify(error)}</Alert>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <Typography variant="h5">Проекты</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate({ to: '/projects/new' })}
        >
          Создать проект
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="w-20">Фото</TableCell>
              <TableCell>Название</TableCell>
              <TableCell>Описание</TableCell>
              <TableCell align="center" className="w-24">
                Фото
              </TableCell>
              <TableCell align="center" className="w-24">
                Доки
              </TableCell>
              <TableCell align="center" className="w-36">
                Действия
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map((project) => {
              const firstImage = project.images?.[0];
              const imageId = firstImage?.id;
              const imageUrl = imageId ? imageUrls.get(imageId) : null;
              const isLoadingImage = imageId ? loadingImages.has(imageId) : false;

              return (
                <TableRow key={project.id}>
                  <TableCell>
                    <div
                      className="w-14 h-14 bg-gray-100 rounded flex items-center justify-center cursor-pointer overflow-hidden"
                      onClick={() => navigate({ to: `/projects/${project.id}` })}
                    >
                      {firstImage && imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={project.name}
                          className="w-full h-full object-cover"
                        />
                      ) : isLoadingImage ? (
                        <CircularProgress size={20} />
                      ) : (
                        <ImageIcon className="text-gray-400" fontSize="small" />
                      )}
                    </div>
                  </TableCell>

                  <TableCell>
                    <span
                      className="font-medium cursor-pointer hover:underline"
                      onClick={() => navigate({ to: `/projects/${project.id}` })}
                    >
                      {project.name}
                    </span>
                  </TableCell>

                  <TableCell>
                    <span className="text-sm text-gray-600">
                      {project.description?.slice(0, 50)}
                      {project.description?.length && project.description.length > 50 ? '...' : ''}
                    </span>
                  </TableCell>

                  <TableCell align="center">
                    <Chip
                      icon={<ImageIcon />}
                      label={project._count?.images || 0}
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>

                  <TableCell align="center">
                    <Chip
                      icon={<DocumentIcon />}
                      label={project._count?.documents || 0}
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>

                  <TableCell align="center" className="space-x-1">
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => navigate({ to: `/projects/${project.id}` })}
                      title="Просмотр"
                    >
                      <Visibility fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="secondary"
                      onClick={() => navigate({ to: `/projects/${project.id}/edit` })}
                      title="Редактировать"
                    >
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={(e) => handleDelete(project.id, e)}
                      disabled={isDeleting}
                      title="Удалить"
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
