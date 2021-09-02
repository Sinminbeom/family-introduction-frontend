//post전송
export async function PostServiceComponent(path, data, callback) {
    await fetch(path
        , {
            method: 'POST',
            headers: {  },
            body: data
        })
        .then(res => res.json())
        .then(result => { callback(result);});
}

//get전송
export async function GetServiceComponent(path, callback) {
    await fetch(path
        , {
            method: 'POST',
            headers: {  },
        })
        .then(res => res.json())
        .then(result => { callback(result); });
}

export default {PostServiceComponent, GetServiceComponent};