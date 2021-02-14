const emailTemplate = {
    confirmationCode: (code, name, email) => {
        const html = `
                <body style="margin: 0; padding: 0;">
                <div style="border: 4px solid #D522BD;"></div>
                <div style="padding: 1rem 0; background: whitesmoke; text-align: center;  border: 2px solid #D522BD;">
                    <div style="text-align: center; ">
                        <img style="width: 7rem;" src="https://res.cloudinary.com/young-development-initiative/image/upload/v1594462667/logo-trans_ltykjx.png" alt="">
                    </div>
                    <h6 style="color: #000; font-weight: 600; font-size: 24px; font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif; margin-bottom: 0;">
                        Hello ${name} !
                    </h6>
                    <h6 style="color: #000; font-weight: 600; font-size: 20px; font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;">
                        Please use this confirmation code:<span style="font-weight: bold;  color: red; padding: 7px;">${code}</span> to continue your registration.
                    </h6>
                    <div>
                        <a href="https://femaleandmore.org/confirmation/${email}" target="_blank" 
                        style="border-radius: 5px; background: #D522BD; 
                        padding: 1rem 2rem; color: #fff; width: 100%; 
                        text-decoration: none; font-size: 14px; text-align: center;">Continue to App</a>
                        <h6 style="margin-top: 2.5rem;">Cheers, <br> 
                            <span style="margin-top: 1rem;"> FAM Team</span> 
                        </h6>
                    </div>
                </div>
                <div style="background: #505050; padding: 3rem 5rem; text-align: center;">
                    <img style="border-radius: 50%; padding: 5px; width: 5rem; height: 5rem; object-fit:  cover; background: #fff;" 
                    src="https://res.cloudinary.com/young-development-initiative/image/upload/v1594463317/logo_qbg6cn.png" alt=""> <br> 
                    <span style="color: #fff; margin-top: 1rem;">© Female and More.  All rights reserved</span>
                </div>
            </body>
        `;
        return html;
    },

    welcomeEmail: (name) => {
        const html = `
                <body style="margin: 0; padding: 0;">
                <div style="border: 4px solid #D522BD;"></div>
                <div style="padding: 1rem 0; background: whitesmoke; text-align: center;  border: 2px solid #D522BD;">
                    <div style="text-align: center; ">
                        <img style="width: 7rem;" src="https://res.cloudinary.com/young-development-initiative/image/upload/v1594462667/logo-trans_ltykjx.png" alt="">
                    </div>
                    <h6 style="color: #000; font-weight: 600; font-size: 24px; font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif; margin-bottom: 0;">
                        Hello ${name} !
                    </h6>
                    <h6 style="color: #000; font-weight: 600; font-size: 20px; font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;">
                        You have successfully signed up and we are glad to have you on board. <p style="color: rgb(31, 30, 30); font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif; margin-bottom: 0; font-size: 16px;">Female And More (FAM) platform is designed to be a platform for young ladies to build and develop their self-esteem by participating in a 30 days self-esteem program and earn certificates</p> >
                    </h6>
                    <div>
                        <a href="https://femaleandmore.org/" target="_blank" 
                        style="border-radius: 5px; background: #D522BD; 
                        padding: 1rem 2rem; color: #fff; width: 100%; 
                        text-decoration: none; font-size: 14px; text-align: center;">Continue to App</a>
                        <h6 style="margin-top: 2.5rem;">Cheers, <br> 
                            <span style="margin-top: 1rem;"> FAM Team</span> 
                        </h6>
                    </div>
                </div>
                <div style="background: #505050; padding: 3rem 5rem; text-align: center;">
                    <img style="border-radius: 50%; padding: 5px; width: 5rem; height: 5rem; object-fit:  cover; background: #fff;" 
                    src="https://res.cloudinary.com/young-development-initiative/image/upload/v1594463317/logo_qbg6cn.png" alt=""> <br> 
                    <span style="color: #fff; margin-top: 1rem;">© Female and More.  All rights reserved</span>
                </div>
            </body>
        `;
        return html;
    },

    recoverPassword: (link, user) => {
        const html = `
                <body style="margin: 0; padding: 0;">
                <div style="border: 4px solid #D522BD;"></div>
                <div style="padding: 1rem 0; background: whitesmoke; text-align: center;  border: 2px solid #D522BD;">
                    <div style="text-align: center; ">
                        <img style="width: 5rem;" src="https://res.cloudinary.com/young-development-initiative/image/upload/v1594462667/logo-trans_ltykjx.png" alt="">
                    </div>
                    <h6 style="color: #000; font-weight: 600; font-size: 20px; font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;">
                        Hello ${user} !
                    </h6>
                    <h6 style="color: #000; font-weight: 600; font-size: 20px; font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;">
                        Please click on the following link ${link} to reset your password. <br> If you did not request this, please ignore this email and your password will remain unchanged.
                    </h6>
                    <div>
                        <a href="https://femaleandmore.org/" target="_blank" 
                        style="border-radius: 5px; background: #D522BD; 
                        padding: 1rem 2rem; color: #fff; width: 100%; 
                        text-decoration: none; font-size: 14px; text-align: center;">Continue to App</a>
                        <h6 style="margin-top: 2.5rem;">Cheers, <br> 
                            <span style="margin-top: 1rem;"> FAM Team</span> 
                        </h6>
                    </div>
                </div>
                <div style="background: #505050; padding: 3rem 5rem; text-align: center;">
                    <img style="border-radius: 50%; padding: 5px; width: 5rem; height: 5rem; object-fit:  cover; background: #fff;" 
                    src="https://res.cloudinary.com/young-development-initiative/image/upload/v1594463317/logo_qbg6cn.png" alt=""> <br> 
                    <span style="color: #fff; margin-top: 1rem;">© Female and More.  All rights reserved</span>
                </div>
            </body>
        `;
        return html;
    },

    restPassword: (user, email) => {
        const html = `
                <body style="margin: 0; padding: 0;">
                <div style="border: 4px solid #D522BD;"></div>
                <div style="padding: 1rem 0; background: whitesmoke; text-align: center;  border: 2px solid #D522BD;">
                    <div style="text-align: center; ">
                        <img style="width: 5rem;" src="https://res.cloudinary.com/young-development-initiative/image/upload/v1594462667/logo-trans_ltykjx.png" alt="">
                    </div>
                    <h6 style="color: #000; font-weight: 600; font-size: 20px; font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;">
                        Hello ${user},
                    </h6>
                    <h6 style="color: #000; font-weight: 600; font-size: 20px; font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;">
                        This is a confirmation that the password for your account ${email} has just been changed.
                    </h6>
                    <div>
                        <a href="https://femaleandmore.org/" target="_blank" 
                        style="border-radius: 5px; background: #D522BD; 
                        padding: 1rem 2rem; color: #fff; width: 100%; 
                        text-decoration: none; font-size: 14px; text-align: center;">Continue to App</a>
                        <h6 style="margin-top: 2.5rem;">Cheers, <br> 
                            <span style="margin-top: 1rem;"> FAM Team</span> 
                        </h6>
                    </div>
                </div>
                <div style="background: #505050; padding: 3rem 5rem; text-align: center;">
                    <img style="border-radius: 50%; padding: 5px; width: 5rem; height: 5rem; object-fit:  cover; background: #fff;" 
                    src="https://res.cloudinary.com/young-development-initiative/image/upload/v1594463317/logo_qbg6cn.png" alt=""> <br> 
                    <span style="color: #fff; margin-top: 1rem;">© Female and More.  All rights reserved</span>
                </div>
            </body>  
        `;
        return html;
    }
}
export default emailTemplate;
