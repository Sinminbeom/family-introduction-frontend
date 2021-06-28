//post전송
export async function ServiceComponent(path, data, callback) {
    await fetch(path
        , {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
            body: data
        })
        .then(res => res.json())
        .then(result => { callback(result) });
}

export default {ServiceComponent};