

import DataLoader from "dataloader"
import { GraphQLError } from 'graphql';
import _ from 'lodash'


export const getContactsLoader = (db) => new DataLoader(async ( users ) => {
  const Message = db.collection('messages')

  console.log('contacts is calling messages collection from User Resolver')

  const messages = await Message.find({ $or: [{ from : { $in : users }}, { to : { $in : users }}]})
                          .sort({ createdAt : 1 }).toArray()

  const filtered = messages.map( message => ({
    from: message.from,
    to: message.to
  }))

  let mapping = {}
  filtered.forEach( message => {
    const { from, to } = message 
    if ( mapping[from] == null ) mapping[from] = []
    mapping[from].push(to)
    if ( mapping[to] == null ) mapping[to] = []
    mapping[to].push(from)
  })

  const keys = Object.keys(mapping)

  keys.forEach( key => {
    let arr = mapping[key]
    arr = _.uniq(arr)
    arr = arr.map( (itm: any) => ({ username: itm }))
    mapping[key] = arr 
  })

  const result = users.map( (user : string) => mapping[user] )
  return result
})


export const getMessagesLoader = (db) => new DataLoader(async ( keys : [key : {user : any , otherUser : any}] ) => { // [ { user, otherUser} ] 
  const Message = db.collection('messages')
	const lista = keys.map(({ user: from, otherUser: to }) => {
		return { from, to }
	})
	const listb = keys.map(({ user: from, otherUser: to }) => {
		return { from : to, to : from }
	})
	const merged = [ ...lista, ...listb ]

  console.log('messages is calling messages collection from User Resolver')

  const messages = await Message.find( {
    $or: merged
  }).sort({ createdAt: 1}).toArray()

  const grouped = _.groupBy(messages, (message) => {
    let str : string
    if (message.from < message.to)
      str = `${message.to}:${message.from}`
    else 
      str = `${message.from}:${message.to}`
    return str
  })

  const result = keys.map(({ user: from, otherUser: to }) => {
    let str : string
    if (from < to)
      str = `${to}:${from}`
    else 
      str = `${from}:${to}`
    
    return grouped[str]
  })
	return result
})


export const getLastMessageLoader = (db) => new DataLoader(async (keys) => { // [ { user, otherUser} ] 
  const Message = db.collection('messages')
  const lista = keys.map(({ user: from, otherUser: to }) => {
		return { from, to }
	})
	const listb = keys.map(({ user: from, otherUser: to }) => {
		return { from : to, to : from }
	})
	const merged = [ ...lista, ...listb ]

  console.log('lastMessage is calling messages collection from User Resolver')
  
  const messages = await Message.find( {
    $or: merged
  }).sort({ createdAt: -1}).toArray()

  const grouped = _.groupBy(messages, (message) => {
    let str : string
    if (message.from > message.to)
      str = `${message.to}:${message.from}`
    else 
      str = `${message.from}:${message.to}`
    return str
  })

  const result = keys.map(({ user: from, otherUser: to }) => {
    let str : string
    if (from > to)
      str = `${to}:${from}`
    else 
      str = `${from}:${to}`
    
    return grouped[str] ? ( grouped[str].length !== 0 ? grouped[str][0] : null ) : null
  })
	return result 
})

export const getPostsLoader = (db) => new DataLoader(async ( keys : [key : { index: any, limit: any}] ) => {
  const Post = db.collection("posts")

  console.log('Posts Resolver')

  const messages = await Post.find().sort({postedAt: -1}).toArray()

  let result = []

  result = keys.map((key, _) => {
    let {index, limit} = key 
    let slice = messages.slice( index - 1, index + limit - 1)
    return slice
  })

  return result
})

export const getReactionsLoader = (db) => new DataLoader(async ( keys : [ id : any] ) => {
  const Reaction = db.collection("reactions")

  console.log('Reactions Resolver')

  const reactions  = await Reaction.find({parentId : { $in : keys }}).toArray()
  // console.log({reactions})

  let result = []

  result = keys.map((key, _) => {
    
    let slice = reactions.filter(reaction => reaction.parentId == key)
    return slice
  })

  return result
})

export const getCommentsLoader = (db) => new DataLoader(async ( keys : [ id : any] ) => {
    const Comment = db.collection("comments")
  
    console.log('Comments Resolver')
    const comments  = await Comment.find({parentId : { $in : keys }}).toArray()
  
    let result = []
  
    result = keys.map((key, _) => {
      
      let slice = comments.filter(comment => comment.parentId == key)
      return slice
    })
  
    return result
  })

