// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {

    const email = req.body.email;
    const password = req.body.password;

    const c_email = 'john@doe.com'
    const c_password = 'hello123'

    let success = false;

    if (email === c_email && password === c_password) {
        success = true;
    }

    res.status(200).json({ success })
}
