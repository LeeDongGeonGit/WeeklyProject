import Button from 'react-bootstrap/Button';
import { useEffect, useRef, useState } from 'react';
import { instance } from "./useAxiosLoader";
import { useParams } from 'react-router-dom';


const RecipeDetail = ()=>{
    const [imgFile, setImgFile] = useState(null);
    const [title,setTitle] = useState();
    const [desc,setDesc] = useState();
    const [ingredient,setIngredient] = useState();
    const [contnet,setContent] = useState();
    const [commentList,setCommentList] = useState([]);
    const {id} = useParams();
    const commentRef = new useRef(null);
    useEffect(()=>{
        readImages();
        getComment();
    },[]);

    
    const readImages = async () => {
        await instance({ url: `/api/file/${id}`})
            .then((response) => {
                setImgFile(response.data.filename);
                setTitle(response.data.title);
                setDesc(response.data.desc);
                setIngredient(response.data.ingredient);
                setContent(response.data.content);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }
    const writeComment = async ()=>{
        await instance({
            method: 'post',
            url: `api/file/comment`,
            data : {
                content: commentRef.current.value,
                pid: id}
        })
        .then((response)=>{
            commentRef.current.value = null;
            getComment();
        }).catch((error)=>{
            console.log(error);
        })
    }
    const getComment = async()=>{
        await instance({ url: `/api/file/comment/${id}`})
        .then((response) => {
            setCommentList(response.data);
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        })

    }




    return(
        <div style={{display:"flex", justifyContent:"center"}}>
            <div style={{width:"900px"}}>
            <h4>레시피 상세보기</h4>
            <div>
                <label>제목</label>
            <div>{title}</div>
            </div>
            <div>
            <label>설명</label>
            <div>{desc}</div>
            </div>
            <div>
            <label>재료</label>
            <div>{ingredient}</div>
            </div>
            <div>
            <label>조리방법</label>
            <br/>
            <div style={{border:"solid 1px" }}>

            
            <img
                src={`http://localhost:8080/${imgFile}`}
                alt={"img"+id}
                style={{width:"200px", height:"150px", marginRight:"1%"}}
                            />
            <div>{contnet}</div>
            </div>
            <div style={{fontSize: 29}}>댓글</div>
            {commentList.map(comment=>{
                return(<div key={comment.pid}>{comment.content}</div>);
            })}
            <div style={{marginTop: 20}}>

           <textarea ref={commentRef} style={{resize:"none",  width:500}}/>
      
          </div>
          <Button onClick={writeComment} > 댓글 작성</Button>
      
            </div>


            </div>
        </div>
    )
}
export default RecipeDetail;