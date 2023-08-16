// api/getRecipes

export default function handler(req, res) {
  if (req.method === "POST") {
    // Handle the POST request
    const data = req.body; // Access request body data
    // Process data and send a response
    res.status(200).json({ message: "Data received successfully" });
  } else {
    // Handle other HTTP methods
    res.status(405).end(); // Method Not Allowed
  }
}
