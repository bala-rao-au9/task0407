
const User = require('../models/user');
const { decodeToken } = require('../services/decodeToken');


// Get profile information
exports.profileGet =   async (req, res) => {
  try {
    const { userId } = req.user;

    const user = await User.findById(userId, { password: 0 });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch profile information' });
  }
}

// Update profile information
exports.profileUpdate = async (req, res) => {
  const token = req.headers['authorization'];
  const decodedToken = decodeToken(token)
  const { userId } = decodedToken;
  const { contact_no } = req.body;
  console.log("contact_no===",contact_no);
  const profilePicPath = req.file ? req.file.filename: undefined;
  console.log(req.file);

  try {
    const updateFields = {};
    if (contact_no) {
      updateFields.contact_no = contact_no;
    }
    if (profilePicPath) {
      updateFields.profile_pic = profilePicPath;
    }

    const user = await User.findByIdAndUpdate(userId, updateFields, { new: true });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json(user);
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error' });
  }
}



