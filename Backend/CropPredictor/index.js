const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const { Configuration, OpenAIApi } = require("openai");

const config = new Configuration({
  apiKey: "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",
});

const openai = new OpenAIApi(config);
const sdk = require("api")("@writesonic/v2.2#4enbxztlcbti48j");

// setup Server
const app = express();
app.use(express.json());
app.use(cors());

sdk.auth("06bc910a-d3c6-46cf-96e4-9ea99f93c52c");
// endpoint for chatgpt
app.post("/chat", async (req, res) => {

  const { prompt } = req.body;


  sdk
    .chatsonic_V2BusinessContentChatsonic_post(
      {
        enable_google_results: "true",
        enable_memory: false,
        input_text: `${prompt}`,
      },
      { engine: "premium" }
    )
    .then(({ data }) => res.send(data))
    .catch((err) => console.error(err));
});


 // const completions = await openai.createCompletion({
  //   model: "text-davinci-003",
  //   prompt: `${prompt}`,
  //   max_tokens: 1024,
  //   temperature: 0.7,
  //   // top_p: 1.0,
  //   // frequency_penalty: 0.0,
  //   // presence_penalty: 0.0,
  // });
  // res.send(completions.data.choices[0].text.trim());


const port = 8080;
app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});
