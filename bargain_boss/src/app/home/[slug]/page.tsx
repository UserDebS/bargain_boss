const Page = ({params} : {params : {slug : string}}) => {
    return ( <>{params.slug}</> );
}
 
export default Page;