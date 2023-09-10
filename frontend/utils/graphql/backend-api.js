import { getUserToken } from "./user";
import axios from 'axios'

// const endpoint = "http://localhost:8010/graphql";
const endpoint = `${process.env.NEXT_PUBLIC_WEB_API_URL}/domain/graphql` || "http://localhost:8080/domain/graphql";
const subDomainEndpoint = `${process.env.NEXT_PUBLIC_WEB_API_URL}/subdomain/graphql` || "http://localhost:8080/subdomain/graphql";

// WEB_API_URL
export const callApi = ({ query, variables }) => {
  return new Promise(async (resolve) => {

    const token = getUserToken()

    const graphqlQuery = {
      query,
      variables
    };

    const response = await axios({
      url: endpoint,
      method: 'post',
      headers:
        token ?
          {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          } :
          {
            "Content-Type": "application/json",
          }
      ,
      data: graphqlQuery
    });

    return resolve(response);
  })
}


export const callSubDomainApi = ({ query, variables }) => {
  return new Promise(async (resolve) => {

    const token = getUserToken()

    const graphqlQuery = {
      query,
      variables
    };

    const response = await axios({
      url: subDomainEndpoint,
      method: 'post',
      headers:
        token ?
          {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          } :
          {
            "Content-Type": "application/json",
          }
      ,
      data: graphqlQuery
    });

    return resolve(response);
  })
}