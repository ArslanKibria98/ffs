// "use client"
import React from 'react'

const JsonBar = ({json, name}) => {
    
    return (
        <pre className="mt-2 w-[340px] rounded-md">
            <code className="text-black text-xs">{JSON.stringify(json, null, 3)}</code>
        </pre>
    )
}

export default JsonBar