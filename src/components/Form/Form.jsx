import style from './Form.module.css';
import { useState, useEffect } from 'react';

export const Form = ({ arr, hendelChangeMessageList }) => {
	const [author, setAuthor] = useState('');
	const [text, setText] = useState('');

	const handleClick = () => {
		if (author !== '' && text !== '') {
			hendelChangeMessageList([
				...arr,
				{
					text: text,
					author: author,
				},
			]);
		} else {
			hendelChangeMessageList([
				...arr,
				{
					text: "Введите текст",
					author: "Имя не корректно",
				},
			]);
		}
	};

	const authorChange = (event) => {
		setAuthor(event.target.value);
	};

	const textChange = (event) => {
		setText(event.target.value);
	};


	return (
		<div className={style.card}>
			<p className={style.title}>Автор:</p>
			<input
				className={style.field}
				type="text"
				onChange={authorChange}
				placeholder="Автор"
			></input>
			<p className={style.title}>Текст:</p>
			<input
				className={style.field}
				type="text"
				onChange={textChange}
				placeholder="Статья"
			></input>
			<button className={style.btn} onClick={handleClick}>
				Отправить
			</button>
		</div>
	);
};