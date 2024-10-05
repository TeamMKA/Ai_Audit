const axios = require("axios")

const config = {
    headers: {
        "x-api-key": "sec_OAbxkUicvPTHxRJRZh3fIJOCzJp43ajY",
        "Content-Type": "application/json",
    },
}

const data = {
    sourceId: "cha_GJgUwlZZNxfWY38yyNffi",
    messages: [
        {
            role: "user",
            content: "What are the Income Figures for This college?",
        },
    ],
}

axios
    .post("https://api.chatpdf.com/v1/chats/message", data, config)
    .then((response) => {
        console.log("Result:", response.data.content)
    })
    .catch((error) => {
        console.error("Error:", error.message)
        console.log("Response:", error.response.data)
    })
