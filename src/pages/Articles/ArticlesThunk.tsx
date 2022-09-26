import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { StoreState } from 'src/store';
import { fetchData } from 'src/store/articles/slice';
import style from './../Articles/Articles.module.css';

export const ArticlesThunk: FC = () => {
  const loading = useSelector((state: StoreState) => state.articles.loading);
  const error = useSelector((state: StoreState) => state.articles.error);
  const articles = useSelector((state: StoreState) => state.articles.articles);

  const fetchDispatch = useDispatch<ThunkDispatch<StoreState, void, any>>();

  useEffect(() => {
    handleFeatchData();
  }, []);

  const handleFeatchData = () => {
    fetchDispatch(fetchData());
  };

  return (
    <>
      <div className={style.wrapper}>
        <h2>Articles</h2>
        <div style={{ height: '25px' }}>{loading ? 'Loading...' : ''}</div>
        <button onClick={() => handleFeatchData()} className={style.button}>
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
