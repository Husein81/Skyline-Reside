import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
    const token = jwt.sign({ userId },process.env.JWT_SECRET,{
        expiresIn:'1d'
    });

    const OneDay = 100*24*60*60;
    res.cookie('token', token, {
        httpOnly:true,
        secure:'production',
        sameSite:'strict',
        maxAge: OneDay
    })
    return token;
}

export default generateToken;