import * as usersService from "./../services/usersService.js";

const setUserData = async (req, res) => {
   try {
      const googleData = req.user._json;

      const user = {
         googleId: googleData.sub,
         firstName: googleData.given_name,
         email: googleData.email,
         picture: googleData.picture,
      };

      const savedUser = await usersService.addUser(user);
      return savedUser.googleId;
   } catch (error) {
      console.error("Error during Google auth:", error);
   }
};

const authController = {
   setUserData,
};

export default authController;
