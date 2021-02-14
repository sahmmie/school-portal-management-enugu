import _ from 'lodash'
const notificationsEnum = {
    /**
     *
     * @param {{_id:String, firstName:String, lastName:String, profile:{profilePics:String}}} sender
     */
    generateInvitePageMsg: (sender, pageName = "rollback") => {
        return `${sender} has invited you to like ${pageName}`;
    },

    /**
     *
     * @param {{_id:String, firstName:String, lastName:String, profile:{profilePics:String}}} sender
     */
    generateFriendRequestMsg: (sender) => {
        return `${sender} has sent you to Friend Request`;
    },

    /**
     *
     * @param {{_id:String, firstName:String, lastName:String, profile:{profilePics:String}}} sender
     * @param {{ postedBy ,text,medias,reactions,userTags,comments,hashTags }} post
     *
     */
    generateReactionPosttMsg: (sender, post, reaction) => {
        return `${sender} reacted (${reaction}) to your post ${post}`;
    },

    /**
     *
     * @param {{_id:String, firstName:String, lastName:String, profile:{profilePics:String}}} sender
     * @param {{ postedBy ,text,medias,reactions,userTags,comments,hashTags }} post
     *
     */
    generateTagMsg: (sender, post) => {
        return `${sender} tagged you on ${post}`;
    },

    /**
     * 
     * @param {{_id:String, firstName:String, lastName:String, profile:{profilePics:String}}} sender 
     * @param {{ postedBy ,text,medias,reactions,userTags,comments,hashTags }} post 
     * 
     */
    generateCommentMsg: (sender, post, reaction) => {
        return `${sender} commented on your post ${post}`
    },
};

export default notificationsEnum;