import { useState } from "react";
import './ImageUpload.css'


export default function ImageUpload(){
    const [showImg, setShowImg] = useState([]);
	function handleAddImg(e){  //이미지 업로드 preview
        const imgList = e.target.files; 
        let imgUrlList = [...showImg]; 
        for(let i = 0; i < imgList.length; i++){
            const currentImgUrl = URL.createObjectURL(imgList[i]);
            imgUrlList.push(currentImgUrl);
        }  
        if(imgUrlList.length > 6){ //최대 이미지 갯수 설정 
            imgUrlList = imgUrlList.slice(0, 6);
        }
        setShowImg(imgUrlList); 
    }

    function handleDeleteImg(image){ //이미지 삭제
        setShowImg(showImg.filter((it)=> it !== image ));  
    }
    return(
        <div className="new">
            <div className='viewImg'>
            <label htmlFor='img' className='addImg' ><span class="material-symbols-outlined">
                add_a_photo
                </span></label> 
                {showImg.map((image, idx)=>(
                    <div key={idx} className='imgBox'>
                        <img src={image} alt={`img${idx}`} />
                        <button onClick={()=>handleDeleteImg(image)}><span class="material-symbols-outlined">
                            delete
                            </span></button>
                    </div>
                ))}
                <input id='img' style={{display:'none'}}  type='file' accept='/image/*' multiple  onChange={handleAddImg}/>
                 
            </div> 
        </div>
    )
}