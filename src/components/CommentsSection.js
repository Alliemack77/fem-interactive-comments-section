import { useEffect, useState } from "react"
import { 
    createComment, 
    updateComment as editComment,
} from "../helpers/helperFunctions"
import Comment from "./Comment"
import Form from "./Form"

const CommentSection = ({currentUser}) => {
    const [comments, setComments] = useState([])
    const [activeComment, setActiveComment] = useState(null)
    
    // get comments
    useEffect(() => {
        fetch('https://fem-comments-section-api.herokuapp.com/comments')
        .then(res => res.json())
        .then(data => setComments(data))
    }, [])

    const addComment = (text, replyId) => {
        if (!replyId) {
            createComment(text).then(data => {
                setComments(prevComments => {
                    return [
                        data,
                        ...prevComments 
                    ]
                })
            })
        } else {
            createComment(text, replyId).then(data => {
                setComments(prevComments => {
                    return prevComments.map(comment => {
                        return comment.user.username === data.replyingTo ? 
                            {...comment, replies: [...comment.replies, data]} : 
                            comment
                    })
                })
            })
        }
        setActiveComment(null)
    }

    const updateComment = (text, id, type) => {
        console.log(text, id, type)
        if(type === 'parent') {
            editComment(text, id).then(() => {
                const updatedComments = comments.map(comment => {
                    if (comment.id === id) {
                        return {...comment, content: text}
                    }
                    return comment
               })
               setComments(updatedComments)
            })
        } 
        if(type === 'child') {
            editComment(text, id).then(() => {
                setComments(prevComments => prevComments.map(comment => {
                    return {
                        ...comment, 
                        replies: comment.replies.map(reply => {
                            if (reply.id === id) {
                                return {...reply, content: text}
                            }
                            return reply
                        })
                    }
                }))
            })
         }
        setActiveComment(null)
    }

    const deleteComment = (commentId, type) => {
        console.log(commentId, type)
        if(type === 'parent') {
            setComments(prevComments => prevComments.filter(comment => comment.id !== commentId ))
        } 
        if(type === 'child') {
            setComments(prevComments => prevComments.map(comment => {
                return {...comment, replies: comment.replies.filter(reply => reply.id !== commentId )}
            }))
        }
    }
    
    return (
        <main>
            <section className="container">
                <h1>Comments</h1>
                <div className='comments'>
                    { comments ? 
                        comments.map(comment => {
                            return (
                                <Comment 
                                key={comment.id}
                                type='parent'
                                currentUser={currentUser}
                                comment={comment}
                                addComment={addComment}
                                updateComment={updateComment}
                                deleteComment={deleteComment}
                                activeComment={activeComment}
                                setActiveComment={setActiveComment}
                                parentId={comment.user.username}
                                />
                                )
                            }) : <h2>Loading comments... </h2>
                        }
                </div>
                <Form 
                    labelText='Send'
                    handleSubmit={addComment}/>
            </section>
        </main>
    )
}

export default CommentSection
