const asyncHandler = (requestHandler) => (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next))
        .catch((err) => next(err))
}

export { asyncHandler }

// const asyncHandler = () => { }
// const asyncHandler = (func) => () => { }
// const asyncHandler = (func) => async () => { }

// const asyncHandler = (func) => async (req, res, next) => {
//     try {
//         await func(req, res, next)
//     } catch (error) {
//         res.status(error.code || 500).json({
//             success: false,fff
//             message: error.message
//         })
//     }
// }

// function asyncHandler(requestHandler) {
//     return async function (req, res, next) {
//         try {
//             await requestHandler(req, res, next)
//         } catch (error) {
//             res.status(error.code || 500).json({
//                 success: false,
//                 message:error.message,
//             })
//         }
//     }
// }



// //normal function returning normal function with try catch with return keyword
// function asyncHandler(requestHandler) {
//     return async function (req, res, next) {
//         try {
//             await requestHandler(req, res, next)
//         } catch (error) {
//             res.status(error.code || 500).json({
//                 success: false,
//                 message: error.message
//             })
//         }
//     }
// }

// //arrow function expression returning arrow function with try catch without return keyword
// const asyncHandler = (requestHandler) => async (req, res, next) => {
//     try {
//         await requestHandler(req, res, next)
//     } catch (error) {
//         res.status(error.code || 500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }

// // normal function expression returning normal function with promise with return keyword
// const asyncHandler = function (requestHandler) {
//     return function (req, res, next) {
//         Promise.resolve(requestHandler(req, res, next))
//             .catch((err) => next(err))
//     }
// }

// //arrow function expression returning arrow function with promise with return keyword
// const asyncHandler = (requestHandler) => {
//     return (req, res, next) => {
//         Promise.resolve(requestHandler(req, res, next))
//             .catch((err) => {
//                 next(err)
//             })
//     }
// }

// //arrow function expression returning arrow function with promise without return keyword
// const asyncHandler = (requestHandler) => (req, res, next) => {
//     Promise.resolve(requestHandler(req, res, next))
//         .catch((err) => next(err)
//         )
// }
