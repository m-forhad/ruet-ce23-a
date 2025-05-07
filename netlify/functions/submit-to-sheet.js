const fetch = require("node-fetch");

exports.handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "https://ruet-ce-23-a.netlify.app", // or replace * with your site domain
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };

  // Handle CORS preflight request
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: "Preflight OK",
    };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
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
      headers,
      body: JSON.stringify({ message: "Data submitted", result }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
