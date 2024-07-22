
## AXIOS 라이브러리
- 설치가 필요한 라이브러리
- url은 필수값이며, 나머지 속성은 옵션
- method가 설정되지 않으면 get이 기본으로 적용됨

1) AXIOS 설치

`npm i axios`



# 1. GET

`axios.get(’url’). then(res =>{})`

```jsx
axios.get('https://localhost:3001').then((res)=>{
		console.log(res.data);
}).catch((Error)= >{
	console.log(Error);
	})
```

```jsx
axios.get("url", {
        params: {
          	id: 123
        }
    })
    .then(response => {
         // response
    }).catch(error => {
        // 오류발생시 실행
    }).then(() => {
        // 항상 실행
    });
```

# 2. POST

- post 메서드에는 일반적으로 message body에 포함시켜 보낸다.
- get 메서드에서 params를 사용한 경우와 유사함

`axios.post(’url’, { })`

```jsx
 const text = e.target.text.value;
 const done = e.target.done.checked;
 
 axios.post('http://localhost:4000/api/todo', {text, done}); 
```

```jsx
axios.post('http://localhost:3000/word',{
		day: "",
		word: ""
		})
		.then(response => {
         // response  
    }).catch(error => {
        // 오류발생시 실행
    }).then(() => {
        // 항상 실행
    }); 
```

# 3.PUT

- put은 내부적으로 get → post 과정을 거치기 때문에 post와 유사함

`axios.post(’url’, { })`

```jsx
axios.put('http://localhost:3000/word',{
		day: "",
		word: ""
		})
		.then(response => {
         // response  
    }).catch(error => {
        // 오류발생시 실행
    }).then(() => {
        // 항상 실행
    }); 
```

# 4.DELETE

`axios.delete(’url’)`

```jsx
axios.delete('/word/30').then((res)=>{
	console.log(res);
}).catch((error)=>{
	console.log(error)
});
```

# AXIOS INSTANCE

- 반복되는 코드(베이스 URL 등)을 간소화 시켜줌

## 1. CREATE 메서드 사용하여 AXIOS의 인스턴스 생성(async await 통신)

- axios.js 생성

```jsx
import axios from "axios"

const axios = axios.create({
	baseURL:"https://localhost:3000",
	Timeout:5000, 
})
```

<aside>
💡 이때 URL이나 key 값은 깃에 그대로 업로드하거나 배포하면 해킹당할 수 있기 때문에 .env 파일로 옮겨 적고 변수를 사용한다.
.env 파일은 gitignore에 추가한다.

</aside>

- .env 사용하여 인스턴스 생성

```jsx
import axios from "axios"

const axios = axios.create({
	baseURL:process.env.REACT_APP_변수명,
	Timeout:5000, 
})
```

```jsx
REACT_APP_API_URL= 'https://localhost:3000'
```

```jsx
const API_URL = process.env.REACT_APP_API_KEY;
```

- Error Handling을 위한 try catch 문 사용

```jsx
import axios from '../utils/axios'; //경로 가져오기 
const API_URL = process.env.REACT_APP_API_KEY;

export const fetchData = async () => {
    try {
        const reponse = await axios.get('/data'); //API_URL 다음 경로만 작성
	    	return reponse ;
    } catch {
    	// Error Handling
    }
};
```
