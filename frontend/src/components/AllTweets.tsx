export const AllTweets = ({userData}:{userData:any})=>{
    return <div>
        All Your tweets span here
        {userData.map((data:any) => <h1>{data.user.username}</h1>)}
    </div>
}