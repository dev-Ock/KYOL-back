/*
200
success

404
invalide : invalid email
invalidn : invalid nick
invalidp : invalid pw
invalidu : invalid user	
nothing : 원하는 data가 req에 없을 때

500
server error
*/

const error = {
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
  nothing: {
    code: 404,
    message: 'nothing',
  },
};
