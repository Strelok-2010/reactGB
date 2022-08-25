import style from './Message.module.css'
import { useState } from "react"

export const Message = ({ text }) => {
	return <>
		<h3 className={style.message}>Message: {text}</h3>
	</>
}