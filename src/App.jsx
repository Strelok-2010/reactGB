import { Message } from './components/Message/Message';
import { useState } from 'react';
import './index.css'

export const App = () => {
	const [textDI, setText] = useState('Сообщение для задания GeekBrains')
	const handleChangeText = (ev) => {
		setText(ev.target.value)
	}

	return (
		<div className='container'>
			<Message text={textDI} />
			<textarea className='textDynamic' onChange={handleChangeText} />
		</div>
	);
}

