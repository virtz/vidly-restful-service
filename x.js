//Post /api/returns {customerId, movieId}

//return 401 if cleint is not logged in
//return 400 if customerId is not provided
//return 400 if movieId is not provided
//return 400 if no rental found for this customer/movie
//return 400 if rental is already processed

//return 200 if request is valid
//set the return date
//calculate the rental fee
//increase the stock
// return the rental