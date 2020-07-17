export function getLocations(url){

    return new Promise(async (resolve , reject) =>{

        let err = null;

        fetch(url,{
            method: "GET",
            headers: {
              "access-control-allow-origin" : "*"
            }})
          .then(results => {

            resolve(results.json());

        }).catch((e) => {
      
            err = e;

        }).then(() => {
            if (err != null) {
  
            reject("Something went wrong while fetching data. " + err);
        }});
        
    })
}
