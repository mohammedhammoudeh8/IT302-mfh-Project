import app from './backend/index.js';

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`[IT302] Server running on http://localhost:${port}`);
});
