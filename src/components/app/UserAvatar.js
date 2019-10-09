import React from "react";

const UserAvatar = ({name, photoUrl, className, size}) => {
    const uiAvartarUrl = 'https://ui-avatars.com/api/'+encodeURI(name.split(' ').join('+'))+'/64/f8f9fc/007bff';
    return(
        (photoUrl===null)?(
            <img src={uiAvartarUrl} className={className} width={size} height={size} alt={name} />
        ):(
            <img src={photoUrl} className={className} width={size} height={size} alt={name} />
        )
    )
}

export default UserAvatar;