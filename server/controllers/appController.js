import UserModel from "../model/User.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ENV from '../config.js';
import otpGenerator from 'otp-generator';

export async function verifyUser(req,res,next){
    try{
        const {username} = req.method === "GET" ? req.query : req.body;
        let exist = await UserModel.findOne({username});
        if(!exist) return res.status(404).send({ error : "Can't find User"});
        next();
    } catch (error){
        return res.status(404).send({error: "Authentication Error"});
    }
}
export async function register (req,res){
   try {
       const {username,password,email} = req.body;

       const existUsername = new Promise((resolve, reject) => {
           UserModel.findOne({ username }).then((err,user) => {
               if(err) reject(new Error(err))
               if(user) reject({ error: "Please use unique username"});

               resolve();
           }).catch(err => reject({error: "exist username findone error"}));
       });

       const existEmail = new Promise((resolve,reject) =>{
           UserModel.findOne({ email }).then((err, email) => {
               if(err) reject(new Error(err))
               if(email) reject({error : "Please use unique Email"});

               resolve();
           }).catch(err => reject({error: "exist username findone error"}));
       });

       Promise.all([existUsername,existEmail]).then(() =>{
            if(password){
                bcrypt.hash(password, 10).then(hashedPassword => {

                        const user = new UserModel({
                            username,
                            password: hashedPassword,
                            email
                        })

                        user.save()
                            .then(result => res.status(201).send({msg: 'User Register Successfully'}))
                            .catch(error => res.status(500).send({error}))
                    }).catch(error => {
                        return res.status(500).send({
                            error: "Enable to hashed password"
                        })
                })
            }
       }).catch(error => {
           return res.status(500).send({error})
       })

   } catch (error){
       return res.status(500).send(error);
   }
}

export async function login (req,res){
    const { username ,password } = req.body;
    try{
        UserModel.findOne({ username }).then(user => {
            bcrypt.compare(password, user.password)
                .then(passwordCheck=> {
                    if(!passwordCheck) return res.status(400).send({error: "Dont have password"})

                    const token = jwt.sign({
                                userId: user._id,
                                username: user.username
                            }, ENV.JWT_SECRET,{expiresIn: '24h'});
                    return res.status(200).send({
                        msg: 'Login Succesfull...!',
                        username: user.username,
                        token
                    })
                })
                .catch(error => {
                    return res.status(400).send({error: "Password does not Match"})
                })
        })
            .catch(error => {
                return res.status(404).send({error: "Username not found"});
            })
    } catch(error){
        return res.status(500).send({error});
    }
}

export async function getUser (req,res){

    try {
        const { username } = req.params;

        if (!username) {
            return res.status(400).send({ error: "Invalid Username" });
        }

        const user = await UserModel.findOne({ username });
        const {password, ...rest} = Object.assign({}, user.toJSON());
        if (!user) {
            return res.status(404).send({ error: "User not found" });
        }

        return res.status(200).send(rest);
    } catch (error) {
        console.error("Error retrieving user:", error);
        return res.status(500).send({ error: "Internal Server Error" });
    }

}

export async function updateUser(req,res){
    try {
        // const id = req.query.id;
        const { userId } = req.user;

        if(userId){
            const body = req.body;

            // update the data
            UserModel.updateOne({ _id : userId }, body, function(err, data){
                if(err) throw err;

                return res.status(201).send({ msg : "Record Updated...!"});
            })

        }else{
            return res.status(401).send({ error : "User Not Found...!"});
        }

    } catch (error) {
        return res.status(401).send({ error });
    }
}

export async function generateOTP (req,res){
    req.app.locals.OTP = await otpGenerator.generate(6, {lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false})
    res.status(201).send({ code: req.app.locals.OTP })
}

export async function verifyOTP (req,res){
    const { code } = req.query;
    if(parseInt(req.app.locals.OTP) === parseInt(code)){
        req.app.locals.OTP = null;
        req.app.locals.resetSession = true;
        return res.status(201).send({msg: 'Verify Successfully!'})
    }
    return res.status(400).send({error: "Invalid OTP"})
}

export async function createResetSession (req,res){
    if(req.app.locals.resetSession){
        req.app.locals.resetSession = false;
        return res.status(201).send({msg: "access granted"})
    }
    return res.status(440).send({error: "Session expired!"})
}

export async function resetPassword(req, res) {
    if(!req.app.locals.resetSession){
        return res.status(440).send({error: "Session expired!"});
    }
    const { username, password } = req.body;
    try {
        const user = await UserModel.findOne({ username });

        if (!user) {
            return res.status(404).send({ error: "Username not found" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await UserModel.updateOne({ username: user.username }, { password: hashedPassword });

        return res.status(201).send({ msg: "Record Updated!" });
    } catch (error) {
        console.error("An error occurred:", error);
        return res.status(500).send({ error: "Internal server error" });
    }
}

