import { useEffect, useState } from "react"
import { getTimePassed } from "../helpers/helperFunctions"
import Button from "./Button"
import Form from "./Form"
import CounterButton from "./CounterButton"

const Comment = ({
    currentUser, 
    comment, 
    addComment,
    updateComment,
    deleteComment,
    activeComment,
    setActiveComment,
    type, 
    parentId
}) => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    const fiveMinutes = 300000
    const timePassed = new Date() - new Date(comment.createdAt) > fiveMinutes
    const canDelete = currentUser === comment.user.username && !timePassed 
    const canEdit = currentUser === comment.user.username && !timePassed 
    const isEditing = activeComment && activeComment.type === 'editing' && activeComment.id === comment.id
    const isReplying = activeComment && activeComment.type === 'replying' && activeComment.id === comment.id
    const replyId = parentId ? parentId : comment.user.username
    const counterButton = <CounterButton likeCount={comment.score} />
    const actions = <div className='actions'>
                        {canDelete && <Button type='delete' text='Delete' onClick={() => deleteComment(comment.id, type)}/> }
                        {canEdit && <Button type='edit' text='Edit' onClick={() => setActiveComment({id: comment.id, type: 'editing'})}/> }
                        {currentUser === comment.user.username ? null : 
                            <Button type='reply' text='Reply' onClick={() => setActiveComment({id: comment.id, type:'replying'})}/>
                        }
                    </div>

    useEffect(() => {
        window.addEventListener('resize', () => {
            setWindowWidth(window.innerWidth)
        })
    }, [windowWidth] )

    return (
        <article >
            <div className={`${type === 'parent' ? 'comment' : 'reply'} `}>
                {/* { windowWidth > 500 && <CounterButton likeCount={comment.score} />} */}
                { windowWidth > 500 && counterButton}
                <div className='content'>
                    <div className='flex justify-space-between'>
                        <div className='details flex align-items-center'>
                            <img className='avatar' src={comment.user.image.png} alt="the author's avatar"/>
                            <p className='text-dark-grey fw-700'>{comment.user.username}</p>
                            <p>{getTimePassed(comment)}</p>
                        </div>
                        { windowWidth > 500 && actions }
                    </div>
                    <p>{comment.content}</p>
                </div>
                { windowWidth < 500 &&
                <div className='flex justify-space-between'>
                    {counterButton}
                    {actions}
                </div>
                }
            </div>
            { isEditing && (
                <Form 
                    labelText='Update'
                    handleSubmit={(text) => updateComment(text, comment.id, type)}
                />
            )}
            { isReplying && (
                <Form 
                    labelText='Reply'
                    handleSubmit={(text) => addComment(text, replyId)}
                />
            )}
            { comment.replies === undefined ? null : 
            <div className='replies'>
                {  
                    comment.replies.map(reply => {
                        return <Comment 
                                    key={reply.id}
                                    type='child'
                                    currentUser={currentUser}
                                    comment={reply}
                                    addComment={addComment}
                                    // addReply={addReply}
                                    updateComment={updateComment}
                                    deleteComment={deleteComment}
                                    activeComment={activeComment}
                                    setActiveComment={setActiveComment}
                                    parentId={comment.user.username}
                                />
                    }) 
                }
            </div>
            }
        </article>
    )
}

export default Comment