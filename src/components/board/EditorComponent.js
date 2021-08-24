import base64 from 'base-64';
import React, { Component, useMemo, Fragment} from 'react';
import 'react-quill/dist/quill.snow.css';
import ReactQuill, { Quill } from 'react-quill';
import ImageResize from 'quill-image-resize-module-react';  // import as default
import QuillImageDropAndPaste from "./ImageDropAndPaste";
import { BrowserView, MobileView, isBrowser, isMobile} from 'react-device-detect';
import quillEmoji from "react-quill-emoji";
import "react-quill-emoji/dist/quill-emoji.css";
import {ServiceComponent} from '../service/ServiceComponent';
import { Image } from 'antd';

Quill.register('modules/imageResize', ImageResize);
Quill.register("modules/imageDropAndPaste", QuillImageDropAndPaste);
Quill.register(
  {
    "formats/emoji": quillEmoji.EmojiBlot,
    "modules/emoji-toolbar": quillEmoji.ToolbarEmoji,
    "modules/emoji-textarea": quillEmoji.TextAreaEmoji,
    "modules/emoji-shortname": quillEmoji.ShortNameEmoji
  },
  true
);

class EditorComponent extends Component{
  constructor(props) {
    super(props);

  }
  /* emoji 패키지를 설치하니까 formats에서 오류 발생으로 잠시 주석처리
  formats = [
    //'font',
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image',
    'align', 'color', 'background',        
  ]*/
  modules = { 
    imageDropAndPaste: { handler: this.imageHandler1  },
    toolbar:{
      container: [
        //[{ 'font': [] }],
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline','strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image'],
        [{ 'align': [] }, { 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        ['clean'],
        ['emoji'],
      ],
      handlers: {
        image: this.imageHandler,
      },
    },
    "emoji-toolbar":true,
    imageResize: {
      handleStyles: {
        backgroundColor: 'black',
        border: 'none',
        color: 'white',
      },
      modules: ['Resize', 'DisplaySize', 'Toolbar'],
    },

  }

  GetFileAttribute(file) {
    var reader = new FileReader(); // CREATE AN NEW INSTANCE.
    var check = false;
    reader.onload = function (e) {
        var img = new Image();      
        img.src = e.target.result;

        img.onload = function () {
            var w = this.width;
            var h = this.height;
            if(w > 300){
              check = true;
            }
            else{
              check = false;
            }
            console.log(
                   'Name: ' + file.name + '\n' +
                   'File Extension: ' + file.fileExtension + '\n' +
                   'Size: ' + Math.round((file.size / 1024)) + 'KB \n' +
                   'Width: ' + w + '\n' +
                   'Height: ' + h + '\n' +
                   'Type: ' + file.type + '\n' +
                   'Last Modified: ' + file.lastModifiedDate );
        }
    };
    reader.readAsDataURL(file);
    // return check;
  };
  
  imageHandler()  {
    const range =  this.quill.getSelection();
    const quill = this.quill;
    var formData = new FormData();
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    //input.onChange() = function(); 안쓴이유는 모든 브라우저는 잘되는데 safari만 onChange 이벤트를 못씀
    function api() {
      
      const file = input.files[0];
      
      console.log('User trying to uplaod this:', file);

      formData.append("image",file);

      const options = {
        method: 'POST',
        body: formData,
      };

      try {
        fetch('http://49.168.71.214:8000/ImageUpload.php', options)
        .then(res => res.json())
        .then(response => {
              console.log(response["url"]);
              const link = response["url"];
              quill.insertEmbed(range.index, 'image', link);
              
              if(isMobile){
                quill.formatText(range.index, 1, 'width', '300px'); //to limit the width
              }
          });
      }
      catch(err)
      {
        return console.error('err',err);
      }
      /*const link = 'http://192.168.68.128/minbeom.jpg';
      this part the image is inserted
      by 'image' option below, you just have to put src(link) of img here. */

    }
    input.addEventListener('change',api,false);

  }

  imageHandler1(dataUrl, type, imageData, callback) {
      imageData
        .minify({
          maxWidth: 320,
          maxHeight: 320,
          quality: 0.7
        })
        .then(miniImageData => {
          console.log(typeof dataUrl);
          console.log(typeof miniImageData);
          console.log(typeof miniImageData.dataUrl);
          // const blob = miniImageData.toBlob();
          // const file = miniImageData.toFile("my_cool_image.png");
          // console.log(`type: ${type}`);
          // console.log(`dataUrl: ${dataUrl.length}`);
          // console.log(`blob: ${blob}`);
          // console.log(`miniImageData: ${miniImageData}`);
          // console.log(`file: ${file}`);
  
          // setImage({ type, dataUrl, blob, file });
          console.log("Calling...");
          // callback.call(this, miniImageData.dataUrl);
          callback.call(this, miniImageData.dataUrl);
      });

  }

  onQuillChange = (content, delta, source, editor) =>{
    this.props.onChange(editor.getHTML());
  }

    render(){
        // const { value, onChange } = this.props;
        
        return(
          <Fragment>
          {isBrowser  ? <ReactQuill
                              ref={(el) => {this.quill = el;}}
                              style={{height: "600px"}} 
                              theme="snow" 
                              modules={this.modules} 
                              // formats={formats} 
                              value={this.props.value || ''} 
                              onChange={this.onQuillChange}
                        />
                      :
                        <ReactQuill
                              ref={this.quill}
                              style={{height: "350px"}} 
                              theme="snow" 
                              modules={this.modules} 
                              // formats={formats} 
                              value={this.props.value || ''} 
                              onChange={this.onQuillChange}
                        />
          }
                {/* <ReactQuill
                    ref={this.quill}
                    style={{height: "100%"}} 
                    theme="snow" 
                    modules={this.modules} 
                    formats={this.formats} 
                    value={this.props.value || ''} 
                    //onChange={(content, delta, source, editor) => onChange(editor.getHTML())}
                    onChange={this.onQuillChange}
                /> */}
                </Fragment>
        );
    }
}
export default EditorComponent