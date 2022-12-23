/*
[Response status code, message] 

200
success

404
invalide : invalid email
invalidn : invalid nick
invalidp : invalid pw
invalidu : invalid user	
invalidg : invalid gold
invalidt : invalid token
invalidi : invalid column_id
different : different UserId
same : 같으면 안 되는데 같은 경우
expired : token 만료
notenough : 원하는 data가 req에 아예 없거나 부족할 때
blank : nick에 공백이 있는 경우


500
server error
*/

// api에서 반복되는 res 세~네줄의 코드를 한 줄로 줄일 있는 response 라는 function을 만듬. confirm받고 사용여부 결정하기 ★★★
// function response(res, status, input) {
//   return res.status(status.code).json({
//     message: status.message,
//     data: input,
//   });
// }

const resStatus = {
  success: {
    code: 200,
    message: "success",
  },
  invalide: {
    code: 404,
    message: "invalide",
  },
  invalidn: {
    code: 404,
    message: "invalidn",
  },
  invalidp: {
    code: 404,
    message: "invalidp",
  },
  invalidu: {
    code: 404,
    message: "invalidu",
  },
  invalidg: {
    code: 404,
    message: "invalidg",
  },
  invalidt: {
    code: 404,
    message: "invalidt",
  },
  invalidi: {
    code: 404,
    message: "invalidi",
  },
  different: {
    code: 404,
    message: "different",
  },
  same: {
    code: 404,
    message: "same",
  },
  expired: {
    code: 404,
    message: "expired",
  },
  notenough: {
    code: 404,
    message: "notenough",
  },
  blank: {
    code: 404,
    message: "blank",
  },
};

// module.exports = { response, resStatus };
module.exports = { resStatus };
