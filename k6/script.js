// k6 run script.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  discardResponseBodies: true,
  insecureSkipTLSVerify: true,
  scenarios: {
    contacts: {
      executor: 'constant-arrival-rate',
      rate: 40,
      timeUnit: '1s',
      duration: '20s',
      preAllocatedVUs: 50,
      maxVUs: 100,
    },
  },
};

// test HTTP
export default function () {
  // const url = 'https://52.65.80.187/api/1.0/posts/search';
  const url = 'https://canchu-109652664.ap-southeast-2.elb.amazonaws.com/api/1.0/posts/search';
  const headers = {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTE0LCJwcm92aWRlciI6Im5hdGl2ZSIsIm5hbWUiOiJnYWh3YTE3IiwiZW1haWwiOiJnYWh3YTE3QHRlc3QuY29tIiwicGljdHVyZSI6Imh0dHBzOi8vNTIuNjUuODAuMTg3L3B1YmxpYy9pbWFnZXMvMTY4OTkyNDY0MzIxMS1TaW1wbGVSb3dsZXQucG5nIiwiaWF0IjoxNjkxNjY2ODE4fQ.O9yFde5MuCnnXgUbJTAMfc2ZNb3SuVLudFU42hr8zkA',
  }
  const res = http.get(url, { headers });
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}