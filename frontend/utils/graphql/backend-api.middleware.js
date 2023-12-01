import { getUserToken } from "./user";

// const endpoint = "http://localhost:8010/graphql";
const endpoint = `${process.env.NEXT_PUBLIC_WEB_API_URL}/domain/graphql` || "http://localhost:8080/domain/graphql";

const subDomainEndpoint =  `${process.env.NEXT_PUBLIC_WEB_API_URL}/subdomain/graphql` || "http://localhost:8080/subdomain/graphql";

// WEB_API_URL
export const callApiMiddleware = ({ query, variables }) => {
  return new Promise(async (resolve) => {


    const graphqlQuery = {
      query,
      variables
    };
    console.log('!!!!', graphqlQuery)
    const response = await fetch(endpoint,
      {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(graphqlQuery)
      });
    // const response = await axios({
    //   url: endpoint,
    //   method: 'post',
    //   headers:
    //     token ?
    //       {
    //         "Content-Type": "application/json",
    //         "Authorization": `Bearer ${token}`
    //       } :
    //       {
    //         "Content-Type": "application/json",
    //       }
    //   ,
    //   data: graphqlQuery
    // });

    const result = await response.json();
    console.log('graphqlQuery', result)

    return resolve(result);
  })
}


// WEB_API_URL
export const callSubDomainApiMiddlewareWithToken = ({ token, query, variables }) => {
  return new Promise(async (resolve) => {

    const graphqlQuery = {
      query,
      variables
    };
    
    const response = await fetch(subDomainEndpoint,
      {
        method: 'POST',
        headers:
          token ?
            {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            } :
            {
              "Content-Type": "application/json",
            },
        body: JSON.stringify(graphqlQuery)
      });
    // const response = await axios({
    //   url: endpoint,
    //   method: 'post',
    //   headers:
    //     token ?
    //       {
    //         "Content-Type": "application/json",
    //         "Authorization": `Bearer ${token}`
    //       } :
    //       {
    //         "Content-Type": "application/json",
    //       }
    //   ,
    //   data: graphqlQuery
    // });

    const result = await response.json();

    return resolve(result);
  })
}