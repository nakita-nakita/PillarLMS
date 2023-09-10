
// const endpoint = "http://localhost:8010/graphql";
const endpoint = `${process.env.NEXT_PUBLIC_WEB_API_URL}/domain/graphql` || "http://localhost:8080/domain/graphql";

// WEB_API_URL
export const callApiMiddleware = ({ query, variables }) => {
  return new Promise(async (resolve) => {


    const graphqlQuery = {
      query,
      variables
    };
    console.log('graphqlQuery', graphqlQuery)
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

    return resolve(result);
  })
}