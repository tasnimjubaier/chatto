import React, { useEffect, useState } from 'react'
import { gql, useApolloClient, useLazyQuery, useMutation } from '@apollo/client'

import { OPENAI_CHAT, SEND_MESSAGE } from '../../utils/queries'
import Topbar from './Topbar'
import Chats from './Chats'
import styles from './index.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { addMessage, addNewMessage } from '../../features/chatHistory/chatHistorySlice'


const Message = ({user, selectedUser}) => {
	const [content, setContent] = useState("")
	const [loadingModal, setLoadingModal] = useState(null)
	
	const [sendMessage, { data, error }] = useMutation(SEND_MESSAGE)
	const [openaiChat, {data: openaiData, error: openaiError}] = useLazyQuery(OPENAI_CHAT)

	const newMessageHistory = useSelector(state => state.chatHistory.newMessages[selectedUser?.username])
	const messageHistory = useSelector(state => state.chatHistory.messages[selectedUser?.username])

	const dispatch = useDispatch()
	const client = useApolloClient()

	useEffect(() => {
		if(loadingModal == null ) return 

		const time = setInterval(() => {
			console.log(loadingModal)
			if(loadingModal === "Fetching Response...") setLoadingModal("Fetching Response")
			if(loadingModal === "Fetching Response..") setLoadingModal("Fetching Response...")
			if(loadingModal === "Fetching Response.") setLoadingModal("Fetching Response..")
			if(loadingModal === "Fetching Response") setLoadingModal("Fetching Response.")
		}, 400);

		return () => clearInterval(time)
	}, [loadingModal])

	

	useEffect(() => {
		if (error) {

		}
		if (data) {
			dispatch(addMessage({ user: selectedUser.username, message: data.sendMessage }))
			dispatch(addNewMessage({ user: selectedUser.username, message: data.sendMessage }))

			// todo: data isn't being cached. do something with the data to store it in cache 
			client.writeFragment({
				id: "newMessages",
				fragment: gql`
					fragment NewMessage on Message {
						content 
						from 
						to 
						createdAt
						__typename
					}
				`,
				data: {
					...data.sendMessage
				}
			})
		}
	}, [data, error])

	useEffect(() => {
		if(openaiError) {
			setLoadingModal(null)
			dispatch(addMessage({user: 'openai', message: {
				content: openaiError.toString(), 
				to: user.username,
				from: selectedUser.username
			}}))
			return 
		}
		if(openaiData) {
			setLoadingModal(null)
			dispatch(addMessage({user: 'openai', message: {
				content: openaiData.openaiChat, 
				to: user.username,
				from: selectedUser.username
			}}))
		}
	}, [openaiData, openaiError])

	const handleSendMessage = (message) => {
		if(selectedUser.username === 'openai') {
			dispatch(addMessage({user: 'openai', message: {
				content: message, 
				from: user.username,
				to: selectedUser.username
			}}))
			openaiChat({ variables : {
				message
			}})
			setContent("")
			setLoadingModal("Fetching Response...")
			return 
		}


		sendMessage({variables: {
			content: message,
			from: user.username,
			to: selectedUser.username
		}})

		
		setContent("")
	}

	const handleOnKeyDown = (e) => {
		if (e.key === 'Enter') {
      handleSendMessage(content)
    }
	}
	const handleOnClick = (e) => {
		e.preventDefault()
		handleSendMessage(content)
	}

	return (
		<div className={styles['interactions']}>
			<Topbar selectedUser={selectedUser} />
			<Chats selectedUser={selectedUser} />
			<div className={styles['msg-box']}>
					<input className={styles['input-box']} 
						onChange={e => setContent(e.target.value)} value={content} onKeyDown={handleOnKeyDown}/>
					<button className={styles['send-msg-button']} onClick={handleOnClick}> Send </button>
			</div>
			{loadingModal && <div className={styles['loading']}>
					{loadingModal}
				</div>}
		</div>
	)
}

export default Message