const User = require('../models/User');

// Get Profile
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user).select('-password'); // Exclude password
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Update Profile
exports.updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user);

        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;

            // Use save() so middleware triggers if we add password update later
            const updatedUser = await user.save();

            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};