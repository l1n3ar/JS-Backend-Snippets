const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please fill in the required fields');
  }

  //check if user exists

  const doesExist = await User.findOne({ email: email });

  if (doesExist) {
    res.status(400);
    throw new Error('This Email ID is already registered with a user');
  } else {
    const salt = await brcypt.genSalt(10);
    const hashedPassword = await brcypt.hash(password, salt);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (user) {
      res.status(201);
      res.send(user);
    } else {
      res.status(400);
      throw new Error("User couldn't be created");
    }
  }
});
