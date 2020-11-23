var utcSeconds = 1606327200;



function getDateTime(ts){

/* 
    var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
    d.setUTCSeconds(utcSeconds);
    return d */
    return new Date(ts*1000);
}

export{
    getDateTime
}
