import React, { useState } from 'react';
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { useChat } from '../context/ChatContext';

export const ConfigScreen: React.FC = () => {
  const { setConfig } = useChat();
  const [userId, setUserId] = useState('');
  const [serviceUrl, setServiceUrl] = useState('http://localhost:7071');
  const [useMock, setUseMock] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Si está en modo mock, no validar URL
    if (!useMock) {
      // Validación básica
      if (!userId.trim()) {
        setError('Por favor ingresa un UserId');
        return;
      }

      if (!serviceUrl.trim()) {
        setError('Por favor ingresa una URL del servicio');
        return;
      }

      // Validación básica de URL
      try {
        new URL(serviceUrl);
      } catch {
        setError('La URL ingresada no es válida');
        return;
      }
    } else {
      // En modo mock, solo validar userId
      if (!userId.trim()) {
        setError('Por favor ingresa un UserId');
        return;
      }
    }

    setConfig({
      userId: userId.trim(),
      serviceUrl: serviceUrl.trim(),
      useMock: useMock,
    });
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Configuración del Chat
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }} align="center">
            Ingresa tu UserId y la URL del servicio para comenzar
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="UserId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              margin="normal"
              required
              placeholder="382c74c3-721d-4f34-80e5-57657b6cbc27"
            />

            <TextField
              fullWidth
              label="URL del Servicio"
              value={serviceUrl}
              onChange={(e) => setServiceUrl(e.target.value)}
              margin="normal"
              required={!useMock}
              disabled={useMock}
              placeholder="http://localhost:7071"
              helperText={
                useMock
                  ? 'Modo mock activo - no se requiere URL'
                  : 'URL base del servicio (sin /api/query)'
              }
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={useMock}
                  onChange={(e) => setUseMock(e.target.checked)}
                />
              }
              label="Usar modo Mock (simular respuestas sin backend)"
              sx={{ mt: 1 }}
            />

            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              sx={{ mt: 3 }}
            >
              Iniciar Chat
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

