import { ChatResponse } from '../types/api';
import { generateGuid } from '../utils/guid';

/**
 * Simula una respuesta del API de chat con datos mock
 * @param prompt - El mensaje del usuario
 * @param conversationId - El ID de la conversación
 * @returns Una respuesta mock del API
 */
export async function sendMockMessage(
  prompt: string,
  conversationId: string
): Promise<ChatResponse> {
  // Simular delay de red
  await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 2000));

  // Generar respuestas basadas en palabras clave del prompt
  const lowerPrompt = prompt.toLowerCase();

  let answer = '';
  let sqlQueries: string[] = [];

  if (lowerPrompt.includes('venta') || lowerPrompt.includes('ventas')) {
    answer = `### Resumen Ejecutivo
Se realizó la consulta sobre las ventas${lowerPrompt.includes('2025') ? ' en el año 2025' : ''}${lowerPrompt.includes('país') || lowerPrompt.includes('pais') ? ' por país' : ''}. A continuación, se presentan los resultados consolidados en USD.

### Análisis Detallado
___
| País                   |      Venta en USD |
|------------------------|------------------:|
| Brasil                 | 7.087.617.377    |
| México                 | 1.153.737.063    |
| Argentina              | 1.145.944.066    |
| Colombia               |    313.206.105   |
| Chile                  |    208.478.339   |
___

### Conclusión o Recomendación
- **Brasil** lidera las ventas con una cifra significativamente alta de **7.087 millones USD**, seguido por **México** y **Argentina** con más de **1.100 millones USD** cada uno.
- Este análisis puede ser útil para identificar mercados clave y oportunidades de crecimiento.

Si necesitas un análisis más detallado o comparaciones con otros años, no dudes en pedírmelo.`;

    sqlQueries = [
      `SELECT 
    [dbo].[gld_fact_consolidado].[PAIS] AS [País],
    SUM(CAST([dbo].[gld_fact_consolidado].[USD] AS BIGINT)) AS [Venta en USD]
FROM 
    [dbo].[gld_fact_consolidado]
WHERE
    [dbo].[gld_fact_consolidado].[ANIO] = 2025
GROUP BY 
    [dbo].[gld_fact_consolidado].[PAIS]
ORDER BY 
    [Venta en USD] DESC;`,
    ];
  } else if (lowerPrompt.includes('marca') || lowerPrompt.includes('marcas')) {
    answer = `### Resumen Ejecutivo
Se analizaron las principales marcas del mercado. A continuación se presentan los resultados del top 5.

### Análisis Detallado
___
| Marca                  |      Venta en USD | Cuota de Mercado |
|------------------------|------------------:|-----------------:|
| Marca A                | 2.500.000.000    | 35.2%            |
| Marca B                | 1.800.000.000    | 25.4%            |
| Marca C                | 1.200.000.000    | 16.9%            |
| Marca D                |    900.000.000   | 12.7%            |
| Marca E                |    700.000.000   |  9.8%            |
___

### Conclusión o Recomendación
Las 5 principales marcas concentran el **100%** del mercado, siendo **Marca A** la líder con más del 35% de participación.`;

    sqlQueries = [
      `SELECT TOP 5
    [dbo].[gld_fact_consolidado].[MARCA] AS [Marca],
    SUM(CAST([dbo].[gld_fact_consolidado].[USD] AS BIGINT)) AS [Venta en USD],
    (SUM(CAST([dbo].[gld_fact_consolidado].[USD] AS BIGINT)) * 100.0 / 
     (SELECT SUM(CAST([USD] AS BIGINT)) FROM [dbo].[gld_fact_consolidado])) AS [Cuota de Mercado]
FROM 
    [dbo].[gld_fact_consolidado]
GROUP BY 
    [dbo].[gld_fact_consolidado].[MARCA]
ORDER BY 
    [Venta en USD] DESC;`,
    ];
  } else if (lowerPrompt.includes('categoría') || lowerPrompt.includes('categoria')) {
    answer = `### Resumen Ejecutivo
Se analizaron las ventas por categoría. Los resultados muestran una distribución variada entre las diferentes categorías de productos.

### Análisis Detallado
___
| Categoría              |      Venta en USD |
|------------------------|------------------:|
| Sistema Nervioso        | 3.500.000.000    |
| Aparato Cardiovascular | 2.800.000.000    |
| Sistema Digestivo       | 1.900.000.000    |
| Sistema Respiratorio    | 1.200.000.000    |
___

### Conclusión o Recomendación
La categoría de **Sistema Nervioso** presenta las mayores ventas, seguida por **Aparato Cardiovascular**.`;

    sqlQueries = [
      `SELECT 
    [dbo].[gld_fact_consolidado].[ATC1_DES] AS [Categoría],
    SUM(CAST([dbo].[gld_fact_consolidado].[USD] AS BIGINT)) AS [Venta en USD]
FROM 
    [dbo].[gld_fact_consolidado]
GROUP BY 
    [dbo].[gld_fact_consolidado].[ATC1_DES]
ORDER BY 
    [Venta en USD] DESC;`,
    ];
  } else {
    // Respuesta genérica
    answer = `### Respuesta Mock

He recibido tu consulta: "${prompt}"

Esta es una respuesta simulada (modo mock). Para obtener respuestas reales, asegúrate de tener el servicio backend corriendo y desactiva el modo mock.

**Información de la consulta:**
- Prompt: ${prompt}
- ConversationId: ${conversationId}
- Timestamp: ${new Date().toISOString()}

### Nota
El modo mock está activo. Las respuestas son simuladas y no provienen del backend real.`;

    sqlQueries = [
      `-- Query SQL simulada
SELECT 
    COUNT(*) AS total_registros
FROM 
    [dbo].[gld_fact_consolidado]
WHERE
    1 = 1;`,
    ];
  }

  const response: ChatResponse = {
    data: {
      prompt: prompt,
      answer: answer,
      tokens: Math.floor(Math.random() * 5000) + 10000,
      promptTokens: Math.floor(Math.random() * 3000) + 8000,
      completionTokens: Math.floor(Math.random() * 2000) + 1000,
      requestDate: new Date().toISOString(),
      requestId: generateGuid(),
      suggestedQuestions: [],
      requestTime: Math.random() * 200 + 100,
      conversationId: conversationId,
      suggestedPrompt: prompt,
      sqlQueries: sqlQueries,
    },
    success: true,
    message: '',
    _links: {},
  };

  return response;
}

