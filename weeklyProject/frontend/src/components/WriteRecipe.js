import Button from 'react-bootstrap/Button';
import { useRef, useState } from 'react';
import { fileInstance } from "./useAxiosLoader";
import {useNavigate} from "react-router-dom";
const WriteRecipe = ()=>{
    const [imgBase64, setImgBase64] = useState([]);
    const [imgFile, setImgFile] = useState(null);
    const titleRef = new useRef(null);
    const descRef = new useRef(null);
    const ingredientRef = new useRef(null);
    const contentRef = new useRef(null);
    const navigate = useNavigate();

    const handleChangeFile = (event) => {
        console.log(event.target.files);
        setImgFile(event.target.files);
        setImgBase64([]);
        for (let i = 0; i < event.target.files.length; i++) {
            if (event.target.files[i]) {
                let reader = new FileReader();
                reader.readAsDataURL(event.target.files[i]);
                reader.onloadend = () => {
                    const base64 = reader.result; // 비트맵 데이터 리턴, 이 데이터를 통해 파일 미리보기가 가능함
                    console.log(base64)
                    if (base64) {
                        let base64Sub = base64.toString()
                        setImgBase64(imgBase64 => [...imgBase64, base64Sub]);
                    }
                }
            }
        }
    }

    const WriteBoard = async () => {
        const fd = new FormData();
        for (let i = 0; i < imgFile.length; i++) {
            fd.append("file", imgFile[i]);
        }
        fd.append(
            "comment",
            "hello world"
        );
        fd.append('file', fd);
        fd.append('title', titleRef.current.value);
        fd.append('desc', descRef.current.value);
        fd.append('ingredient', ingredientRef.current.value);
        fd.append('content', contentRef.current.value);

        await fileInstance({
            method: 'post',
            url: '/api/file/image',
            data:fd

        })
        .then((response) => {
            if(response.data) {
                console.log(response.data)
                setImgFile(null);
                setImgBase64([]);
                alert("업로드 완료!");
            }
            navigate("/");
        })
        .catch((error) => {
            console.log(error)
            alert("실패!");
        })
    }

    const textStyle ={width:"500px", margin:"5px"}

    return(
        <div style={{display:"flex", justifyContent:"center"}}>
            <div style={{width:"900px"}}>
            <h4>레시피 쓰기</h4>
            <div>
                <label>제목</label>
            <input type="text" style={textStyle} ref={titleRef}/>
            </div>
            <div>
            <label>설명</label>
            <input type="text" style={textStyle} ref={descRef}/>
            </div>
            <div>
            <label>재료</label>
            <input type="text" style={textStyle} ref={ingredientRef}/>
            </div>
            <div>
            <label>조리방법</label>
            <br/>
            <div style={{border:"solid 1px" }}>

            
            {imgBase64.map((item) => {
                return (
                    <img
                        key={item}
                        src={item}
                        alt={"First slide"}
                        style={{width:"500px", margin:"0 180px"}}
                    />
                )
            })}
            <div>
            <input type="file" id="file" onChange={handleChangeFile} multiple/>
            </div>
            <textarea style={{ outline: "none",border: "none", width: "870px", height: "400px", margin: "5px", textAlign: "left", verticalAlign: "top", resize: "none" }} ref={contentRef}/>
            </div>
            <div style={{ display:"flex",justifyContent: "flex-end"}}>
            <Button variant="primary" onClick={()=>WriteBoard()}>저장</Button>
            </div>
            </div>


            </div>
        </div>
    )
}
export default WriteRecipe;