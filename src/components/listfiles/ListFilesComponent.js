import React, {Fragment, useEffect, useState} from "react";
import { GetServiceComponent } from '../service/ServiceComponent';
import { Image } from 'antd';

const ListFilesComponent = () => {
    const [listfiles, setListfiles] = useState([]);

    const ListFilesCallBack = (result) => {
        for(let i = 0; i < result.length; i++)
        {
            result[i]['imageurl']= 'https://drive.google.com/uc?export=view&id=' + result[i]['id']
        }
        setListfiles(result);
    }
    useEffect(()=>{
        GetServiceComponent('http://49.168.71.214:8000/ListFiles.php',ListFilesCallBack);
    },[]) //한번만 실행
    
    const listfile = listfiles.map((listfiles,index) => {   if(listfiles.mimeType.includes('image'))
                                                                return <Image key={index} width={'20%'} height={300} src={listfiles.imageurl} />
                                                            else
                                                                return <iframe key={index} className='ql-video' frameBorder='0' allowFullScreen={true} src={listfiles.webViewLink.replace('/view', '/preview')} width='20%' height={300}></iframe>
                                                        });

    return(
        <div>
            {listfile}
        </div>
    )
}

export default ListFilesComponent;