const extractVerificationTokenAndTypeFromLink = (link) => {
    const regex = /href=([^ >]+)(?=>)/; // This will capture everything between href=" and "
    const match = link.match(regex);

    // Check if the match exists
    if (match && match[1]) {
        const url = match[1];

        const parts = url.split('/');


        const verificationToken = parts[parts.length - 1];
        const type = parts[parts.length - 3];

        
        return [type, decodeURIComponent(verificationToken)];
    } else {
        console.log('No valid URL found.');
    }
}


module.exports = extractVerificationTokenAndTypeFromLink;