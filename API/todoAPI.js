const API_URL = 'http://localhost:4000'

const SIGN_IN =
    'mutation($username:String!, $password:String!){signIn(username:$username, password:$password)}';

const SIGN_UP =
    'mutation($username:String!, $password:String!){signUp(username:$username, password:$password)}';

export function signIn (username, password) {
    return fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: SIGN_IN,
            variables: {
                username: username,
                password: password
            }
        })
    })
    .then(response => response.json())
    .then(jsonResponse => {
        if(jsonResponse.errors != null)
            throw jsonResponse.errors[0];
        return jsonResponse.data.signIn;
    })
    .catch(error => {
        throw error
    })
}

export function signUp (login, password) {
    return fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: SIGN_UP,
            variables: {
                username: login,
                password: password
            }
        })
    })
    .then(response => response.json())
    .then(jsonResponse => {
        console.log(jsonResponse);
        return jsonResponse.data.signUp;
    })
    .catch(error => {
        throw error
    })
}