// Borrowed from "Beyond Vibe Coding"

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await Users.findOne({ username });
  if (!user) return res.status(401).send("No such user");
  if (user.password === password) {
    res.send("Login successful!");
  } else {
    res.status(401).send("Incorrect password");
  }
});
