import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000/api";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class MicroBlogAPI {
    // the token for interactive with the API will be stored here.
    static _token = "";

    /**
     * getter of toke, if not available check the localStorage
     */
    static get token() {
        if (this._token === "") {
            //check the localStorage
            this._token = localStorage.getItem("_token");
            if (this._token === null) {
                this._token = "";
            }
        }
        return this._token;
    }

    static set token(t) {
        localStorage.setItem("_token", t);

        this._token = t;
    }

    static async request(endpoint, data = {}, method = "get") {
        console.debug("API Call:", endpoint, data, method);

        //there are multiple ways to pass an authorization token, this is how you pass it in the header.
        //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${this.token}` };
        const params = (method === "get")
            ? data
            : {};

        try {
            return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    // Individual API routes
    /**
     * Get Posts
     * 
     * Returns [ { id,
     *        title,
     *        description,
     *        votes,
     *      },
     *      ...
     *    ]
     */
    static async postList() {
        return await this.request("posts", {});
    }

    /**
     * Get Post Detail
     * @param {*} postId 
     * @returns { id,
     *        title,
     *        description,
     *        body,
     *        votes,
     *        comments: [ { id, text }, ... ],
     *      }
     */
    static async postGet(postId) {
        return await this.request(`posts/${postId}`, {});
    }

    static async postInsert(post) {
        return await this.request(
            `posts`,
            {
                title: post.title,
                description: post.description,
                body: post.body
            },
            "post");
    }

    static async postUpdate(post) {
        return await this.request(
            `posts/${post.id}`,
            {
                title: post.title,
                description: post.description,
                body: post.body
            },
            "put");
    }


    static async postDelete(postId) {
        return await this.request(
            `posts/${postId}`,
            {},
            "delete"
        );
    }

    static async commentInsert(postId, comment) {
        return await this.request(
            `posts/${postId}/comments`,
            {
                text: comment.text
            },
            "post"
        );
    }

    static async commentUpdate(postId, comment) {
        return await this.request(
            `posts/${postId}/comments/${comment.id}`,
            {
                text: comment.text
            },
            "put"
        );
    }


    static async commentDelete(postId, commentId) {
        return await this.request(
            `posts/${postId}/comments/${commentId}`,
            {},
            "delete"
        );
    }

    static async vote(postId , direction){

        return await this.request(
            `posts/${postId}/vote/${direction}`,
            {},
            "post"
        );
    }

}


export default MicroBlogAPI;
