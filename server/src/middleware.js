
// app.use("/holdit", (req, res) => {
//     console.log({req})
//     console.log({res})
//     res.end("hold it.")
//   })
  
//   app.use("/openai/models/:model", async (req, res) => {
//     try {
//       const response = await openai.retrieveModel(req.params.model);
//       console.log(response.data)
//       res.send(response.data)
//     } catch (err) {
//       res.status(500).send(err.message)
//     }
//   })
  
//   app.use("/openai/models", async (req, res) => {
//     try {
//       const response = await openai.listModels();
//       const models = response.data.data.map(d =>  d.id)
//       console.log(models)
//       res.send(models)
//     } catch (err) {
//       res.status(500).send(err.message)
//     }
//   })
  
//   app.use("/openai/completion/:text", async (req, res) => {
//     try {
//       console.log(req.params.text)
//       const response = await openai.createCompletion({
//         model: "text-davinci-003",
//         prompt: req.params.text,
//         max_tokens: 1000,
//         temperature: 0,
//       })
//       console.log(response.data)
//       res.send(response.data.choices[0].text)
//     } catch (err) {
//       console.log(err.response.data)
//       res.status(500).send(err.response.data)
//     }
//   })
  
//   app.use("/openai/completion/test", async (req, res) => {
//     try {
//       const response = await openai.createCompletion({
//         model: "text-davinci-003",
//         prompt: "Say this is a test",
//         max_tokens: 7,
//         temperature: 0,
//       })
//       console.log(response.data)
//       res.send(response.data.choices[0].text)
//     } catch (err) {
//       console.log(err.response.data)
//       res.status(500).send(err.response.data)
//     }
//   })
  
//   app.use("/openai/chat/", async (req, res) => {
//     try {
//       console.log(req.query.message)
//       const response = await openai.createChatCompletion({
//         model: "gpt-3.5-turbo",
//         messages: [{role: "user", content: req.query.message as string}],
//       });
//       console.log(response.data.choices[0].message.content)
//       res.send(response.data.choices[0].message.content)
//     } catch (err) {
//       console.log(err.response.data)
//       res.status(500).send(err.response.data)
//     }
//   })
  
//   app.use("/openai/chat/test", async (req, res) => {
//     try {
//       const response = await openai.createChatCompletion({
//         model: "gpt-3.5-turbo",
//         messages: [{role: "user", content: "Hello world"}],
//       });
//       console.log(response.data.choices[0].message.content)
//       res.send(response.data.choices[0].message.content)
//     } catch (err) {
//       console.log(err.response.data)
//       res.status(500).send(err.response.data)
//     }
//   })
  
//   app.use('/places', async (req, res) => {
//     let url = `https://maps.googleapis.com/maps/api/place/details/json?fields=name%2Crating%2Cformatted_phone_number&place_id=ChIJN1t_tDeuEmsRUsoyG83frY4&key=${process.env.GOOGLE_API_KEY}`
          
//           try {
//         console.log(url)
//               let result = await axios.get(url)
//               console.log(result.data)
//               res.send(result.data)
//           } catch(err) {
//               console.log(err)
//         console.log("error")
//               res.send("")
//           }
//   })
  
  