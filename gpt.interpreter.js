require('dotenv').config()

const fetch = require("node-fetch");

const run = async naturalLanguage => {
    let body = JSON.stringify({
        "prompt": "Q: list all files in current directory\nA: ls\nQ: c\nA: pwd\nQ: make a file named test with an extension of text\nA: touch test.txt\nQ: create a test directory\nA: mkdir test\nQ: go inside test\nA: cd test\nQ: get out\nA: cd ..\nQ: delete test \nA: rm -rf ./test\nQ: check internet connection\nA: ping\nQ: show hello world on screen\nA: echo 'hello world'\nA: echo \"hello world\"\nQ:\nA:\nQ: print hello world\nA: echo \"hello world\"\nQ: create a file with name index.js\nA: touch index.js\nQ: print current directory\nA: pwd\nQ: " + naturalLanguage + "\n",
        "temperature": 0.3,
        "max_tokens": 100,
        "top_p": 1,
        "frequency_penalty": 0.2,
        "presence_penalty": 0,
        "stop": ["\n"]
    });
    let resp = await (await fetch("https://api.openai.com/v1/engines/davinci/completions", {
        body,
        headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            "Content-Type": "application/json"
        },
        method: "POST"
    })).json();

    return resp.choices[0].text.split("A: ")[1];
}

module.exports = run;