import express from "express"
import cloudinary from "../lib/cloudinary.js"
import protectRoute from "../middleware/auth.middleware.js";
import Book from "../models/Book.js";
const router = express.Router()

router.post("/",protectRoute ,async(req,res)=>{
    try{
        const{title , caption , rating , image} = req.body;
        if(!image || !title || !caption || !rating){
            return res.status(400).json({message:"Please provide all Details"});
        }

        //upload image to cloudinary and save to db
        const uploadImg = await cloudinary.uploader.upload(image,{resource_type:'image'});
        const imgUrl = uploadImg.secure_url;
        const newBook = new Book({
            title,
            caption,
            rating,
            image:imgUrl,
            user: req.user._id,
        })

        await newBook.save();
        res.status(201).json(newBook)

    }catch(error){
        console.log("Error in creating book ",error);
        res.status(500).json({message:error.message});
    }
});

//
router.get("/",protectRoute,async(req,res)=>{
    try {
        const page = req.query.page || 1;
        const limit = req.query.limit || 5;
        const skip = (page-1)*limit;

        const books = await Book.find()
        .sort({createdAt:-1}) //desc order
        .skip(skip)
        .limit(limit)
        .populate("user","username profileImage");

        const totalBooks = await Book.countDocuments();
        res.send({
            books,
            currentPage:page,
            totalBooks,
            totalPages: Math.ceil(totalBooks/limit),
        })
    } catch (error) {
        console.log("Error in get all books",error);
        res.status(500).json({message:"Internal Server Error"});
    }
})

router.delete("/:bookId",protectRoute , async(req,res)=>{
    try {
        const book = await Book.findById(req.params.bookId);
        if(!book){
            return res.status(404).json({message:"Book not found"});
        }
        if(book.user.toString() != req.user._id.toString()){
            return res.status(401).json({message:"Unauthorized user"});
        }
        //delete image from cloudinary
        if(book.image && book.image.includes("cloudinary")){
            try{
                const publicId = book.image.split("/").pop().split(".")[0];
                await cloudinary.uploader.destroy(publicId);
            }catch(imgerror){
                console.log("Error in deleting img from cloudinary",imgerror)
            }
        }
        await book.deleteOne();
        res.json({message:"Book deleted successfully"})
    } catch (error) {
        console.log("User can't be deleted",error);
        res.status(500).json({message:"Internal Server Error"});
    }
})

router.get("/userReview", protectRoute,async(req,res)=>{
    try{
        const books = await Book.find({user:req.user._id}).sort({createdAt:-1});
        res.json(books);
    }catch(error){
        console.log("Error in showing all books",error);
        res.status(500).json({message:"Internal Server Error"});
    }
})

export default router;