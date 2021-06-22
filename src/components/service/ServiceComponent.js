const ServiceComponent = (url,formData,callback) =>{
    try {
        fetch(url,  { 
                    method: 'POST',
                    headers:{
                    },
          body: formData
        }).then(res => res.json()).then(response => {
                                                        callback()
                                                    }
                                        );
    } catch (err) {
        return console.error('err',err);
    }
}

export default {ServiceComponent};