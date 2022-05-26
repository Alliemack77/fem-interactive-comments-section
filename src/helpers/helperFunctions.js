export const createComment = async (text, replyId) => {
    return {
        id: Math.floor(Math.random()* (100 - 5 + 1) + 5), 
        content: text, 
        createdAt: new Date().toISOString(), 
        score: 0, 
        replyingTo: replyId ? replyId : null,
        user: {
            image: { 
                png: "./assets/avatars/image-juliusomo.png",
                webp: "./assets/avatars/image-juliusomo.webp"
            },
            username: "juliusomo"
        },
        replies: [],
    }
}

export const updateComment = async (text) => {
    return { text }
}

export const getTimePassed = (comment) => {
    const msSinceCreation = new Date(comment.createdAt).getTime() // the mili's elapsed from 1970 until comment.createdAt
    const now = Date.now() // the mili's elapsed since 1970 til NOW
    const msElapsed = now - msSinceCreation  // the miliseconds passed between comment creation and now 
    const msPerDay = 24 * 60 * 60 * 1000
    const daysElapsed = Math.floor(msElapsed / msPerDay) 
    const weeksElapsed = Math.floor(daysElapsed / 7)
    const monthsElapsed = Math.floor(weeksElapsed / 4)
    let elapsedAlert;

    if (daysElapsed <= 0 )  {
        elapsedAlert = 'just now'
    } else if (daysElapsed === 1) {
        elapsedAlert = 'yesterday'
    } else if ((daysElapsed > 1 && daysElapsed < 7) || (daysElapsed > 7 && daysElapsed < 14) ) {
        elapsedAlert = `${daysElapsed} days ago`
    } else if (daysElapsed === 7 ) {
        elapsedAlert = `${weeksElapsed} week ago`
    } else if (daysElapsed >= 14 && daysElapsed < 30) {
        elapsedAlert = `${weeksElapsed} weeks ago`
    } else if (daysElapsed > 30) {
        elapsedAlert = `${monthsElapsed} ${monthsElapsed > 1 ? 'months' : 'month' } ago`
    } 
    return elapsedAlert
}