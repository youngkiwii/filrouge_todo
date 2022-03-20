import { Token } from "graphql";
import { json } from "neo4j-driver-core";
import { TokenContext } from "../Contexte/Context";

const API_URL = 'http://localhost:4000'

const SIGN_IN =
    'mutation($username:String!, $password:String!){signIn(username:$username, password:$password)}';

const SIGN_UP =
    'mutation($username:String!, $password:String!){signUp(username:$username, password:$password)}';

const TASK_LISTS = 
    'query($username: String!) {taskLists(where: { owner: { username: $username } }) { id title }}';

const CREATE_TASK_LISTS = 'mutation($title: String!, $username: String!) {createTaskLists(input: { title: $title owner: { connect: { where: { username: $username } } }}) {taskLists {id title owner { username } }}}'

const DELETE_TASK_LISTS = 'mutation($id: ID!) {deleteTaskLists(where: {id: $id}){nodesDeleted relationshipsDeleted}}'

const TASKS = 'query($username: String!, $id: ID!){tasks (where: {belongsTo: {id: $id, owner: {username: $username}}}) {id content done belongsTo {id title}}}';

const CREATE_TASK = 'mutation($content: String!, $idList: ID!) {createTasks(input: {content: $content, done: false, belongsTo: {connect: {where: {id: $idList}}}}){tasks{id content done belongsTo{ id title }}}}';

const DELETE_TASK = 'mutation($id: ID!) {deleteTasks(where: {id: $id}){nodesDeleted relationshipsDeleted}}'

const UPDATE_TASK = `mutation($done: Boolean!, $id: ID!) {
    updateTasks(where: { id: $id }
        update: {done: $done})
    {tasks {id content done belongsTo {id title}}}
  }`

const GET_USERS = `query { users (where: {roles_NOT_INCLUDES: "admin"}){id username roles}}`

const DELETE_USER = `mutation ($id: ID!){ deleteUsers (where: {id: $id}) {nodesDeleted relationshipsDeleted}}`

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
        if(jsonResponse.errors != null)
            throw jsonResponse.errors[0];
        return jsonResponse.data.signUp;
    })
    .catch(error => {
        throw error
    })
}

export function taskLists (login, token) {
    return fetch(API_URL, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: TASK_LISTS,
            variables: {
                username: login,
            }
        })
    })
    .then(response => response.json())
    .then(jsonResponse => {
        if(jsonResponse.errors != null)
            throw jsonResponse.errors[0];
        return jsonResponse.data.taskLists;
    })
    .catch(error => {
        throw error
    })
}

export function createTaskLists(title, username, token) {
    return fetch(API_URL, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: CREATE_TASK_LISTS,
            variables: {
                title: title,
                username: username
            }
        })
    })
    .then(response => response.json())
    .then(responseJson => {
        if(responseJson.errors != null)
            throw responseJson.errors[0];
        return responseJson.data.createTaskLists;
    })
    .catch(err => {
        throw err;
    })
}

export function deleteTaskLists(id, token) {
    return fetch(API_URL, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: DELETE_TASK_LISTS,
            variables: {
                id: id,
            }
        })
    })
    .then(response => response.json())
    .then(json => {
        if(json.errors != null)
            throw json.errors[0];
        return json.data;
    })
    .catch(err => {
        throw err;
    });
}

export function tasks(username, id, token) {
    return fetch(API_URL, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: TASKS,
            variables: {
                username: username,
                id: id,
            }
        })
    })
    .then(response => response.json())
    .then(json => {
        if(json.errors != null)
            throw json.errors[0];
        return json.data.tasks;
    })
    .catch(err => {
        throw err;
    });
}

export function deleteTaskById(id, token) {
    return fetch(API_URL, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: DELETE_TASK,
            variables: {
                id: id,
            }
        })
    })
    .then(response => response.json())
    .then(json => {
        if(json.errors != null)
            throw json.errors[0];
        return json.data;
    })
    .catch(err => {
        throw err;
    })
}

export function createTask(content, idList, token) {
    return fetch(API_URL, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: CREATE_TASK,
            variables: {
                content: content,
                idList: idList
            }
        })
    })
    .then(response => response.json())
    .then(json => {
        if(json.errors != null)
            throw json.errors[0];
        return json.data.createTasks;
    })
    .catch(err => {
        throw err;
    })
}

export function updateTask(id, done, token) {
    return fetch(API_URL, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: UPDATE_TASK,
            variables: {
                done: done,
                id: id,
            }
        })
    })
    .then(response => response.json())
    .then(json => {
        if(json.errors != null)
            throw json.errors[0];
        return json.data.updateTasks;
    })
    .catch(err => {
        throw err;
    })
}

export function getUsers(token) {
    return fetch ( API_URL, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: GET_USERS
        })
    })
    .then(response => response.json())
    .then(json => {
        if(json.errors != null)
            throw json.errors[0];
        return json.data.users;
    })
    .catch(err => {
        throw err;
    });
}

export function deleteUser(id, token) {
    return fetch (API_URL, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: DELETE_USER,
            variables: {
                id: id
            }
        })
    })
    .then(response => response.json())
    .then(json => {
        if(json.errors != null)
            throw json.errors[0];
        return json.data.deleteUsers;
    })
    .catch(err => {
        throw err;
    });
}