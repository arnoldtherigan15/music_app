# 3_PARTY_API-ERROR_HANDLER

ERROR HANDLING
- Express Error Handling (https://expressjs.com/en/guide/error-handling.html)
- error itu diindikasikan dengan next() yang membawa parameter
  next(err) // dianggap sebagai error dan akan mencari error handler
- error handler itu middleware yg punya 4 parameter
- kemudian errorHandler di use di app.js, letakan di bagian akhir


![rubric](./images/detail.png)               "id": 3,
                "title": "Butiran Jasjus",
                "genre": "Metal",
                "artist": "Agung",
                "updatedAt": "2020-08-03T03:38:12.713Z",
                "createdAt": "2020-08-03T03:38:12.713Z"
            }
        }
    ```
 
* **Error Response:**

  <_Most endpoints will have many ways they can fail. From unauthorized access, to wrongful parameters etc. All of those should be liste d here. It might seem repetitive, but it helps prevent assumptions from being made where they should be._>

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "Title is required" }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "Genre is required" }`


* **URL**

  `/musics`

* **Method:**
  
  `GET`
  

* **Success Response:**
  
  lalalili

  * **Code:** 200 <br />
    **Content:** 
    ```json
        {
            "musics": [
                {
                    "id": 1,
                    "title": "Butiran Debu",
                    "genre": "Metal",
                    "artist": "Agung",
                    "createdAt": "2020-08-03T03:20:26.161Z",
                    "updatedAt": "2020-08-03T03:20:26.161Z"
                },
                {
                    "id": 2,
                    "title": "Dian bukan boneka",
                    "genre": "Indie",
                    "artist": "Dian",
                    "createdAt": "2020-08-03T03:21:25.317Z",
                    "updatedAt": "2020-08-03T03:21:25.317Z"
                }
            ]
        }
    ```
 
* **Error Response:**

  <_Most endpoints will have many ways they can fail. From unauthorized access, to wrongful parameters etc. All of those should be liste d here. It might seem repetitive, but it helps prevent assumptions from being made where they should be._>

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Internal Server Error" }`
