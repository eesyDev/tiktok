import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';
import { MdOutlineCancel } from 'react-icons/md';
import { BsFillPlayFill } from 'react-icons/bs';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import { MdDelete } from 'react-icons/md';
import axios from 'axios';
import { useRouter } from 'next/router';

import { Video } from '@/types';
import LikeButton from '@/components/LikeButton';
import useAuthStore from '@/store/authStore';
import Comments from '@/components/Comments';

interface IProps {
    postDetails: Video
}

const Detail = ({ postDetails } : IProps) => {
    const [post, setPost] = useState(postDetails);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState<boolean>(false);
    const [isPostingComment, setIsPostingComment] = useState<boolean>(false);
    const [comment, setComment] = useState<string>('');
    const [isActive, setIsActive] = useState(false);

    const videoRef = useRef<HTMLVideoElement>(null);
    
    const router = useRouter();
    const { userProfile } : any = useAuthStore();

    const onVideoClick = () => {
        if (isPlaying) {
            videoRef?.current?.pause();
            setIsPlaying(false);
        } else {
            videoRef?.current?.play();
            setIsPlaying(true);
        }
    };

    const handleLike = async (like: boolean) => {
        if(userProfile) {
            const res = await axios.put(``, {
                userId: userProfile._id,
                postId: post._id,
                like
            });
            setPost({...post, likes: res.data.likes});
        }
    }

    const addComment = async (e: { preventDefault: () => void }) => {
        e.preventDefault();

        if (userProfile) {
            if (comment) {
                setIsPostingComment(true);
                const res = await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/api/post/${post._id}`, {
                    userId: userProfile._id,
                    comment
                });
                setPost({...post, comments: res.data.comments});
                setComment('');
                setIsPostingComment(false);
                //console.log(comment)
            }
        }
    }

    const deletePost = async () => {
        if((userProfile._id === post.postedBy._id)) {
            const res = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/api/post/${post._id}`)
        } 
        router.back();
    }

    const deleteComment = async (comment: any) => {
        if (userProfile._id === comment.postedBy._id) {
          try {
            const res = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/api/deleteComment/${post._id}`, {
              data: { comment: { _key: comment._key }, id: post._id }
            });
            console.log(res.data.comments);
            setPost({...post, comments: res.data.comments});
          } catch (error) {
            console.error('Error deleting comment:', error);
          }
        }
      };
  return (
    <>
        {post && (
             <div className='flex w-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap'>
                <div className={`relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-blurred-img bg-no-repeat bg-cover bg-center`}>
                    <div className='opacity-90 absolute top-6 left-2 lg:left-6 flex gap-6 z-50'>
                        <p className='cursor-pointer' onClick={() => router.back()}>
                            <MdOutlineCancel className="text-white text-[35px] hover:opacity-90"/>
                        </p>
                    </div>
                    <div className='relative'>
                        <div className='lg:h-[100vh] h-[60vh]'>
                            <video
                                ref={videoRef}
                                className='h-full cursor-pointer'
                                src={post.video.asset.url}
                                onClick={onVideoClick}
                            ></video>
                        </div>
                        <div className='absolute top-[45%] left-[47%] cursor-pointer'>
                        {
                            !isPlaying && (
                                <button onClick={onVideoClick}>
                                    <BsFillPlayFill className='text-white text-6xl lg:text8xl'/>
                                </button>
                            )
                        }
                    </div>
                    </div>
                    <div className='absolute bottom-5 lg:bottom-10 right-5 lg:right-10 cursor-pointer'>
                        {!isMuted ? (
                            <button onClick={() => setIsMuted(true)}>
                                <HiVolumeOff className="text-white text-3xl lg:text-4xl"/>
                            </button>
                        ) : (
                            <button onClick={() => setIsMuted(false)}>
                                <HiVolumeUp className="text-white text-3xl lg:text-4xl"/>
                            </button>
                        )}
                    </div>
                </div>
                <div className='relative w-[1000px] md:w-[900px] lg:w-[700px] '>
                    <div className='mt-10'>
                        <Link href={`/profile/${post?.postedBy._id}`}>
                            <div className='flex gap-4 mb-4 bg-white w-full pl-10 cursor-pointer'>
                            <Image src={post.postedBy.image} alt='user-profile' width={60} height={60}/>
                                <div>
                                    <div className='text-xl font-bold lowercase flex gap-2 items-center justify-center'>
                                        {post.postedBy.userName.replace(/\s+/g, '')}{' '}
                                        <GoVerified className="text-blue-400 text-xl"/>
                                    </div>
                                    <p className='text-md'>{post.postedBy.userName}</p>
                                </div>  
                            </div>                
                        </Link>
                        <div className='px-10'>
                            <p className='text-md text-gray-600'>{post.caption}</p>
                        </div>
                        <div className='mt-10 px-10 flex gap-4 items-start'>
                            {userProfile && <LikeButton
                                likes={post.likes}
                                handleLike={() => handleLike(true)}
                                handleDislike={() => handleLike(false)}                            />}
                                {
                                    userProfile?._id === post?.postedBy?._id && (
                                        <div className='mt-4 flex flex-col justify-center items-center cursor-pointer'>
                                            <div className='bg-primary rounded-full p-2 md:p-4' onClick={deletePost}>
                                                <MdDelete className='text-lg md:text-2xl'/>
                                            </div>
                                        </div>
                                    ) 
                                }
                                
                                
                        </div>
                        <Comments
                            comment={comment}
                            setComment={setComment}
                            addComment={addComment}
                            comments={post.comments}
                            isPostingComment={isPostingComment}
                            deleteComment={deleteComment}
                        />
                    </div>
                    
                </div>
         </div>
        )}
    </>
   
  )
}

export const getServerSideProps = async ({
    params: { id },
} : {
    params: { id: string };
}) => {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/post/${id}`);

    return {
        props: { postDetails: data }
    };
};

export default Detail