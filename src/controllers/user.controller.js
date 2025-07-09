// File: user.controller.js
// Path: c:\Users\91771\Desktop\chai-backend\src\controllers\user.controller.js

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiRespose } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
    // get data from the frontend
    // validate data and check for empty fields
    // check if user already exists:username and email
    // check for images , avatar
    // upload them to cloudinary , avatar
    // create user object - create entry in db 
    // remove password and refresh token field from response
    // check for user creation
    // return res

    /* take data from the frontend and the field "name"(attribute) should be 
    same for both frontend and backend */
    const { fullName, email, username, password } = req.body

    //check if there are any empty input fields
    if (
        [fullName, email, username, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    // check if a user already exists
    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    //send error if a user already exists
    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }

    //upload images to server using multer and get their path
    // const avatarLocalPath = req?.files?.avatar[0].path;
    // const coverImageLocalPath = req?.files?.coverImage[0].path;
    let coverImageLocalPath, avatarLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path;
    }

    if (req.files && Array.isArray(req.files.avatar) && req.files.avatar.length > 0) {
        avatarLocalPath = req.files.avatar[0].path;
    }

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required")
    }

    //upload the local images on cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avatar) {
        throw new ApiError(400, "Avatar file is required")
    }

    /* whenever we talk to db it takes time and can also cause errors 
    so for errors we have the asyncHandler function and for time we will 
    use the async keyword */
    const user = await User.create({
        fullName, // if the key and value are same then we can directly write value as key
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase(),
    })

    /* If a user is created from the above operation then instead of only checking if the 
    user is created we do this operation to check if the user is created and if yes then 
    remove the password and refreshToken field values by using the select method in which
    we pass the values we want to remove or unselect because by default all values are 
    selected so we just have to pass values with a - in front of them separating them by 
    space and then create a new user without these values*/
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    // check if user is created or not without those fields 
    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    return res.status(201).json(
        new ApiRespose(200, createdUser, "User registered successfully")
    )
   
})


export { registerUser }