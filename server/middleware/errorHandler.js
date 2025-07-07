export const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const message =
    status === 500
      ? 'Внутренняя ошибка сервера. Попробуйте позже.'
      : err.message || 'Произошла ошибка';

  console.error('💥 Server error:', err.stack || err);

  res.status(status).json({ error: message });
};
