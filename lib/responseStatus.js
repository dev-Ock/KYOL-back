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
nothing : 원하는 data가 req에 없을 때
blank : nick에 공백이 있는 경우

500
server error
*/

exports.resStatus = {
  success: {
    code: 200,
    message: 'success',
  },
  invalide: {
    code: 404,
    message: 'invalide',
  },
  invalidn: {
    code: 404,
    message: 'invalidn',
  },
  invalidp: {
    code: 404,
    message: 'invalidp',
  },
  invalidu: {
    code: 404,
    message: 'invalidu',
  },
  invalidg: {
    code: 404,
    message: 'invalidg',
  },
  nothing: {
    code: 404,
    message: 'nothing',
  },
  blank: {
    code: 404,
    message: 'blank',
  },
};
