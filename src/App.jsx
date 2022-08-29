import { Message } from './components/Message/Message';
import { useState } from 'react';
import './index.css'
import { Form } from './components/Form/Form';

export const App = () => {
	const [messageList, setMessageList] = useState([]);

	return (
		<div className='container'>
			<div className="App">
				<Form arr={messageList} hendelChangeMessageList={setMessageList} />
				<Message data={messageList.length} />
				<div>
					<p>
						<h2>chat:</h2>
					</p>
					{messageList.map((message, index) => (
						<div key={index}>
							{' '}
							{message.author}: {message.text}
							{message.error}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

