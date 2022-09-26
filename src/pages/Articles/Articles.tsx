import { FC, useEffect, useState } from 'react';
import { api } from '../../constants';
import style from './Articles.module.css';

interface ArticlesTyp {
  id: string;
  title: string;
}

export const Articles: FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [articles, setArticles] = useState<ArticlesTyp[]>([]);

  useEffect(() => {
    getFetchArticles();
  }, []);

  const getFetchArticles = async () => {
    setLoading(true);
    setArticles([]);
    setError('');

    await new Promise((resolve) => setTimeout(resolve, 1000));

    // async await Вариант 2
    try {
      const res = await fetch(`${api}/v3/articles`);
      const data: ArticlesTyp[] = await res.json();
      setArticles(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('error');
      }
    } finally {
      setLoading(false);
    }

    // fetch Вариант 1
    /*    if (Math.random() > 0.5) {
          fetch(`${api}/v3/articles`)
            .then(respons => respons.json()) //console.log(respons)
            .then(data => setArticles(data))  //console.log(data)
            .catch((err: Error) => setError(err.message))
            .finally(() => setLoading(false));
        } else {
          setError('custom error');
          setLoading(false);
        }
    */
  };

  return (
    <>
      <div className={style.wrapper}>
        <h2>Articles</h2>
        <div style={{ height: '25px' }}>{loading ? 'Loading...' : ''}</div>
        <button onClick={getFetchArticles} className={style.button}>
          reload
        </button>
        <ul>
          {articles.map((article) => (
            <li key={article.id}>{article.title}</li>
          ))}
        </ul>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </>
  );
};
