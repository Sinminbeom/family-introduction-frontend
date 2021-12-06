import React, {Fragment, useEffect, useState} from "react";
import { GetServiceComponent } from '../service/ServiceComponent';
import { Image } from 'antd';

const ListFilesComponent = () => {
    const [listfiles, setListfiles] = useState([]);

    const ListFilesCallBack = (result) => {
        for(let i = 0; i < result.length; i++)
        {
            //result[i]['webViewLink'] = result[i]['webViewLink'].replace('/view', '/preview')
            result[i]['imageurl']= 'https://drive.google.com/uc?export=view&id=' + result[i]['id']
        }
        setListfiles(result);
    }
    useEffect(()=>{
        GetServiceComponent('http://49.168.71.214:8000/ListFiles.php',ListFilesCallBack);
        //console.log(listfiles);
    })
    const listfile = listfiles.map((listfiles,index) => {   if(listfiles.mimeType.includes('image'))
                                                            {
                                                                return <Image key={index} width={'20%'} height={300} src={listfiles.imageurl} />
                                                            }
                                                            else
                                                                return <iframe class='ql-video' frameborder='0' allowfullscreen='true' src={listfiles.webViewLink.replace('/view', '/preview')} width='20%' height={300}></iframe>
                                                        });

    return(
        <div>
            {listfile}
        </div>
    )
}

export default ListFilesComponent;