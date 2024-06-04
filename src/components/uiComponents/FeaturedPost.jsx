import { useState } from "react";
import classNames from "classnames";

// icons
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { AiFillLike } from "react-icons/ai";
import { FaComment } from "react-icons/fa6";
import axios from "axios";
// import { IoSendSharp } from "react-icons/io5";

// prevCommentUserImg, prevCommentUserText, userImg

const FeaturedPost = ({profileImg, username, timePosted, textContent, imgContent, noOflikes, noOfComments}) => {
    const [like, setLike] = useState(false);
    const [likeCount, setLikeCount] = useState(noOflikes);
    const [comment, setComment] = useState(false);

    const handleLike = async ()=>{
        if(like == false){
           const url = "https://axelonepostfeature.onrender.com/api/post/664de0da660d36f7d1d/like";

            try {
                const response = await axios.post(url);
                console.log(response.data);
            } catch (error) {
                console.log(error.message);
            }
            setLike(true);
            setLikeCount(prevLikeCount => prevLikeCount + 1);
        }else{
            const url = "https://axelonepostfeature.onrender.com/api/post/664de0da660d36f7290edd1d/unlike";
            try {
                const response = await axios.post(url);
                console.log(response.data)
            } catch (error) {
                console.log(error.message);
            }
            setLike(false);
            setLikeCount(prevLikeCount => prevLikeCount - 1);
        }
    }
  return (
    <section className="flex w-full max-w-[300px] gap-2 rounded-lg">
        {/* user profile image container */}
        <div className="w-full max-w-12 h-full rounded-full overflow-hidden">
            <img src={profileImg} alt="business profile display" />
        </div>

        {/* post content container */}
        <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
                <h2 className="text-base text-textDark font-poppins font-semibold">{username}</h2>
                <RiVerifiedBadgeFill className="w-4 h-4 text-accent" />
                <p className="text-sm text-textDark font-roboto font-light ml-auto">. {timePosted}</p>
            </div>
            <div className="flex flex-col gap-2">
                <p className="text-base text-textDark font-roboto font-normal">{textContent}</p>
                <div className="w-full h-auto rounded-lg overflow-hidden">
                    <img src={imgContent} className="w-full h-full object-cover" alt="image describing post" />
                </div>
            </div>
            <div >
                {/* no of reactions container*/}
                <div className="flex items-center gap-4">
                    {/* likes icon container */}
                    <div onClick={handleLike} className="group flex items-center text-textDark font-poppins gap-1 cursor-pointer">
                        <AiFillLike className={classNames(like ? "text-[#0566FF]" : "text-gray-600" ,"w-5 h-5")}/>
                        {likeCount}
                    </div>
                    {/* comments icon container */}
                    <div onClick={()=> setComment(!comment)} className="group flex items-center text-textDark font-poppins gap-1 cursor-pointer">
                        <FaComment className={classNames("w-5 h-5 text-gray-600")} />
                        {noOfComments}
                    </div>
                </div>
                {/* Like and comment interaction containers
                <div className="flex">
                    likes icon container
                    <div>
                        <AiFillLike className="w-4 h-4" />
                    </div>
                    comments icon container
                    <div>
                        <FaComment className="w-4 h-4" />
                    </div>
                </div> */}
                {/* comment section container */}
                <div>
                    
                    {/* one comment from the post
                    <div>
                        <div>
                            <img src={prevCommentUserImg} alt="" />
                        </div>
                        <div>
                            <p>{prevCommentUserText}</p>
                        </div>
                    </div> */}

                    {/* comment box
                    <div>
                        <div>
                            <img src={userImg} alt="" />
                        </div>
                        <div>
                            <textarea></textarea>
                            <button>
                                <IoSendSharp className="w-4 h-4" />
                            </button>
                        </div>
                    </div> */}

                </div>
            </div>
        </div>
    </section>
  )
}

export default FeaturedPost;