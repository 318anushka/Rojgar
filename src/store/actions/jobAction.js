export const createJob = (job) => {
    return (dispatch, getState, { getFirestore, getFirebase }) => {
      // make async call to database
      console.log(getState());
      const firestore = getFirestore();
      const profile = getState().firebase.profile;
      const authorId = getState().firebase.auth.uid;

      // firestore.collection("notifications").add({
      //   content: 'New job posted',
      //   postedBy: profile.firstName,
      //   time: new Date()
      // }).then(() => {
      //   dispatch({ type: 'CREATE_JOB_SUCCESS' });
      // }).catch(() => {
      //   dispatch({ type: 'NOTIFICATION_ERROR' });
      // })
    firestore.collection('jobs').add({
      ...job,
      postedBy: profile.firstName,
      createdAt: new Date()
    })
    .then(function(docRef)  {
      console.log("response" ,docRef);
      return firestore.collection('notifications').doc(docRef.id).set({
        content: 'New job posted',
        postedBy: profile.firstName,
        time: new Date(),
        title: job.title
      });
    })
    .then(() => {
      dispatch({ type: 'CREATE_JOB_SUCCESS' });
    }).catch(err => {
      dispatch({ type: 'CREATE_JOB_ERROR' }, err);
    });    
  }
  };

  export const setUp = (currentLocation, minSalary, jobType) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
      const firebase = getFirebase();
      const firestore = getFirestore();
  
     // console.log("userid", getState().firebase.auth.uid);
       return firestore.collection('users').doc(getState().firebase.auth.uid).update({
         currentLocation: currentLocation,
         minSalary: minSalary,
         jobType:jobType
       }).then( () =>{
        dispatch({ type: 'DETAILS_UPDATED' })
       }).catch( () => {
        dispatch({ type: 'DETAILS_ERROR' });
       })
    }
}

export const updateMinSalary = (minSalary) => {
  
  return (dispatch, getState) => {
    getState().firebase.profile.minSalary = minSalary;
    dispatch({ type: 'MIN_SALARY_UPDATED' });
}
}

export const updateJobType = (jobType) => {
  
  return (dispatch, getState) => {
    getState().firebase.profile.jobType = jobType;
    dispatch({ type: 'JOBTYPE_UPDATED' });
}
}

export const getCity = (latitude, longitude) => {
  return(dispatch, getState) =>{
    
    var xhr = new XMLHttpRequest(); 
    var lat = latitude;
    var lng = longitude; 

    // Paste your LocationIQ token below. 
    xhr.open('GET', " https://us1.locationiq.com/v1/reverse.php?key=pk.1ef0d71e661778d047d95c588d6dff8f&lat=" + 
    lat + "&lon=" + lng + "&format=json", true); 
    xhr.send(); 
    xhr.onreadystatechange = processRequest; 
    xhr.addEventListener("readystatechange", processRequest, false); 

    function processRequest(e) { 
        if (xhr.readyState == 4 && xhr.status == 200) { 
            var response = JSON.parse(xhr.responseText); 
            var city = response.address.city; 
            getState().firebase.profile.currentLocation = city;
          //  console.log(getState()); 
            dispatch({ type: 'LOCATION_SUCCESS' });
        } 
        else{
          dispatch({ type: 'LOCATION_ERROR' });
        }
    }
    
  } 
}