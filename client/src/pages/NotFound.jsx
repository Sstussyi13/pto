import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Страница не найдена | ПТО / ППР</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <section className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-gray-600 text-lg mb-6">
          Такой страницы не существует или она была перемещена.
        </p>
        <Link
          to="/"
          className="inline-block bg-gray-800 text-white px-6 py-3 rounded-full hover:bg-gray-700 transition"
        >
          На главную
        </Link>
      </section>
    </>
  );
}
