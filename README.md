

https://github.com/LeeDongGeonGit/WeeklyProject/assets/149302310/74327158-8579-4d1f-afd3-bce5a6caceee

frontEnd

npx create-react-app recipe-web

로 리액트파일을 만들고 명령창으로 들어가서

npm install react-bootstrap bootstrap

npm install react-router-dom

 npm install axios
 
 이것들을 깔아준다.
 
 그후 src파일을 교체해주고
 
 npm start를 쳐준다.

 backEnd
 spring-boot에서 new -> spring starter project를 클릭후 
 
 maven으로 설정하고 자바버전 17로 선택
 
 ![image](https://github.com/LeeDongGeonGit/WeeklyProject/assets/149302310/95766a2e-6df9-4c6c-ad9f-6d8e666bddbc)
보이는 6개를 전부 선택후 finish

프로젝트 생성후 demo에 파일을 넣어주고 application.properties를 교체 or 복붙으로 내용을 바꿔준다.

h2가 실행되어 있어야하며 h2정보가 바뀌면 application.properties내용을 바꿔줘야한다.

또한 fileController에서 이미지를 저장할 path경로를 자신의 컴퓨터 경로에 맞게 설정해주고 

application.properties에서

spring.web.resources.static-locations=file:C:/Users/sisi9/imges/

를 저장한 이미지경로로 변경해줘야한다.

그 후 프로젝트를 spring boot app으로 실행한다. 

