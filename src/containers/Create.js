import React from "react";

const Create = ({match})=>{
    return <h1>This is the creat page {match.params.id}</h1>
}

export default Create