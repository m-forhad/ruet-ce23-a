const fetch = require("node-fetch");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed",
    };
  }

  const data = JSON.parse(event.body);

  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbz_ZQYWBch81acPqa5yf0RkpMwJO8IZDyDb3pGNbamlmnewUGSohUnruaNXJa9U1keaPg/exec", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Data submitted", result }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
