const Users = require('../models/UserModel')

const AuthAdmin = async (req, res, next) =>{
    try {
        // kullanıcının id'sine göre get
        const user = await Users.findOne({
            _id: req.user.id
        })
        if(user.role === 0)
            return res.status(400).json({msg: "Erişim Engellendi!.."})

        next()
        
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports = AuthAdmin