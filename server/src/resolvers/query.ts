import { GraphQLError } from "graphql"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import _ from 'lodash'
import axios from "axios"


export const QueryResolver = {
	users: async (_, __, {db}) => {
		const User = db.collection("users")
		
		const cursor = await User.find({}) as any 

		const users = await cursor.toArray()

		return users;
	},
	user: async (_, {username}, {db}) => {
		const User = db.collection("users")

		const cursor = await User.findOne({username}) as any

		return cursor 
	},
	messages: async (_, {from, to}, {db}) => {
		const Message = db.collection("messages")

		const cursor = await Message.find({
			$or: [{from, to}, {from : to, to : from}]
		}).sort({createdAt: 1}) as any

		const messages = cursor.toArray()

		return messages
	},
	posts: async (_, {username, index, limit}, {db}) => {
		const Post = db.collection("posts")

		const cursor = await Post.find().sort({postedAt: -1}).skip((index-1)*limit).limit(limit) as any

		const posts = await cursor.toArray()
		return posts
	},
	login: async (_, {username, password}, {db}) => {
			const User = db.collection('users')
			const cursor = await User.findOne({username}) as any

			if(!cursor) {
				throw new GraphQLError("User Not Found", {
					extensions: {
						code: "BAD_USER_INPUT",
						username
					}
				})
			}

			const match = await bcrypt.compare(password, cursor.password)
			if (!match) {
				throw new GraphQLError("Incorrect Password", {
					extensions: {
						code: "BAD_USER_INPUT",
						username
					}
				})
			}

			const token =  jwt.sign({username, imageUrl: cursor.imageUrl}, process.env.JWT_SECRET)

			const user = {
				...cursor,
				token 
			}
			return user
	}, 
	openaiChat: async (_, {message}, {openai}) => {
		try {
			console.log(message)
			const response = await openai.createChatCompletion({
				model: "gpt-3.5-turbo",
				messages: [{role: "user", content: message}],
			});
			console.log(response.data.choices[0].message.content)
			return response.data.choices[0].message.content
		} catch (err) {
			console.log(err.response.data)
			throw new GraphQLError(err.response.data.error.message)
		}
	}, 
	openaiCreateImage: async (_, {prompt, images}, {openai}) => {
		try {
			const response = await openai.createImage({
				prompt,
				n: images,
				size: "512x512",
			});
			const urls = response.data.data.map(data => data.url)
			return urls
		} catch (err) {
			console.log(err.response.data)
			throw new GraphQLError(err.response.data.error.message)
		}
	},
	getNearbyPlaces: async (_, {location, radius, keyword, maxPrice, minPrice, opennow, pagetoken, rankBy, type}, {placesApiKey}) => {
		let url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=${keyword}&location=${location}&radius=${radius}&type=${type}&key=${placesApiKey}`
		
		try {
			let result = await axios.get(url)
			console.log(result.data)
			return JSON.stringify(result.data)
		} catch(err) {
			console.log(err)
			throw new GraphQLError(err) 
		}
	}
}


export const UserResolver = {
	token: (parent, payload, context) => {
		const token =  jwt.sign({username: parent.username}, process.env.JWT_SECRET)

		return token 
	},
	contacts: async (parent, __, { db, loaders }) => {
		const user = parent.username

		// use dataloader /// 223ms /// tested
		const users = loaders.contactsLoader.load( user )

		// #region without using dataloader /// 762ms
		// const Message = db.collection("messages")
		// const array1 = await Message.find({to : user}).project({ from : 1, _id: 0 }).toArray() as any 
		// const array2 = await Message.find({from : user}).project({ to : 1, _id: 0 }).toArray() as any 

		// const result = [...array1, ...array2]
		
		
		// let users = result.map( r => ({ username: r.to ? r.to : r.from }) )

		// users = users.filter((obj, index, self) =>
		// 	index === self.findIndex((t) => (
		// 		t.username === obj.username
		// 	))
		//#endregion

		return users
 	},
	messages: async (parent, { otherUser }, { db, loaders }) => {
		const user = parent.username
		
		// use dataloader /// 265ms // tested
		const messages = loaders.messagesLoader.load({ user, otherUser })
		
		//#region without dataloader /// 1200ms 
		// const Message = db.collection("messages")

		// const cursor = await Message.find({
		// 	$or: [{ from: user, to: otherUser }, { from : otherUser, to : user }]
		// }).sort({createdAt: 1}) as any

		// const messages = cursor.toArray()
		//#endregion
		return messages
	},
	lastMessage: async (parent, { otherUser }, { db, loaders }) => {
		const user = parent.username

		// use data loader // tested. // 219ms
		const lastMessage = loaders.lastMessageLoader.load({ user, otherUser })

		//#region without dataloader /// 515ms
		// const Message = db.collection("messages")
		// const lastMessage = await Message.findOne({
		// 	$or: [{from: user, to: otherUser}, {from : otherUser, to : user}]
		// }, { sort : { createdAt: -1 } })
		//#endregion

		return lastMessage
	}
}

export const MessageResolver = {
	reactions: async ({_id}, __, {db}) => {
		const id = _id.toString()
		// #region without using dataloader /// 762ms
		const Reaction = db.collection("reactions")
		const result = await Reaction.find({parentId : id}).toArray() as any 
		return result
	}
}

export const PostResolver = {
	reactions: async ({_id}, _, {db}) => {
		const id = _id.toString()
		// #region without using dataloader /// 762ms
		const Reaction = db.collection("reactions")
		const result = await Reaction.find({parentId : id}).toArray() as any 
		return result
	},
	comments: async ({_id}, _, {db}) => {
		const id = _id.toString()
		// #region without using dataloader /// 762ms
		const Comment = db.collection("comments")
		const result = await Comment.find({parentId : id}).toArray() as any 
		return result
	}
}

export const CommentResolver = {
	reactions: async ({_id}, _, {db}) => {
		const id = _id.toString()
		// #region without using dataloader /// 762ms
		const Reaction = db.collection("reactions")
		const result = await Reaction.find({parentId : id}).toArray() as any 
		return result
	},
	replies: async ({_id}, _, {db}) => {
		const id = _id.toString()
		// #region without using dataloader /// 762ms
		const Comment = db.collection("comments")
		const result = await Comment.find({parentId : id}).toArray() as any 
		return result
	}
}