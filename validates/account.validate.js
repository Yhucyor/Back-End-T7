const Joi = require('joi');

module.exports.registerPost = (req, res, next) => {
    const schema = Joi.object({
        fullName: Joi.string()
            .required() // CHỉ có trường hợp duy nhất này mới yêu cầu  là string.empty
            .min(5)
            .max(30)
            .messages({
                "string.empty": "Vui lòng nhập họ tên!",
                "string.min": "Họ tên phải có ít nhất 5 kí tự",
                "string.max": "Họ tên phải nhiều nhất tối đa 30 kí tự"
            }),
        email: Joi.string()
            .required()
            .email()
            .messages({
                "string.empty": "Vui lòng nhập email!",
                "string.email": "Định dạng Email không hợp lệ"
            }),
        password: Joi.string()
            .required()
            .min(8)
            .custom((value, helpers) => {
                if(!/[A-Z]/.test(value)){
                    return helpers.error('password.uppercase');
                }
                if(!/[a-z]/.test(value)){
                    return helpers.error('password.lowercase');
                }
                if(!/[A-Z]/.test(value)){
                    return helpers.error('password.uppercase');
                }
                if(!/\d/.test(value)){
                    return helpers.error('password.number');
                }
                if(!/[@$!%*?&]/.test(value)){
                    return helpers.error('password.special');
                }
                return value;
            })
            .messages({
                "string.empty": "Vui lòng nhập mật khẩu!",
                "string.min": "Mật khẩu phải chứa ít nhất 8 ký tự!",
                "password.uppercase": "Mật khẩu phải chứa ít nhất một chữ cái in hoa!",
                "password.lowercase": "Mật khẩu phải chứa ít nhất một chữ cái in thường!",
                "password.number": "Mật khẩu phải chứa ít nhất một chữ số!", 
                "password.special": "Mật khẩu phải chứa ít nhất một kí tự đặc biệt!"
            }),
    });
    // Next sẽ làm hàm để đi sang hàm tiếp theo 
    const {error} = schema.validate(req.body);

    if(error){
        const errorMessage = error.details[0].message;
        console.log(error);
        res.json({
            code: "error", 
            message: errorMessage
        })
        return;
    }
    next();
}


module.exports.loginPost = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string()
            .required()
            .email()
            .messages({
                "string.empty": "Vui lòng nhập email!",
                "string.email": "Định dạng Email không hợp lệ"
            }),
        password: Joi.string()
            .required()
            .min(8) 
            .custom((value, helpers) => {
                if(!/[A-Z]/.test(value)){
                    return helpers.error('password.uppercase');
                }
                if(!/[a-z]/.test(value)){
                    return helpers.error('password.lowercase');
                }
                if(!/[A-Z]/.test(value)){
                    return helpers.error('password.uppercase');
                }
                if(!/\d/.test(value)){
                    return helpers.error('password.number');
                }
                if(!/[@$!%*?&]/.test(value)){
                    return helpers.error('password.special');
                }
                return value;
            })
            .messages({
                "string.empty": "Vui lòng nhập mật khẩu!",
                "string.min": "Mật khẩu phải chứa ít nhất 8 ký tự!",
                "password.uppercase": "Mật khẩu phải chứa ít nhất một chữ cái in hoa!",
                "password.lowercase": "Mật khẩu phải chứa ít nhất một chữ cái in thường!",
                "password.number": "Mật khẩu phải chứa ít nhất một chữ số!", 
                "password.special": "Mật khẩu phải chứa ít nhất một kí tự đặc biệt!"
            }),
    });
    // Next sẽ làm hàm để đi sang hàm tiếp theo 
    const {error} = schema.validate(req.body);

    if(error){
        const errorMessage = error.details[0].message;
        console.log(error);
        res.json({
            code: "error", 
            message: errorMessage
        })
        return;
    }
    next();
}