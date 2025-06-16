import UserModel from "../model/userModel.js";

const homeController = async(req,res)=>{
    try{
        // res.send('Welcome to our portal.');
        res.render('index') //from view
    }catch(error){
        console.log(error.message)
    }
}
// User Contact Controller
const ContactUserController = async(req,res)=>{
    try{
        // Previous implementation
        // const data = await UserModel({
        //     name:req.body.name,
        //     email:req.body.email,
        //     subject:req.body.subject,
        //     message:req.body.message,
        //     // name:"Prem",
        //     // email:"premkumar@gmail.com",
        //     // subject:"Hello",
        //     // message:"Hello, how are you?",
        // })
        // if(data){
        //     await data.save()
        //     console.log("User saved successfully")
        // }
        // res.render('index')

        // New implementation with validation and better error handling
        const { name, email, subject, message } = req.body;

        // Basic validation
        if (!name || !email || !subject || !message) {
            console.log("All fields are required");
            return res.status(400).render('index', { 
                error: "All fields are required",
                formData: req.body // Preserve form data on error
            });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            console.log("Invalid email format");
            return res.status(400).render('index', { 
                error: "Invalid email format",
                formData: req.body
            });
        }

        // Create new user document
        const newUser = new UserModel({
            name,
            email,
            subject,
            message
        });

        // Save to database
        await newUser.save();
        console.log("User contact saved successfully");

        // Render success message
        res.render('index', { 
            success: "Thank you for your message! We'll get back to you soon.",
            formData: {} // Clear form data on success
        });

    }catch(error){
        console.log("Error in ContactUserController:", error.message);
        res.status(500).render('index', { 
            error: "Something went wrong. Please try again later.",
            formData: req.body
        });
    }
}

export {homeController,ContactUserController};
