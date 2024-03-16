import React, { useState, useEffect, useRef } from 'react';
import { instance } from "./useAxiosLoader";
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
function MainPage() {

    const [imgList, setImgList] = useState([]);
    const searchRef = new useRef(null);

    useEffect(() => {
        readImages();
    }, [])

    const readImages = async () => {
        await instance({ url: `/api/file/image`})
            .then((response) => {
                console.log('======= 이미지 목록 조회 성공 =======')
                setImgList(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log('======= 이미지 목록 조회 실패 =======')
                console.log(error);
            })
    }
    const search = ()=>{
        const filteredList = imgList.filter(item => item.title.includes(searchRef.current.value));
        setImgList(filteredList);
    }
    return (
        <div>
            <br/>


            <div style={{display:"flex", justifyContent: "center"}}>
                <div style={{width:"75%"}}>
                <h2>레시피 목록</h2>
                <Link to="/write"><Button>레시피 작성하기</Button></Link>
                <div>
                <input type='text' ref={searchRef}/>
                <Button onClick={search}>검색</Button>
                </div>
                <div style={{display:"flex",flexDirection:"row"}}>
                {imgList.map((item) => {
                    return (
                        <span key={item.pid} style={{width:"220px"}}>
                            <div>
                                <div style={{textAlign:"center", fontWeight:"bold"}}>{item.title}</div>
                            <div>
                            <img
                                src={`http://localhost:8080/${item.filename}`}
                                alt={"img"+item.pid}
                                style={{width:"200px", height:"150px", marginRight:"1%"}}
                            />
                            </div>
                            <Link to={`/detail/${item.pid}`}><Button variant="outline-secondary" style={{width:"200px", borderWidth:"4px", fontWeight:"bold"}}>레시피 보러가기</Button></Link>
                            </div>
                        </span>
                    )
                })}
                </div>
                </div>
            </div>
        </div>
    );
}

export default MainPage;