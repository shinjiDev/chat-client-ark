import React, { useState } from 'react';
import {
  Box,
  Button,
  Collapse,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';

interface SqlQueriesPanelProps {
  sqlQueries: string[];
}

export const SqlQueriesPanel: React.FC<SqlQueriesPanelProps> = ({ sqlQueries }) => {
  const [expanded, setExpanded] = useState(false);

  if (!sqlQueries || sqlQueries.length === 0) {
    return null;
  }

  return (
    <Box sx={{ mt: 2 }}>
      <Button
        variant="outlined"
        size="small"
        onClick={() => setExpanded(!expanded)}
        endIcon={expanded ? <ExpandLess /> : <ExpandMore />}
        fullWidth
      >
        {expanded ? 'Ocultar' : 'Mostrar'} Queries SQL ({sqlQueries.length})
      </Button>

      <Collapse in={expanded}>
        <Paper
          variant="outlined"
          sx={{
            mt: 1,
            p: 2,
            bgcolor: 'grey.50',
            maxHeight: '400px',
            overflow: 'auto',
          }}
        >
          <Typography variant="subtitle2" gutterBottom>
            Queries SQL Ejecutadas:
          </Typography>
          <List dense>
            {sqlQueries.map((query, index) => (
              <React.Fragment key={index}>
                <ListItem sx={{ display: 'block', px: 0 }}>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ fontWeight: 'bold', mb: 0.5 }}
                  >
                    Query {index + 1}:
                  </Typography>
                  <Paper
                    variant="outlined"
                    sx={{
                      p: 1.5,
                      bgcolor: 'background.paper',
                      fontFamily: 'monospace',
                      fontSize: '0.75rem',
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-word',
                    }}
                  >
                    {query}
                  </Paper>
                </ListItem>
                {index < sqlQueries.length - 1 && <Divider sx={{ my: 1 }} />}
              </React.Fragment>
            ))}
          </List>
        </Paper>
      </Collapse>
    </Box>
  );
};

