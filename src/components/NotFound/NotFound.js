function NotFound ({ navigate }) {
  const handleGoBack = () => {
    navigate(-1);
  }

  return (
    <section className="not-found">
      <h2 className="not-found__title">
        404
      </h2>
      <p
        className="not-found__text">
        Страница не найдена
      </p>
      <button
        className="not-found__btn"
        onClick={handleGoBack}>
        Назад
      </button>
    </section>
  )
}

export default NotFound;
